import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { magic } from '../lib/magic-client';

import styles from '../styles/Login.module.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [userMsg, setUserMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const handleComplete = () => {
			setIsLoading(false);
		};

		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	}, [router]);

	const handleOnChangeEmail = (e) => {
		setUserMsg('');
		const email = e.target.value;
		setEmail(email);
	};

	const handleLoginWithEmail = async (e) => {
		e.preventDefault();

		if (email) {
			if (email === 'bektuxtasinov@gmail.com') {
				setIsLoading(true);

				try {
					const didToken = await magic.auth.loginWithMagicLink({
						email,
					});

					if (didToken) {
						router.push('/');
					}
				} catch (error) {
					console.error('Something went wrong logging in', error);
					setIsLoading(false);
				}
			} else {
				setUserMsg('Something went wrong logging in');
			}
		} else {
			setUserMsg('Enter a valid email address');
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix SignIn</title>
			</Head>

			<header className={styles.header}>
				<div className={styles.headerWrapper}>
					<Link href='/'>
						<a className={styles.logoLink}>
							<div className={styles.logoWrapper}>
								<Image
									src={'/static/netflix.svg'}
									alt='Netflix logo'
									width='128px'
									height='34px'
								/>
							</div>
						</a>
					</Link>
				</div>
			</header>

			<main className={styles.main}>
				<div className={styles.mainWrapper}>
					<h1 className={styles.signInHeader}>Sign In</h1>

					<input
						type='text'
						placeholder='Email address'
						className={styles.emailInput}
						onChange={handleOnChangeEmail}
					/>
					<p className={styles.userMsg}>{userMsg}</p>
					<button onClick={handleLoginWithEmail} className={styles.loginBtn}>
						{isLoading ? 'Loading...' : 'Sign In'}
					</button>
				</div>
			</main>
		</div>
	);
};

export default Login;
