import React from "react";

const Page = ({ children, type }) => {
  return (
    <div>
      <p>Page Component</p>
      <h1>{type}</h1>
      {children}
    </div>
  );
};

export default Page;
