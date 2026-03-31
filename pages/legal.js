import Head from "next/head";
import Link from "next/link";
import styles from "./legal.module.css";

export default function Legal() {
  return (
    <>
      <Head><title>Aviso Legal — Piquefy</title><meta name="robots" content="noindex" /></Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>← Inicio</Link>
          <h1 className={styles.title}>Aviso Legal</h1>
          <p className={styles.updated}>Última actualización: marzo 2025</p>
          <div className={styles.section}>
            <h2>Titular</h2>
            <p>Particular. Sin sociedad mercantil. Contacto: <a href="mailto:yalconx@gmail.com">yalconx@gmail.com</a></p>
          </div>
          <div className={styles.section}>
            <h2>Naturaleza del servicio</h2>
            <p>Piquefy es una herramienta de entretenimiento gratuita para porras entre amigos con dinero ficticio. No facilita apuestas con dinero real ni actúa como intermediario financiero.</p>
          </div>
          <div className={styles.section}>
            <h2>Exclusión de responsabilidad</h2>
            <p>El titular no se responsabiliza de los acuerdos económicos entre los usuarios. El servicio se proporciona "tal cual" sin garantías de disponibilidad continua.</p>
          </div>
          <div className={styles.section}>
            <h2>Legislación aplicable</h2>
            <p>Legislación española. Juzgados y tribunales españoles para cualquier controversia.</p>
          </div>
        </div>
      </div>
    </>
  );
}
