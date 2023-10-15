import React from "react";
import { sourceCodePro } from "../styles/fonts";
import {GoPaperAirplane} from "react-icons/go"

const PromptBox = ({
  prompt,
  handlePromptChange,
  handleSubmit,
  placeHolderText,
  buttonText,
  error,
  disableButton,
  labelText,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center mb-4">
        {labelText && (
          <label htmlFor="" className="mr-4">
            {labelText}
          </label>
        )}

        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder={placeHolderText || "Enter your prompt"}
          className="w-full lg:mr-3 py-4 px-6 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full shadow"
        />

        {!disableButton && (
          <button
            onClick={handleSubmit}
            className={`py-4 px-6 mt-4 lg:mt-0 bg-green-500 hover:bg-green-600 shadow text-slate-100 font-bold rounded-full hover:shadow-xl transition-colors duration-200 uppercase ${sourceCodePro.className}`}
          >
            <GoPaperAirplane className="h-6 w-6 font-extrabold" />
          </button>
        )}
      </div>
      <p className={`text-red-500 ${error ? "block" : "hidden"}`}>{error}</p>
    </>
  );
};

export default PromptBox;
