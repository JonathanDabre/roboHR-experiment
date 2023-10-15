import React from "react";
import { sourceCodePro } from "./styles/fonts";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className={`p-4 bg-gray-800 text-white w-full grid grid-cols-3  bottom-0 ${sourceCodePro.className}`}
    >
      <p className={`text-center ${sourceCodePro.className}`}>
        By Jonathan, Alroy & Zane
      </p>
      <p className={`text-center ${sourceCodePro.className}`}>
        &copy; J.A.Z {year}
      </p>
      <p className={`text-center ${sourceCodePro.className}`}>
        Questions? Visit Truq
      </p>
    </footer>
  );
};

export default Footer;
