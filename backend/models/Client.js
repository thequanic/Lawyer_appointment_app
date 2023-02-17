const mongoose=require(`mongoose`);
const {Schema}=mongoose;
const ClientSchema = new Schema({
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
    adharr_num:
    {
        type:String,
        required: true
    },
    about:
    {
        type:String,
        required: true
    },
    profession:
    {
        type:String,
        required: true,
    },
    date_of_creation:{
        type:Date,
        default:Date.now
    }


})

const Client=mongoose.model(`client`,ClientSchema);
//User.createIndexes();
module.exports= Client;