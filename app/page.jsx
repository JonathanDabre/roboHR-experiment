import Image from "next/image";
import Gallery from "./components/Gallery";
import { pressStart2P, sourceCodePro, instrumentSans } from "./styles/fonts";
import {BsDot} from "react-icons/bs"
import {BsPlayCircle} from "react-icons/bs"

export default function Home() {
  return (
    <>
    {/* <div className="w-11/12 m-auto flex-col my-6">
      <h1 className={`text-center ${instrumentSans.className}`}>
        
      </h1>
      <div className="flex flex-row justify-start">
        
          <div className="flex flex-col items-start justify-center min-h-screen text-gray-800 py-4 px-4 sm:px-6 lg:px-8 w-6/12">
            
          <h2
            className={`w-full text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-left ${pressStart2P.className}`}
          >
            Your AI-JS Bootcamp Starts Here
          </h2>
          <p
            className={`w-full mt-6 max-w-2xl text-center text-lg leading-7 sm:text-2xl sm:leading-9 sm:text-left lg:text-3xl ${instrumentSans.className}`}
          >
            <span className="font-bold">
              Throughout this course, you'll be building stunning AI projects
              that are not only impressive but also have real-world
              applications.
            </span>
            Whether you're aiming to generate a passive income, create a
            personal assistant to streamline your work, or simply to enhance
            your portfolio, the skills and knowledge you acquire here will be
            instrumental in achieving your goals.
          </p>
         
        </div> 
        <Gallery />
        
      </div>
      
        <p
        className={`w-full mt-4 text-center text-10 leading-7 sm:text-2xl sm:leading-9 sm:text-center lg:text-3xl ${sourceCodePro.className}`}
        >
        Remember, this journey is yours. So let's{" "}
        <strong>roll up our sleeves, dive in, and start building</strong>. 🔨
      </p>
       
    </div> */}


    {/* // -----------------------[____________________]------------------------------------------------
       // ------------------------New Code Starts here-------------------------------------------------
      // -----------------------[____________________]------------------------------------------------ */}

    <div className="">
      <div className="banner bg-white px-2 md:px-10 py-8 md:py-16 flex md:flex-row flex-col">
        <div className="banner-text">
          <div className="text-[#d6506b] bg-[#fbe7eb] text-sm md:text-lg font-semibold w-fit px-1">Ask the AI</div>
          <div className="text-4xl md:text-6xl py-2 font-bold"><span className="text-[#d6506b]"> ROBO HR</span>  Intelligent HR Service</div>
          <div className="text-sm md:text-lg  py-2 text-gray-500">Try Robo HR, upload multiple resumes, ask smart questions, get the best out of available resource.</div>
          <div className="my-2 flex flex-col md:flex-row">
            <div className="bg-[#F2F2F2] w-fit pl-4 pr-12 py-2  rounded-lg">Who's the best candidate?</div>
            <div className="flex items-center mt-3 md:mt-0 md:px-6 space-x-2 ">
              <div className="text-xl cursor-pointer hover:text-[#d6506b]"><a href="/resume-reader"><BsPlayCircle/></a></div>
              <div className="underline cursor-pointer hover:no-underline hover:text-[#d6506b]"><a href="/resume-reader">Show Robo HR</a></div></div>
          </div>
          <div className="text-md mt-3 flex flex-row">
            <div className="align-middle text-2xl text-green-400"><BsDot/></div>
            <div className="text-gray-600 underline text-sm cursor-pointer hover:text-black">Have any questions?</div>
          </div>
        </div>
        <div className="banner-img">
          <div className="image flex justify-center">
            <img className="w-[70%]" src="https://i.pinimg.com/originals/7d/9b/1d/7d9b1d662b28cd365b33a01a3d0288e1.gif" alt="" />
          </div>

        </div>
      </div>

      <div>
          {/* <Gallery/> */}
      </div>
      
    </div>

    </>
  );
}
