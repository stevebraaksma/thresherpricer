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

let partNumArray = [];
let partQtyArray = [];
let intPartNumArray = [];
let partPriceArray = [];






app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.get('/results', (req, res) => {
    res.render('results.ejs', {
        partNum: partNumArray,
        partQty: partQtyArray,
        intPartNum: intPartNumArray,
        partPrice: partPriceArray,
    })
    partNumArray = [];
    partQtyArray = [];
    intPartNumArray = [];
    partPriceArray = [];
})




app.post('/parts', (req, res) => {




    for (let i = 0; i < req.body.partNum.length; i++) {
        console.log("bingo")

        let currentPartNum = req.body.partNum[i]
        

        axios({
            method: 'post',
            url: "https://api.mouser.com/api/v1/search/keyword?apiKey=53cd927d-3725-4cce-aaa8-50851d7c13f6",
            data: {
                SearchByKeywordRequest: {
                            keyword: currentPartNum
                    }
            }
        })
        .then( (response)=>{
            let partQty = req.body.partQty[i];
            let intPartNum = req.body.intPartNum[i];
            let partPrice = '';

            let priceBreakArrayLength = response.data.SearchResults.Parts[0].PriceBreaks.length;

            Number(priceBreakArrayLength);
            priceBreakArrayLength = priceBreakArrayLength -1;

            let priceBreakArray = response.data.SearchResults.Parts[0].PriceBreaks
            console.log(priceBreakArray);
            
            // ***** need to fix to add pricing for "less than" price break
            if (partQty >= priceBreakArray[priceBreakArrayLength].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength].Price)
            } else if 
                (partQty >= priceBreakArray[priceBreakArrayLength-1].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength-1].Price)
            } else if 
                (partQty >= priceBreakArray[priceBreakArrayLength-2].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength-2].Price)
            } else if 
                (partQty >= priceBreakArray[priceBreakArrayLength-3].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength-3].Price)
            } else if 
                (partQty >= priceBreakArray[priceBreakArrayLength-4].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength-4].Price)
            } else if 
                (partQty >= priceBreakArray[priceBreakArrayLength-5].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength-5].Price)
            } else if 
                (partQty >= priceBreakArray[priceBreakArrayLength-6].Quantity) {
                partPrice = (priceBreakArray[priceBreakArrayLength-6].Price)
            } else {
                partPrice = (priceBreakArray[0].Price)
            }

            console.log(partQty);
            console.log(partPrice);
            
            partNumArray.push(currentPartNum);
            console.log(partNumArray);

            partQtyArray.push(partQty);
            console.log(partQtyArray);

            intPartNumArray.push(intPartNum);
            console.log(intPartNumArray);

            partPriceArray.push(partPrice);
            console.log(partPriceArray);

            })
        .catch((err) => {
            console.log(err);
        })
    };
    
    res.redirect('/results');

});