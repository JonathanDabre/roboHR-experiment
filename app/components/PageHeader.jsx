import React from "react";
import { pressStart2P, instrumentSans } from "../styles/fonts";

const PageHeader = ({ heading, boldText, description }) => {
  return (
    <>
      <h1 className={` mb-5 text-center lg:mb-10 text-2xl lg:text-6xl uppercase`}>
        {heading}
      </h1>
      <p className={`${instrumentSans.className} text-end mb-10`}>
        <strong>{boldText}</strong> {description}
      </p>
    </>
  );
};

export default PageHeader;
