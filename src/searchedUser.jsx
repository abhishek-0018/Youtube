import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadedVideos from "./uploadedVideos";
import axios from "axios";

const SearchedUser = () => {
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);
    const [searchedUser, setSearchedUser] = useState("");
    const navigate = useNavigate();


    const fetchUser = async () => {
        try {
            const access = localStorage.getItem("accessToken");
            const response = await axios.get(`http://localhost:8000/api/v1/users/getUser`, {
                params: { searchedUser },
                headers: { Authorization: `Bearer ${access}` },
            });

            const userData = response.data.data.user;
            setUser(userData);
            localStorage.setItem("searchedUser", JSON.stringify(userData));

        } catch (error) {
            console.error("Error fetching user:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (!user) return;
        
        const fetchVideos = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get(`http://localhost:8000/api/v1/videos/getUserVideos`, {
                    params: { owner: user._id },
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                setVideos(response.data.data);

            } catch (error) {
                console.error("Error fetching videos:", error.response?.data?.message || error.message);
            }
        };

        fetchVideos();
    }, [user]);

    useEffect(() => {
        const storedUser = localStorage.getItem("searchedUser");
        if (!storedUser) {
            navigate("/");
            return;
        }
        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            localStorage.removeItem("searchedUser");
            navigate("/");
        }
    }, []);

    // Show loading if user is not set
    if (!user) return <p>Loading...</p>;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center">
                <div className="mx-2 px-2">
                    <input 
                        type="text" 
                        placeholder="Enter User name" 
                        className="border border-solid border-black" 
                        value={searchedUser} 
                        onChange={(e) => setSearchedUser(e.target.value)}
                    />
                    <button 
                        className="px-4 py-2 bg-red-300 sm:bg-green-300 lg:bg-gray-300 m-4 rounded-lg" 
                        onClick={fetchUser}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* User Profile */}
            <img src={user.coverImage} className="static h-[400px] w-[80%] ml-40" alt="Cover" />
            <div className="flex justify-center">
                <img src={user.avatar} className="rounded-[50%] mt-20 lg:h-[250px] lg:w-[250px] sm:h-[100px] sm:w-[100px]" alt="Avatar" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
                <p>Email: {user.email}</p>
                <p>Full Name: {user.fullName || "N/A"}</p>
            </div>

            {/* Videos Section */}
            <div className="flex items-center mt-[100px]">
                <h1 className="text-5xl ml-[120px] mr-[50px]">Videos</h1>
            </div>

            <div className="flex flex-wrap ml-[100px]">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <UploadedVideos key={video._id} resData={video} />
                ))) : (
                    <p className="text-center">No videos uploaded yet.</p>
                )}
                
            </div>
        </div>
    );
};

export default SearchedUser;
