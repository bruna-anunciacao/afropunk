import styles from '@/styles/footer.module.css'
import Image from 'next/image'
import Logo from "./../../public/images/afropunk.svg"

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.div1}>
            <a href='/'><Image id={styles.logo} src={Logo} alt="" /></a>
            <div className={styles.div2}>
                <nav className={styles.nav1}>
                    <a href='/#inicio'>Inicio</a>
                    <a href='/#sobrenos'>Sobre Nós</a>
                    <a href='/#line-up'>Line-up</a>
                    <a href='/#ingressos'>Ingressos</a>
                    <a href='/#galeria'>Galeria</a>
                </nav>
                <nav className={styles.nav2}>
                    <a href='https://facebook.com'>Facebook</a>
                    <a href='https://instagram.com'>Instagram</a>
                    <a href='https://youtube.com'>Twitter</a>
                    <a href='https://twitter.com'>Youtube</a>
                </nav>
                <nav className={styles.nav3}>
                    <a>Termos de serviço</a>
                    <a>Política de privacidade</a>
                </nav>
            </div>            
        </div>
        
        <div className={styles.div3}>
            <h2 id={styles.h2}>ALL RIGHTS RESERVERD @AFROPUNK 2023</h2>
        </div>
      </footer>
    </>
  )
}
