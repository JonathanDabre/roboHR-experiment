import React from 'react'
import Link from "next/link";

function Navbar() {
  return (
    <div>
        <div className="flex flex-row bg-white px-8 py-6 justify-between">
            <div className="flex flex-row space-x-8">
                <div className="Brand Name text-3xl font-semibold ">
                    <a href="/" className='cursor-pointer'>
                        Robo HR
                    </a>
                </div>
                <div className="features flex flex-row font-semibold text-sm space-x-6 pt-3 px-2">
                    <div className="feature-1 cursor-pointer">
                        <a href="/resume-reader">
                            HR Assistant
                        </a>
                    </div>
                    <div className="feature-2">
                        <a href="/chat-with-pdf" className='cursor-pointer'>
                            Chat PDF
                        </a>
                    </div>
                    <div className="feature-3">
                        Traditional Parser
                    </div>
                </div>
            </div>

            <div className="buttons flex flex-row space-x-2">
                <div className="">
                    <button className='log-in bg-gray-100 text-black text-sm rounded-lg px-3 py-2'>Log in</button>
                </div>
                <div className="">
                    <button className='sign-up bg-black text-white text-sm rounded-full px-3 py-2'>Sign up</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
