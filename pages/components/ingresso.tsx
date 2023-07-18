import styles from '@/styles/ingresso.module.css'
import Image from 'next/image'
import Logo from "./../../public/images/afropunkblack.svg"

interface IProps {
    tipo: string;
    valor: string;
}

export default function Ingresso(props: IProps) {
    const {tipo, valor} = props;
    return (
        <>
            <div className={styles.ingresso}>
                <div className={styles.ingressotop}>
                    <Image id={styles.logo} src={Logo} alt="" />
                </div>
                <div className={styles.ingressobottom}>
                    <div className={styles.text}>
                        <h2>{tipo}</h2>
                        <h2 id={styles.por}>por:</h2>
                        <h2 id={styles.valor}>{valor}</h2>
                    </div>
                    <div className={styles.circulo}>
                    </div>
                </div>
            </div>
        </>
    )
}
