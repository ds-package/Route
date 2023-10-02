// utils.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const getProjects = (language) => {
  const projectsPath = path.join(__dirname, "projects", language);
  const projects = fs.readdirSync(projectsPath).map((fileName) => {
    const filePath = path.join(projectsPath, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data, content: markdownContent } = matter(content);
    return {
      ...data,
      slug: fileName.replace(".md", ""),
      content: markdownContent, // Include markdown content
    };
  });
  return projects;
};

module.exports = { getProjects };
