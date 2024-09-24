import { Button } from "flowbite-react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();


const handleGoogleClick = async () =>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'})

    try{
        const resultFromGoogle = await signInWithPopup(auth, provider)
        const res = await fetch('/api/auth/google',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                name:resultFromGoogle.user.displayName,
                email:resultFromGoogle.user.email,
                googlePhotoUrl:resultFromGoogle.user.photoURL
            }),
        })
        const data = await res.json();
        if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/');
        }

        console.log(resultFromGoogle)    
    
    }catch(error){
     console.log(error);
    }
}

  return (
   <Button type="button" outline pill color='gray' onClick={handleGoogleClick}>
    <FcGoogle className="w-6 h-6 mr-2"/>
    <span className="pt-1 rescolor">Continue with Google</span>
    </Button>
    
)
}
