const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3030;

connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('dev'));

//app.use('/categorie', require('./routers/categorie'));

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Homepage");
});

app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});