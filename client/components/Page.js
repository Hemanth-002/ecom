import React from "react";

const Page = ({ children, type }) => {
  return (
    <div>
      <p>Page {type}</p>
      {children}
    </div>
  );
};

export default Page;
