import styles from "../styles/Modal.module.scss";
import Button from "./Button";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <h4 className={styles.title}>Confirm deletion</h4>
      <p className={styles.description}>
        Are you sure you want to delete invoice #XM9141? This action cannot be
        undone.
      </p>
      <div className={styles.buttons}>
        <Button type="tertiary" title="Cancel" />
        <Button type="secondary" title="Delete" />
      </div>
    </div>
  );
};

export default Modal;
