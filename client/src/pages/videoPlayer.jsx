import Header from '../components/Header';
import './videoPlayer.scss';
import axios from 'axios';
// import Liked from '../assets/liked.png';
// import Unliked from '../assets/unliked.png';
// import Disliked from '../assets/disliked.png';
// import Undisliked from '../assets/undisliked.png';
import { useEffect, useState } from 'react';


const VideoPlayer = () => {
  const videoUrl = 'http://localhost:3000/video?url=' + localStorage.getItem('url');
  console.log(videoUrl);

  const [videoData, setVideoData] = useState({});
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [isLiked, setIsLiked] = useState(false);
  // const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:3000/videoData', {method: "POST",body: {videoUrl: localStorage.getItem('url')}})
      .then((response) => {
        console.log(response);
        setVideoData(response.data.data[0])
        // setLikes(response.data.data[0].likes)
        // setDislikes(response.data.data[0].dislikes)
      })
      .catch((error) => console.error('Error fetching video data: ', error));
  }, []);

  // function handleLike() {
  //   if (isLiked) {
  //     setIsLiked(false);
  //     setLikes(likes - 1);
  //   }
  //   else {
  //     setIsLiked(true);
  //     setLikes(likes + 1);
  //     if (isDisliked) {
  //       setIsDisliked(false);
  //       setDislikes(dislikes - 1);
  //     }
  //   }
  // }
  // function handleDislike() {
  //   if (isDisliked) {
  //     setIsDisliked(false);
  //     setDislikes(dislikes - 1);
  //   }
  //   else {
  //     setIsDisliked(true);
  //     setDislikes(dislikes + 1);
  //     if (isLiked) {
  //       setIsLiked(false);
  //       setLikes(likes - 1);
  //     }
  //   }
  // }

  return <>
    <Header />

    <section className="video-conatiner">
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </section>

    <section className="video-desc px-6 py-4">
      <h2 className='text-capitalize'>{videoData.title}</h2>
      <p className='text-capitalize'>{videoData.description}.</p>

      {/* <div className='like-dislike'>
        <img src={isLiked ? Liked : Unliked} alt='' onClick={handleLike} /> <span>{likes}</span>
        <img src={isDisliked ? Disliked : Undisliked} alt='' onClick={handleDislike} /> <span>{dislikes}</span>
      </div> */}

      <p>Uploader: {videoData.name} ({videoData.email})</p>
    </section>
  </>
}

export default VideoPlayer;
