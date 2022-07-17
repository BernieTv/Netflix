import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Login.module.css';

const Login = () => {
	const handleLoginWithEmail = (e) => {
		e.preventDefault();
		console.log('hi button');
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
					/>
					<p className={styles.userMsg}></p>
					<button onClick={handleLoginWithEmail} className={styles.loginBtn}>
						Sign In
					</button>
				</div>
			</main>
		</div>
	);
};

export default Login;
