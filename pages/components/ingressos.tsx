import styles from '@/styles/ingressos.module.css'
import Ingresso from './ingresso'

export default function Ingressos() {
  return (
    <>
        <section id='ingressos' className={styles.section}>
            <div className={styles.text}>
              <div className={styles.divh2}>
                <div className={styles.linha1}></div>
                <h2>Ingressos</h2>
                <div className={styles.linha2}></div>
              </div>
              <h3 id={styles.h3top}>Escolha entre as opções de ingressos disponíveis</h3>
              <h3>e viva o AFROPUNK, uma experiência única.</h3>
            </div>            
            <div className={styles.ingressos}>
                <Ingresso tipo="Meia" valor="R$85,00" />
                <Ingresso tipo="Meia social" valor="R$95,00" />
                <Ingresso tipo="Inteira" valor="R$170,00" />
            </div>
            <div className={styles.bottom}>
              <a href='/descricao'>COMPRAR INGRESSO</a>
            </div>
        </section>
    </>
  )
}
