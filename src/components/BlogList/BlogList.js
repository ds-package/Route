import React, { useContext, useEffect, useState, useRef } from "react";
import { LanguageContext } from "../hooks/useLangs";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";
import fetchBlogData from "../../utils/fetchBlogData";

const BlogList = () => {
  const { language } = useContext(LanguageContext);
  const [posts, setPosts] = useState([]);

  // 현재 호버된 이미지의 URL을 관리하는 상태
  const [hoveredImage, setHoveredImage] = useState(null);

  // 이미지 요소의 참조를 생성하여 DOM 접근 가능
  const imageRef = useRef(null);

  // 마우스의 현재 위치를 감지하여 상태로 관리
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // 마우스가 이미지에 들어왔을 때 실행되는 함수
  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  };

  // 마우스가 이미지에서 나갔을 때 실행되는 함수
  const handleMouseLeave = () => {
    // 호버된 이미지를 초기화하여 감추도록 함
    setHoveredImage(null);
  };

  // 마우스의 위치를 감지하여 상태에 저장하는 함수
  const handleMouseMove = (e) => {
    // 마우스 위치를 상태에 업데이트
    setImagePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchBlogData(language);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [language]);

  return (
    <section className="section" onMouseMove={handleMouseMove}>
      <div
        ref={imageRef}
        className={`${styles.postHoverImage} ${
          hoveredImage ? styles.showImage : ""
        }`}
        style={{
          backgroundImage: hoveredImage ? `url(${hoveredImage})` : "none",
          left: `${imagePosition.x}px`,
          top: `${imagePosition.y}px`,
        }}
      ></div>
      <div className={`container ${styles.posts}`}>
        {posts.map((post, idx) => (
          <Link
            key={idx}
            to={`/posts/${language}/${post.id}`}
            className={`links ${styles.postsLinks}`}
            // 마우스가 올라갔을 때 이미지를 보이도록 함
            onMouseEnter={() => handleMouseEnter(post.image)}
            // 마우스가 벗어났을 때 이미지를 감추도록 함
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.postListItem}>
              <div className={styles.postContents}>
                <div className={styles.postInfo}>
                  <h6>{post.title}</h6>
                  <div className={styles.postNote}>{post.description}</div>
                  <div className={styles.postDate}>
                    {post.date
                      ? `${post.date.toLocaleDateString()} ${post.category} · `
                      : `No date available · ${post.category}`}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
