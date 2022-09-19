const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const CatSchema=new Schema(
    {nickname:{type:String,required:true,unique:true},
     password:{type:String,required:true} },

    {strictQuery:false})
module.exports= mongoose.model("categories",CatSchema);