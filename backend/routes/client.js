const express = require(`express`);
const router = express.Router();
const Client= require(`../models/Client`);
const {body, validationResult}= require(`express-validator`);
const bcrypt= require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const fetchClient=require(`../middleware/fetchClient`);
const transporter=require(`../mailer/Transporter`);
const Connection = require("../models/Connection");
const Lawyer = require("../models/Lawyer");


const JWT_SECRET="graphicerahilluniversity2022";

/*********************************************************************************************************************** */
//localhost:5000/api/client/create/Client (post)
router.post('/create/Client',[

    //validating the request body parameters
    body('name',`Enter a valid name`).isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password must be atleast 5 characters ").isLength({min:5}),
    body(`adharr_num`,'addhar number should be atleast 10 characters long').isLength({min:10}),
    body(`about`,'about should be atleast 50 characters long').isLength({min:5}),
    body(`profession`,'can not be empty').isLength({min:5}),

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    // const client = Client(req.body);
    // client.save();

    //check whether the client with same email exists already
    let client=await Client.findOne({email:req.body.email});
    if(client){
        return res.status(400).json({success,error:"Sorry a client with this email already exists"});
    }

    //ecrypting password before storing
    const salt= await bcrypt.genSalt(10);
    secPasswd = await bcrypt.hash(req.body.password,salt);


    
    //creating new client
    client=Client.create(
        {
            name:req.body.name,
            password:secPasswd,
            email:req.body.email,
            adharr_num:req.body.adharr_num,
            about:req.body.about,
            profession:req.body.profession

        }
    ).then( 
        //if client is created this will be executed
        client=>{

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
                client:{
                    id:client.id
                }
            };

            //jwt token that will provide secure access to client
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
//localhost:5000/api/client/login/Client (post)
router.post('/login/Client',[

    //validating the request body parameters
    
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password cannot be empty").exists()

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    

    try
    {
        let client= await Client.findOne({email:req.body.email});
        if(!client)
        {
            return res.status(400).json({success,msg:"Please try to login with correct credentials"});
        }

        const passwordCompare= await bcrypt.compare(req.body.password,client.password);
        if(!passwordCompare){
            return res.status(400).json({success,msg:"Please try to login with correct credentials"});
        }

        const data={
            client:{
                id:client.id
            }
        };

        //jwt token that will provide secure access to client
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
//get a Client using: GET "localhost:5000/api/client/get/Client"
router.get('/get/Client',fetchClient,async (req,res)=>
{
    try{
        userId=req.client.id;
        const client= await Client.findById(userId).select("-password");
        res.json({
            success:true,
            client:client
        });
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
//get a Lawyer using: GET "/api/client/get/all/not/connected/Lawyers"
router.get('/get/all/not/connected/Lawyers',fetchClient,async (req,res)=>
{
    try
    {
        const connection = await Connection.find({client_id:req.client.id}).select("lawyer_id");

        const lawyers = await Lawyer.find().select({password:0,email:0});

        const not_connected_lawyers=[];
        const connected_lawyers=[];

        lawyers.forEach(lawyer => {
            let flag=1;
            for(let i=0;i<connection.length;i++)
            {
                if(lawyer._id==connection[i].lawyer_id)
                {
                    //connected_lawyers.push(lawyer);
                    flag=0;
                    break;
                }
                
            }

            if(flag)
            {
                not_connected_lawyers.push(lawyer);
            }

        });

         
         res.json({
            success:true,
            lawyers:not_connected_lawyers
        })
        

        //console.log(typeof req.client.id)
        
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