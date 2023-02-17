const express = require(`express`);
const router = express.Router();
const Appointment = require(`../models/Appointment`);
const {body, validationResult}= require(`express-validator`);
const fetchLawyer=require(`../middleware/fetchLawyer`);
const fetchClient=require(`../middleware/fetchClient`);
const Client = require("../models/Client");
const Lawyer = require("../models/Lawyer");
const Connection=require("../models/Connection");
const transporter=require(`../mailer/Transporter`);

/************************************************************************************************************************************* */
//localhost:5000/api/appointment/client/fetch/all/appointments (get)
router.get('/client/fetch/all/appointments',fetchClient,async (req,res)=>{
   try
   {
      const appointment = await Appointment.find({client_id:req.client.id}).populate({
         path:'lawyer_id',
         select:"-password"
      });
      
      res.json({
         success:true,
         appointment:appointment
      })
    
   }
   catch(error)
   {
      console.log(error.message);
      res.status(500).json(
        {
        success:false,
        msg:"Internal Server Error"
        }
      );
   }
});
/************************************************************************************************************************************** */

/************************************************************************************************************************************* */
//localhost:5000/api/appointment/lawyer/fetch/all/appointments (get)
router.get('/lawyer/fetch/all/appointments',fetchLawyer,async (req,res)=>{
    try
    {
      const appointment = await Appointment.find({lawyer_id:req.lawyer.id}).populate({
         path:'client_id',
         select:"-password"
       });
   
       res.json({
         success:true,
         appointment:appointment
      })
    }
    catch(error)
    {
      console.log(error.message);
      res.status(500).json(
        {
        success:false,
        msg:"Internal Server Error"
        }
      );
    }

 });

/************************************************************************************************************************************* */

/************************************************************************************************************************************** */
//localhost:5000/api/appointment/client/add/appointment (post)
router.post("/client/add/appointment",fetchClient,
[
   body('datetime',"cannot be empty").isLength({min:1})
   ,
   body('lawyer_id',"cannot be empty").isLength({min:1})
] 
,async(req,res)=>{

   const errors = validationResult(req);

   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }

        let connection_= await Connection.find({lawyer_id:req.body.lawyer_id,client_id:req.client.id,deleted:false,rejected:false,confirm:true});
        if(!connection_.length)
        {
            return res.status(404).json({success:false,msg:"Not Found"});
        }

        let temp=new Date(req.body.datetime);
  

   const appointment = Appointment.create(
      {
         datetime:temp.toLocaleString(),
         lawyer_id: req.body.lawyer_id,
         client_id:req.client.id
      }
   ).then(
      (appointment)=>{
         res.json({
            success:true,
            appointment:appointment
         })
      }
      )
   .catch(error=>{
      console.log(error.message);
      res.status(500).json(
        {
        success:false,
        msg:"Internal Server Error"
        }
      );
   }
   )
})
/************************************************************************************************************************************** */

/************************************************************************************************************ */
//localhost:5000/api/appointment/lawyer/confirm/appointment/:id (put)
router.put("/lawyer/confirm/appointment/:id",fetchLawyer,async (req,res)=>{
   
   try{


   //checking for valid user and
   //find the appointment to be updated and update it

   let appointment= await Appointment.findById(req.params.id);

   if(!appointment){
      res.status(404).json(
        {
        success:false,
        msg:"Not Found"
        }
      );
   }

   if(appointment.lawyer_id.toString() !== req.lawyer.id){
      return  res.status(401).json(
        {
        success:false,
        msg:"Not Allowed"
        }
      );
   }

   appointment= await Appointment.findByIdAndUpdate(req.params.id,{confirm:true},{new:true});

   const client= await Client.findById(appointment.client_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
              {
              success:false,
              msg:"Internal Server Error"
              }
            );
         })

         const lawyer= await Lawyer.findById(appointment.lawyer_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
              {
              success:false,
              msg:"Internal Server Error"
              }
            );
         })

         const mailOptions = {
            from: 'LawConnect <lawyerappointmentapp@gmail.com>',
            to: client.email,
            subject: 'Appointment Confirmed',
            text:"Your appointment with "+lawyer.name+" has been confirmed at "+appointment.datetime
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

   res.json({
      success:true,
      appointment:appointment
   });
   }
   catch(error)
   {
      console.log(error.message);
      res.status(500).json(
        {
        success:false,
        msg:"Internal Server Error"
        }
      );
   }

})
/********************************************************************************************************** */

/************************************************************************************************************ */
//localhost:5000/api/appointment/lawyer/reject/appointment/:id (put)
router.put("/lawyer/reject/appointment/:id",fetchLawyer,async (req,res)=>{
   
    try{
 
 
    //checking for valid user and
    //find the appointment to be updated and update it
 
    let appointment= await Appointment.findById(req.params.id);
 
    if(!appointment)
    { 
      res.status(404).json(
        {
        success:false,
        msg:"Not Found"
        }
      );}
 
    if(appointment.lawyer_id.toString() !== req.lawyer.id){
       return   res.status(401).json(
         {
         success:false,
         msg:"Not Allowed"
         }
       );
    }
 
    appointment= await Appointment.findByIdAndUpdate(req.params.id,{rejected:true},{new:true});

    const client= await Client.findById(appointment.client_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
              {
              success:false,
              msg:"Internal Server Error"
              }
            );
         })

         const lawyer= await Lawyer.findById(appointment.lawyer_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
              {
              success:false,
              msg:"Internal Server Error"
              }
            );
         })

         const mailOptions = {
            from: 'LawConnect <lawyerappointmentapp@gmail.com>',
            to: client.email,
            subject: 'Appointment Not Confirmed',
            text:"Sorry!. Your appointment with "+lawyer.name+" at "+appointment.datetime+" has not been confirmed. Please try to book new appointment."
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
 
    res.json({
      success:true,
      appointment:appointment
   });

    }
    catch(error)
    {
      console.log(error.message);
      res.status(500).json(
        {
        success:false,
        msg:"Internal Server Error"
        }
      );
    }
 
 })
 /********************************************************************************************************** */
 

 /************************************************************************************************************ */
 //localhost:5000/api/appointment/client/delete/appointment/:id (delete)
router.delete("/client/delete/appointment/:id",fetchClient,async (req,res)=>{
   
    try{
 
 
    //checking for valid user and
    //find the appointment to be updated and update it
 
    let appointment= await Appointment.findById(req.params.id);
 
    if(!appointment){
      res.status(404).json(
         {
         success:false,
         msg:"Not Found"
         }
       );
    }
 
    if(appointment.client_id.toString() !== req.client.id){
       return res.status(401).json(
         {
         success:false,
         msg:"Not Allowed"
         }
       );
    }
 
    appointment= await Appointment.findByIdAndUpdate(req.params.id,{deleted:true},{new:true});

    const client= await Client.findById(appointment.client_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
            {
            success:false,
            msg:"Internal Server Error"
            }
            );
         })

         const lawyer= await Lawyer.findById(appointment.lawyer_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
            {
            success:false,
            msg:"Internal Server Error"
            }
            );
         })

         let mailOptions = {
            from: 'LawConnect <lawyerappointmentapp@gmail.com>',
            to: client.email,
            subject: 'Appointment Deleted',
            text:"Alert! Your appointment with "+lawyer.name+" at "+appointment.datetime+" has been deleted by you."
          };


          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

           mailOptions = {
            from: 'LawConnect <lawyerappointmentapp@gmail.com>',
            to: lawyer.email,
            subject: 'Appointment Deleted',
            text:"Alert! Your appointment with "+client.name+" at "+appointment.datetime+" has been deleted by the client."
          };


          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
 
    res.json({
      success:true,
      appointment:appointment
   });
    }
    catch(error)
    {
       console.log(error.message);
       res.status(500).json(
         {
         success:false,
         msg:"Internal Server Error"
         }
       );
    }
 
 })
 /********************************************************************************************************** */
 
 /************************************************************************************************************ */
 //localhost:5000/api/appointment/lawyer/status/completed/appointment/:id (put)
router.put("/lawyer/status/completed/appointment/:id",fetchLawyer,async (req,res)=>{
   
  try{


  //checking for valid user and
  //find the appointment to be updated and update it

  let appointment= await Appointment.findById(req.params.id);

  if(!appointment)
  { 
    res.status(404).json(
      {
      success:false,
      msg:"Not Found"
      }
    );}

  if(appointment.lawyer_id.toString() !== req.lawyer.id){
     return   res.status(401).json(
       {
       success:false,
       msg:"Not Allowed"
       }
     );
  }

  appointment= await Appointment.findByIdAndUpdate(req.params.id,{status:true},{new:true});


  res.json({
    success:true,
    appointment:appointment
 });

  }
  catch(error)
  {
    console.log(error.message);
    res.status(500).json(
      {
      success:false,
      msg:"Internal Server Error"
      }
    );
  }

})
/********************************************************************************************************** */




module.exports=router;