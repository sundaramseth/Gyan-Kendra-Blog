import { Sidebar } from "flowbite-react";
import {HiUser} from 'react-icons/hi'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { PiSignOutFill } from "react-icons/pi";

export default function DashSideBar() {

    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
    }, [location.search])

  return (
   <Sidebar className="w-full md:w-56">
    <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
                Profile
             </Sidebar.Item>
             </Link>

             <Link to='/dashboard?tab=profile'>
             <Sidebar.Item icon={PiSignOutFill} >
          Sign Out
             </Sidebar.Item>
             </Link>


        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}
