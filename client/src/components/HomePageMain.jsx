import { Button } from "flowbite-react";
import { Link} from "react-router-dom";
import OAuth from "../components/OAuth";
import { useEffect, useState } from 'react';

export default function HomePageMain() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/post/getPosts?sort='asc'`);
          const data = await res.json();
          setPosts(data.posts);
        };
        fetchPosts();
      }, []);

  return (
    <div className="flex flex-col w-full bg-white">
    {/* home top section */}
    <div className="flex flex-col-reverse md:flex-row w-full justify-evenly py-20">
    <div className="flex flex-col justify-center md:mx-0 mx-5">
    <h1 className="text-5xl font-bold line-2x">Network AI,<br/>Connect, Create & Explore</h1>
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
  )
}

