const express  = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({path:'enviorment.env'});

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 2000 || process.env.PORT

app.use('/assets',express.static('assets'))

const connect = require('./server/database/dbconfig')

const router = require('./server/routes/routes')
app.use(router);


app.listen(port,()=>{
    console.log(`server Running on http://localhost:${port}`);
});