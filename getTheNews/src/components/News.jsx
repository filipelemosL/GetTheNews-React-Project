import React, { useState, useEffect } from "react";
import '../styles/news.css';

function News () {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
          const apiKey = '375bae096e9b492aa78e1d78505c079e';
          const url = 'https://newsapi.org/v2/everything?' +
            'q=Apple&' +
            'from=2023-08-04&' +
            'sortBy=popularity&' +
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

      const renderColumns = () => {
        const columns = [[], [], [], []]; // four colums created
    
        news.forEach((article, index) => {
          columns[index % 4].push(article); // sort the news into the columns
        });
    
        return columns.map((column, columnIndex) => (
          <div className="column" key={columnIndex}>
            {column.map((article, articleIndex) => (
              <div className="article" key={articleIndex}>
                <h3 className="articleTitle">{article.title}</h3>
                <p className="articleDescription">{article.description}</p>
                <a className="articleUrl" href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            ))}
          </div>
        ));
      };
    
      return (
        <div className="mainNewsContainer">
          {renderColumns()}
        </div>
      );
    }
    
    export default News;