import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);

  async function getMyVideos() {
    const data = await axios.post("http://localhost:3000/myvideos", { email: localStorage.getItem('email') });
    console.log(data.data.videos);

    if (data.data.videos.length > 0) setVideos(data.data.videos);
    else setVideos([]);
  }

  useEffect(() => {
    getMyVideos();
  }, []);

  // async function setUrl(url) {
  //   loca
  // }

  return <>
    <Header />

    <section className="px-6 py-5 light-bg">
      <h2 className="pb-3">My Videos</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {videos.length > 0 ? videos.map((video, index) =>
          <div className="col" key={index}>
            <div className="card shadow border-0 overflow-hidden " >
              <video>
                <source src={'http://localhost:3000/video?url=' + video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body">
                <h5 className="card-title text-capitalize">{video.title}</h5>
                <p className="card-text text-capitalize ">{video.description.length > 80 ? video.description.substring(0, 80) + ' ...' : video.description + '.'}</p>
                <a onClick={() => localStorage.setItem('url', video.videoUrl)} href="/video" className="btn secondary-button shadow-sm text-white">Watch Video</a>
              </div>
            </div>
          </div>) : <div>No videos uploaded.</div>}


      </div>

    </section >
  </>
}

export default MyVideos;
