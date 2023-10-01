import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';  // Import Link from react-router-dom

const getProjectData = async (project, lang) => {
  const markdownResponse = await fetch(`../projects/${project}/${project}.${lang}.md`);
  const markdownContent = await markdownResponse.text();

  // Use parseMetadata to extract metadata
  const metadata = parseMetadata(markdownContent);

  return { project, content: markdownContent, metadata };
};

const parseMetadata = (markdownContent) => {
  const metadata = {};
  const metadataPattern = /^---\s*([\s\S]*?)\s*---/;
  const matches = metadataPattern.exec(markdownContent);

  if (matches && matches[1]) {
    const metadataLines = matches[1].split('\n');
    metadataLines.forEach((line) => {
      const [key, ...values] = line.split(':').map((item) => item.trim());
      metadata[key.toLowerCase()] = values.join(':').trim();
    });
  }
  return metadata;
};


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedLanguage] = useState('en');

  useEffect(() => {
    const projectNames = getProjectNames();
    const projectDataPromises = projectNames.map((project) => {
      const enProject = getProjectData(project, 'en');
      const krProject = getProjectData(project, 'kr');
      return Promise.all([enProject, krProject]);
    });

    Promise.all(projectDataPromises)
      .then((data) => {
        const projectList = data.map(([enProject, krProject]) => {
          return {
            project: enProject.project,
            enContent: enProject.content,
            krContent: krProject.content,
            enMetadata: enProject.metadata,
            krMetadata: krProject.metadata
          };
        });
        // Sort projects by date in descending order
        projectList.sort((a, b) => new Date(b.enMetadata.date) - new Date(a.enMetadata.date));
        setProjects(projectList);
      })
      .catch((error) => {
        console.error('Error fetching project data:', error);
      });
  }, []);

  const getProjectNames = () => {
    const projectContext = require.context('../../projects', true, /\.en.md$/);
    return projectContext.keys().map((key) => {
      const projectName = key.match(/^\.\/(.+)\/.+/)[1];
      return projectName;
    });
  };

  return (
    <BrowserRouter>
      <div>
        <h1>프로젝트 목록</h1>
        <ul>
          {projects.map((projectData) => (
            <li key={projectData.project}>
              <h2>{projectData.project}</h2>
              <div>
                <strong>Date: {selectedLanguage === 'en' ? projectData.enMetadata.date : projectData.krMetadata.date}</strong>
              </div>
              <div>
                <strong>Category: {selectedLanguage === 'en' ? projectData.enMetadata.category : projectData.krMetadata.category}</strong>
              </div>
              <Link to={`/projects/${projectData.project}`}> 바로가기</Link>
              {/* Render content based on language selection */}
              {selectedLanguage === 'en' ? (
                <div dangerouslySetInnerHTML={{ __html: projectData.enContent }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: projectData.krContent }} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </BrowserRouter>
  );
};

export default ProjectList;