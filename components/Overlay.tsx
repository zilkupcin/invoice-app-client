import {
  ChangeEvent,
  FC,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";
import styles from "../styles/Overlay.module.scss";
import cn from "classnames";
import { useTransition, animated } from "react-spring";
import { overlayTransition } from "../transitions/transitions";

interface OverlayProps {
  children: React.ReactNode;
  isFullScreen?: boolean;
  onClick: () => void;
  isVisible: boolean;
}

const Overlay: FC<OverlayProps> = ({
  children,
  isFullScreen = false,
  onClick,
  isVisible,
}) => {
  const transitions = useTransition(isVisible, overlayTransition);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent
  ) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains(styles.overlay)) {
      onClick();
    }
  };

  return transitions(
    (springStyles, item) =>
      item && (
        <animated.div
          onClick={handleOverlayClick}
          style={springStyles}
          className={cn(styles.overlay, {
            [styles["overlay--fullscreen"]]: isFullScreen,
          })}
        >
          {children}
        </animated.div>
      )
  );
};
export default Overlay;
