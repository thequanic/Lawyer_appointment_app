const mongoose=require(`mongoose`);
const {Schema}=mongoose;
const ConnectionSchema = new Schema(
    {
    client_id:{
        type:String,
        ref:'client'
    },
    lawyer_id:{
        type:String,
        ref:'lawyer'
    },
    confirm:{
        type: Boolean,
        required: true,
        default:false
    },
    rejected:
    {
        type:Boolean,
        required: true,
        default:false
    },
    deleted:
    {
        type:Boolean,
        required: true,
        default:false
    },
    date_of_creation:{
        type:Date,
        default:Date.now
    }


})

const Connection=mongoose.model(`connection`,ConnectionSchema);
//User.createIndexes();
module.exports= Connection;