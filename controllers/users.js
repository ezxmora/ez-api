const Users = require('../models/Users');
const bcryptjs = require('bcryptjs');
const otplib = require('otplib');
const QRCode = require('qrcode');
const { signToken } = require('../middlewares/auth');

module.exports = {
	// Adds an user
	add: (req, res) => {
		let body = req.body;

		let user = new Users({
			email: body.email,
			password: bcryptjs.hashSync(body.password, 10),
			token: otplib.authenticator.generateSecret()
		});

		user.save((err, user) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				user
			});
		});
	},
	
	// Authenticates an user
	auth: (req, res) => {
		Users.findOne({email: req.body.email}, (err, user)=> {
			if (err) return res.status(401).json({
				ok: false,
				err
			});

			if (!user || !user.validPassword(req.body.password)) {
				return res.status(401).json({
					ok: false,
					err: 'User or Password is invalid'
				});
			} else if (!req.headers['x-otp']) {
				return res.status(400).json({
					ok: false,
					err: { message: 'You need the OTP code to continue.' }
				});
			}

			const verified = otplib.authenticator.checkDelta(req.headers['x-otp'], user.token);

			if (Number.isInteger(verified)) {
				res.json({
					ok: true,
					token: signToken(user)
				});
			} else {
				return res.status(401).json({
					ok: false,
					err: 'Invalid code'
				});
			}
		});
	},

	// Gets the QR code of an user
	qr: (req, res) => {
		Users.findOne({email: req.body.email}, (err, user) => {
			if (err) {
				return res.status(401).json({
					ok: false,
					err
				});
			}

			if (!user || !user.validPassword(req.body.password)) {
				return res.status(401).json({
					ok: false,
					err: 'User or Password is invalid'
				});
			}

			const secret = otplib.authenticator.keyuri(`${user.email} @ EzAPI`, 'EzAPI', user.token);
			QRCode.toDataURL(secret, (err, data_url) => {
				if (err) {
					return res.status(401).json({
						ok: false,
						err
					});
				}

				return res.status(200).json({
					ok: true,
					message: 'Verify OTP',
					dataURL: data_url,
				});
			});
		});
	}
};
