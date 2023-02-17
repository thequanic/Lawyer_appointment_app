const mongoose = require(`mongoose`);
const {Schema}=mongoose;
const LawyerSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    id_num:
    {
        type:String,
        required: true
    },
    about:
    {
        type:String,
        required: true
    },
    experience:
    {
        type:Number,
        required: true,
        default: 0
    },
    location:
    {
        type:String,
        required: true
    },
    type:
    {
        type:String,
        required:true,
        default:"Civil"
    },
    date_of_creation:{
        type:Date,
        default:Date.now
    }


})

const Lawyer=mongoose.model(`lawyer`,LawyerSchema);
//User.createIndexes();
module.exports= Lawyer;