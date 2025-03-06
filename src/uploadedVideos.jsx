import { useState, useRef } from "react";

const UploadedVideos = ({ resData }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const scrollPosition = useRef(0);

    const handlePlay = () => {
        scrollPosition.current = window.scrollY; 
        setIsPlaying(true);
        videoRef.current.play();
    };

    // Function to stop video streaming
    const handleCancel = () => {
        setIsPlaying(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;

        // starting from same position where user left
        setTimeout(() => {
            window.scrollTo(0, scrollPosition.current);
        }, 0);
    };

    return (
        <div className="p-2 cursor-pointer justify-center">
            {!isPlaying && (
                <div onClick={handlePlay} className="m-4 p-4 w-[300px] rounded-lg bg-gray-100 hover:bg-gray-200 relative">
                    <img src={resData.thumbnail} alt="Video Thumbnail" className="rounded-lg h-[250px] w-[290px]" />
                    <h3 className="font-bold py-4 text-lg">{resData.title}</h3>
                    <h3>{resData.description}</h3>
                    <h3>{resData.views} views</h3>
                </div>
            )}

            {isPlaying && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div className="bg-gray-900 p-4 rounded-lg w-[980px] relative">
                    <video ref={videoRef} controls autoPlay className="w-full mt-2" preload="metadata">
                        <source src={`${resData.videoFile}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <button
                        onClick={handleCancel}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >X
                    </button>
                    </div> 
                </div>
            )}
        </div>
    );
};

export default UploadedVideos;
