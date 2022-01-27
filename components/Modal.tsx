import { FC } from "react";
import styles from "../styles/Modal.module.scss";
import Button from "./Button";

interface ModalProps {
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

const Modal: FC<ModalProps> = ({ onCancelClick, onDeleteClick }) => {
  return (
    <div className={styles.modal}>
      <h4 className={styles.title}>Confirm deletion</h4>
      <p className={styles.description}>
        Are you sure you want to delete this invoice This action cannot be
        undone.
      </p>
      <div className={styles.buttons}>
        <Button type="tertiary" title="Cancel" onClick={onCancelClick} />
        <Button type="secondary" title="Delete" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default Modal;
