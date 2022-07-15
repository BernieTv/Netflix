import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './navbar.module.css';

const NavBar = ({ username }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const router = useRouter();

	const handleOnClickHome = (e) => {
		e.preventDefault();
		router.push('/');
	};

	const handleOnClickMyList = (e) => {
		e.preventDefault();
		router.push('/browse/my-list');
	};

	const handleShowDropdown = (e) => {
		e.preventDefault();
		setShowDropdown(!showDropdown);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Link href='/'>
					<a className={styles.logoLink}>
						<div className={styles.logoWrapper}>Netflix</div>
					</a>
				</Link>

				<ul className={styles.navItems}>
					<li className={styles.navItem} onClick={handleOnClickHome}>
						Home
					</li>
					<li className={styles.navItem2} onClick={handleOnClickMyList}>
						My List
					</li>
				</ul>

				<nav className={styles.navContainer}>
					<div>
						<button className={styles.userNameBtn} onClick={handleShowDropdown}>
							<p className={styles.username}>{username}</p>
							{/* Expand more icon */}
						</button>
						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<Link href='/login'>
										<a className={styles.linkName}>Sign out</a>
									</Link>
									<div className={styles.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavBar;