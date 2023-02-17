const express = require(`express`);
const router = express.Router();
const Connection = require(`../models/Connection`);
const {body, validationResult}= require(`express-validator`);
const fetchLawyer=require(`../middleware/fetchLawyer`);
const fetchClient=require(`../middleware/fetchClient`);
const transporter=require(`../mailer/Transporter`);

const Client = require("../models/Client");
const Lawyer = require("../models/Lawyer");

const objectId =require('mongodb').ObjectID;

/************************************************************************************************************************************* */
//localhost:5000/api/connection/client/fetch/all/connections (get)
router.get('/client/fetch/all/connections',fetchClient,async (req,res)=>{
   try
   {
      const connection = await Connection.find({client_id:req.client.id}).populate({
         path:'lawyer_id',
         select:"-password"
      });
      
      res.json({
         success:true,
         connection:connection
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
//localhost:5000/api/connection/lawyer/fetch/all/connections (get)
router.get('/lawyer/fetch/all/connections',fetchLawyer,async (req,res)=>{
    try
    {
      const connection = await Connection.find({lawyer_id:req.lawyer.id}).populate({
         path:'client_id',
         select:"-password"
       });
   
       res.json({
         success:true,
         connection:connection
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
//localhost:5000/api/connection/client/add/connection
router.post("/client/add/connection",fetchClient,
[ 
   body('lawyer_id',"cannot be empty").isLength({min:1})
] 
,async(req,res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }


   let connection_= await Connection.find({lawyer_id:req.body.lawyer_id,client_id:req.client.id,deleted:false,rejected:false});
   if(connection_.length)
   {
       return res.status(401).json({success:false,msg:"Not Alllowed"});
   }

   let lawyer= await Lawyer.findById(req.body.lawyer_id);
   if(!lawyer)
   {
       return res.status(404).json({success:false,msg:"Not Found"});
   }

   const connection = Connection.create(
      {
         
         lawyer_id: req.body.lawyer_id,
         client_id:req.client.id
      }
   ).then(
      (connection)=>{
         res.json({
            success:true,
            connection:connection
        
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
//localhost:5000/api/connection/lawyer/confirm/connection/:id
router.put("/lawyer/confirm/connection/:id",fetchLawyer,async (req,res)=>{
   
   try{


   //checking for valid user and
   //find the connection to be updated and update it

   let connection= await Connection.findById(req.params.id);

   if(!connection){
      res.status(404).json(
        {
        success:false,
        msg:"Not Found"
        }
      );
   }

   if(connection.lawyer_id.toString() !== req.lawyer.id){
      return  res.status(401).json(
        {
        success:false,
        msg:"Not Allowed"
        }
      );
   }

   const connection2= await Connection.findByIdAndUpdate(req.params.id,{confirm:true},{new:true});

   const client= await Client.findById(connection2.client_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
              {
              success:false,
              msg:"Internal Server Error"
              }
            );
         })

         const lawyer= await Lawyer.findById(connection2.lawyer_id)
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
            subject: 'Connection Confirmed',
            text:"Your connection with "+lawyer.name+" has been confirmed. Now you can book his/her appointment."
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
      connection:connection2
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
//localhost:5000/api/connection/lawyer/reject/connection/:id
router.put("/lawyer/reject/connection/:id",fetchLawyer,async (req,res)=>{
   
    try{
 
 
    //checking for valid user and
    //find the connection to be updated and update it
 
    let connection= await Connection.findById(req.params.id);
 
    if(!connection)
    { 
      res.status(404).json(
        {
        success:false,
        msg:"Not Found"
        }
      );}
 
    if(connection.lawyer_id.toString() !== req.lawyer.id){
       return   res.status(401).json(
         {
         success:false,
         msg:"Not Allowed"
         }
       );
    }
 
    connection= await Connection.findByIdAndUpdate(req.params.id,{rejected:true},{new:true});

    const client= await Client.findById(connection.client_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
              {
              success:false,
              msg:"Internal Server Error"
              }
            );
         })

         const lawyer= await Lawyer.findById(connection.lawyer_id)
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
            subject: 'Connection Not Confirmed',
            text:"Sorry!. Your connection with "+lawyer.name+" has not been confirmed."
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
      connection:connection
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
//localhost:5000/api/connection/lawyer/delete/connection/:id
router.delete("/lawyer/delete/connection/:id",fetchLawyer,async (req,res)=>{
   
    try{
 
 
    //checking for valid user and
    //find the connection to be updated and update it
 
    let connection= await Connection.findById(req.params.id);
 
    if(!connection){
      res.status(404).json(
         {
         success:false,
         msg:"Not Found"
         }
       );
    }
 
    if(connection.lawyer_id.toString() !== req.lawyer.id){
       return res.status(401).json(
         {
         success:false,
         msg:"Not Allowed"
         }
       );
    }
 
    connection= await Connection.findByIdAndUpdate(req.params.id,{deleted:true},{new:true});

    const client= await Client.findById(connection.client_id)
         .catch(error=>{
            console.log(error.message);
            res.status(500).json(
            {
            success:false,
            msg:"Internal Server Error"
            }
            );
         })

         const lawyer= await Lawyer.findById(connection.lawyer_id)
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
            subject: 'Connection Deleted',
            text:"Alert! Your connection with "+lawyer.name+" has been deleted by you."
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
      connection:connection
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