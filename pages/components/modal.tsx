import styles from "@/styles/modal.module.css";
import { signOut } from "next-auth/react";

export default function InfoCard() {

  return (
    <>
      <main className={styles.main}>
        <a href="/account"><div>
          <img src="../images/ticket.svg" alt="ícone de ingresso da aba minha conta"/>
          <p>Minha conta</p>
        </div>
        </a>
        <a href="/descricao"><div>
          <img src="../images/ticket.svg" alt="ícone de ingresso da aba comprar"/>
          <p>Comprar</p>
        </div>
        </a>
        <a href="/myticket"><div>
          <img src="../images/ticket.svg" alt="ícone de ingresso da aba meus ingressos"/>
          <p>Meus ingressos</p>
        </div>
        </a>
        <button onClick={() => signOut({callbackUrl: '/'})}><div>
          <img src="../images/ticket.svg" alt="ícone de ingresso da aba sair"/>
          <p>Sair</p>
        </div>
        </button>
      </main>
    </>
  );
}
