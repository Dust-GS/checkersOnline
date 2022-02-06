const express = require('express');
const cors = require('cors')
const app = express();
const users = require('./routes/users');
const https = require("https");
const fs = require('fs');

const options = {
    //key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    //cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
    key: fs.readFileSync('./tls/plik_klucz.key'),
    key: fs.readFileSync('./tls/plik_certyfikat.crt')
};


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use('/users', users);

require('dotenv').config();

app.listen(5000, () => {
    console.log(`API server listening at http://localhost:5000`);
});


// const dbConnData = {
//     host: process.env.MONGO_HOST || '127.0.0.1',
//     port: process.env.MONGO_PORT || 27017,
//     database: process.env.MONGO_DATABASE || 'local'
// };

// const mongoose = require('mongoose');

// mongoose
//   .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(response => {
//     console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
//     const port = process.env.PORT || 5000
//     app.listen(port, () => {
//       console.log(`API server listening at http://localhost:${port}`);
//     });
//   })
//   .catch(error => console.error('Error connecting to MongoDB', error));