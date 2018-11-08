const express = require('express');
const app = express();
const cors = require('cors');
// const router = express.Router();

app.use(cors());

app.get('/', (req,res)=>{
    res.json([
        {id:1, username: "Sasha"},
        {id:2, username:"Vlad"}
    ]);
});

app.listen(3001,()=>{
    console.log("Listened 3001");
});


// module.exports = router;