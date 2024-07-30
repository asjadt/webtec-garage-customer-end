import React from 'react'
import { useNavigate } from 'react-router-dom';



const NoDataFoundComponent = ({ message, buttonText, redirectUrl }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

const handleRedirect = (url) => {
    navigate(url); // Redirect to employee create form
};
  return (
    <div className="px-2 py-5 h-[300px]">
    <div className="flex h-[300px] flex-col gap-4 w-full">
        <h1>{message}</h1>
        <div className="bg-primary-content z-10 px-5 py-1 rounded-md my-1 mx-1 shadow-md inline-flex gap-2 items-center cursor-pointer"
        role='button'
        onClick={() => {handleRedirect(redirectUrl)}}
        >
        <button onClick={() => {handleRedirect(redirectUrl)}}
        className="h-14 text-xl cursor-pointer"
        >{buttonText}</button>
        </div>
       
     
    </div>
  </div>
  )
}

export default NoDataFoundComponent