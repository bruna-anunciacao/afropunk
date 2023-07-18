import styles from '@/styles/sobrenos.module.css'

export default function Sobrenos() {
  return (
    <>
        <section id='sobrenos' className={styles.section}>
            <div className={styles.div}>
                <div className={styles.titulo}>
                    <div className={styles.linha1}></div>
                    <h2>SOBRE NÓS</h2>
                    <div className={styles.linha2}></div>
                </div>
                <div className={styles.paragrafo}>
                    <p>O quilombo AFROPUNK Bahia é o lugar onde o nosso povo se expressa no ritmo e no rastro da nossa diáspora em um ato radical de autoamor: formar a roda dos pretos na cidade mais negra fora da África.</p>
                    <p>Roda de Samba, roda de Capoeira, roda do Punk, roda do Xirê. A nossa roda nunca deixou de girar, desde que chegamos aqui. Seguiremos girando, derrubando fronteiras, do punk à quebradeira, celebrando o encontro de gerações e expressões artísticas, exaltando protagonismos da negritude, unindo grandes talentos a um legado de história de luta e resistência.</p>
                </div>
            </div>            
        </section>
    </>
  )
}
