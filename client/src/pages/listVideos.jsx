import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const ListVideos = () => {
  const [listData, setListData] = useState([]);
  const [isChange, setIsChange] = useState(false);

  async function getMyVideos() {
    const data = await axios.post("http://localhost:3000/account/listVideos", { listName: localStorage.getItem('list') }, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
    console.log(data.data);

    if (data.data.length > 0) setListData(data.data);
    else setListData([]);
  }

  useEffect(() => {
    getMyVideos();
  }, []);

  useEffect(() => {
    getMyVideos();
  }, [isChange])

  return <>
    <Header />

    <section className="px-6 py-5 light-bg">
      <h2 className="pb-3 text-capitalize ">{localStorage.getItem('list')}</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {listData.length > 0 ? listData.map((video, index) =>
            <VideoCard video={video} displaySave={true} displayRemove={true} setIsChange={setIsChange} key={index} />) 
          : <div>Empty Savelist.</div>
        }
      </div>

    </section >
  </>
}

export default ListVideos;
