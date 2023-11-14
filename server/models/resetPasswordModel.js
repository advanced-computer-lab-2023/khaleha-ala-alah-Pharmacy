const mongoose=require('mongoose');
const resetPasswordSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    token:{type:String,required:true}
},{timestamps:true
});
resetPasswordSchema.index({createdAt:1},{expireAfterSeconds:300});
const resetPasswordModel=mongoose.model('resetPassword',resetPasswordSchema);
module.exports=resetPasswordModel;