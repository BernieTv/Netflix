import { useState } from 'react';
import Image from 'next/image';

import cls from 'classnames';
import { motion } from 'framer-motion';

import styles from './card.module.css';

const Card = ({
	imgUrl = 'https://unsplash.com/photos/evlkOfkQ5rE',
	size = 'medium',
}) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);

	const classMap = {
		large: styles.lgItem,
		medium: styles.mdItem,
		small: styles.smItem,
	};

	const handleOnError = () => {
		console.log('error occurred');
		setImgSrc('https://unsplash.com/photos/evlkOfkQ5rE');
	};

	return (
		<div className={styles.container}>
			<motion.div
				className={cls(styles.imgMotionWrapper, classMap[size])}
				whileHover={{ scale: 1.2 }}>
				<Image
					src={imgSrc}
					alt='image'
					layout='fill'
					className={styles.cardImg}
					onError={handleOnError}
				/>
			</motion.div>
		</div>
	);
};

export default Card;
