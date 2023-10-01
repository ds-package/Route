import React, { useState, useEffect } from 'react';

const getProjectNames = () => {
  const projectContext = require.context('../../projects', true, /\.en.md$/);
  return projectContext.keys().map((key) => {
    const projectName = key.match(/^\.\/(.+)\/.+/)[1];  // Extract project name from the path
    return projectName;
  });
};


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedLanguage] = useState('en');  // 초기 언어는 한국어로 설정


  useEffect(() => {
    // 가상의 프로젝트 데이터
    const projectNames = getProjectNames();
    setProjects(projectNames);

  }, []);

  return (
    <div>
      <h1>프로젝트 목록</h1>
      <ul>
        {projects.map((project) => (
          <li key={project}>
            <h2>{project}</h2>
            {selectedLanguage === 'en' ? (
              <div dangerouslySetInnerHTML={{ __html: project.enContent }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: project.krContent }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;


  
  

// 아래글이 답일 수 있음
//https://www.npmjs.com/package/markdown-to-jsx 리액트 마크다운 공식문서 
//https://github.com/likesan/3rd-blog-netlify/blob/master/src/posts/2019-09-30-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%97%90-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%ED%8F%AC%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EB%82%98%ED%83%80%EB%82%B4%EB%B3%B4%EC%9E%90.md