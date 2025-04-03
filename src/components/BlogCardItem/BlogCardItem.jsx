import styles from "./BlogCardItem.module.css";

const BlogCardItem = ({ blog }) => {
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
    <>
      <div className={styles.image}>
        <img src={blog.imageUrl} alt={blog.title} />
      </div>

      <div className={styles.content}>
        <p className={styles.category}>{blog.category}</p>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.date}>{formatDate(blog.date)}</p>
      </div>
    </>
  );
};

export default BlogCardItem;
