import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem("userData");
  
      if (!storedUser) {
          navigate("/");
          return;
      }
  
      console.log(storedUser)
      try {
          setUser(JSON.parse(storedUser));
      } catch (error) {
          console.error("Invalid JSON in localStorage:", error);
          localStorage.removeItem("userData");
          navigate("/");
      }
  }, []);
  

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        navigate("/");
    };

    if (!user) {
        return <p className="text-center mt-20">Redirecting to login...</p>;
    }

    return (
        <div className="flex flex-col items-center mt-20">
          <img src={user.avatar}></img>
          <img src={user.coverImage}></img>
            <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <p>Full Name: {user.fullName ? user.fullName : "N/A"}</p>
            <button 
                className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default App;
