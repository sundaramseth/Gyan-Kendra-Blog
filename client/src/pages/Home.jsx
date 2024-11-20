import { Link,  useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import StartPost from "../components/StartPost";
import PostComponent from "../components/PostComponent";
import { AiFillCaretDown, AiFillLike } from "react-icons/ai";
import HomePageMain from "../components/HomePageMain";
import { FaBookmark } from "react-icons/fa";
import HomeRightSection from "../components/HomeRightSection";
export default function Home() {

  const {currentUser} = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(true);


  const handleChange = (event) => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/userpost/getPosts?limit=5`);
        const data = await res.json();
       if(event.target.value == "Top"){
        setPosts( data.posts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)));
       }else{
        setPosts( data.posts.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn)));
       }
       if(data.posts.length < 5){
        setShowMore(false);
      }

  }
  fetchPosts();
} catch (error) {
    console.log(error.message);
  }

  };



  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/userpost/getPosts?limit=5`);
        const data = await res.json();
        // Sort by createdAt in descending order (newest first)
      

        setPosts( data.posts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)));
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
      const res = await fetch(`/api/userpost/getPosts?startIndex=${startIndex}`); 
      const data = await res.json();
      if(res.ok){
        setPosts((prev)=>[...prev, ...data.posts]);
        if(data.posts.length <5){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handlePostLikes = async (postId) =>{
    try {
      if(!currentUser){
        navigate('/signin');
        return;
      }

      const res = await fetch(`/api/userpost/likepost/${postId}` , {
        method:'PUT',
      });

      if(res.ok){
        const data = await res.json();
        console.log(data)
        setPosts(
          posts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: data.likes,
                  numberOfLikes: data.numberOfLikes,
                }
              : post
          )
        );
      }

    } catch (error) {
      console.log(error.message);
    }

    }



  return (
    <>
    {!currentUser && (

        <HomePageMain/>
  )}

{/* main section */}
{currentUser && (
  <div className="flex flex-col md:flex-row w-full justify-center px-3 gap-5">

    {/* Left Section */}
    <div className="w-auto justify-center ">
    <div className="flex flex-col w-52 bg-white mt-6 rounded-lg border">
      {/* Profile Section */}
     <div className="flex flex-col w-full rounded-lg ">
      <div className="flex flex-col">
      <img 
      className="w-full max-h-24 rounded-tr-lg rounded-tl-lg" 
        alt='background'
        src="https://t4.ftcdn.net/jpg/05/49/86/39/360_F_549863991_6yPKI08MG7JiZX83tMHlhDtd6XLFAMce.jpg"
        />
      <Link to='/dashboard?tab=profile'>
      <img 
    className="border rounded-full w-14 relative bottom-6 left-3"
      alt='user'
      src={currentUser?.profilePicture}
      /></Link>
      </div>

      <div className="pl-2">
      <h1 className="text-lg font-semibold">{currentUser.username}</h1>
      <p className="text-sm text-gray-800 pt-px">{currentUser.about}</p>
      <p className="text-gray-500 text-xs pt-px pb-2">
      {currentUser.location}
      </p>
      </div>

     </div>
    </div>

        {/* Post Impression  */}
    <div className="w-auto justify-center ">
    <div className="flex flex-col w-52 bg-white mt-2 rounded-lg border">
        <div className="flex flex-col w-full">
      <div className="p-4">
      <p className="text-xs text-gray-800 font-bold pt-px">Profile Viwers <span className="text-xs font-semibold">200</span></p>
      <p className="text-xs text-gray-800 font-bold pt-2">
      Post Impression <span className="text-xs font-semibold">500</span>
      </p>
      </div>

      <div className="flex flex-row w-full px-2">
        <div className="h-px bg-gray-300 w-full">
        </div>
      </div>

      <div className="mt-4 ml-4 flex flex-row gap-1 items-center">
      <FaBookmark/>
      <p className="text-xs text-gray-800 font-semibold"> Saved Post</p>
      </div>
      <div className="my-4 ml-4 flex flex-row gap-1 items-center">
        <AiFillLike/>
      <p className="text-gray-800 text-xs font-semibold">
      Liked Post
      </p>
      </div>

     </div>
     </div>
     </div>
    </div>


    {/* Mid Section  */}
    <div className="flex flex-col justify-center items-center mt-5">
      {/* First Section - Start Post */}
      <div className="flex flex-row w-full justify-center">
      <StartPost/>
      </div>

        {/* Divider - Filter Post */}
      <div className="flex flex-row w-34rem justify-center items-center my-3">

        <div className="flex flex-row text-xs w-32 items-center justify-center">
        <span className="text-xs">Short By: <select className="mydrop" onChange={handleChange}>
        <option value="Top">Top</option>
        <option value="Latest">Latest</option>
       </select>
       </span>
       <span className="pt-px">
       <AiFillCaretDown size={12} />
       </span>
        </div>
        
        <div className="h-px w-full bg-gray-400">
        </div>
      </div>

      {/* Second Section - live post */}
      <div className="flex flex-col  w-34rem ">

      {posts && posts.length > 0 && (
        <>
         {posts.map((post) => (
                <PostComponent key={post._id} post={post} onLike={handlePostLikes} />
              ))}
            </>
  
        )}
     </div>
     {showMore && (
              <button onClick={handleShowMoreForPost} className="w-full text-teal-500 self-center text-sm pb-2">
              Show more
              </button>
            )}
    </div>


    {/* Right Section  */}
    <HomeRightSection/>
  </div>
)}
  </>

)}
