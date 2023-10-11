import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../components/hooks/useLangs";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./BlogDetail.module.css";
import fetchBlogData from "../../utils/fetchBlogData";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const BlogDetail = () => {
  const { language } = useContext(LanguageContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchBlogData(language);

        // Find the project by matching id
        const selectedPosts = posts.find(
          (post) => post.id.toString() === postId
        );

        if (selectedPosts) {
          setPost({
            id: selectedPosts.id,
            title: selectedPosts.title,
            content: selectedPosts.content,
            date: selectedPosts.date,
            category: selectedPosts.category,
          });
        } else {
          console.error("Project not found.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId, language]);

  if (!post) {
    return (
      <div className={styles.loadingScreen}>
        <Topbar />
      </div>
    );
  }

  return (
    <div className={styles.test}>
      <Topbar />
      <div>
        <div className={styles.prjTitle}>
          <h3>{post.title}</h3>
          <span>날짜</span>
        </div>
        <Markdown
          children={post.content}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <div className="code-block">
                  <div className="code-block-title">
                    <p className="ui-font">Example</p>
                  </div>
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={dracula}
                    customStyle={{
                      padding: "16px",
                    }}
                    wrapLongLines={true}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                </div>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
