import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from "react-router-dom";

export default function CreatePost() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const handleUploadImage = async () =>{
    try {
      if(!file){
        setImageUploadError('Please select an image')
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
         setFormData({...formData, postImage:downloadURL});
        })
      }
     )


    } catch (error) {
      setImageUploadError('Image Upload Failed');
      setImageUploadProgress(null);
      console.log(error);
    }

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create',{
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
       navigate(`/post/${data.slug}`);
      }

    } catch (error) {
      setPublishError('Something went wrong');
    }

  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
     <h1 className="text-center text-3xl my-7 font-semibold">Crate a Post</h1> 
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
        placeholder="Enter Blog Title"
        type="text"
        required
        id='title'
        className="flex-1"
        onChange={(e)=>setFormData({...formData, title:e.target.value})}
        />
        <Select onChange={(e)=>setFormData({...formData, category:e.target.value})}>
            <option value="uncategorized">Select a category</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Programing">Programing</option>
            <option value="Stocks">Stocks</option>
            <option value="LifeStyle">LifeStyle</option>
        </Select>
        </div>
        

        {formData.postImage && (
          <img src={formData.postImage}
          alt="upload"
          className="w-full h-72 object-cover border-2"
          />
         )}
         
        <div className="flex gap-4 items-center justify-between 
        border-4 border-teal-500 border-dotted p-3">
           <FileInput type='file' accept="images/*" className="flex-1" onChange={(e)=>setFile(e.target.files[0])} />
         <Button type="button" gradientDuoTone='purpleToBlue' size='sm' outline
         onClick={handleUploadImage}
         disabled={imageUploadProgress}
         >
          {imageUploadProgress ? (
            <div className="w-16 h-16">
               <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
            </div>         
          ):(
            'Upload Image'
          )}
         </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>{imageUploadError}</Alert>
         )}

    
         <ReactQuill theme="snow" placeholder="Write something..." className="h-80 my-4" required
          onChange={(value)=>  {
            setFormData({...formData, content:value});
          }}
         />
       
       <Button type="submit" gradientDuoTone='purpleToPink' className="mt-8">
       Publish Post
       </Button>
       {publishError && (
        <Alert color='failure' className="mt-5">
          {publishError}
        </Alert>
       )

       }
      </form>
    </div>
  );
}
