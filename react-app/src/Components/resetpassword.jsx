import { message } from "antd";
import React from "react";
import { useState} from "react";
import axios from "axios";
import { useNavigate,useParams} from "react-router-dom";

function ResetPassword() {

    const [newPassword, setNewPassword] = useState("");
    const navigate=useNavigate();
    const token=useParams().token;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!newPassword){
            message.error("Please fill all the fields");
            return;
        }
        const data = {
            "newPassword" : newPassword,
            "token":token
        }
        await axios.post("http://localhost:4000/users/resetPassword",data)
        .then((res) => {
            message.success("Password Reset Successful");
            navigate("/login");
        }).catch((err) => {
            console.log(err);
            message.error("Password Reset Failed");
        })
    }
    return(
        <main>
            <div>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter New Password</label>
                    <input type="password" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} id="newPassword" placeholder="New Password" />
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </main>
    );
}
export default ResetPassword;