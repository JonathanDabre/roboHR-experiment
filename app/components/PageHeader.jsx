import React from "react";
import { pressStart2P, instrumentSans } from "../styles/fonts";

const PageHeader = ({ heading, boldText, description }) => {
  return (
    <>
      <h1 className={` mb-5 text-start lg:text-start lg:mb-10 text-2xl lg:text-6xl uppercase`}>
        {heading}
      </h1>
      <p className={`${instrumentSans.className} text-center lg:text-start mb-10`}>
        <strong>{boldText}</strong> {description}
      </p>{" "}
    </>
  );
};

export default PageHeader;
