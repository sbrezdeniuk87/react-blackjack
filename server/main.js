const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/',(req ,res)=>{
    console.log(req.body);
    res.json([
        {id:1, username: "Sasha"},
        {id:2, username:"Vlad"}
    ]);
   
});

app.listen(3001,()=>{
    console.log("Listened 3001");
});


// module.exports = router;