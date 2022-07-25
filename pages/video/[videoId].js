import { useRouter } from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import cls from 'classnames';

import NavBar from '../../components/nav/navbar';
import Like from '../../components/icons/like-icon';
import DisLike from '../../components/icons/dislike-icon';
import { getYoutubeVideoById } from '../../lib/videos';

import styles from '../../styles/Video.module.css';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
	const videoId = context.params.videoId;

	const videoArray = await getYoutubeVideoById(videoId);

	return {
		props: {
			video: videoArray.length > 0 ? videoArray[0] : {},
		},
		revalidate: 10, // In seconds
	};
}

export async function getStaticPaths() {
	const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];

	const paths = listOfVideos.map((videoId) => ({
		params: { videoId },
	}));

	return { paths, fallback: 'blocking' };
}

const Video = ({ video }) => {
	const [toggleLike, setToggleLike] = useState(false);
	const [toggleDislike, setToggleDislike] = useState(false);
	const router = useRouter();

	const { videoId } = router.query;

	const {
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount } = { viewCount: 0 },
	} = video;

	useEffect(() => {
		async function fetchLikeDislikeStats() {
			const response = await fetch(`/api/stats?videoId=${videoId}`);

			const data = await response.json();

			if (data.length > 0) {
				const favourited = data[0].favourited;
				if (favourited === 1) {
					setToggleLike(true);
				} else {
					setToggleDislike(true);
				}
			}
		}

		fetchLikeDislikeStats();
	}, [videoId]);

	const runRatingService = async (favourited) => {
		return await fetch('/api/stats', {
			method: 'POST',
			body: JSON.stringify({ videoId, favourited }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	const handleToggleLike = async () => {
		const val = !toggleLike;
		setToggleLike(val);
		setToggleDislike(toggleLike);

		const favourited = val ? 1 : 0;
		const response = await runRatingService(favourited);
	};

	const handleToggleDislike = async () => {
		setToggleDislike(!toggleDislike);
		setToggleLike(toggleDislike);

		const val = !toggleDislike;
		const favourited = val ? 0 : 1;
		const response = await runRatingService(favourited);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
			</Head>

			<NavBar />
			<Modal
				isOpen={true}
				contentLabel='Watch the video'
				onRequestClose={() => router.back()}
				className={styles.modal}
				overlayClassName={styles.overlay}>
				<iframe
					id='ytplayer'
					className={styles.videoPlayer}
					type='text/html'
					width='100%'
					height='360'
					src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
					frameBorder='0'></iframe>

				<div className={styles.likeDislikeBtnWrapper}>
					<div className={styles.likeBtnWrapper}>
						<div className={styles.btnWrapper}>
							<button onClick={handleToggleLike}>
								<Like selected={toggleLike} />
							</button>
						</div>
					</div>
					<button onClick={handleToggleDislike}>
						<div className={styles.btnWrapper}>
							<DisLike selected={toggleDislike} />
						</div>
					</button>
				</div>

				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>
						<div className={styles.col2}>
							<p className={cls(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>Cast: </span>
								<span className={styles.channelTitle}>{channelTitle}</span>
							</p>
							<p className={cls(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>View Count: </span>
								<span className={styles.channelTitle}>{viewCount}</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Video;
