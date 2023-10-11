const fetchBlogData = async (language) => {
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
      markdownFilesPath = require.context("../posts/en", false, /\.md$/);
    } else if (language === "ko") {
      markdownFilesPath = require.context("../posts/ko", false, /\.md$/);
    } else {
      console.error("Unsupported language:", language);
      return [];
    }

    const markdownFiles = markdownFilesPath.keys();

    const fetchedPosts = await Promise.all(
      markdownFiles.map(async (file, idx) => {
        const filePath = markdownFilesPath(file);
        const response = await fetch(filePath);
        const blogPostContent = await response.text();

        // Markdown 파일에서 각 필드에 해당하는 정보 추출
        const postTitle = blogPostContent.match(/title:\s+(.*)/i);
        const postDateMatch = blogPostContent.match(/date:\s+(.*)/i);
        const postDate = postDateMatch ? new Date(postDateMatch[1]) : null;
        const postImage = blogPostContent.match(/image:\s+(.*)/i);
        const postAlt = blogPostContent.match(/imageAlt:\s+(.*)/i);
        const postCategory = blogPostContent.match(/category:\s+(.*)/i);
        const postDescription = blogPostContent.match(/description:\s+(.*)/i);
        const postMarkdownContent = extractMarkdownContent(blogPostContent);

        return {
          id: postTitle ? postTitle[1] : "",
          title: postTitle ? postTitle[1] : "",
          date: postDate,
          image: postImage ? postImage[1] : "",
          imageAlt: postAlt ? postAlt[1] : "",
          category: postCategory ? postCategory[1] : "",
          description: postDescription ? postDescription[1] : "",
          content: postMarkdownContent,
        };
      })
    );

    // 프로젝트를 날짜 순으로 정렬 (최신순)
    const sortedPosts = fetchedPosts.sort((a, b) =>
      b.date && a.date ? b.date.getTime() - a.date.getTime() : 0
    );

    return sortedPosts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchBlogData;
