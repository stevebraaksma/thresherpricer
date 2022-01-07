const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
const methodOverride = require('method-override');


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.json());



app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.post('/parts', (req, res) => {
    // res.render('index.ejs')

    console.log('heyyyy');
    console.log(req.body.partNum[0])
    console.log(req.body.partQty[0])
    console.log(req.body.intPartNum[0])
    console.log(req.body.partNum[1])
    console.log(req.body.partQty[1])
    console.log(req.body.intPartNum[1])
    console.log(req.body)
        
    res.redirect('/');

    // to do:
    // take the form data, push it to an array (maybe, an array of objects, each object having 3 fields)
    // then, will pass this data to the mouser function, which will for each loop through, sending a pricing req for each

})