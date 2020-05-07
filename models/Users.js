const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UsersSchema = new Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: [true, 'The password is required']
	},
	token: {
		type: String
	}
});

UsersSchema.method.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;
	delete userObject.token;

	return userObject;
};

UsersSchema.methods.validPassword = function (password) {
	return bcryptjs.compareSync(password, this.password);
};

const Users = mongoose.model('Users', UsersSchema);
UsersSchema.set('autoIndex', false);

module.exports = Users;
