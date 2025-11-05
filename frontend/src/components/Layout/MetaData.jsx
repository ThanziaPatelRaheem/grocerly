import React from "react";

const MetaData = ({ title }) => {
  const pageTitle = `${title}`;
  return (
    <>
      <title>{pageTitle}</title>
    </>
  );
};

export default MetaData;
