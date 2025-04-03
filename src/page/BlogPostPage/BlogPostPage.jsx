import { Link, useParams } from "react-router-dom";
import styles from "./BlogPostPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState } from "react";
import { fetchSingleBlog } from "../../api/content/blog.js";

const BlogPostPage = () => {
  const { id } = useParams(); // Отримуємо id з URL
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      const data = await fetchSingleBlog(id); // Завантажуємо дані по id
      setBlog(data);
      setIsLoading(false);
    };

    loadBlog();
  }, [id]);

  if (!blog) {
    return <p>Článek nebyl nalezen</p>;
  }

  const formatDate = (dateString) => {
    const months = [
      "ledna",
      "února",
      "března",
      "dubna",
      "května",
      "června",
      "července",
      "srpna",
      "září",
      "října",
      "listopadu",
      "prosince",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}. ${month} ${year}`;
  };

  return (
    <section className={styles.blogPost}>
      <div className="container">
        <Link to="/blog" className={styles.backButton}>
          <FaArrowLeft /> Zpět na blog
        </Link>
        {isLoading && <Loader />}
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.categoryDateWrap}>
          <p className={styles.category}>{blog.category}</p>
          <p className={styles.date}>{formatDate(blog.date)}</p>
        </div>
        <div className={styles.content}>
          <img src={blog.imageUrl} alt={blog.title} className={styles.image} />
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>

        {/* Додаємо кнопку YouTube, якщо є посилання */}
        {blog.youtubeLink && (
          <a
            href={blog.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeButton}
          >
            Podívejte se na video na YouTube
          </a>
        )}
      </div>
    </section>
  );
};

export default BlogPostPage;
