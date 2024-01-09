import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./home.scss";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [filVideos, setFilVideos] = useState([]);
  const [searchInp, setSearchInp] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  async function getAllVideos() {
    const data = await axios.post("http://localhost:3000/video/allvideos", {}, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
    console.log(data.data.videos);

    if (data.data.videos.length > 0) {
      setVideos(data.data.videos);
      setFilVideos(data.data.videos);
    }
    else setVideos([]);
  }

  useEffect(() => {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') navigate('/login');
    else {
      // axios.post('http://localhost:3000/verifyToken', {}, {headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`
      // }})
      //   .then(response => {
      //     if (response.data.msg == "Invalid") navigate('/login');
      //   })
      getAllVideos();
    }
  }, [])

  useEffect(() => {
    if (isFocus) {
      const targetSection = document.getElementById('videos-section');

      if (targetSection) {
        const sectionTop = targetSection.offsetTop;
        const adjustedScrollPosition = sectionTop - 70;

        window.scrollTo({
          top: adjustedScrollPosition,
          behavior: 'smooth',
        });
      }

      setIsFocus(false);
    }
  }, [isFocus])

  function handleSearch(e) {
    e.preventDefault();
    setSearchInp(e.target.value);

    let filteredVids = videos.filter((vid) => {
      if (vid.title.toLowerCase().includes(searchInp.toLowerCase()) || vid.description.toLowerCase().includes(searchInp.toLowerCase())) return vid;
    })
    console.log(filteredVids);
    if (e.target.value == '') setFilVideos(videos);
    else setFilVideos(filteredVids);

    setIsFocus(true);
  }

  return <>
    <Header searchInp={searchInp} setSearchInp={setSearchInp} handleSearch={handleSearch} setIsFocus={setIsFocus} />

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
            <h5>Learn ReactJS</h5>
            <p>ReactJS's primary goal is to create User Interfaces (UI) which enhance the speed of programs. It makes use of virtual DOM (JavaScript object), which enhances the app's efficiency..</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/AqgUzdgAbUVtDzoUrbKUfmnx" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block text-white ">
            <h5>MongoDB commands and Atlas</h5>
            <p>MongoDB Atlas is a multi-cloud database service by the same people that build MongoDB. Atlas simplifies deploying and managing your databases.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://nextjs.org/static/blog/next-13/twitter-card.png" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block text-white">
            <h5>Next.JS - A ReactJS Framework</h5>
            <p>Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static website generation..</p>
          </div>
        </div>
      </div>
      {/* <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button> */}
    </div>

    <section className="px-6 py-5 light-bg" id="videos-section">

      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-5">
        {
          filVideos.length > 0 ? filVideos.map((video, index) =>
            <VideoCard video={video} displaySave={true} displayRemove={false} key={index} />)
            : <div className="">No videos uploaded.</div>
        }

      </div>

    </section >

    <Footer />
  </>
}

export default Home;