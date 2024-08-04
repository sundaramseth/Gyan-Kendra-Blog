import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { HiOutlineBan, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';



export default function DashUsers() {
  

    const {currentUser} = useSelector((state)=> state.user)
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');
    
    useEffect(()=>{
    const fetchPost = async () =>{
        try {
            const res = await fetch(`/api/user/getusers`);
            const data = await res.json();
            if(res.ok){
                setUsers(data.users);
                if(data.users.length <9){
                  setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(currentUser.isAdmin){
        fetchPost();
    } 

  },[currentUser._id]);
  
  const handleShowMore =  async () =>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`); 
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>[...prev, ...data.users]);
        if(data.users.length <9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteuser = async ()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
        method:'DELETE'
      });
      const data = await res.json();
      if(!res.ok){
       console.log(data.message);
      }
      else{
        setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete));
      }
  } catch (error) {
      console.log(error);
  }
  }


    return (
    <div className="mywidth table-auto overflow-x-auto md:mx-auto p-3">
         {currentUser.isAdmin && users.length>0 ? (  
          <>
            <Table hoverable className="shadow-md" >
                <Table.Head>
                    <Table.HeadCell>
                        Date Created
                    </Table.HeadCell>
                    <Table.HeadCell>
                        User Image
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Username
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Email
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Admin
                    </Table.HeadCell>
                    <Table.HeadCell>
                      Delete
                    </Table.HeadCell>
                </Table.Head>
                
               
          
                {users.map((user)=>(
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                  <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>

                        <Table.Cell>
                     
                            <img 
                            src={user.profilePicture}
                            alt={user.username}
                            className="object-cover bg-gray-300 rounded-full object-cover w-12 h-12"
                            />
                    
                        </Table.Cell>

                        <Table.Cell className="font-medium text-gray-800 dark:text-white">
                 
                            {user.username}
                        </Table.Cell>

                        
                        <Table.Cell className="font-medium text-gray-800 dark:text-white">
                 
                            {user.email}
                        </Table.Cell>

                        <Table.Cell>
                            {user.isAdmin ? (
                                <HiOutlineCheckCircle className="text-green-400"/>
                            ):<HiOutlineBan className="text-red-400"/>}
                           
                        </Table.Cell>
                        <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>

                </Table.Row>
                </Table.Body>
                ))}

            </Table>
            {showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
              Show more
              </button>
            )}
            </>
      
         ):(
            <p>You Dont have any users yet!</p>
         )}

         
    <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
     <Modal.Header />  
     <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure! You want to delete this account ?</h3>
     <div className="flex justify-center gap-4">
     <Button color='failure' onClick={handleDeleteuser}>Yes, I am sure</Button>
     <Button color='gray' onClick={()=>setShowModal(false)}>No, Cancel</Button>
     </div>
      </div>
     </Modal.Body>
    </Modal>
    </div>
  )
}


