const mongoose=require(`mongoose`);
const {Schema}=mongoose;
const AppointmentSchema = new Schema(
    {
    client_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'client'
    },
    lawyer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lawyer'
    },
    confirm:{
        type: Boolean,
        required: true,
        default:false
    },
    datetime:
    {
        type:String,
        required: true
    },
    status:
    {
        type:Boolean,
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

const Appointment=mongoose.model(`appointment`,AppointmentSchema);
//User.createIndexes();
module.exports= Appointment;