const express = require(`express`);
const router = express.Router();
const Lawyer= require(`../models/Lawyer`);
const {body, validationResult}= require(`express-validator`);
const bcrypt= require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const fetchLawyer=require(`../middleware/fetchLawyer`);
const fetchClient=require(`../middleware/fetchClient`);
const transporter=require(`../mailer/Transporter`);
const mongoose=require('mongoose');

const JWT_SECRET="graphicerahilluniversity2022";

/*********************************************************************************************************************** */
//create a Lawyer using: POST "/api/lawyer/create/Lawyer"
router.post('/create/Lawyer',[

    //validating the request body parameters
    body('name',`Enter a valid name`).isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password must be atleast 5 characters ").isLength({min:5}),
    body(`id_num`,'id number should be atleast 10 characters long').isLength({min:10}),
    body(`about`,'about should be atleast 50 characters long').isLength({min:5}),
    body(`experience`,'must be number').isNumeric(),
    body(`location`,'can not be empty').isLength({min:5}),
    body(`type`,'can not be empty').isLength({min:5})

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,msg:errors.array()});
    }
    // const lawyer = Lawyer(req.body);
    // lawyer.save();

    //check whether the lawyer with same email exists already
    let lawyer=await Lawyer.findOne({email:req.body.email});
    if(lawyer){
        return res.status(400).json({success,msg:"Sorry a lawyer with this email already exists"});
    }

    //ecrypting password before storing
    const salt= await bcrypt.genSalt(10);
    secPasswd = await bcrypt.hash(req.body.password,salt);


    
    //creating new lawyer
    lawyer=Lawyer.create(
        {
            name:req.body.name,
            password:secPasswd,
            email:req.body.email,
            id_num:req.body.id_num,
            about:req.body.about,
            experience:req.body.experience,
            location:req.body.location,
            type:req.body.type

        }
    ).then( 
        //if lawyer is created this will be executed
        lawyer=>{

            const mailOptions = {
                from: 'LawConnect <lawyerappointmentapp@gmail.com>',
                to: req.body.email,
                subject: 'Confirmation',
                text:"Your registeration is done. Thank You for registering to LawConnect..."
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        
            const data={
                lawyer:{
                    id:lawyer.id
                }
            };

            //jwt token that will provide secure access to lawyer
            const authToken=jwt.sign(data,JWT_SECRET);
            success=true;
            //console.log(authToken);
            res.json({success,authToken});}

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
    );
})
/*********************************************************************************************************************** */


/*********************************************************************************************************************** */
//log in a Lawyer using: POST "/api/lawyer/login/Lawyer"
router.post('/login/Lawyer',[

    //validating the request body parameters
    
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password cannot be empty").exists()

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,msg:errors.array()});
    }
    
    

    try
    {
        let lawyer= await Lawyer.findOne({email:req.body.email});
        if(!lawyer)
        {
            return res.status(400).json({success,msg:"Please try to login with correct credentials"});
        }

        const passwordCompare= await bcrypt.compare(req.body.password,lawyer.password);
        if(!passwordCompare){
            return res.status(400).json({success,msg:"Please try to login with correct credentials"});
        }

        const data={
            lawyer:{
                id:lawyer.id
            }
        };

        //jwt token that will provide secure access to lawyer
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        //console.log(authToken);
        res.json({success,authToken});
        

    }catch(error)
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
/*********************************************************************************************************************** */



/*********************************************************************************************************************** */
//get a Lawyer using: GET "/api/lawyer/get/Lawyer"
router.get('/get/Lawyer',fetchLawyer,async (req,res)=>
{
    try{
        userId=req.lawyer.id;
        const lawyer= await Lawyer.findById(userId).select("-password");
        res.json({success:true,lawyer:lawyer});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json(
          {
          success:false,
          msg:"Internal Server Error"
          }
        );
    
    }
})
/*********************************************************************************************************************** */


/*********************************************************************************************************************** */
//get a Lawyer using: GET "/api/auth/get/all/Lawyers"
router.get('/get/all/Lawyers',fetchClient,async (req,res)=>
{
    try{
        const lawyers=await Lawyer.find({}).select({password:0,email:0});
        res.json({success:true,lawyers:lawyers})
    }
    catch(error){
        console.log(error.message);
        res.status(500).json(
          {
          success:false,
          msg:"Internal Server Error"
          }
        );
    }
})
/*********************************************************************************************************************** */



module.exports=router;