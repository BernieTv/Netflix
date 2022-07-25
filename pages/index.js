import Head from 'next/head';

import NavBar from '../components/nav/navbar';
import Banner from '../components/banner/banner';
import SectionCards from '../components/card/section-cards';

import { getVideos, getPopularVideos, getWatchItAgainVideos } from '../lib/videos';
import UseRedirectUser from '../utils/redirectUser';

import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
	const { userId, token } = await UseRedirectUser(context);

	if (!userId) context.res.writeHead(302, { Location: '/login' });

	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
	const disneyVideos = await getVideos('disney trailer');
	const productivityVideos = await getVideos('productivity');
	const travelVideos = await getVideos('travel');
	const popularVideos = await getPopularVideos();

	return {
		props: {
			disneyVideos,
			productivityVideos,
			travelVideos,
			popularVideos,
			watchItAgainVideos,
		},
	};
}

export default function Home({
	disneyVideos,
	productivityVideos,
	travelVideos,
	popularVideos,
	watchItAgainVideos = [],
}) {
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
				videoId='4zH5iYM4wJo'
			/>

			<main className={styles.main}>
				<div className={styles.sectionWrapper}>
					<SectionCards title='Disney' videos={disneyVideos} size='large' />
					<SectionCards
						title='Watch it again'
						videos={watchItAgainVideos}
						size='small'
					/>
					<SectionCards title='Travel' videos={travelVideos} size='small' />
					<SectionCards
						title='Productivity'
						videos={productivityVideos}
						size='medium'
					/>
					<SectionCards title='Popular' videos={popularVideos} size='small' />
				</div>
			</main>
		</div>
	);
}
