import styles from '@/styles/headermodal.module.css'

export default function HeaderModal() {
  return (
    <>
      <section className={styles.section}>
        <a href='/login'>Login</a>
        <a href='/#sobrenos'>Sobre Nós</a>
        <a href='/#line-up'>Line-up</a>
        <a href='/#ingressos'>Ingressos</a>
        <a href='/#galeria'>Galeria</a>
      </section>
    </>
  )
}
