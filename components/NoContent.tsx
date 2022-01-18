import styles from "../styles/NoContent.module.scss";

const NoContent = () => {
  return (
    <div className={styles.noContent}>
      <img src="./no_content.svg"></img>
      <h3>There is nothing here</h3>
      <p>
        Create a new invoice by clicking the <b>New Invoice</b> button and get
        started
      </p>
    </div>
  );
};

export default NoContent;
