import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function DashProfile() {
  
  

  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUpoadProgress, setImageFileUpoadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUpoadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  //   console.log(imageFileUpoadProgress, imageFileUploadError)
const dispatch = useDispatch();
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
    setImageFileUploading(true);
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
        setImageFileUploading(false);
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileUrl(downloadURL);
            setFormData({...formData, profilePicture: downloadURL});
            setImageFileUploading(false);
          })
    }

)
  }

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No change made');
    return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return;
    }

    try{
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's Profile updated successfully")
      }
    }catch(error){
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }

  // console.log(formData)
  // console.log(imageFile, imageFileUrl)

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      
       <TextInput type="text" id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />

       <TextInput type="email" id='email' placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />

       <TextInput type="password" id='password' placeholder="password" onChange={handleChange} />
        
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
     
      </form>
      <div className="text-red-500 flex justify-between mt-2">
           <span className="cursor-pointer">Delete Account</span> 
           <span className="cursor-pointer">Sign-Out</span>
        </div>

        {updateUserSuccess && (
          <Alert color='success' className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}

        {updateUserError && (
              <Alert color='failure' className="mt-5">
              {updateUserError}
            </Alert>
        )}
    </div>
  )
}
