import React from "react";
import "./Header.css";
import IHeaderProps from "./types";

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <>
      <h1 title="Header" className="header">
        {title}
      </h1>
    </>
  );
};

export default Header;
