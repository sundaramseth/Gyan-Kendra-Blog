import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
     <h1 className="text-center text-3xl my-7 font-semibold">Crate a Post</h1> 
      <form className="flex flex-col gap-4">
        
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
        placeholder="Enter Blog Title"
        type="text"
        required
        id='title'
        className="flex-1"
        />
        <Select>
            <option value="uncategorized">Select a category</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Programing">Programing</option>
            <option value="Stocks">Stocks</option>
            <option value="LifeStyle">LifeStyle</option>
        </Select>
        </div>
        
        <div className="flex gap-4 items-center justify-between 
        border-4 border-teal-500 border-dotted p-3">
           <FileInput type='file' accept="images/*" className="flex-1" />
         <Button type="button" gradientDuoTone='purpleToBlue' size='sm' outline>
        Upload Image
         </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className="h-80 my-4" required />
       
       <Button type="submit" gradientDuoTone='purpleToPink' className="mt-8">
       Publish Post
       </Button>
      </form>
    </div>
  )
}
