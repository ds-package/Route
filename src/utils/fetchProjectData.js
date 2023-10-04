const fetchProjectData = async (language) => {
  // 본문을 추출하는 함수
  const extractMarkdownContent = (content) => {
    const contentMatch = content.match(/---\n([\s\S]*)\n---([\s\S]*)/);
    if (contentMatch && contentMatch.length > 2) {
      return contentMatch[2].trim();
    }
    return "";
  };

  try {
    let markdownFilesPath;

    if (language === "en") {
      markdownFilesPath = require.context("../projects/en", false, /\.md$/);
    } else if (language === "ko") {
      markdownFilesPath = require.context("../projects/ko", false, /\.md$/);
    } else {
      console.error("Unsupported language:", language);
      return [];
    }

    const markdownFiles = markdownFilesPath.keys();

    const fetchedProjects = await Promise.all(
      markdownFiles.map(async (file, idx) => {
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
        const projectDescription = projectContent.match(/description:\s+(.*)/i);
        const projectMarkdownContent = extractMarkdownContent(projectContent);

        return {
          id: idx,
          title: projectTitle ? projectTitle[1] : "",
          date: projectDate,
          image: projectImage ? projectImage[1] : "",
          imageAlt: projectAlt ? projectAlt[1] : "",
          category: projectCategory ? projectCategory[1] : "",
          description: projectDescription ? projectDescription[1] : "",
          content: projectMarkdownContent,
        };
      })
    );

    // 프로젝트를 날짜 순으로 정렬 (최신순)
    const sortedProjects = fetchedProjects.sort((a, b) =>
      b.date && a.date ? b.date.getTime() - a.date.getTime() : 0
    );

    return sortedProjects;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchProjectData;
