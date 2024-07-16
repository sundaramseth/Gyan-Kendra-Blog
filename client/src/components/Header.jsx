
import { Avatar, Button, Dropdown, Navbar, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { AiOutlineSearch, AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {toggleTheme} from '../redux/theme/themeSlice';

export default function Header() {

  const path = useLocation().pathname;
  const dispatch= useDispatch();

  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);

  return (
    <Navbar className="border-b-1">
        <Link to='/' 
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold">
        Adhyatma
        </Link>
        
        <form>
        <TextInput 
        type="text"
        placeholder="Search..."
        rightIcon={AiOutlineSearch}
        className="hidden sm:inline-block"
        />
        </form>

        <div className="flex gap-2 md:order-2">

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
        
         <Button className="w-12 h-9" 
         color="gray"
         pill
         onClick={()=>dispatch(toggleTheme())}
         >
          {theme === 'light' ? <AiOutlineSun/>:  <AiOutlineMoon /> }
         </Button>
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
             <Dropdown.Item>
              Sign Out
             </Dropdown.Item>
          </Dropdown>
          ):(
        <Link to='/signin' className="">
        <Button
        gradientDuoTone='purpleToBlue'
        outline
        >
        Sign In
        </Button>
        </Link>
         
         )
         }
        
        <NavbarToggle/>
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>

  )
}


