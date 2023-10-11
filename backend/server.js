const express = require('express')
const colors = require('colors')
const doeenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const cors = require('cors');

app.use(cors({
  origin: 'http://172.20.141.64:8080',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
