import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../hooks/useLangs";
import { Link } from "react-router-dom";
import styles from "./ProjectList.module.css";
import fetchProjectData from "../../utils/fetchProjectData";
import Markdown from "react-markdown";

const ProjectList = () => {
  const { language } = useContext(LanguageContext); // useContext를 통해 LanguageContext에서 language 값을 가져옴
  const [projects, setProjects] = useState([]); // 프로젝트 목록을 관리할 상태와 해당 상태를 업데이트할 함수를 선언

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await fetchProjectData(language); // call the fetchProjectData function with the language

        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // 언어 변경 시 fetchData 함수 호출
    fetchData();
  }, [language]);

  // 프로젝트를 클릭했을 때 해당 프로젝트 페이지로 이동

  return (
    <div>
      <section className="section">
        <div className={`container ${styles.projects}`}>
          {projects.map((project, idx) => (
            <Link to={`/${language}/${project.id}`} className="links" key={idx}>
              <div className={styles.prjList}>
                <div className={styles.prjContents}>
                  <div className={styles.prjInfo}>
                    <h6>{project.title}</h6>
                    <div className={styles.projInfoText}>
                      {project.description}
                    </div>
                    {project.date ? (
                      <div className={styles.prjInfoItem}>
                        {project.year} ·&nbsp;
                        <Markdown children={project.category} />
                      </div>
                    ) : (
                      <div className={styles.prjInfoItem}>
                        No date available · {project.category}
                      </div>
                    )}
                  </div>
                  <span className={styles.prjImageWrap}>
                    <img
                      className={styles.prjImage}
                      src={project.image}
                      alt={project.imageAlt}
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
