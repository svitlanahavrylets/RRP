import { Link } from "react-router-dom";
import { articles } from "../../data/articles.js";
import styles from "./BlogPage.module.css";

const Blog = () => {
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <div className={styles.articlesWrapper}>
          {articles.map((article, index) => (
            <Link
              to={`/blog/${index}`}
              key={index}
              className={`${styles.card} ${
                index < 2 ? styles.largeCard : styles.smallCard
              }`}
            >
              <img
                src={article.image}
                alt={article.title}
                className={styles.image}
              />
              <div className={styles.content}>
                <p className={styles.category}>{article.category}</p>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.date}>{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
