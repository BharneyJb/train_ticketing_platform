const express = require('express')
const app = express()
const mysql = require('mysql2/promise');
const apiClientRoute = require('./routes/apiClientRoute');
const apiAdminRoute = require('./routes/apiAdminRoute');

// Enable CORS for Flutter app
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json()); // Add JSON body parser
app.use(express.urlencoded({ extended: true }));



app.use(apiClientRoute);
app.use("/admin", apiAdminRoute);

app.listen(3000, () => console.log('server is listening on port 3000.\nvisit http://localhost:3000'))
