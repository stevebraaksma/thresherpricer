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
// const intPartNum = [];   come back to this one
let partPriceArray = [];



app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.get('/results', (req, res) => {
    res.render('results.ejs', {
        results: partQtyArray
    })
    partQtyArray = [];
})




app.post('/parts', (req, res) => {


    // res.render('index.ejs')

    // console.log('heyyyy');
    // console.log(req.body.partNum[0])
    // console.log(req.body.partQty[0])
    // console.log(req.body.intPartNum[0])
    // console.log(req.body.partNum[1])
    // console.log(req.body.partQty[1])
    // console.log(req.body.intPartNum[1])
    // console.log(req.body)



    for (let i = 0; i < req.body.partNum.length; i++) {
        console.log("bingo")

        let currentPartNum = req.body.partNum[i]
        

        
    
// this for loop is causing an error warning in console.
// It runs for all, even blank forms, and then below where it calculates
// the line length, there is no line length at all since it is null.


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
            }

            console.log(partQty);
            console.log(partPrice);
            

            partNumArray.push(currentPartNum);
            console.log(partNumArray);

            partQtyArray.push(partQty);
            console.log(partQtyArray);

            // intPartNumArray.push(***currentPartNum****);
            // console.log(intPartNumArray);
            // first pass to ejs, later come back and add this


            partPriceArray.push(partPrice);
            console.log(partPriceArray);

            })
        .catch((err) => {
            console.log(err);
        })
    };
    
    res.redirect('/results');

});