import Image from "next/image";
import Gallery from "./components/Gallery";
import { pressStart2P, sourceCodePro, instrumentSans } from "./styles/fonts";
import {BsDot} from "react-icons/bs"
import {BsPlayCircle} from "react-icons/bs"
import Slider from "./components/Slider";

export default function Home() {
  return (
    <>
    
    <div className="">
      <div className="banner bg-white px-2 md:px-10 py-0 md:py-10 flex md:flex-row flex-col">
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
            <img className="w-[70%] rounded-2xl" src="https://d30903flf7mc19.cloudfront.net/wp-content/uploads/2019/10/25162406/HR-Software-What-You-Need-to-Know-Before-You-Hire.jpg" alt="" />
          </div>

        </div>
      </div>

      <div>
          {/* <Gallery/> */}
      </div>
      
    </div>
    <div className="my-16">
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="text-center bg-[#FFB7CA] w-fit text-sm px-5 rounded-full py-1 font-semibold">Over a million HR professionals trust!</div>
        <div className="font-semibold text-center text-6xl w-[70%]">The world’s destination for HR Professionals</div>
        <div className="text-sm">Get inspired by the work of millions of top-rated HR's & agencies around the world.</div>
        <div className="get-started-button text-xs px-5 py-3 font-semibold rounded-full bg-black text-white">Get Started</div>
      </div>
      <Slider/>
    </div>


    </>
  );
}
