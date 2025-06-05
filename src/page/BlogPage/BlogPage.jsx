import { Link } from "react-router-dom";
import styles from "./BlogPage.module.css";
import BlogCardItem from "../../components/BlogCardItem/BlogCardItem.jsx";
import { useEffect, useState } from "react";
import { fetchBlogData } from "../../api/content/blog.js";
import Loader from "../../components/Loader/Loader.jsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const data = await fetchBlogData();
        setBlogs(data || []);
      } catch (err) {
        const errorMessage =
          err?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";
        setError(errorMessage);

        iziToast.error({
          title: "Chyba",
          message: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogData();
  }, []);

  return (
    <section className={styles.blogSection}>
      <div className="container">
        <h1 className={styles.visuallyHidden}>Blog</h1>
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
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </section>
  );
};

export default Blog;
