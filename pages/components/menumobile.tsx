import styles from '@/styles/menumobile.module.css'
import { useRouter } from "next/router";

export default function MenuMobile() {
    const router = useRouter()
    return (
        <>
            <footer className={styles.mainMobile}>
                <a href='/account' className={router.pathname === "/account" ? styles.activeRoute : ""}>
                    <div>
                        <img src="./images/accountmobile.svg" alt="ícone para acessar o minha conta"></img>
                        <p>Minha conta</p>
                    </div>
                </a>
                <a href='/descricao' className={router.pathname === "/descricao" ? styles.activeRoute : ""}>
                <div>
                    <img src="./images/buymobile.svg" alt="ícone para acessar a página de compras"></img>
                    <p>Comprar</p>
                </div>
                </a>
                <a href='/myticket' className={router.pathname === "/myticket" ? styles.activeRoute : ""}>
                <div>
                    <img src="./images/ticketmobile.svg" alt="ícone para acessar o meus ingressos"></img>
                    <p>Ingresso</p>
                </div>
                </a>
            </footer>
        </>
    )
}