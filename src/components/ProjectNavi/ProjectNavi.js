import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../hooks/useLangs";
import { Link } from "react-router-dom";
import fetchProjectData from "../../utils/fetchProjectData";
import styles from "./ProjectNavi.module.css";

const ProjectNavi = () => {
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
    <div className={styles.test}>
      <section className="section">
        <div>
          {projects.map((project, idx) => (
            <Link to={`/${language}/${project.id}`} className="card" key={idx}>
              <div className="card-content">
                <div className="content">{project.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectNavi;
