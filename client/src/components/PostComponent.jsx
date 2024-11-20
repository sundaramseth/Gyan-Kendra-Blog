

import { useEffect, useState, useRef  } from "react";
import {FaThumbsUp} from 'react-icons/fa';
import { MdInsertComment,MdShare  } from "react-icons/md";
import { useSelector } from "react-redux";
import PostCommentSection from "../components/PostCommentSection";
import { Link } from "react-router-dom";

export default function PostComponent({post, onLike}) {

  const [user,setUser] = useState({});
  const [comments,setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const {currentUser} = useSelector((state)=>state.user);
  const [openComment, setOpenComment] = useState(false);
  const ref = useRef(null)


  useEffect(()=>{
    const getUser = async () =>{
      try {
        
     
      const res = await fetch(`/api/user/${post.userId}`);
      const data = await res.json();
      if(res.ok){
        setUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }

    }
    getUser();
  },[post]);

  useEffect(()=>{
      
    const getComments = async () =>{
      try {
        const res = await fetch(`/api/comment/getPostComments/${post._id}`);
        if(res.ok){
          const data = await res.json();
          setComments(data);
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    getComments();

  },[post._id]);



  


  const openContent = () =>{

    setShowMore(false);

  }

  const handleOpenComment = ()=>{
    if(openComment){
      setOpenComment(false);
    }else{
      setOpenComment(true);
    }

  }

  

  return (


    <div className="flex flex-col py-5 px-5 my-1 w-34rem border rounded-xl bg-white">

      
        <div className="flex flex-row gap-4">
        <Link to={`/UserProfile?user=${user._id}`}>
          <img 
          className="border rounded-full w-12"
            alt='user'
            src={user.profilePicture}
            />
            </Link>
            <div className="flex flex-col">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs" > {new Date(post.createdOn).toLocaleDateString()}</p>
                <p  className="text-xs">{post.category}</p>
            </div>
           
        </div>
        
        {/* Divider */}
        <div className="flex flex-row my-3">
        <div className="h-px w-full bg-gray-300">
        </div>
      </div>

        <div className="flex flex-col">
        <h1 className="mt-1 mb-5 text-md font-semibold">{post.title}</h1>
                 
        <div  ref={ref} className={`mt-5 ${showMore ? 'overflow-hidden text-ellipsis max-h-150':'overflow-hidden text-wrap max-h-max'}`}  dangerouslySetInnerHTML={{__html:post && post.content}}>
        </div>
        {showMore && post.content.length >= 20000  && (
         <button className="text-sm text-blue-500" onClick={openContent}>show more</button>
        )}

        </div>
      {/* Like comment section */}

      <div className="flex flex-col mt-2">

        <div className="flex flex-row justify-between text-xs">

          <div className="flex flex-row gap-1">
          {
            post.numberOfLikes > 0 && 
          <FaThumbsUp className={`text-sm pt-1 text-blue-500`} />
          }
        <p>
          {
            post.numberOfLikes > 0 && post.numberOfLikes + " " + (post.numberOfLikes === 1 ? "like" : "likes")
          }
        </p>

          </div>

          <div className="text-xs flex flex-row items-center gap-1">
          {comments.length === 0 ? 
          (
        <p className='text-sm'>No comments yet!</p>
          )
          :
          (
        <>
        
          <p>{comments.length}</p>
          <p>Comments</p>
         
    
        </>)}
          </div>

        </div>

      {/* Divider */}
      <div className="flex flex-row my-3">
        <div className="h-px w-full bg-gray-300">
        </div>
      </div>
        
        <div className="flex flex-row justify-between">

          <div className="flex flex-row gap-2 items-center cursor-pointer"  onClick={() => onLike(post._id)}>
          <button
                type='button'
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  post?.likes?.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
          <FaThumbsUp className="text-md"/>
        </button>
        <span className="font-sans text-sm font-semibold">Like</span>
          </div>

          <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={handleOpenComment}>
          <button
                type='button'
                
                className={`text-gray-400 hover:text-blue-500`}
              >
          <MdInsertComment className="text-md"/>
        </button>
         <span className="font-sans text-sm font-semibold">Comment</span>
          </div>

          <div className="flex flex-row gap-2 items-center cursor-pointer">
          <button
                type='button'
                // onClick={() => onLike(post._id)}
                className={`text-gray-400 hover:text-blue-500`}
              >
          <MdShare className="text-md"/>
        </button>
        <span className="font-sans text-sm font-semibold">Share</span>
          </div>

        </div>

        {openComment && (
              <PostCommentSection postId={post && post._id}  />
        )}

      </div>

</div>
  )
}
