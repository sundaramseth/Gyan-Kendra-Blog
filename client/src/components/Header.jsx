
import { Avatar, Button, Dropdown, Navbar,  } from "flowbite-react";
import { Link,  } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { AiOutlineSearch, AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {toggleTheme} from '../redux/theme/themeSlice';
import { PiSignOutFill } from "react-icons/pi";
import { signOutUser } from "../redux/user/userSlice";

export default function Header() {

  // const path = useLocation().pathname;
  const dispatch= useDispatch();

  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);


  const handleSignOut = async () =>{
    try{
      const res = await fetch('/api/user/signout',{
        method:'POST',
      });

      const data = await res.json();

      if(!res.ok){
        console.log(data.message)
      }else{
          dispatch(signOutUser());
      }
    }catch(error){
      console.log(error);
    }
  }


  return (
    <Navbar className="border-b-1">
      <div className="flex w-1/4 justify-start items-start gap-2">
       <Link to='/' 
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold">
        Network AI
        </Link>
        

        {currentUser && (
          <>
        <form>
        <TextInput 
        type="text"
        placeholder="Search..."
        rightIcon={AiOutlineSearch}
        className="hidden sm:inline-block"
        />
        </form>

        <div className="sm:hidden">
          <Link to='/search'>
          <Button
        className="w-12 h-9"
        color='gray'
        pill
        ><AiOutlineSearch />
        </Button>
          </Link>

        </div>
        </>
        )}

      </div>
  
        <div className="flex w-auto gap-2 md:order-2">

        {currentUser && (
         <Button className="w-12 h-9" 
         color="gray"
         pill
         onClick={()=>dispatch(toggleTheme())}
         >
          {theme === 'light' ? <AiOutlineSun/>:  <AiOutlineMoon /> }
         </Button>
         )
        }
         {currentUser ? (
          <Dropdown 
          arrowIcon={false}
          inline
          label={
            <Avatar 
            alt='user'
            img={currentUser.profilePicture}
            rounded
            />
          }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
             <Dropdown.Item>
              Profile
             </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
             <Dropdown.Item onClick={handleSignOut}>
              <PiSignOutFill className="font-bold"/><span className="ml-2">Sign Out</span>
             </Dropdown.Item>
          </Dropdown>
          ):(

            <>

      <Link to='/signup' className="">
      <Button
        color='0094FF'
         size="sm"
        >
        Join Now
        </Button>
      </Link>
        <Link to='/signin' className="">
        <Button
        pill
        color="blue" 
        size="sm"
        >
        Sign In
        </Button>
        </Link>
        </>
         )
         }
        
        {/* <NavbarToggle/> */}
        </div>
        {/* <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse> */}
    </Navbar>

  )
}


