const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/main').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});

app.use(bodyParser.json());

app.use('/api/patients', patientRoutes);

app.listen(4000, () => {
    console.log('Server started on port 4000');
});
