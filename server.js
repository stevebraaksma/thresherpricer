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

    // console.log('heyyyy');
    // console.log(req.body.partNum[0])
    // console.log(req.body.partQty[0])
    // console.log(req.body.intPartNum[0])
    // console.log(req.body.partNum[1])
    // console.log(req.body.partQty[1])
    // console.log(req.body.intPartNum[1])
    // console.log(req.body)

    const partQtyArray = [];
    const partPriceArray = [];
    // let partPrice = [];
    // let partNumber = req.body.partNum[i]

    // put below in for loop


    for (let i = 0; i < req.body.partNum.length; i++) {
        console.log("bingo")
        

        
    
// this for loop is causing an error warning in console.
// It runs for all, even blank forms, and then below where it calculates
// the line length, there is no line length at all since it is null.


        axios({
            method: 'post',
            url: "https://api.mouser.com/api/v1/search/keyword?apiKey=53cd927d-3725-4cce-aaa8-50851d7c13f6",
            data: {
                SearchByKeywordRequest: {
                            keyword: req.body.partNum[i]
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
            

            partQtyArray.push(partQty);
            console.log(partQtyArray);



            partPriceArray.push(partPrice);
            console.log(partPriceArray);





            // console.log('cheetah');

            })
     




        
        .catch((err) => {
            console.log(err);
        })





    };






        
    res.redirect('/');


    // app.get('/', (req, res) => {
    //     res.render('index.ejs')
    // })


    // to do:
    // take the form data, push it to an array (maybe, an array of objects, each object having 3 fields)
    // then, will pass this data to the mouser function, which will for each loop through, sending a pricing req for each

});