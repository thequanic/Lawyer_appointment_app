import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';


export default function Clientsignup()
{
    const context= useContext(AppContext);
    const {showAlert,user}=context;

    const [cred,setCred] = useState({name:"",email:"",password:"",cpassword:"",profession:"",adharr_num:"",about:""});
    const navigate=useNavigate();

    

    const handleChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
  
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(cred.password!==cred.cpassword){showAlert("Password and Confirm Password do not match","danger");return;}
        const response=await fetch("http://localhost:5000/api/client/create/Client",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name:cred.name.toUpperCase(),email:cred.email,password:cred.password,profession:cred.profession,adharr_num:cred.adharr_num,about:cred.about})

        }).catch(error=>{
            console.log("Internal Server Error");
            showAlert("Internal Server Error","danger")
            return;
        })

        const json= await response.json();

        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authToken);
            localStorage.setItem('user',user);
            showAlert("Sign Up Successful","success")
            navigate("/");
        }
        else{
            showAlert("Invalid Credentials"+json.msg,"danger")
        }
    }


    return(
        <div className='container mt-3 mb-5'>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">User Name</label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handleChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required minLength={5}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} required minLength={5}/>
        </div>
        <div className="mb-3">
            <label htmlFor="profession" className="form-label">Profession</label>
            <input type="text" className="form-control" id="profession" name="profession" aria-describedby="emailHelp" onChange={handleChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="adharr_num" className="form-label">Adharr Card Number</label>
            <input type="text" className="form-control" id="adharr_num" name="adharr_num" aria-describedby="emailHelp" onChange={handleChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="about" className="form-label">About</label>
            <textarea rows="3" cols="20" wrap="hard" className="form-control" id="about" name="about" aria-describedby="emailHelp" minLength={50} onChange={handleChange} required/>
        </div>
        
        <button type="submit" className="btn btn-dark">Submit</button>
        </form>
    </div>
    )

}