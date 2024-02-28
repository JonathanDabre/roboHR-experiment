"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "react-feather";
import LoadingDots from "./LoadingDots";
import Modal from "./Modal";


const Chatwithpdf = (props) => {
  const setProgress= props.setProgress

  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState(false)
  const [summary, setSummary] = useState('File not uploaded');
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content:
        "Hello! Tell me what do you want to simplify",
    },
  ]);

  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false)

  const [file, setFile] = useState<File >();
  const handleUploadClick = async(e: React.FormEvent<HTMLFormElement>) => {
    
    setProgress(20)
    
    e.preventDefault()

    if(!file) return  //Return if theres no file
    
    try {
      const data = new FormData()
      data.set('file',file)
      console.log(typeof(data))
      console.log(data)
      setProgress(40)
      const result = await fetch('/api/setup', {
        method: "POST",
        body: data
      })
      const json = await result.json()
      setProgress(100)
      setSubmitted(true)
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }

  const handleDeleteClick = async()=>{
    setProgress(0)
    

    setHistory([
      {
        role: "assistant",
        content:
          "Hello! Tell me what do you want to simplify",
      },
    ])
    setProgress(30)
    setSummary("Not yet generated")

    setFile(undefined)
    try {
      const result = await fetch('/api/delete', {
        method: "POST"
      })
      setProgress(70)
      const json = await result.json()
      console.log('result', json)
      setProgress(100)
      setSubmitted(false)
      
    } catch (err) {
      console.log('err:', err )
      
    }
  }

  

  const handleQueryClick = async ()=>{
    if (!query) return

    setHistory((oldHistory) => [
      ...oldHistory,
      { 
        role: "user", 
        content: query 
      },
    ]);


    setResult('')
    setQuery('')
    setLoading(true)

    
    try {
      const data = {
        query: query,
        summary: summary,
      };
      console.log(JSON.stringify(data))

      const res = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(data)
      })
      const json = await res.json()
      setResult(json.data)
      setHistory((oldHistory) => [...oldHistory, {
        role: "assistant",
        content: json.data,
      }]);
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }

  }

  const formatPageName = (url: string) => {
    // Split the URL by "/" and get the last segment
    const pageName = url.split("/").pop();

    // Split by "-" and then join with space
    if (pageName) {
      const formattedName = pageName.split("-").join(" ");

      // Capitalize only the first letter of the entire string
      return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    }
  };

  const handleSummaryClick = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    
    if(!file) return  //Return if theres no file

    try {
      const data = new FormData()
      data.set('file',file)

      const result = await fetch('/api/summary', {
        method: "POST",
        body: data
      })

      const json = await result.json()
      console.log('result: ', json.data)
      setSummary(json.data)
      
    } catch (error) {
      console.log(error)      
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Call both functions here
    await handleUploadClick(e);
    await handleSummaryClick(e);
  };
  
  const handleShowSummary = ()=>{
    setShowModal(!showModal)
    document.body.classList.toggle("overflow-hidden");

}




  //scroll to bottom of chat
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
    

    // Confirm before leaving
    window.onbeforeunload = async (event) => {
      
      const confirmationMessage = 'Are you sure you want to leave?';
      console.log("helllo")
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    // Clean up on unmount
    return () => {
      window.onbeforeunload = null;
    };
  }, [history]);
  
  return (
    <>
      <div className="h-screen bg-white  mt-2 sm:px-6 sm:py-2 flex flex-col">
        <div className="flex flex-col gap-6  items-left flex-grow max-h-full">
          <div className="flex flex-col justify-center items-center ">
            <h1 className=" text-2xl mx-auto sm:text-4xl font-semibold text-[#007C7C] bg-clip-text pt-2 ">
              Document Simplifier
            </h1>
            <h2 className="text-xs sm:text-sm font-semibold pt-1 text-gray-400">
              Get your documents explained
            </h2>
          </div>

          <div className="w-[100%] flex flex-col self-center items-center">
            
            <div className="mx-auto flex sm:flex-row  flex-col">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row" >
                <input type="file" name="file"   onChange={(e) => setFile(e.target.files?.[0])} className={` ${submitted?"hidden":""} file:cursor-pointer my-2  text-xs sm:text-sm file:text-sm file:py-1 sm:file:py-3 file:px-4 file:rounded-full file:text-white file:shadow-none   file:bg-[#007C7C] file:hover:bg-[#007c87] file:border-none`}/>
                
                <input type="submit" value='Submit' className={` ${submitted?"hidden":""} doc-upload-button cursor-pointer bg-[#EDFFFF] border border-[#007C7C] text-[#007C7C] font-semibold my-2 py-1 sm:py-3 px-8 text-sm rounded-full`}/>
                
                {/* <input type="submit" value='Show Summary' className="vector-delete-button cursor-pointer hover:bg-[#111926] hover:text-white bg-white text-black my-2 ml-2 py-3 px-8 text-sm rounded-lg border border-black"/> */}
              </form>
              <div className="flex flex-row items-center  justify-between ">
                <button onClick={handleShowSummary} className={`${submitted?"":"hidden"} show-summmary-button w-[50%] cursor-pointer hover:bg-[#007C7C] border-none font-semibold text-white bg-[#007C7C] my-2 sm:ml-2 py-1 px-2 sm:py-3 sm:px-8 text-xs sm:text-sm rounded-full `}>Summarize</button>
                <button onClick={handleDeleteClick} className={`${submitted?"":"hidden"} vector-delete-button w-[50%] cursor-pointer hover:bg-[#FF6767] hover:text-white bg-white text-black my-2 ml-2 py-1 px-2 sm:py-3 sm:px-8 text-xs sm:text-sm rounded-full border border-black hover:border-[#FF6767]`}>Reset</button>
              </div>
            </div>

          </div>
          
          <form
            className="rounded-2xl flex-grow flex flex-col bg-[#F3F5F7] max-h-full overflow-clip"
            onSubmit={(e) => {
              e.preventDefault();
              handleQueryClick();
            }}
          >
            <div className="overflow-y-scroll no-scrollbar flex flex-col  md:w-full gap-5 p-4 sm:p-6 h-full">
              {history.map((message, idx) => {
                const isLastMessage = idx === history.length - 1;
                switch (message.role) {
                  case "assistant":
                    return (
                      <div
                        ref={isLastMessage ? lastMessageRef : null}
                        key={idx}
                        className="flex gap-2"
                      >
                        <img
                          src="https://i.ibb.co/jRf5N3t/Legal-Connect-Survey-Analysis-6.png"
                          className="h-8 w-8 sm:h-12 sm:w-12 rounded-full"
                        />
                        <div className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tr-xl text-black p-6 border border-gray-100 ">
                          <p className="text-xs sm:text-sm font-medium text-[#04C4C4] mb-2">
                            AI assistant
                          </p>
                          {message.content}
                          
                        </div>
                      </div>
                    );
                  case "user":
                    return (
                      <div
                        className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tl-xl text-black p-6 self-end border border-gray-100]"
                        key={idx}
                        ref={isLastMessage ? lastMessageRef : null}
                      >
                        <p className="text-sm font-medium text-[#06CF9C] mb-2">
                          You
                          {/* #af6dda */}
                        </p>
                        {message.content}
                      </div>
                    );
                }
              })}
              {loading && (
                <div ref={lastMessageRef} className="flex gap-2">
                  <img
                    src="https://i.ibb.co/jRf5N3t/Legal-Connect-Survey-Analysis-6.png"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tr-xl text-black p-6 border border-gray-100">
                    <p className="text-sm font-medium text-violet-500 mb-4">
                      AI assistant
                    </p>
                    <LoadingDots />
                  </div>
                </div>
              )}
            </div>

            {/* input area */}
            <div className="flex sticky justify-center bottom-0 w-[100%] px-2 sm:px-6 pb-2 sm:pb-6 h-20">
              <div className="w-full relative ">
                <textarea
                  aria-label="chat input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a message"
                  className="w-full h-full no-scrollbar text-black resize-none rounded-lg border border-slate-900/10 bg-white pl-6 pr-24 py-3 pt-4 text-base placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 "
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleQueryClick();
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleQueryClick();
                  }}
                  className="flex w-10 h-10 items-center justify-center rounded-full px-3 text-sm   bg-[#007C7C] hover: font-semibold text-white hover:bg-slate-200 active:bg-slate-300 absolute right-2 bottom-2 disabled:bg-slate-50 disabled:text-gray-500"
                  type="submit"
                  aria-label="Send"
                  disabled={!query || loading}
                >
                  <Send />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal onClose={handleShowSummary} visible={showModal}  summaryContent={summary}/>
    </>
  )
}

export default Chatwithpdf