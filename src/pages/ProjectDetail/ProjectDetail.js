import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../components/hooks/useLangs";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import fetchProjectData from "../../utils/fetchProjectData";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ProjectNavi from "../../components/ProjectNavi/ProjectNavi";

const ProjectDetail = () => {
  const { language } = useContext(LanguageContext);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await fetchProjectData(language);

        // Find the project by matching id
        const selectedProject = projects.find(
          (project) => project.id.toString() === projectId
        );

        if (selectedProject) {
          setProject({
            id: selectedProject.id,
            title: selectedProject.title,
            content: selectedProject.content,
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
      <ProjectNavi />
      <h3>{project.title}</h3>
      <Markdown
        children={project.content}
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
                    padding: "24px",
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
  );
};

export default ProjectDetail;
