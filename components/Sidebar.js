import styles from '../styles/Sidebar.module.scss';
import Image from "next/image";

const Sidebar = () => {
    return(<div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
            <Image src="/sidebar-icon.svg" height="32" width="32" />
        </div>
        <div className={styles.sidebarBottom}>
            <Image src="/dark-mode-icon.svg" height="24" width="24" />
            <span className={styles.sidebarDivider}></span>
            <Image src="/profile-picture.png" height="32" width="32"/>
        </div>
    </div>);
}

export default Sidebar;