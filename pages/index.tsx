import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from './components/header'
import Slogan from './components/slogan'
import Sobrenos from './components/sobrenos'
import Lineup from './components/lineup'
import Ingressos from './components/ingressos'
import Galeria from './components/galeria'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>AfroPunk</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <Slogan />
        <Sobrenos />
        <Lineup />
        <Ingressos />
        <Galeria />
        <Footer />
      </main>
    </>
  )
}