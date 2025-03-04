import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadedVideos from "./uploadedVideos";
import axios from "axios";

const App = () => {
    const [user, setUser] = useState(null);
    const [listOfVideos,setListOfVideos]=useState([]);
    const navigate = useNavigate();
    const fetchData=async()=>{
        const access=localStorage.getItem("accessToken");
        const data=await axios.get(`http://localhost:8000/api/v1/videos/getVideos`,{headers: {
            Authorization: `Bearer ${access}`
        }});
        setListOfVideos(data.data.data);
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
          <img src={user.coverImage} className="static h-[400px] w-[80%] ml-40"></img>
          <div className="flex">
          <img src={user.avatar} className="rounded-[50%] ml-50 mt-20 lg:h-[250px] lg:w-[250px] sm:h-[100px] sm:w-[100px]"></img>
          <div className="ml-[80px] flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <p>Full Name: {user.fullName ? user.fullName : "N/A"}</p>
          </div>
          </div>
          <div className="flex items-center mt-[50px]">
              <h1 className="text-5xl ml-[120px] mr-[50px]">Videos</h1>
              <button className=" bg-red-500 text-white px-4 py-2 rounded w-50 h-10"
                onClick={getvideouploadpage}>Upload More</button>
          </div>
              <div className="flex flex-wrap ml-[100px]">
                {
                    listOfVideos.map((res) => (
                        <UploadedVideos key={res._id} resData={res} />
                    ))
                }
            </div>
        </div>
    );
};

export default App;
