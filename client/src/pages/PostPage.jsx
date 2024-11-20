import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

import RecentPostCard from "../components/RecentPostCard";
import { FaDotCircle } from "react-icons/fa";
import Ads from "../components/Ads";

export default function PostPage() {

    const {postSlug} = useParams();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post,setPost] = useState(null);

    const [recentPost, setRecentPost] = useState(null);
    
    console.log(error)

    useEffect(()=>{
        const fetchPost = async ()=>{
            try {
                setLoading(false);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }

                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }

            } catch (error) {
                setError(true);
                setLoading(false);
                console.log(error);
            }
        }
        fetchPost();

        

    },[postSlug]);

    useEffect(() => {
        try {
          const fetchRecentPosts = async () => {
            const res = await fetch(`/api/post/getposts?limit=5`);
            const data = await res.json();
            if (res.ok) {
              setRecentPost(data.posts);
            }
          };
          fetchRecentPosts();
        } catch (error) {
          console.log(error.message);
        }
      }, []);
    
  if (loading) return (
   <div className="flex justify-center items-center min-h-screen">
    <Spinner size='xl' />
    </div>
  ) 
  return (
    <main className="flex flex-row w-full mx-auto min-h-screen p-3 justify-center gap-3">

{/* Left Section */}
     <div className="flex flex-col w-3/5">


      <div className="flex flex-col bg-white rounded-lg border w-full" >
      <h1 className="text-center font-semibold text-3xl mt-10 p-3 max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
    
    <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
    <Button color='gray' pill size='xs'>{post && post.category}</Button>
    </Link>

    <img src={post && post.postImage} alt={post && post.slug} className="max-h-[500px] w-full object-cover mt-10 p-3 rounded-3xl" />
    
    <div className="flex flex-row justify-between p-5 border-b mx-auto w-full">
        <span className="text-sm text-gray-600 font-semibold">
         Posted On -  {post && new Date(post.createdOn).toLocaleDateString()}
        </span>

        <span className="text-sm text-gray-600 font-semibold italic">
          Reading Time -  {post && (post.content.length / 1000).toFixed(0)} min read
        </span>

    </div>

    <div className="py-5 px-10 mx-auto w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}}>
    </div>

  

    <CommentSection postId={post && post._id}  />

      </div>

  


      </div>


    {/* Right Section  */}
    <div className="flex flex-col w-auto">

    <div className="flex flex-col sticky top-2">

    <div className="flex flex-col w-60 bg-white rounded-lg border ">
    <div className="flex flex-col w-full">
      
      <div className="p-2">
      <h1 className="text-md font-semibold text-gray-800 pt-px">Recent Blog Post</h1>
      </div> 

      {/* Divider */}
      <div className="flex flex-row w-full px-2">
        <div className="h-px bg-gray-300 w-full">
        </div>
      </div>

      <div className="pb-2 pr-2">
      {recentPost &&
        recentPost.map((post) =>(
        <div key={post._id} className="mt-2 mb-1 ml-2 flex flex-col gap-1">
         <Link to={`/post/${post.slug}`}>
        <p className="text-sm text-gray-800 font-semibold"> {post.title}</p></Link>
        <p className="text-xs text-gray-500 flex flex-row gap-1 items-center">{new Date(post.createdOn).toLocaleDateString()} <FaDotCircle size={8}/> {post.numberOfLikes} likes</p>
        </div>
  
       ))
      }

      </div>

  

     </div>
     </div>

     <Ads/>

     </div>





    </div>

    </main>
  )
}
