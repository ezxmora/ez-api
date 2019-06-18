const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UsersSchema = new Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	token: {
		type: String
	}
})

const Users = mongoose.model("Users", UsersSchema)
UsersSchema.set("autoIndex", false)

module.exports = Users
