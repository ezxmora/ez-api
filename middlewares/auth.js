const Users = require('../models/Users');
const whitelist = ['', ''];

module.exports = {
	verifyToken: (req, res, next) => {
		const token = req.get('token') || req.body.token || req.query.token;

		if (!token) return res.json({ ok: false, message: 'No token has been specified' });

		Files.findById(token, (err, user) => {
			if (err)
				return res.status(401).json({
					ok: false,
					err: 'An error has occurred',
				});

			if (!user)
				return res.json({
					ok: false,
					err: 'Not a valid token',
				});
		});

		req.token = user;
		next();
	},

	lanCORS: (req, res, next) => {
		const addreses = ['::1', '192.168.1.'];
		if (addreses.indexOf(req.connection.remoteAddress) !== -1) {
			next();
		} else {
			return res.status(403).send({
				success: false,
				data: {
					message: 'You have no access to this method.',
				},
			});
		}
	},
};
