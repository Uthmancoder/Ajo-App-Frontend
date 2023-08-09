import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const usePost = () => {
    const [loggeduser, setloggeduser] = useState([])

  useEffect(() => {
    axios
    .post(URL)
    .then((res) => {
      console.log(res);
      setloggeduser(res.data)
      console.log(loggeduser);
      toast.success("Registration Successful");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Registration failed");
    });
  }, [])
  
  return (
    <>
        
    </>
  )
}

export default usePost