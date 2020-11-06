const express = require('express');
const morgan = require('morgan');
const dotenv= require('dotenv');
const colors = require('colors');
const cors = require('cors')
const connectDb = require('./config/db');
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const authRoute = require('./api/routes/auth')
const orderRoute = require('./api/routes/order')








const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({extended : false}));
dotenv.config({path : './config/config.env'})


connectDb();
app.use('/api/products' , productRoute)
app.use('/api/user' , userRoute)
app.use('/api/auth' , authRoute)
app.use('/api/orders' , orderRoute)


const PORT = process.env.PORT;

app.listen(PORT , console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))