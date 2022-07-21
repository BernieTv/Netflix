import jwt from 'jsonwebtoken';
import { findVideoIdByUser, updateStats, insertStats } from '../../lib/db/hasura';

export default async function Stats(req, res) {
	if (req.method === 'POST') {
		try {
			const token = req.cookies.token;
			if (!token) {
				res.status(403).send({});
			} else {
				const { videoId, favourited, watched = true } = req.body;

				if (videoId) {
					const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
					const userId = decodedToken.issuer;

					const doesStatsExist = await findVideoIdByUser(token, userId, videoId);

					if (doesStatsExist) {
						const response = await updateStats(token, {
							favourited,
							watched,
							userId,
							videoId,
						});
						res.send({ data: response });
					} else {
						const response = await insertStats(token, {
							favourited,
							watched,
							userId,
							videoId,
						});
						res.send({ data: response });
					}
				}
			}
		} catch (error) {
			console.error('Error occurred /stats', error);
			res.status(500).send({ done: false, error: error?.message });
		}
	}
}
