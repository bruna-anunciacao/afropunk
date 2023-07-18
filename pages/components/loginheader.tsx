import styles from "@/styles/loginheader.module.css";
import InfoCard from "./modal";
import { useState } from "react";

export default function LoginHeader() {
  const [infoCardVisible, setInfoCardVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setInfoCardVisible(!infoCardVisible);
  };
  const handleCloseModal = () => {
    if (infoCardVisible === true){
      setInfoCardVisible(false)
    }
  }
  return (
    <>
    <main className={styles.main} onClick={handleCloseModal}>
      {infoCardVisible && <InfoCard />}
      <header>
        <p>.</p>
        <a href="/">
          <img
            className={styles.logo}
            src="./images/afropunk.svg"
            alt="Logotipo do Afropunk"
          />
        </a>
        <button onClick={handleVisible}>
          <img
            className={styles.profile}
            src="./images/myaccount.svg"
            alt="ícone para informações da conta"
          />
        </button>
      </header>
      </main>
    </>
  );
}
