import React from 'react'
import {HiX} from "react-icons/hi"

const Modal = ({visible, onClose, summaryContent}) => {
    const handleOnClose = (e) =>{
        if(e.target.id === "container"){
            onClose()//from prop
        }
    }

    if(!visible){
        return null
    }

    

    return (
        
            <div onClick={handleOnClose} id='container' className='fixed inset-0 bg-black bg-opacity-30 flex justify-center '>
                <div className={`bg-white  flex flex-col justify-start  md:px-2 mt-10 pt-2 rounded-2xl md:m-10 w-[100%] h-[100%] md:h-[90%]  md:w-[70%] relative ${visible?'slideUpIn':'slideDownOut'} `} >
                    <button className='absolute top-0 right-0 m-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-600 cursor-pointer text-2xl' onClick={onClose}><HiX/></button>

                    <div className='text-sm font-md text-gray-500 mt-4 flex justify-center'>Summary</div>
                    <div className='summary mt-5 mx-8 text-justify text-lg text-gray-700 font-normal overflow-y-auto pr-2'>{summaryContent}</div>
                </div>
            </div>
        
    )
}

export default Modal
