import { Sidebar } from "flowbite-react";
import {HiDocumentText, HiUser} from 'react-icons/hi'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { PiSignOutFill } from "react-icons/pi";
import { signOutUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux"
export default function DashSideBar() {

  const {currentUser} = useSelector(state => state.user);
  const dispatch= useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
    }, [location.search])

    const handleSignOut = async () =>{
      try{
        const res = await fetch('/api/user/signout',{
          method:'POST',
        });
  
        const data = await res.json();
  
        if(!res.ok){
          console.log(data.message)
        }else{
            dispatch(signOutUser());
        }
      }catch(error){
        console.log(error);
      }
    }

  return (
   <Sidebar className="w-full md:w-56">
    <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin? 'Admin':'User'} labelColor='dark' as='div'>
                Profile
             </Sidebar.Item>
             </Link>

             {currentUser.isAdmin && (
             <Link to='/dashboard?tab=posts'>
             <Sidebar.Item  active={tab === 'posts'} icon={HiDocumentText} as='div'>
                Posts
             </Sidebar.Item>
             </Link>
             )}

             <Sidebar.Item  onClick={handleSignOut} icon={PiSignOutFill} className='cursor-pointer'>
              Sign Out
             </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}
