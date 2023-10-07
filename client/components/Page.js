import React from "react";
import Header from "./Header";

const Page = ({ children, type }) => {
  return (
    <div>
      <Header />
      <p>Page Component</p>
      <h1>{type}</h1>
      {children}
    </div>
  );
};

export default Page;
