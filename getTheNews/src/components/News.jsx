import React, { useState, useEffect } from "react";
import "../styles/news.css";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "375bae096e9b492aa78e1d78505c079e";
      const url =
        "https://newsapi.org/v2/everything?" +
        "q=Apple&" +
        "from=2023-08-04&" +
        "sortBy=popularity&" +
        `apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  const getRandomColor = (() => {
    const colors = [
      { color: "#5C6F68", text: "white" },
      { color: "#8AA39B", text: "white" },
      { color: "#95D9C3", text: "black" },
      { color: "#A4F9C8", text: "black" },
      { color: "#A7FFF6", text: "black" },
    ];

    let lastColorIndex = -1;

    return () => {
      let colorIndex;
      do {
        colorIndex = Math.floor(Math.random() * colors.length);
      } while (colorIndex === lastColorIndex);

      lastColorIndex = colorIndex;
      return colors[colorIndex];
    };
  })();

  const renderColumns = () => {
    const columns = [[], [], [], []];

    news.forEach((article, index) => {
      const color = getRandomColor();
      columns[index % 4].push({ ...article, color });
    });

    return columns.map((column, columnIndex) => (
      <div className="column" key={columnIndex}>
        {column.map((article, articleIndex) => (
          <div
            className="article"
            key={articleIndex}
            style={{
              backgroundColor: article.color.color,
              color: article.color.text,
            }}
          >
            <h3 className="articleTitle">{article.title}</h3>
            <p className="articleDescription">{article.description}</p>
            <a
              className="articleUrl"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: article.color.text }}
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    ));
  };

  return <div className="mainNewsContainer">{renderColumns()}</div>;
}

export default News;
