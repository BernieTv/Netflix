import Head from 'next/head';

import NavBar from '../../components/nav/navbar';
import SectionCards from '../../components/card/section-cards';
import UseRedirectUser from '../../utils/redirectUser';
import { getMyList } from '../../lib/videos';

import styles from '../../styles/MyList.module.css';

export async function getServerSideProps(context) {
	const { userId, token } = UseRedirectUser(context);
	const videos = await getMyList(userId, token);

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			myListVideos: videos,
		},
	};
}

const MyList = ({ myListVideos }) => {
	return (
		<div>
			<Head>
				<title>My list</title>
			</Head>
			<main className={styles.main}>
				<NavBar />
				<div className={styles.sectionWrapper}>
					<SectionCards
						title='My List'
						videos={myListVideos}
						size='small'
						shouldWrap
						shouldScale={false}
					/>
				</div>
			</main>
		</div>
	);
};

export default MyList;
