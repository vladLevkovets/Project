const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema(
    {nickname:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     Bdate:{},
      },

    {strictQuery:false})
module.exports= mongoose.model("users",UserSchema);