import { useState } from "react";
import React from "react";
const Landingpage=()=>{
    const [action,setaction]=useState("Sign Up");
    return(
        <div className="flex absolute z-10 flex-col mx-auto mt-[100px] ml-[450px] w-[600px] bg-white/30 pb-[30px]">
            <div className="flex flex-col items-center gap-[9px] w-full mt-[30px] justify-center">
                <div className="text-black/40 text-[48px] font-bold">
                    {action}
                </div>
            </div>
            <div className="mt-[55px] flex flex-col items-center justify-center gap-[25px]">
                {
                    action==="Login"?<div></div>:<div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                        <input placeholder="Name" type="text"></input>
                    </div>
                }
                    
                    <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                        <input placeholder="Email" type="email"></input>
                    </div>
                    <div className="flex items-center justify-center w-[480px] h-[80px] bg-gray-200 rounded-md">
                        <input placeholder="Password" type="password"></input>
                    </div>
                </div>
                {action==="Sign Up"?<div></div>:<div className="pl-[62px] mt-[27px] text-gray-500 text-[18px]">Lost Password? <span>Click here</span></div>}
                <div className="flex gap-[30px] my-[60px] mx-auto">
                    <div className={action==="Login"?"flex justify-center items-center w-[220px] h-[59px] bg-gray-600 text-black rounded-full text-[19px] font-bold cursor-pointer":"flex justify-center items-center w-[220px] h-[59px] text-gray-900 bg-gray-200 rounded-full text-[19px] font-bold cursor-pointer"} onClick={()=>{
                        setaction("Sign Up");
                    }}>Sign up</div>
                    <div className={action==="Sign Up"?"flex justify-center items-center w-[220px] h-[59px] bg-gray-600 text-black rounded-full text-[19px] font-bold cursor-pointer":"flex justify-center items-center w-[220px] h-[59px] text-gray-900 bg-gray-200 rounded-full text-[19px] font-bold cursor-pointer"}onClick={()=>{
                        setaction("Login");
                    }}>Login</div>
                </div>
        </div>
    )
}

export default Landingpage;