/*
// Parte 1
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Hello World
const Hello: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Hola Mundo</title>
                <meta property="og:title" content="Hello World" key="title" />
            </Head>
            <div>Hello World!</div>
            <div>
                Usa el ancla de HTML para un <a href="https://nostarch.com">enlace externo</a> y el componente Link para una 
                <Link href="/components/weather"> página interna</Link>.
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </div>
        </div>
    );
};

export default Hello;

// Parte 2
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Hello.module.css";

const Hello: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hola Mundo</title>
                <meta property="og:title" content="Hello World" key="title" />
            </Head>
            <div className={styles.heading}>Hello World!</div>
            <div>
                Usa el ancla de HTML para un{" "}
                <a className={styles.link} href="https://nostarch.com">
                    enlace externo
                </a>{" "}
                y el componente Link para una{" "}
                <Link href="/components/weather" className={styles.link}>
                    página interna
                </Link>.
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                    className={styles.image}
                />
            </div>
        </div>
    );
};

export default Hello;
*/
// Parte 5
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Hello World
const Hello: NextPage = () => {
    const pageTitle = "Hola Mundo - Página principal";
    const pageDescription =
        "Esta es la página principal de nuestra aplicación Next.js. Aprende a implementar SEO dinámico con meta tags.";
    const pageKeywords = "Next.js, SEO, Meta Tags, Desarrollo Web";

    return (
        <div>
            <Head>
                {/* Título dinámico */}
                <title>{pageTitle}</title>

                {/* Meta tags dinámicos */}
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <meta name="author" content="Tu Nombre" />
                <meta property="og:title" content={pageTitle} key="title" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tu-dominio.com/hello" />
                <meta property="og:image" content="/vercel.svg" />
            </Head>
            <div>
                <h1>Hello World!</h1>
                <p>
                    Usa el ancla de HTML para un{" "}
                    <a href="https://nostarch.com">enlace externo</a> y el componente
                    Link para una <Link href="/components/weather">página interna</Link>.
                </p>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </div>
        </div>
    );
};

export default Hello;
