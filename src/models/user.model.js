import mongoose,{Schema} from "mongoose";

const userschema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        reqired:true
    },
    coverimage:{
        type:String, //cloudinary url
    },
    watchhistory:[
        {
        type:Schema.Types.ObjectId, //cloudinary url
        reqired:true
        }
    ],
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshtoken:{
        type:String
    }
},
{
    timestamps:true
}
)

export const user=mongoose.model("user",userschema)