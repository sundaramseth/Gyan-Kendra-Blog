import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

const navigate = useNavigate();

const [formData, setFormData] = useState({});
const [errorMessage, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(false);

const handleChange = (e) =>{
  setFormData({...formData,[e.target.id]: e.target.value.trim()});
// console.log(e.target.value);
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  if(!formData.username || !formData.email || !formData.password){
    return setErrorMessage('Please fill out all fields.')
  }
  try{
  setLoading(true);
  setErrorMessage(null); 
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(formData),
   });
  const data = await res.json();
  if(data.success === false){
    setLoading(false);
    return setErrorMessage(data.message);
  }
  setLoading(false);
  if(res.ok){
    navigate('/signin')
  }
  }
  catch(error){
   setErrorMessage(error.message);
   setLoading(false);
  }
}

// console.log(formData)

  return (
    <div className="mt-20">
      
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
          <Label value='Your Username' />
          <TextInput 
          type='text'
          placeholder='Username'
          id='username'
           onChange={handleChange}
          />
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

        ) : 'Sign Up'
        }
        </Button>
        </form>
        <div className='flex gap-2 text-sm mt-2'>
          <span>Have an account?</span>
          <Link to='/signin' className='text-blue-600 font-semibold'>
          Sign In
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
