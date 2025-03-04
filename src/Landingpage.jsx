import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setavatar] =useState(null);
    const [coverImage, setCoverImage] =useState(null);

    const navigate = useNavigate();

    const handleFileChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setCoverImage(file);
        }
    }

    const handleFileCh=(e)=>{
        const file=e.target.files[0];
        if(file){
            setavatar(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !username || !password) {
            alert("No data collected");
            return;
        }
    
        const userData = new FormData();
        userData.append("email", email);
        userData.append("username", username);
        userData.append("password", password);
    
        if (action === "Sign Up") {
            userData.append("fullName", fullName);
            if (avatar) userData.append("avatar", avatar); // Ensure file exists
            if (coverImage) userData.append("coverImage", coverImage);
        }
    
        const headers = action === "Sign Up"
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };
        try {
            const endpoint = action === "Sign Up" ? "/api/v1/users/register" : "/api/v1/users/login";
            const response = await axios.post(`http://localhost:8000${endpoint}`, userData, {headers});
    
            alert(`${action} Successful!`);
    
            if (response.data.success) {
                localStorage.setItem("userData", JSON.stringify(response.data.data.user));
                localStorage.setItem("accessToken", response.data.data.accessToken);
                navigate("/user");
            }
        } catch (error) {
            console.error("Error:", error.response?.data?.message || "Something went wrong");
            alert(error.response?.data?.message || "Error during authentication");
        }
    };
    

    return (
        <div className="flex absolute z-10 flex-col mx-auto mt-[100px] ml-[450px] w-[600px] bg-white/30 pb-[30px]">
            <div className="flex flex-col items-center gap-[9px] w-full mt-[30px] justify-center">
                <div className="text-black/40 text-[48px] font-bold">{action}</div>
            </div>
            <form onSubmit={handleSubmit} className="mt-[55px] flex flex-col items-center justify-center gap-[25px]">
                {action === "Sign Up" && (
                    <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                        <div>
                        <input
                            placeholder="Full Name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="p-3 w-full bg-transparent outline-none"
                            autoComplete="off"
                        />
                        </div>
                    </div>
                )}

                {action === "Sign Up" && (
                    <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                        <label>Avatar</label>
                        <div>
                    <input
                   placeholder="Avatar"
                   type="file"
                   onChange={handleFileCh}
                   className="p-3 w-full bg-transparent outline-none"
                   autoComplete="off"
               />
                </div>
                </div>
                )}
                {action === "Sign Up" && (
                    <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                        <label>Cover Image</label>
                        <div>

                    <input
                   placeholder="Cover Image"
                   type="file"
                   onChange={handleFileChange}
                   className="p-3 w-full bg-transparent outline-none"
                   autoComplete="off"
               />
                </div>
                </div>
                )}

                <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                    <input
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 w-full bg-transparent outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 w-full bg-transparent outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 w-full bg-transparent outline-none"
                        autoComplete="off"
                    />
                </div>

                {action === "Login" && (
                    <div className="pl-[62px] mt-[27px] text-gray-500 text-[18px]">
                        Lost Password? <span className="cursor-pointer text-blue-500">Click here</span>
                    </div>
                )}

                <div className="flex gap-[30px] my-[30px]">
                    <div
                        className={`flex justify-center items-center w-[220px] h-[59px] rounded-full text-[19px] font-bold cursor-pointer ${
                            action === "Login" ? "bg-gray-600 text-black" : "text-gray-900 bg-gray-200"
                        }`}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign Up
                    </div>
                    <div
                        className={`flex justify-center items-center w-[220px] h-[59px] rounded-full text-[19px] font-bold cursor-pointer ${
                            action === "Sign Up" ? "bg-gray-600 text-black" : "text-gray-900 bg-gray-200"
                        }`}
                        onClick={() => setAction("Login")}
                    >
                        Login
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-[200px] mx-auto bg-blue-500 text-white py-3 rounded-lg font-bold"
                >
                    {action}
                </button>
            </form>
        </div>
    );
};

export default Landingpage;