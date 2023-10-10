import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileIcon from '../assets/video-file.png';
import './upload.scss'

const UploadVideo = () => {
  const navigate = useNavigate();
  const [noVideo, setNoVideo] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({ accept: { 'video/*': [] } });

  let classes = useMemo(() => (
    'upload-box' +
    (isFocused ? ' focused-style' : '') +
    (isDragAccept ? ' accept-style' : '') +
    (isDragReject ? ' reject-style' : '')
  ), [isFocused, isDragAccept, isDragReject]);

  async function handleUpload(e) {
    e.preventDefault();
    console.log(acceptedFiles);

    if (acceptedFiles.length == 0) setNoVideo(true);
    else {
      setNoVideo(false);
      const formData = new FormData();
      const fileName = `${localStorage.getItem('email')}_${title}_${Date.now()}.mp4`; // Include video name in the filename
      formData.append('video', acceptedFiles[0], fileName);
      // formData.append('video', acceptedFiles[0]);
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('fileName', fileName);
      formData.append('name', localStorage.getItem('name'));

      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      // console.log(response.data);

      if (response.status == 201) {
        setTitle('');
        setDesc('');

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/myvideos ');

        }, 2000);
        
      }
    }
  }

  useEffect(() => {
    if (acceptedFiles.length != 0) setNoVideo(false);
  }, [acceptedFiles])

  return <>
    <Header />

    <form onSubmit={handleUpload}>
      <div {...getRootProps({ className: classes })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the video here ...</p> :
            noVideo ?
              <p className="red-alert">Select a video to upload! Drag & drop a video here, or click to select a video</p> :
              <p>Drag & drop a video here, or click to select a video</p>
        }
      </div>

      <section className="video-details d-flex flex-column ">
        {acceptedFiles.map(file => <div className="card" key={file.path}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center ">
              <img src={FileIcon} />
              <h6 className="card-title">{file.path}</h6>
            </div>
            <h6 className="card-text">size: {(file.size / (1024 * 1024)).toFixed(2)} mb</h6>
          </div>
        </div>
        )}

        <div className="input-group input-group-md mb-4 mt-4">
          <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="input-group input-group-md mb-5 ">
          <span className="input-group-text" id="inputGroup-sizing-sm">Description</span>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary py-3 fw-bold ">Upload</button>

        {isSuccess && <div className="alert alert-success mt-4" role="alert">
          Video uploaded succesfully!
        </div>}
      </section>
    </form>
  </>
}

export default UploadVideo;