const bodyParser = require("body-parser");
const express = require("express");
const BlockChain = require("./BlockChain");

const app= express();
const blockchain= new BlockChain();

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine','ejs');

let i=0;//no. of transactions currently recieved to put in the new Block

app.get('/api/blocks', (req, res)=>{        //displaying the BlockChain on a seperate Page for our convinience
    res.json(blockchain.Chain);
});

let t1=1;//creating a global space for storing first transaction
let t2=2;//creating a global space for storing second transaction
let t3=3;//creating a global space for storing third transaction
let t4=4;//creating a global space for storing fourth transaction


app.post('/api/mine', (req, res)=>{     //post block for minng a block if 4 transactions are within hand
    i++;

    if(i==1)
    {
        t1=req.body;
    }

    else if(i==2)
    {
        t2=req.body;
    }

    else if(i==3)
    {
        t3=req.body;
    }

    else{
        t4=req.body;        //if we have stored 4 transactions then we proceed to form a block

        const data= {t1,t2,t3,t4};

        i=0;

        blockchain.addBlock({data});
    }
    res.redirect('/api/blocks');
})

const port= 3000;

app.listen(port, ()=>{     
    console.log('listenign to server');
})