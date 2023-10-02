import Markdown from "react-markdown";
import { useEffect, useState } from "react";

const ProjectPost = () => {
  const [postContents, setPostContent] = useState("");

  useEffect(() => {
    import("../../projects/ko/project01.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((response) => setPostContent(response))
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <article>
      <Markdown>{postContents}</Markdown>
    </article>
  );
};

export default ProjectPost;
