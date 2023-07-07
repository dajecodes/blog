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
        first_name:{
            type:String,
            required:true,
        },
        last_name:{
            type:String,
            required:true,
        },
        phone_no:{
            type:String,
            default:'',
        },
        password:{
            type:String,
            required:true,
            min:6
        },
        profile_pic:{
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
        post:{
            type:Array,
            default:[]
        },
        fallowers:{
            type:Array,
            default:[]
        },
        fallowing:{
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