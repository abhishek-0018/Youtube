import { Link } from "react-router-dom";
import { useState } from "react";
import { LOGO_URL } from "./Utils/content";

const Header=()=>{
    const [btnNameReact,setbtnNameReact] =useState("Login");
    return(
        <div className="flex justify-between shadow-lg bg-red-100 sm:bg-green-100 lg:bg-gray-100">
            <div className="flex items-center">
                <img  className="h-[100px] w-[100px] rounded-[50%] m-7" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4 items-center">
                  <li className="px-4">Home</li>
                    <li className="px-4">About Us</li>
                    <li className="px-4">Contact Us</li>
                    <button className="px-4 py-2 bg-red-300 sm:bg-green-300 lg:bg-gray-300 m-4 rounded-lg" onClick={()=>{
                        if(btnNameReact=="Login"){
                            setbtnNameReact("Logout");}
                            else{
                                setbtnNameReact("Login");
                            }}}>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    );
};
export default Header;