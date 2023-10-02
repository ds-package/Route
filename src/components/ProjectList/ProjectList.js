import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../hooks/useLangs"; // useLangs에서 LanguageContext를 가져옴
import styles from "./ProjectList.module.css"; // CSS 모듈을 가져옴

const ProjectList = () => {
  const { language } = useContext(LanguageContext); // useContext를 통해 LanguageContext에서 language 값을 가져옴
  const [projects, setProjects] = useState([]); // 프로젝트 목록을 관리할 상태와 해당 상태를 업데이트할 함수를 선언

  useEffect(() => {
    // useEffect를 사용하여 언어가 변경될 때마다 호출될 함수 정의
    const fetchData = async () => {
      let markdownFilesPath;

      if (language === "en") {
        markdownFilesPath = require.context(
          "../../projects/en",
          false,
          /\.md$/
        ); // 언어에 따라 프로젝트 파일 경로를 설정
      } else if (language === "ko") {
        markdownFilesPath = require.context(
          "../../projects/ko",
          false,
          /\.md$/
        );
      } else {
        console.error("Unsupported language:", language); // 지원되지 않는 언어라면 에러 출력
        return;
      }

      const markdownFiles = markdownFilesPath.keys();

      try {
        // 프로젝트 파일들을 비동기적으로 가져와서 배열로 반환
        const fetchedProjects = await Promise.all(
          markdownFiles.map(async (file) => {
            const filePath = markdownFilesPath(file);
            const response = await fetch(filePath);
            const projectContent = await response.text();

            // Markdown 파일에서 각 필드에 해당하는 정보 추출
            const projectTitle = projectContent.match(/title:\s+(.*)/i);
            const projectDateMatch = projectContent.match(/date:\s+(.*)/i);
            const projectDate = projectDateMatch
              ? new Date(projectDateMatch[1])
              : null;
            const projectImage = projectContent.match(/image:\s+(.*)/i);
            const projectAlt = projectContent.match(/imageAlt:\s+(.*)/i);
            const projectCategory = projectContent.match(/category:\s+(.*)/i);
            const projectDescription =
              projectContent.match(/description:\s+(.*)/i);

            return {
              title: projectTitle ? projectTitle[1] : "",
              date: projectDate,
              image: projectImage ? projectImage[1] : "",
              imageAlt: projectAlt ? projectAlt[1] : "",
              category: projectCategory ? projectCategory[1] : "",
              description: projectDescription ? projectDescription[1] : "",
            };
          })
        );

        // 프로젝트를 날짜 순으로 정렬 (최신순)
        const sortedProjects = fetchedProjects.sort((a, b) =>
          b.date && a.date ? b.date.getTime() - a.date.getTime() : 0
        );

        setProjects(sortedProjects); // 정렬된 프로젝트를 상태에 업데이트
      } catch (error) {
        console.error(error);
      }
    };

    // 언어 변경 시 fetchData 함수 호출
    fetchData();
  }, [language]);

  return (
    <div>
      <section className="hero">... title stuff</section>
      <section className="section">
        <div className={`container ${styles.projects}`}>
          {projects.map((project, idx) => (
            <div className="card" key={idx}>
              <div className="card-content">
                <div className="content">
                  {/* 프로젝트 정보 렌더링 */}
                  {project.date ? (
                    <p>Date: {project.date.toLocaleDateString()}</p>
                  ) : (
                    <p>No date available</p>
                  )}
                  <h3>{project.title}</h3>
                  <img src={project.image} alt={project.imageAlt} />
                  <p>Category: {project.category}</p>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
