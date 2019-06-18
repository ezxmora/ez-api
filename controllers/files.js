const Files = require("../models/Files")

module.exports = {
	show: (req, res) => {
		Files.findById(req.params.id, (err, file) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				})
			}

			res.json({
				ok: true,
				file
			})
		})
	}
}
