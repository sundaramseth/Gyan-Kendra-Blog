import { Button } from "flowbite-react";
import { Link,  useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import OAuth from "../components/OAuth";
import StartPost from "../components/StartPost";
import PostComponent from "../components/PostComponent";
import { AiFillCaretDown } from "react-icons/ai";
import { Dropdown } from "flowbite-react";

export default function Home() {

  const {currentUser} = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState('Top');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  console.log(currentUser)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getPosts?sort='asc'`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const filterPost = () =>{

    // alert()
   
    // posts.filter(post => post.category = "JavaScript");
  }
  

  
  const handlePostLikes = async (postId) =>{
    try {
      if(!currentUser){
        navigate('/signin');
        return;
      }

      const res = await fetch(`/api/post/likepost/${postId}` , {
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

    <div className="flex flex-col w-full bgback">
      {/* home top section */}
    <div className="flex flex-col-reverse md:flex-row w-full justify-evenly py-20">
    <div className="flex flex-col justify-center md:mx-0 mx-5">
      <h1 className="text-5xl font-bold line-2x">Global Gyan,<br/> Stories & Ideas</h1>
      <p className="text-xl my-8">A Place to share your ideas, stories and facts.</p>
      <OAuth/>
      <Link to='/signin' className="pt-5">
        <Button
        className="rescolor"
        pill
        outline
        color="gray"
        fullSized="w-full" 

        >
        Start With Email
        </Button>
        </Link>
  
  
        
  
    </div>

    <div className="flex flex-col justify-center items-center">
      <img src="https://firebasestorage.googleapis.com/v0/b/adhyatma-ce6a3.appspot.com/o/1726908550223_Group%202.png?alt=media&token=5520e07d-5466-489b-ad0b-9e5386e298c0"
      width='550'
      />
    </div>
    </div>
  



    {/* Post Section */}

    <div className="flex md:flex-row flex-col w-full justify-evenly bg-stone-100 py-6">

      <div className="flex flex-col justify-center items-start text-left pl-5 mt-5 md:mt-0">
      <h1 className="text-3xl font-semibold">Explore collaborative articles</h1>
      <p>Read us out latest content with our expert collaborators.</p>
      </div>
      <div className="flex flex-row flex-wrap justify-start gap-2 pl-5 my-5 w-full md:w-1/3">
      {posts.map((post) => (
        <>
            <Button
            size='sm'
            outline
            color="gray"
            pill>
              {post.category}
            </Button>
            </>
      ))}

<Link to='/post' className="">
         <Button
        pill
        color="blue" 
        size="sm"
        >
        Show All
        </Button>
        </Link>

      </div>
 
    </div>
    </div>

  )}

{/* main section */}
{currentUser && (
  <div className="flex flex-col md:flex-row w-full justify-center px-3 gap-5">

    
    <div className="w-auto">
    Hot Section
    </div>

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
       <span>
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
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
            </>
  
        )}
     </div>
    </div>

    <div className="w-auto">
    Hot Section
    </div>

  </div>
)}
  </>

)}
