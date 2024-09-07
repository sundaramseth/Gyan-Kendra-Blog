import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';

const CommentSection = ({postId}) => {

    const [comment,setComment] = useState('');

    const {currentUser} = useSelector(state => state.user)

    const [commentError, setCommentError] = useState(null);

    const [comments,setComments] = useState([]);

    
    const handleSubmit = async (e)=>{
     e.preventDefault();
     if(comment.length > 200){
      return;
     }


     try {
      const res  = await fetch('/api/comment/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({content:comment, postId, userId:currentUser._id})
       });
       const data = await res.json();
       if(res.ok){
        setComment('')
        setCommentError(null);
        setComments([data,...comments]);       
      }
  

     } catch (error) {
      setCommentError(error.message)
      console.log(error)
     }

  
    }

    useEffect(()=>{
      
      const getComments = async () =>{
        try {
          const res = await fetch(`/api/comment/getPostComments/${postId}`);
          if(res.ok){
            const data = await res.json();
            setComments(data);
          }
          
        } catch (error) {
          console.log(error)
        }
      }
      getComments();

    },[postId])

   
   
    return (
      <div className=''>
      {currentUser ? 
      (
        <div className="flex items-center p-3">
            <p className='text-sm font-semibold'>
                Signed in as:
            </p>
            <div className="flex justify-center items-center">
            <img src={currentUser.profilePicture} alt={currentUser.username} className='w-7 h-7' />
           
           <Link to={'/dashboard?tab=profile'} className='text-sm text-cyan-700 hover:underline'>
            @ {currentUser.email}
           </Link>
           
           </div>

        </div>
      )
      :
      (
        <div className="flex py-3 gap-2">

            <p className='text-md font-semibold'>Sign In for comment!</p>
            <Link to={'/signin'} className='text-blue-600 font-semibold'>
            Sign In
            </Link>

        </div>
      ) 
      }
      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-gray-300 p-3 rounded-sm items-center'>
          <Textarea 
          placeholder='Add a comment...'
          rows='3'
          maxLength='200'
          onChange={(e)=> setComment(e.target.value)}
          value={comment}
          />
          <div className="flex justify-between my-2">
            <p className='text-sm font-semibold'>{200 - comment.length} character remaning</p>
            <Button pill outline size='xs' type='submit'>Submit</Button>
          </div>
          {commentError && (
               <Alert color='failure' className='mt-5'>
            
               {commentError}
               </Alert>
          )}
       
        </form>
      
      )}
      {comments.length === 0 ? 
      (
        <p className='text-sm my-5'>No comments yet!</p>
      )
      :
      (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
          <p>Comments</p>
          <div className="border border-gray-400 py-1 px-2 rounded-sm">
            <p>{comments.length}</p>
          </div>
        </div>
        
        {comments.map((comment) =>
          <Comment
          key={comment._id}
          comment={comment}
          />
        )}
        </>
     
      )}
     </div>
     )
}
export default CommentSection;