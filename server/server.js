//require = import 
//import dependencies 
const express = require('express');
//express is web framework to create http routes like get or post 

const morgan = require('morgan');
//http request -- simplify login request to ur app 

const bodyParser = require('body-parser');
//data reader

const mongoose = require('mongoose');
//communicate directly with database 


//middleware 34n aconnect el frontend bl backend using cors 
    //npm install cors --save
const cors= require('cors');
const config = require('./config');


// mongoose
 mongoose.set('useCreateIndex',true);
 mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true}, err=> {
 
    if(err)
    {
        console.log("Error");
    }
    else
    {
        console.log("Connected to database");
    }
});
// const User = mongoose.model('user',{username:String});
// const NewUser = new User({
//     username: 'Mayar'
// });
// NewUser.save().then(()=>console.log('Saved'));


                //-- Teach NodeJS  how to use dependencies 

const app = express();      //create instance of express 
app.use(bodyParser.json()); // reading data in json format 
app.use('/upload',express.static('/uploads'));
// app.use('/upload', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.urlencoded({extended:false})); //false because we want to read img as well 

app.use(morgan('dev'));//lock all the request on the terminal 
app.use(cors());//kda m4 gyb2a fe errors fl frontend ama a3ml api 

//Routes
//1-User Router
const userRouter = require('./router/account');
app.use('/api/accounts',userRouter);

//2-Category Router
const mainRouter = require('./router/main');
app.use('/api',mainRouter);

//3-Product Router
const sellerRouter = require('./router/seller');
app.use('/api/seller',sellerRouter);

//4-Product Search
const productSearchRouter = require('./router/product-search');
app.use('/api/search',productSearchRouter);


//5-Admin Router
const adminRouter = require('./router/admin');
app.use('/api/admin',adminRouter);


// app.get('/',(req,res,next)=>{
//     res.json({user:'Mayar Sara'});
// });

app.listen(3000,err=>{
    console.log("listen on server");
});
