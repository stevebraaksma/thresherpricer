const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
const methodOverride = require('method-override');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.json());