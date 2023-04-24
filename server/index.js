const express = require('express');
const app = express();

require('./database');
require('./models/User');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
const requireToken = require('./middleware/authTokenRequired');

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})