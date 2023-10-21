import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import BlogList from "../../components/BlogList/BlogList";

const Blog = () => {
  return (
    <div>
      <Topbar />
      <h1> Blog</h1>
      <BlogList />
    </div>
  );
};

export default Blog;
