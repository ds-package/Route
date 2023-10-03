// ProjectDetail.js

import { LanguageContext } from "../../components/hooks/useLangs";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { language } = useContext(LanguageContext);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let markdownFilesPath;

        if (language === "en") {
          markdownFilesPath = require.context(
            "../../projects/en",
            false,
            /\.md$/
          );
        } else if (language === "ko") {
          markdownFilesPath = require.context(
            "../../projects/ko",
            false,
            /\.md$/
          );
        } else {
          console.error("Unsupported language:", language);
          return;
        }

        const markdownFiles = markdownFilesPath.keys();

        // Find the project by matching id
        const selectedProject = markdownFiles
          .map((file, idx) => {
            const filePath = markdownFilesPath(file);
            return {
              id: idx,
              filePath,
            };
          })
          .find((project) => project.id.toString() === projectId);

        if (selectedProject) {
          const response = await fetch(selectedProject.filePath);
          const projectContent = await response.text();

          const projectTitle = projectContent.match(/title:\s+(.*)/i);

          setProject({
            id: selectedProject.id,
            title: projectTitle ? projectTitle[1] : "",
            content: projectContent,
          });
        } else {
          console.error("Project not found.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId, language]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: project.content }} />
    </div>
  );
};

export default ProjectDetail;
