require('dotenv').config();
const cors = require('cors');
const autiIncrement = require('mongoose-id-autoincrement');
const userRoute = require('./routes/user_route');

const orderRoute = require('./routes/order_route');
const courierRoute = require('./routes/courier_route');
const AdminRoute = require('./routes/Admin_route');

const connectDB = require('./connection/connection');
const express = require('express');
const app = express();

app.use(cors()); // Enable CORS middleware before routes
app.use(express.json()); // Middleware to parse JSON

app.get('/', (req, res) => {
    res.send('Home page');
});

app.use('/', userRoute); // User routes
app.use('/order', orderRoute);
app.use('/courier', courierRoute);
app.use('/admin', AdminRoute);
const port = 8000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log('listening on port 8000....');
        });
    } catch (error) {
        console.log(error);
    }
};
start();