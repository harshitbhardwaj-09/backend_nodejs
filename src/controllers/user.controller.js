import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User} from "../models/user.model.js"
const registerUser=asyncHandler( async (req,res)=>{
    console.log("Request body:", req.body);

    const { fullname,email,username,password}= req.body;
    console.log("fullname:", fullname, "email:", email, "username:", username, "password:", password);
    if(
        [fullname,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with username and email already exist");
    }
    console.log("files recieved",req.files);
    const avatarLocalPath=req.files?.avatar?.[0]?.path;
    console.log("Avatar file path:", avatarLocalPath);
    //const coverImageLocalPath=req.files?.coverImage[0].path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;
        console.log("Cover image file path:", coverImageLocalPath);
    }
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatarlocalpath is required");
    }
    const avatar= await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
   const user=await  User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        password,
        username:username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})

export {registerUser}
