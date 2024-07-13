
import { Button, Navbar, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { AiOutlineSearch, AiOutlineMoon } from "react-icons/ai";

export default function Header() {

  const path = useLocation().pathname;

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
        <div className="sm:hidden">
        <Button
        className="w-12 h-9"
        color='gray'
        pill
        ><AiOutlineSearch />
        </Button>
        </div>
        <div className="flex gap-2 md:order-2">
         <Button className="w-12 h-9" 
         color="gray"
         pill
         >
          <AiOutlineMoon />
         </Button>
         <Link to='/signin' 
         className="">
          <Button
          gradientDuoTone='purpleToBlue'
          outline
          >
          Sign In
          </Button>
        </Link>
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


