// eslint-disable-next-line no-unused-vars
import React from 'react'
import { CgProfile } from "react-icons/cg";
const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
        <div className="w-10 rounded-full">
        <CgProfile className='h-full w-full' />
        </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>Hi? Whats up?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:45</div>
    </div>
  )
}

export default Message