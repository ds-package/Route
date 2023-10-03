import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link className="links" to="/about">
        <li>About</li>
      </Link>
      <li>Blog</li>
    </div>
  );
};

export default Navigation;
