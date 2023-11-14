import { message } from "antd";
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";


export const VerifyUser = () => {
    const [otp, setOtp] = useState("");
    const navigate=useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(!otp){
            message.error("Please fill all the fields");
            return;
        }
        const data = {
            "OTP" : otp
        }
        await axios.post("http://localhost:4000/users/verifyUser",data,{
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(async (res) => {
            message.success("User Verified");
            const role = res.data.role;
            if(role==="patient"){
                window.location.replace("/patientHome");
              }else if(role==="pharmacist"){
                window.location.replace("/pharmacistHome");
              }else if(role==="admin"){
                window.location.replace("/adminHome");
              }
        }).catch((err) => {
            console.log(err);
            message.error("User Verification Failed");
        })
    }
    return(
        <div className="verify-user">
            <h1>Verify User</h1>
            <form className="verify-user-form" onSubmit={handleSubmit}>
                <label>OTP</label>
                <input type="text" name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} id="otp" placeholder="OTP" />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
}