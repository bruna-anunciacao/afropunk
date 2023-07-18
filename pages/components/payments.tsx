import styles from "@/styles/payments.module.css";

export default function Payments() {
  return (
    <>
      <main className={styles.mainPayments}>
        <div className={styles.mainPaymentsTitle}>
          <img src="./images/creditcard.svg" alt="ícone de um cartão de crédito" />
          <h1>Cartão de crédito</h1>
        </div>
        <h2>Dados do cartão</h2>
        <div className={styles.paymentsForms}>
          <form>
            <div className={styles.divPaymentsForms}>
              <div>
                <label>Número do cartão</label>
                <input type="number" placeholder="xxxx xxxx xxxx xxxx"/>
              </div>
              <div>
                <label>Data de validade</label>
                <input type="text" placeholder="xx/xx"/>
              </div>
              <div>
                <label>CVV</label>
                <input type="number" placeholder="xxx"/>
              </div>
            </div>
            <div className={styles.divPaymentsFormsWidth}>
              <div>
                <label>Nome do titular</label>
                <input type="text" placeholder="xxxxx xx xxxxxx"/>
              </div>
            </div>
            <div className={styles.divPaymentsFormsWidth}>
              <div>
                <label>CPF</label>
                <input type="text" placeholder="xxx.xxx.xxx-xx"/>
              </div>
            </div>
            <h3>Parcelamento</h3>
            <div className={`${styles.divPaymentsForms} ${styles.divPaymentsFormsParce}`} >
              <div>
                <label>Quantidade</label>
                <input type="number" placeholder="1" />
              </div>
              <div className={styles.paymentsBtn}>
                <a href="/comprafinalizada">Finalizar</a>
                </div>
            </div>
          </form>
          
        </div>
      </main>
    </>
  );
}
