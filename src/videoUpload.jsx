import { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!title || !description || !thumbnail || !videoFile) {
            setMessage("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);
        formData.append("videoFile", videoFile);

        setUploading(true);
        setMessage("");

        try {
            const access=localStorage.getItem("accessToken");
            const response = await axios.post("http://localhost:8000/api/v1/videos/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${access}`
                }
            });

            setMessage(response.data.message);
            setUploading(false);
        } catch (error) {
            console.error("Upload failed due to:", error);
            setMessage(error.response?.data?.message || "Upload failed");
            setUploading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold text-center mb-5">Upload Video</h2>
            {message && <p className="text-red-500 text-center">{message}</p>}
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="p-2 border rounded"
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
};

export default UploadVideo;
