const mongoose=require('mongoose');

// create userScema 
const userSchema= new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            min:3,
            max:15
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        phoneNo:{
            type:String,
            default:'',
        },
        password:{
            type:String,
            required:true,
            min:6
        },
        profilePic:{
            type:String,
            default:'',
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        token:{
            type:String,
            default:'token'
        },
        posts:{
            type:Array,
            default:[]
        },
        fallowers:{
            type:Array,
            default:[]
        },
        fallowings:{
            type:Array,
            default:[]
        }
        
    },
    {
        timestamps:true
    }
)
// create user model and export
const User =mongoose.model('user',userSchema)

module.exports=User;