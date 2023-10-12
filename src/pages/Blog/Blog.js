import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import BlogList from "../../components/BlogList/BlogList";

const Blog = () => {
  return (
    <div>
      <Topbar />
      {/* <h5> Blog</h5> */}
      <BlogList />
    </div>
  );
};

export default Blog;
