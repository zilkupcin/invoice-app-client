import { useEffect, useState } from "react";
import styles from "../styles/Messages.module.scss";

const Message = ({ index, message, onMessageClick }) => {
  const [readyForRemoval, setReadyForRemoval] = useState(false);
  useEffect(() => {
    // Remove a message after 3 seconds
    let removalTimeout = setTimeout(() => {
      setReadyForRemoval(true);
    }, 3000);

    return () => {
      clearTimeout(removalTimeout);
    };
  }, []);

  useEffect(() => {
    if (!readyForRemoval) return;
    onMessageClick(index);
  }, [readyForRemoval]);

  const handleMessageClick = () => {
    onMessageClick(index);
  };

  return (
    <li className={styles.message} onClick={handleMessageClick}>
      {message.content}
    </li>
  );
};

export default Message;
