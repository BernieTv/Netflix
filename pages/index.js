import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import NavBar from '../components/nav/navbar';
import Banner from '../components/banner/banner';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix</title>
				<meta name='description' content='Netflix app to watch movies' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar username='bekzod' />
			<Banner
				title='Clifford the red dog'
				subTitle='a very cute dog'
				imgUrl='/static/clifford.webp'
			/>

			{/* 
			<Card /> */}
		</div>
	);
}
