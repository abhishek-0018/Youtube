import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadedVideos from "./uploadedVideos";
import axios from "axios";

const App = () => {
    const [user, setUser] = useState(null);
    const [listOfVideos,setListOfVideos]=useState([]);
    const [searchedUser,setSearchedUser]=useState("");
    const navigate = useNavigate();
    const fetchData=async()=>{
        const access=localStorage.getItem("accessToken");
        const data=await axios.get(`http://localhost:8000/api/v1/videos/getVideos`,{headers: {
            Authorization: `Bearer ${access}`
        }});
        setListOfVideos(data.data.data);
    }
    const fetchUser=async()=>{
        const access = localStorage.getItem("accessToken");
        const user = await axios.get(`http://localhost:8000/api/v1/users/getUser`, {
            params: { "searchedUser":searchedUser },
            headers: { Authorization: `Bearer ${access}` },
        });
        localStorage.setItem("searchedUser", JSON.stringify(user.data.data.user));
        navigate("/searchedUser")
    }

    useEffect(() => {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
          navigate("/");
          return;
      }

      try {
          setUser(JSON.parse(storedUser));
      } catch (error) {
          console.error("Invalid JSON in localStorage:", error);
          localStorage.removeItem("userData");
          navigate("/");
      }
      fetchData();
  }, []);
  

    const getvideouploadpage=()=>{
        navigate("/videoUpload");
    }

    if (!user) {
        return <p className="text-center mt-20">Redirecting to login...</p>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center">
                <div className="mx-2 px-2">
                    <input type="text" placeholder="Enter User name" className="border border-solid border-black" value={searchedUser} onChange={(e)=>{
                        setSearchedUser(e.target.value);
                    }}></input>
                    
                    <button className="px-4 py-2 bg-red-300 sm:bg-green-300 lg:bg-gray-300 m-4 rounded-lg" onClick={fetchUser}>Search</button>
                </div>
                </div>
          <img src={user.coverImage} className="static h-[400px] w-[80%] ml-40"></img>
          <div className="flex justify-center">
          <img src={user.avatar} className="rounded-[50%] mt-20 lg:h-[250px] lg:w-[250px] sm:h-[100px] sm:w-[100px]"></img>
          </div>
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <p>Full Name: {user.fullName ? user.fullName : "N/A"}</p>
          </div>
          <div className="flex items-center mt-[100px]">
              <h1 className="text-5xl ml-[120px] mr-[50px]">Videos</h1>
              <button className=" bg-red-500 text-white px-4 py-2 rounded w-50 h-10"
                onClick={getvideouploadpage}>Upload More</button>
          </div>
          {listOfVideos.length > 0 ? (
                listOfVideos.map((video) => (
                    <UploadedVideos key={video._id} resData={video} />
                ))) : (
                    <p className="text-center">No videos uploaded yet.</p>
                )}
        </div>
    );
};

export default App;
