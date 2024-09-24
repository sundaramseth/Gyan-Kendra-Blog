
import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className="">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 w-full justify-between sm:flex">
       
        <div className="mt-5">
       <Link to='/' 
        className="self-center whitespace-nowrap sm:text-xl font-semibold">
        Global Gyan
        </Link>
       </div>
      

        <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
        <div className="">
        <Footer.Title title="About" />
         <Footer.LinkGroup col>
         <Footer.Link
         href='/about'
         target="_blank"
         rel='noopener noreferrer'
         >
            100 Js Project
         </Footer.Link>

         <Footer.Link
         href='/about'
         target="_blank"
         rel='noopener noreferrer'
         >
           Project
         </Footer.Link>
         </Footer.LinkGroup>
        </div>


        <div className="">
        <Footer.Title title="Follow Us" />
         <Footer.LinkGroup col>
         <Footer.Link
         href='/about'
         target="_blank"
         rel='noopener noreferrer'
         >
           GutHub
         </Footer.Link>

         <Footer.Link
         href='/about'
         target="_blank"
         rel='noopener noreferrer'
         >
           Linkedin
         </Footer.Link>
         </Footer.LinkGroup>
        </div>

        <div className="">
        <Footer.Title title="Legal" />
         <Footer.LinkGroup col>
         <Footer.Link
         href='/about'
         target="_blank"
         rel='noopener noreferrer'
         >
           Privacy Policy
         </Footer.Link>

         <Footer.Link
         href='/about'
         target="_blank"
         rel='noopener noreferrer'
         >
           Term Of Services
         </Footer.Link>
         </Footer.LinkGroup>
        </div>
        </div>

        </div>
        <Footer.Divider />
       <div className="w-full sm:flex sm:items-center sm:justify-between ">
        <Footer.Copyright href='#' by='Global Gyan' year={new Date().getFullYear()} />
       <div className="flex gap-6 sm:mt-0 sm:justify-center mt-4">
        <Footer.Icon href="#" icon={FaFacebook} />
        <Footer.Icon href="#" icon={FaLinkedin} />
        <Footer.Icon href="#" icon={FaTwitter} />
       </div>
       </div>
      </div>
    </Footer>
  )
}
