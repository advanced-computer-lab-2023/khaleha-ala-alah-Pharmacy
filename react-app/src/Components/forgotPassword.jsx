import { message } from "antd";
import React from "react";
import { useState} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username){
           message.error("Please fill all the fields");
            return;
        }
        const data = {
            "username" : username
        }
        await axios.post("http://localhost:4000/users/forgotPassword",data)
        .then(async (res) => {
            message.success("Email Sent Successfully");
            navigate("/login");
        }).catch((err) => {
            console.log(err);
            message.error("Email Sending Failed");
        })
    }


    return(
        <main>
            <div>
                <h1>Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter username</label>
                    <input type="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} id="username" placeholder="username" />
                    <button type="submit">Send Email</button>
                </form>
            </div>
        </main>
    );
}
export default ForgotPassword;