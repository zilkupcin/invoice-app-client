import { useContext } from "react";
import Message from "./Message";
import styles from "../styles/Messages.module.scss";
import { MessagesContext } from "./MessagesProvider";

const Messages = () => {
  const { messages, removeMessage } = useContext(MessagesContext);

  const handleMessageClick = (index) => {
    removeMessage(index);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.messageList}>
        {messages.map((message, index) => {
          return (
            <Message
              onMessageClick={handleMessageClick}
              key={message.id}
              index={index}
              message={message}
            ></Message>
          );
        })}
      </ul>
    </div>
  );
};

export default Messages;
