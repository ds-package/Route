import React from "react";
import styles from "./Header.module.css"
import Logo from "../Logo/Logo";


const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <p>
                    한국에서 디자인 시스템 프로덕트 디자이너로 일하고 있습니다.
                    대부분의 시간을 메이커의 생산성을 높일 수 있는 프로세스에 대한 고민으로 보냅니다.
                    그리고 이를 도와줄 수 있는 디지털 도구들을 좋아합니다
                </p>
                <p>&copy;{new Date().getFullYear()} NoName</p>
            </div>
        </header>
    )
}

export default Header