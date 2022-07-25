import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';
import { spawn } from 'child_process';

export default async function middleware(req, ev) {
	if (process.version) {
		spawn('ls', ['-lh']);
	}

	const token = req ? req.cookies.token : null;
	const userId = verifyToken(token);

	const { pathname } = req.nextUrl;

	if (pathname.includes('/api/login') || userId || pathname.includes('/static')) {
		return NextResponse.next();
	}

	if ((token && userId) || pathname.includes('/api/login')) {
		return NextResponse.next();
	}

	if (!token && pathname !== '/login') {
		return NextResponse.redirect('/login');
	}

	return NextResponse.next();
}
