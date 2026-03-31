import Head from "next/head";
import Link from "next/link";
import styles from "./legal.module.css";

export default function Privacidad() {
  return (
    <>
      <Head><title>Privacidad — Piquefy</title><meta name="robots" content="noindex" /></Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>← Inicio</Link>
          <h1 className={styles.title}>Política de Privacidad</h1>
          <p className={styles.updated}>Última actualización: marzo 2025</p>
          <div className={styles.section}>
            <h2>Responsable</h2>
            <p>Particular contactable en <a href="mailto:yalconx@gmail.com">yalconx@gmail.com</a>. No existe sociedad mercantil asociada.</p>
          </div>
          <div className={styles.section}>
            <h2>Datos que NO se recopilan</h2>
            <p>Piquefy no recopila, almacena ni trata datos personales. No hay registro, no hay cookies de rastreo, no se comparte nada con terceros. Los nombres introducidos son temporales y se eliminan automáticamente.</p>
          </div>
          <div className={styles.section}>
            <h2>Servicios de terceros</h2>
            <p>Usamos Firebase (Google) para sincronización en tiempo real y Vercel para el alojamiento. Consulta sus políticas en <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener">firebase.google.com</a> y <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">vercel.com</a>.</p>
          </div>
          <div className={styles.section}>
            <h2>Contacto</h2>
            <p><a href="mailto:yalconx@gmail.com">yalconx@gmail.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
