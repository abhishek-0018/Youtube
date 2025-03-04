import { LOGO_URL } from "./Utils/content";
import { useNavigate } from "react-router-dom";

const Header=()=>{
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        navigate("/");
    };
    return(
        <div className="flex justify-between static w-[100%] shadow-lg bg-red-100 sm:bg-green-100 lg:bg-gray-100">
            <div className="flex items-center">
                <img  className="h-[100px] w-[100px] rounded-[50%] m-7" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4 items-center">
                  <li className="px-4">Home</li>
                    <li className="px-4">About Us</li>
                    <li className="px-4">Contact Us</li>
                    <button className="px-4 py-2 bg-red-300 sm:bg-green-300 lg:bg-gray-300 m-4 rounded-lg" onClick={handleLogout}>Logout</button>
                </ul>
            </div>
        </div>
    );
};
export default Header;