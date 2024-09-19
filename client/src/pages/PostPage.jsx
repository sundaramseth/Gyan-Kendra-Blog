import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

import RecentPostCard from "../components/RecentPostCard";

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
            const res = await fetch(`/api/post/getposts?limit=3`);
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
    <main className="flex flex-col max-w-6xl mx-auto min-h-screen p-3">
    
    <h1 className="text-center font-semibold text-3xl mt-10 p-3 max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
    
    <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
    <Button color='gray' pill size='xs'>{post && post.category}</Button>
    </Link>

    <img src={post && post.postImage} alt={post && post.slug} className="max-h-[500px] w-full object-cover mt-10 p-3" />
    
    <div className="flex flex-row justify-between p-3 border-b mx-auto w-full max-w-2xl">
        <span className="text-sm text-gray-600 font-semibold">
            {post && new Date(post.createdOn).toLocaleDateString()}
        </span>

        <span className="text-sm text-gray-600 font-semibold italic">
            {post && (post.content.length / 1000).toFixed(0)} min read
        </span>

    </div>

    <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}}>
    </div>

    <div className="max-w-4xl mx-auto w-full">
        <CallToAction/>
    </div>

    <CommentSection postId={post && post._id}  />

    <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className="text-3xl mt-6">Recent Post</h1>

    <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPost &&
            recentPost.map((post) => <RecentPostCard key={post._id} post={post} />)}
        </div>

        </div>

    </main>
  )
}
