import Link from 'next/link';
import cls from 'classnames';

import Card from './card';

import styles from './section-cards.module.css';

const SectionCards = ({ title, videos = [], size, shouldWrap = false, shouldScale }) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
				{videos.map((video, idx) => {
					return (
						<Link scroll={false} href={`/video/${video.id}`} key={video.id}>
							<a>
								<Card
									id={idx}
									imgUrl={video.imgUrl}
									size={size}
									shouldScale={shouldScale}
								/>
							</a>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default SectionCards;
