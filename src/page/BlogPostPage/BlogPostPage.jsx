import { Link, useParams } from "react-router-dom";
import { articles } from "../../data/articles.js";
import styles from "./BlogPostPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

const BlogPostPage = () => {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return <p>Článek nebyl nalezen</p>;
  }

  return (
    <section className={styles.blogPost}>
      <div className="container">
        <Link to="/blog" className={styles.backButton}>
          <FaArrowLeft /> Zpět na blog
        </Link>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.categoryDateWrap}>
          <p className={styles.category}>{article.category}</p>
          <p className={styles.date}>{article.date}</p>
        </div>

        <img src={article.image} alt={article.title} className={styles.image} />
        <p className={styles.content}>Obsah článku bude zde...</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit a necessitatibus quos ad nulla quae tempora, natus
          dolorem ducimus sequi, vero commodi voluptas quia iusto unde? Ipsum
          totam vel velit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aperiam eligendi similique aliquam voluptatibus aut doloremque
          facere eos quia hic vero voluptate soluta fugiat, corrupti est
          voluptas debitis a expedita quod. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ipsum sed inventore deleniti,
          accusantium maiores reprehenderit, dolores, omnis cum iure laboriosam
          soluta? Tempora quas, tenetur maiores asperiores nesciunt aperiam nemo
          soluta.
        </p>
        {/* Додаємо кнопку YouTube, якщо є посилання */}
        {article.youtubeLink && (
          <a
            href={article.youtubeLink}
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
