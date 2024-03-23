"use client";
import React, { useState } from "react";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import ResultWithSources from "../components/ResultWithSources";
import ButtonContainer from "../components/ButtonContainer";
import Button from "../components/Button";

const endpoint = "/api/resume-query-metadata";

const ResumeReader = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File >();

 
  const handleUploadClick = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(!file) return  //Return if theres no file
    
    try {
      const formData = new FormData()
      formData.set('file',file)
      console.log(typeof(formData))
      console.log(formData)
      const result = await fetch('/api/setup', {
        method: "POST",
        body: formData
      })
      const json = await result.json()
      setSubmitted(true)
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }

  const [messages, setMessages] = useState([
    {
      text: "Ex. Has anyone worked at meta?",
      type: "bot",
    },
  ]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleSubmitUpload = async () => {
    try {
      // Push the response into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Uploading resumes...",
          type: "bot",
        },
      ]);

      const response = await fetch(`/api/resume-upload`);
      const transcriptRes = await response.json();

      if (!response.ok) {
        throw new Error(transcriptRes.error);
      }

      console.log({ transcriptRes });

      // assuming transcriptRes is an object
      const summariesArray = JSON.parse(transcriptRes.output);

      const newMessages = summariesArray.map((summary) => ({
        text: summary.summary,
        type: "bot",
      }));

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      setPrompt("");
    } catch (err) {
      console.error(err);
      setError("Error");
    }
  };

  const handleSubmit = async () => {
    try {
      // Push the user's message into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);
      setPrompt("");

      // set loading message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "...", type: "bot", sourceDocuments: null },
      ]);

      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const searchRes = await response.json();
      console.log({ searchRes });

      // remove loading message
      setMessages((prevMessages) => prevMessages.slice(0, -1));

      // Push the response into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.output,
          type: "bot",
          sourceDocuments: searchRes.sourceDocuments,
        },
      ]);
      
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
      <>
        <div className="w-full" >
          <ButtonContainer>
              <form onSubmit={handleUploadClick} className="flex flex-col sm:flex-row" >
                <input type="file" name="file"   onChange={(e) => setFile(e.target.files?.[0])} className={` ${submitted?"hidden":""} file:cursor-pointer my-2  text-xs sm:text-sm file:text-sm file:py-1 sm:file:py-3 file:px-4 file:rounded-full file:text-white file:shadow-none   file:bg-[#007C7C] file:hover:bg-[#007c87] file:border-none`}/>
                <input type="submit" value='Submit' className={` ${submitted?"hidden":""} doc-upload-button cursor-pointer hover:bg-[#93c9c9] bg-[#EDFFFF] border border-[#007C7C] text-[#007C7C] font-semibold my-2 py-1 sm:py-3 px-8 text-sm rounded-full`}/>             
              </form>
                
          </ButtonContainer>
          <ButtonContainer>
                  <Button
                    color={""}
                    handleSubmit={handleSubmitUpload}
                    endpoint=""
                    buttonText=" Upload Resumes 📂"
                  />
          </ButtonContainer>

          <ResultWithSources maxMsgs={""} messages={messages} pngFile="robohr" />

          <PromptBox
            prompt={prompt}
            handlePromptChange={handlePromptChange}
            handleSubmit={handleSubmit}
            error={error}
            placeHolderText={"Enter Prompt"}
            buttonText="Submit"
            disableButton={false}
            labelText="Prompt:"
          />
        </div>
        

      </>
  );
};

export default ResumeReader;
