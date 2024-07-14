import {Button, Label, TextInput} from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function SignUp() {
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
       <form className='flex flex-col gap-4'>
        <div className="">
          <Label value='Your Username' />
          <TextInput 
          type='text'
          placeholder='Username'
          id='username'
          />
          <Label value='Your Email Adress' />
          <TextInput 
          type='text'
          placeholder='name@company.com'
          id='email'
          />
          <Label value='New Password' />
          <TextInput 
          type='text'
          placeholder='Password'
          id='password'
          />
        </div>

        <Button gradientDuoTone='purpleToBlue' type='submit'>
        Sign Up
        </Button>
        </form>
        <div className='flex gap-2 text-sm mt-2'>
          <span>Have an account?</span>
          <Link to='/signin' className='text-blue-600 font-semibold'>
          Sign In
          </Link>
        </div>
      </div>
      </div>

    </div>
  )
}
