
import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import {  FaDotCircle } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";
export default function HomeRightSection() {

    const [showMore, setShowMore] = useState(true);
    
    const [showMoreUser, setShowMoreUser] = useState(true);
    const [users, setAllUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    console.log(users)
    
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getPosts?limit=5`);
        const data = await res.json();
        setPosts(data.posts);
        if(data.posts.length < 5){
          setShowMore(false);
        }
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleShowMoreForPost =  async () =>{
    const startIndex = posts.length;
    try {
      const res = await fetch(`/api/post/getPosts?startIndex=${startIndex}`); 
      const data = await res.json();
      if(res.ok){
        setPosts((prev)=>[...prev, ...data.posts]);
        if(data.posts.length <5){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    const fetchPost = async () =>{
        try {
            const res = await fetch(`/api/user/getusers?limit=5`);
            const data = await res.json();
            if(res.ok){
              setAllUsers(data.users);
                if(data.users.length <5){
                  setShowMoreUser(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
     fetchPost(); 

  },[]);

  const handleShowMore =  async () =>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`); 
      const data = await res.json();
      if(res.ok){
        setAllUsers((prev)=>[...prev, ...data.users]);
        if(data.users.length <5){
          setShowMoreUser(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-auto">
    <div className="w-full justify-center mt-5">
    <div className="flex flex-col w-60 bg-white mt-2 rounded-lg border">
    <div className="flex flex-col w-full">
      
      <div className="p-2">
      <h1 className="text-md font-semibold text-gray-800 pt-px">Top Blogs Post</h1>
      </div> 

      {/* Divider */}
      <div className="flex flex-row w-full px-2">
        <div className="h-px bg-gray-300 w-full">
        </div>
      </div>

      <div className="pb-2 pr-2">

      {
       posts.map((post)=>(
        <div key={post._id} className="my-3 ml-2 flex flex-col gap-1">
         <Link to={`/post/${post.slug}`}>
        <p className="text-sm text-gray-800 font-semibold"> {post.title}</p></Link>
        <p className="text-xs text-gray-500 flex flex-row gap-1 items-center">{new Date(post.createdOn).toLocaleDateString()} <FaDotCircle size={8}/> {post.numberOfLikes} likes</p>
        </div>
  
       ))
      }
      </div>

      {showMore && (
              <button onClick={handleShowMoreForPost} className="w-full text-teal-500 self-center text-sm pb-2">
              Show more
              </button>
            )}
     </div>
     </div>

     </div>

     <div className="w-full justify-center my-5 sticky top-3">

     <div className="flex flex-col w-60 bg-white mt-2 rounded-lg border">
    <div className="flex flex-col w-full">
      
      <div className="p-2">
      <h1 className="text-md font-semibold text-gray-800 pt-px">Follow Authors</h1>
      </div> 

      {/* Divider */}
      <div className="flex flex-row w-full px-2">
        <div className="h-px bg-gray-300 w-full">
        </div>
      </div>

      <div className="pb-2 pr-2">
      {
       users.map((user)=>(
        <div key={user._id} className="py-3 ml-2 flex flex-row gap-1 border-b border-b-gray-100">
          <div className="flex flex-row w-full justify-between items-center text-left">
          
          <div className="w-auto">
           <img src={user.profilePicture}  className="w-10"/>
          </div>

          <div className="w-3/5">
          <p className="text-sm text-left text-gray-800 font-semibold"> {user.username} </p>
          </div>

          <div className="w-1/6">
          <LuUserPlus />
          </div>
          
          </div>          

        </div>
  
       ))
      }

      </div>

      
        {showMoreUser && (
        <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-1">
        Show more
        </button>
      )}
     </div>
     </div>
     </div>


    </div>
  )
}
