import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex md:flex-row flex-col-reverse justify-evenly bg-yellow-50 rounded-lg">
      <div className="p-7">
       <h2 className="font-semibold text-2xl my-4 text-black">
        Want to Learn more about Java
       </h2>
       <p className="text-m text-gray-900">
       Want to Learn more about Java
       </p>
       <Button gradientDuoTone='purpleToPink' className="mt-8" pill>
       <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Get the Course</a> 
       </Button>
      </div>
      <div className="md:w-1/2">
        <img 
        className="h-200 p-7"
        src="https://www.classcentral.com/report/wp-content/uploads/2022/05/Java-BCG-Banner.png" /> 
 
      </div>
    </div>
  )
}
