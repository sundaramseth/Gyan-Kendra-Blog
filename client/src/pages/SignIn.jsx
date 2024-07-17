import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {

const navigate = useNavigate();
const dispatch = useDispatch();


const [formData, setFormData] = useState({});

const {loading, error: errorMessage} = useSelector(state => state.user);

const handleChange = (e) =>{
  setFormData({...formData,[e.target.id]: e.target.value.trim()});
// console.log(e.target.value);
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  if(!formData.email || !formData.password){
    return dispatch(signInFailure('Please fill all the fields'));
  }
  try{
   dispatch(signInStart());
  const res = await fetch('/api/auth/signin', {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(formData),
   });
  const data = await res.json();
  if(data.success === false){
    dispatch(signInFailure(data.message))
  }
  if(res.ok){
    dispatch(signInSuccess(data));
    navigate('/')
  }
  }
  catch(error){
   dispatch(signInFailure(error.message));
  }
}

// console.log(formData)

  return (
    <div className="mt-20 min-h-screen">
      
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/*left*/}
      <div className="text-left flex-1">
        <p className="text-3xl font-semibold">Welcome to the Adhyatma</p>
        <p className="text-sm my-3">This is a blogging site for Adhaytma</p>
      </div>

        {/*Right*/}
      <div className="flex-1">
       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="">
          <Label value='Your Email Adress' />
          <TextInput 
          type='email'
          placeholder='name@company.com'
          id='email'
          onChange={handleChange}
          />
          <Label value='New Password' />
          <TextInput 
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
          />
        </div>

        <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
        {
        loading? (
          <>
          <Spinner size='sm' />
          <span className='pl-3'>Loading...</span>
          </>

        ) : 'Sign In'
        }
        </Button>
        <OAuth/>
        </form>
        <div className='flex gap-2 text-sm mt-2'>
          <span>Dont Have an account?</span>
          <Link to='/signup' className='text-blue-600 font-semibold'>
          Sign Up
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
      </div>
      </div>

    </div>
  )
}
