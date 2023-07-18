import styles from '@/styles/header.module.css'
import Image from 'next/image'
import Logo from "./../../public/images/afropunk.svg"
import Login from "./../../public/images/login.svg"
import MenuMobile from "./../../public/images/menumobile.svg"
import Link from 'next/link'
import HeaderModal from './headermodal'
import { useState } from "react";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      {menuVisible && <HeaderModal />}
      <header className={styles.header}>
        <div>
            <a href='/'><Image id={styles.logo} src={Logo} alt="" /></a>
        </div>
        <nav className={styles.nav1}>
            <a href='/#inicio'>Inicio</a>
            <a href='/#sobrenos'>Sobre</a>
            <a href='/#line-up'>Line-up</a>
            <a href='/#ingressos'>Ingressos</a>
            <a href='/#galeria'>Galeria</a>
        </nav>
        <nav className={styles.nav2}>
            <a href='/descricao' id={styles.comprar}>COMPRAR</a>
            <a id={styles.casa} href="/login"><Image id={styles.casinha} src={Login} alt="" /></a>
            <a onClick={handleMenu}><Image id={styles.menumobile} src={MenuMobile} alt="" /></a>
        </nav>
      </header>
    </>
  )
}
