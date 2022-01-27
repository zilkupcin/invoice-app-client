import styles from "../styles/Sidebar.module.scss";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";

interface SidebarProps {
  onThemeSwitch: () => void;
  theme: string;
}

const Sidebar: FC<SidebarProps> = ({ onThemeSwitch, theme }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Image src="/sidebar-icon.svg" height="32" width="32" />
      </div>
      <div className={styles.sidebarBottom}>
        <div
          className={cn(styles.themeSelector, {
            [styles["themeSelector--dark"]]: theme === "dark",
          })}
          onClick={onThemeSwitch}
        >
          <div className={styles.darkModeSelector}>
            <Image src="/dark-mode-icon.svg" height="24" width="24" />
          </div>
          <div className={styles.lightModeSelector}>
            <Image src="/light-mode-icon.svg" height="24" width="24" />
          </div>
        </div>
        <span className={styles.sidebarDivider}></span>
        <Image src="/profile-picture.png" height="32" width="32" />
      </div>
    </div>
  );
};

export default Sidebar;
