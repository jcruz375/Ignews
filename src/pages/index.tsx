import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  console.log
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <Image
          src="/images/avatar.svg"
          width="336"
          height="521"
          alt="ig.news seu blog de tecnologia"
        />
      </main>
    </>
  )
}

// SSG = Static SIte Generation
export const getStaticProps: GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1Jmp7yAc7x11pWqju6wv9nTU');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return { 
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};

//SSR = Server Side Rendering
/*export const getServerSideProps: GetServerSideProps = async() => {
const price = await stripe.prices.retrieve('price_1Jmp7yAc7x11pWqju6wv9nTU');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return { 
    props: {
      product
    },
  };
};*/
