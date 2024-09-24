import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { FcAddImage } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";
export default function StartPost() {

    
  const {currentUser} = useSelector(state => state.user);

  return (
    <div className="flex flex-col py-5 px-5 w-34rem border rounded-xl bg-white">

        <div className="flex flex-row gap-4">
          <img 
          className="border rounded-full w-12"
            alt='user'
            src={currentUser?.profilePicture}
            />
            <input
            className="w-full rounded-full text-sm font-semibold px-5 border-gray-400"
            type="text"
            placeholder="Start your post!"
            />
        </div>

        <div className="flex flex-row justify-between gap-3 mt-4 w-full flex-wrap md:flex-nowrap">

                <Button 
                color="gray"
                 >
                <FcAddImage size={20} /> <span className="pl-2 text-xs md:text-sm">Post Pictures</span>
                </Button>

      

            <Button 
                color="gray"
             >
                <FcIdea size={20} /> <span className="pl-2 text-xs md:text-sm">Share Experties</span>
                </Button>
 
            <Button 
                color="gray"
              >
                <FcRules size={20} /> <span className="pl-2 text-xs md:text-sm">Write Blog</span>
                </Button>

        </div>
      
    </div>
  )
}
