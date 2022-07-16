import Head from 'next/head';

import NavBar from '../components/nav/navbar';
import Banner from '../components/banner/banner';
import SectionCards from '../components/card/section-cards';

import { getVideos } from '../lib/videos';

import styles from '../styles/Home.module.css';

export default function Home() {
	const disneyVideos = getVideos();

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

			<div className={styles.sectionWrapper}>
				<SectionCards title='Disney' videos={disneyVideos} size='large' />
				<SectionCards title='Disney' videos={disneyVideos} size='medium' />
				<SectionCards title='Disney' videos={disneyVideos} size='small' />
			</div>
		</div>
	);
}
