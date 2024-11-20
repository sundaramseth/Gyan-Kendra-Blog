import { Button,Modal, Alert, Select,FileInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { FcAddImage } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import {CircularProgressbar} from 'react-circular-progressbar';

import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

import { useNavigate } from "react-router-dom";

import {app} from '../firebase'

import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

export default function StartPost() {

  const navigate = useNavigate();
    
  const {currentUser} = useSelector(state => state.user);

  const [openModal, setOpenModal] = useState(false);

  const [openMediaModal, setMediaOpenModal] = useState(false);

  const [formData, setFormData] = useState({});

  const [inputValue, setInputValue] = useState('');

  const [publishError, setPublishError] = useState(null);


  const [imageUploadError, setImageUploadError] = useState(null);

  const [file, setFile] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  var category = ["LifeStyle", "Programming", "Science", "Technology", "News", "Jobs", "Informative", "Entertainment", "Products", "Maths"];

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch('/api/userpost/create',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
      });
      const data = await res.json();

      if(!res.ok){
        setPublishError(data.message)
        return
      }
      if(res.ok){
       setPublishError(null); 
       navigate(``);
      }

    } catch (error) {
      setPublishError('Something went wrong');
    }

    setOpenModal(false);

  }

  
  const handleUploadImage = async (event) =>{

    await  setFile(event.target.files[0]);



    try {
      if(!file){
        setImageUploadError('Please select an Media')
        return;
      }
     
    setImageUploadError(null);
     const storage = getStorage(app);
     const fileName = new Date().getTime() + '_' + file.name;
     const storageRef = ref(storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef, file) 
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },(error)=>{
        setImageUploadError('Image Upload Failed' + error);
        setImageUploadProgress(null);
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageUploadError(null);
          setImageUploadProgress(null);
         setFormData({...formData, postMedia:downloadURL});
         alert(downloadURL);
        })
      }
     )


    } catch (error) {
      setImageUploadError('Image Upload Failed');
      setImageUploadProgress(null);
      console.log(error);
    }

  }


  return (
    <div className="flex flex-col py-5 px-5 w-34rem border rounded-xl bg-white">

        <div className="flex flex-row gap-4">
        <Link to='/dashboard?tab=profile'>
          <img 
          className="border rounded-full w-12"
            alt='user'
            src={currentUser?.profilePicture}
            />
            </Link>
            <input
            className="w-full rounded-full text-sm font-semibold px-5 border-gray-400"
            type="text"
            placeholder="Start your post!"
            onClick={() => setOpenModal(true)}
            />
        </div>

        <div className="flex flex-row justify-between gap-3 mt-4 w-full flex-wrap md:flex-nowrap">

                <Button 
                color="gray"
                onClick={() => setMediaOpenModal(true)}
                 >
                <FcAddImage size={20} /> <span className="pl-2 text-xs md:text-sm">Post Media</span>
                </Button>

      

            <Button 
                color="gray"
             >
                <FcIdea size={20} /> <span className="pl-2 text-xs md:text-sm">Share Experties</span>
                </Button>
                
                <Link to="/create-post" className="flex flex-row">
                 <Button 
                color="gray"
                 >
                 <FcRules size={20} /> <span className="pl-2 text-xs md:text-sm">Write Blog</span>
                </Button>
                </Link>

        </div>
      
      {/* Modal Start New Post */}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Your Post</Modal.Header>
        <Modal.Body>
        <div className="flex flex-row gap-2 items-center mb-2">
          <img 
          className="border rounded-full w-12"
            alt='user'
            src={currentUser?.profilePicture}
            />
            <p className="text-lg font-semibold">{currentUser.username}</p>
        </div>
        
        <div className="flex flex-col">
        <input
        placeholder="Post Title"
        type="text"
        required
        id='title'
        className="flex-1 font-sans font-semibold border-0 postinput"
        onChange={(e)=>setFormData({...formData, title:e.target.value})}
        />

      <div className="block my-4">
      <div style={{ display: "inline-block"}}>
        <ReactQuill
          theme="snow"
          formats={formats}
          placeholder="write your content ...."
          modules={modules}
          onChange={(content)=>setFormData({...formData, content:content})}
          style={{ height: "220px" }}
        >
        </ReactQuill>
        </div>
    </div>

      <Select onChange={(e)=>setFormData({...formData, category:e.target.value})}>
            <option value="uncategorized">Select a category</option>
            {category && category.map((value) => (
                <option value={value} key={value}>{value}</option>
            ))}
        </Select>

        </div>
        </Modal.Body>
        {publishError && (
        <Alert color='failure' className="mt-5">
          {publishError}
        </Alert>
       )}
        <Modal.Footer className="flex flex-row justify-end items-center">
        <Button  color="gray" size="sm"  onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button size="sm" color="blue" onClick={handleSubmit}>Publish Post</Button>
       
        </Modal.Footer>
      </Modal>

   {/* Modal Post Media*/}
      <Modal show={openMediaModal} onClose={() => setMediaOpenModal(false)}>
        <Modal.Header>Upload Your Media</Modal.Header>
        <Modal.Body>
        
        <div className="flex flex-col justify-center items-center">
        {!file && (
        <>
          <div className="text-center font-semibold text-xl my-14">
          Select files to begin <br/>
          Share images or a single video in your post.
          </div>
        <div className="flex flex-row items-center">
          <input type='file' id="actual-btn"  className="flex-1" onChange={handleUploadImage}  hidden/>
          <label htmlFor="actual-btn" className="bg-blue-700 py-2 px-5 text-white font-semibold text-sm rounded-full">Upload From System</label>
         </div>
          </>
          )}

         {imageUploadProgress && (
            <div className="w-16 h-16">
               <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
            </div>         
          )}

        </div>

        </Modal.Body>
        {imageUploadError && (
          <Alert color='failure'>{imageUploadError}</Alert>
         )}
        {publishError && (
        <Alert color='failure' className="mt-5">
          {publishError}
        </Alert>
       )}
        <Modal.Footer className="flex flex-row justify-end items-center">
          <Button size="sm" color="blue" 
          >
          Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    
  )
}
