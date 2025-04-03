import { Link } from "react-router-dom";
import styles from "./BlogPage.module.css";
import BlogCardItem from "../../components/BlogCardItem/BlogCardItem.jsx";
import { useEffect, useState } from "react";
import { fetchBlogData } from "../../api/content/blog.js";
import Loader from "../../components/Loader/Loader.jsx";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      const data = await fetchBlogData();

      setBlogs(data || []);
      setIsLoading(false);
    };

    loadBlogData();
  }, []);

  return (
    <section className={styles.blogSection}>
      <div className="container">
        <div className={styles.articlesWrapper}>
          {isLoading && <Loader />}
          {Array.isArray(blogs) &&
            blogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className={`${styles.card} ${
                  index < 2 ? styles.largeCard : styles.smallCard
                }`}
              >
                <BlogCardItem blog={blog} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
