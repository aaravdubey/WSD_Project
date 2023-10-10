import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./home.scss";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [filVideos, setFilVideos] = useState([]);
  const [searchInp, setSearchInp] = useState('');

  async function getAllVideos() {
    const data = await axios.post("http://localhost:3000/allvideos");
    console.log(data.data.videos);

    if (data.data.videos.length > 0) {
      setVideos(data.data.videos);
      setFilVideos(data.data.videos);
    }
    else setVideos([]);
  }

  useEffect(() => {
    if (localStorage.getItem('token')==null || localStorage.getItem('token')=='') navigate('/login');
    else {
      axios.post('http://localhost:3000/verifyToken', {}, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
        .then(response => {
          if (response.data.msg == "Invalid") navigate('/login');
        })
        getAllVideos();
    }
  }, [])

  function handleSearch(e) {
    e.preventDefault();
    console.log('fff');
    setSearchInp(e.target.value);

    let filteredVids = videos.filter((vid) => {
      if (vid.title.toLowerCase().includes(searchInp.toLowerCase()) || vid.description.toLowerCase().includes(searchInp.toLowerCase())) return vid;
    })
    console.log(filteredVids);
    if (e.target.value == '') setFilVideos(videos);
    else setFilVideos(filteredVids);
  }

  return <>
    <Header searchInp={searchInp} setSearchInp={setSearchInp} handleSearch={handleSearch} />

    <div id="carousel" className="carousel slide flex-fill" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src="https://www.openxcell.com/wp-content/uploads/2021/12/What-is-ReactJS-1.svg?x68452" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block text-white ">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/AqgUzdgAbUVtDzoUrbKUfmnx" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block text-white ">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://nextjs.org/static/blog/next-13/twitter-card.png" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block text-white">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    <section className="px-6 py-5 light-bg">
      <h2 className="pb-3">Popular Vids</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filVideos.length > 0 ? filVideos.map((video, index) =>
          <div className="col" key={index}>
            <div className="card shadow border-0 overflow-hidden " >
              <video>
                <source src={'http://localhost:3000/video?url=' + video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">{video.description.length > 80 ? video.description.substring(0, 80) + ' ...' : video.description + '.'}</p>
                <a onClick={() => localStorage.setItem('url', video.videoUrl)} href="/video" className="btn secondary-button shadow-sm text-white">Watch Video</a>
              </div>
            </div>
          </div>) : <div className="">No videos uploaded.</div>}


      </div>

    </section >
  </>
}

export default Home;