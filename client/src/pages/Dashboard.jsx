import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import DashSideBar from "../components/DashSideBar.jsx";
import DashProfile from "../components/DashProfile.jsx"
import DashPosts from "../components/DashPosts.jsx";
import DashUsers from "../components/DashUsers.jsx";
import DashComments from "../components/DashComments.jsx";
import DashboardComp from "../components/DashboardComp.jsx";

export default function Dashboard() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
   
      <div className="mg:w-56">
          <DashSideBar />
      </div>

      {/* Profile */}
      {tab === 'profile' && <DashProfile/>} 

       {/* Posts */}
       {tab === 'posts' && <DashPosts/>}

       {/* Users */}
       {tab === 'users' && <DashUsers/>}

      {/* Comments */}
      {tab === 'comments' && <DashComments/>}

      {/* Dashboard */}
      {tab === 'dash' && <DashboardComp/>}

    </div>
  )
}
