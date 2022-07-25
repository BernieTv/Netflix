import { verifyToken } from '../lib/utils';

const UseRedirectUser = (context) => {
	const token = context.req ? context.req.cookies.token : null;
	const userId = verifyToken(token);

	return { userId, token };
};

export default UseRedirectUser;
