import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../hooks/useLangs";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";
import fetchBlogData from "../../utils/fetchBlogData";

const BlogList = () => {
  const { language } = useContext(LanguageContext); // useContext를 통해 LanguageContext에서 language 값을 가져옴
  const [posts, setPosts] = useState([]); // 블로그 포스트 목록을 관리할 상태와 해당 상태를 업데이트할 함수를 선언

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchBlogData(language); // call the fetchProjectData function with the language

        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // 언어 변경 시 fetchData 함수 호출
    fetchData();
  }, [language]);
  console.log("Posts:", posts);

  return (
    <section className="section">
      <div className={`container ${styles.posts}`}>
        {posts.map((post, idx) => (
          <Link
            to={`/posts/${language}/${post.id}`}
            className="links"
            key={idx}
          >
            <div className={styles.prjList}>
              <div className={styles.prjContents}>
                <div className={styles.prjInfo}>
                  <h6>{post.title}</h6>
                  <div className={styles.projInfoText}>{post.description}</div>
                  {post.date ? (
                    <div className={styles.prjInfoItem}>
                      {post.date.toLocaleDateString()} ·
                    </div>
                  ) : (
                    <div className={styles.prjInfoItem}>
                      No date available · {post.category}
                    </div>
                  )}
                </div>
                <span className={styles.prjImageWrap}>
                  <img
                    className={styles.prjImage}
                    src={post.image}
                    alt={post.imageAlt}
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
