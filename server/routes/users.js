const errors = require('restify-errors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../db/module/Users');
const config = require('../config');


module.exports = server =>{
    server.post('/',async (req ,res, next)=>{

        if(!req.body) return res.sendStatus(400);
          
        const {email, password} = req.body;
        try{
            const user = await Users.findOne({email});
            if(user.password == hash(password)){
                console.log(user._id);
                const token = await jwt.sign({ userId: user._id }, config.JWT_SECRET );
                res.json({
                    type: true,
                    userId: user._id,
                    token
                });		
                next();
            }else{
                return next( new errors.ResourceNotFoundError('Authenticate Faild'));
            }
        }catch(err){
            return next(new errors.InternalError(err.message));
        }    
       
    });

    server.post('/registration', async (req, res, next)=> {  
        if(!req.body) return res.sendStatus(400);

        const {name, email, password } = req.body;

        const dataUser = new Users({
            name,
            email,
            password
        })
        
        try{
            const newUser = await dataUser.save();
            res.send(201, newUser);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    server.post('/profile', async (req, res, next)=> {  
        if(!req.body) return res.sendStatus(400);

        try{
            const userToken = await jwt.verify (req.body.userToken, config.JWT_SECRET);
            const dataUser = await Users.findById(userToken.userId);
            res.send(dataUser);
            next()
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${userToken.userId}`));
        }        
    });

    server.post('/play', async (req, res, next)=> {  
        if(!req.body) return res.sendStatus(400);
          
        try{
            const userToken = await jwt.verify (req.body.userToken, config.JWT_SECRET);
            const dataUser = await Users.findById(userToken.userId);
            res.send(dataUser);
            next()
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${userToken.userId}`));
        }             
    });

    server.put('/playUser', async (req, res, next)=> {  
        if(!req.body) return res.sendStatus(400);
        
        const userJWT = await jwt.verify (req.body.userUpdate, config.JWT_SECRET);
               
        try{
            const user = await Users.findByIdAndUpdate({_id: userJWT.userId}, {bet: req.body.cash});
            res.send(200, user);
            next()
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${userUpdate}`));
        }           
      });
}

function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}