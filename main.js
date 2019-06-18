const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
require("dotenv").config()

app.use(morgan("short"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use("/", require("./routes"))

// Database connection
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${
			process.env.DB_NAME
		}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useCreateIndex: true }
	)
	.then(() => console.log(`Connected to ${process.env.DB_NAME} in ${process.env.DB_HOST}`))
	.catch(err => console.log(err))

mongoose.Promise = global.Promise

// API port listening
app.listen(process.env.PORT, function() {
	console.log(`API running in the port ${process.env.PORT}`)
})
