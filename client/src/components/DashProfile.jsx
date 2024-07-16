import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUpoadProgress, setImageFileUpoadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUpoadError] = useState(null);
  
//   console.log(imageFileUpoadProgress, imageFileUploadError)
  
  const handleImageChange = (e)  =>{

    const file = e.target.files[0];

    if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(()=>{
    if(imageFile){
        uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async ()=>{
    
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,imageFile)
   
    uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setImageFileUpoadProgress(progress.toFixed(0));
    },() =>
    {
        setImageFileUpoadError('Could not upload image (File must be less than 2MB)');
        setImageFileUpoadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileUrl(downloadURL);
        })
    }

)
  }

  console.log(imageFile, imageFileUrl)

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-xl">Profile</h1>
      <form className="flex flex-col gap-4">
      <input type="file" accept="image/*" onChange={handleImageChange} hidden ref={filePickerRef} />
      
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" 
        onClick={()=> filePickerRef.current.click()}
        >
            {imageFileUpoadProgress && (
                 <CircularProgressbar value={imageFileUpoadProgress || 0} 
                 text={`${imageFileUpoadProgress}%`}
                strokeWidth={5}
                styles={{
                    root:{
                        width:'100%',
                        height:'100%',
                        position:'absolute',
                        top:0,
                        left:0
                    },
                    path:{
                        stroke:`rgba(62,152,199, ${imageFileUpoadProgress/100})`
                    }
                }}
              />
            )}
      
        <img src={imageFileUrl || currentUser.profilePicture} alt="user"
         className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUpoadProgress && imageFileUpoadProgress < 100 && 'opacity-50'}`} />
        </div>
        {imageFileUploadError && <Alert color='failure'>
          {imageFileUploadError}
          </Alert> }
      
       <TextInput type="text" id='username' placeholder='username' defaultValue={currentUser.username} />

       <TextInput type="email" id='email' placeholder="email" defaultValue={currentUser.email} />

       <TextInput type="password" id='password' placeholder="password" />
        
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
        <div className="text-red-500 flex justify-between mt-2">
           <span className="cursor-pointer">Delete Account</span> 
           <span className="cursor-pointer">Sign-Out</span>
        </div>
      </form>
    </div>
  )
}
