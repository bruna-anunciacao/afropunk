import styles from '@/styles/menumobilewhite.module.css'

export default function MenuMobileWhite() {
    return (
        <>
            <footer className={styles.mainMobile}>
                <a href='/account'>
                    <div>
                        <img src="./images/accountmobilewhite.svg" alt="ícone para acessar o minha conta"></img>
                        <p>Minha conta</p>
                    </div>
                </a>
                <a href='/descricao'>
                <div>
                    <img src="./images/buymobilewhite.svg" alt="ícone para acessar a página de compras"></img>
                    <p>Comprar</p>
                </div>
                </a>
                <a href='/myticket'>
                <div>
                    <img src="./images/ticketmobilewhite.svg" alt="ícone para acessar o meus ingressos"></img>
                    <p>Ingresso</p>
                </div>
                </a>
            </footer>
        </>
    )
}