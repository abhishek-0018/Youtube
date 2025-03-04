const UploadedVideos=(props)=>{
    const {resData}=props;
    return(
        <div className="m-4 p-4 w-[300px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="rounded-lg h-[250px] w-[290px]" src={resData.thumbnail}></img>
            <h3 className="font-bold py-4 text-lg">{resData.title}</h3>
        <h3>{resData.description}</h3>
        <h3>{resData.views} views</h3>
        </div>
    );
};

export default UploadedVideos;