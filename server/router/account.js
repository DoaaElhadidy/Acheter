const router =require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const Order = require('../models/order');
const config = require('../config');//for token and hashing user object 
const checkJWT = require('../middlewares/check-jwt');


//User Sign Up API
router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    
  let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;
    user.isAdmin = req.body.isAdmin;
   
    //check if the user is existed or not checking mail 
    User.findOne({ email: req.body.email }, (err, existingUser) => {
     if (existingUser) {
       res.json({
         success: false,
         message: 'Account with that email is already exist'
       });
   
     } else {
       user.save();
   

       //encrypt user 
       var token = jwt.sign({
         user: user
       }, config.secret);
 
        //respond to frontend   
       res.json({
         success: true,
         message: 'Enjoy your token',
         token: token
       });
     }
   
    });
   });
   
   //User Login API
   router.post('/login', (req, res, next) => {
//hydwr 3la mail zai el mb3out fl body law l2aah hy7to fl user 
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
  //mfesh user l2n l emails not matched 
      if (!user) {
        res.json({
          success: false,
          message: 'Authenticated failed, User not found'
        });
      } else if (user) {
  
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
          });
        } else {
          var token = jwt.sign({
            user: user
          }, config.secret);
  
          res.json({
            success: true,
            mesage: "Enjoy your token",
            token: token,
            isAdmin:user.isAdmin
          });
        }
      }
  
    });
  });


   //Admin Login API
   router.post('/login/admin', (req, res, next) => {
    //hydwr 3la mail zai el mb3out fl body law l2aah hy7to fl user 
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err) throw err;
      //mfesh user l2n l emails not matched 
          if (!user) {
            res.json({
              success: false,
              message: 'Authenticated failed, Admin not found'
            });
          } else if (user) {
      
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
              res.json({
                success: false,
                message: 'Authentication failed. Wrong password'
              });
            } else {
              var token = jwt.sign({
                user: user
              }, config.secret);
      
              res.json({
                success: true,
                mesage: "Hello Admin ! Enjoy your token",
                token: token,
                isAdmin:user.isAdmin
              });
            }
          }
      
        });
      });
  //User Profile
  router.route('/profile')
  .get(checkJWT, (req,res,next)=>{
    User.findOne({_id:req.decoded.user._id},(err,user)=>{
    res.json({
      success: true,
      user: user,
      message: "Successful"
    });
  });
})


//Admin profile
router.route('/profile/admin')
.get(checkJWT, (req,res,next)=>{
  User.findOne({_id:req.decoded.user._id},(err,user)=>{
  res.json({
    success: true,
    user: user,
    message: "Successful"
  });
});
})
// Edit profile
.post(checkJWT, (req,res,next)=>{
  User.findOne({_id:req.decoded.user._id},(err,user)=>{
    if(err)
    return next(err);
    if(req.body.name) user.name=req.body.name;
    if(req.body.email) user.email=req.body.email;
    if(req.body.password) user.password=req.body.password;
    if(req.body.passwordConfirm) user.passwordConfirm=req.body.passwordConfirm;

    user.isSeller=req.body.isSeller;
    user.save();
    res.json({
      success: true,
      user: user,
      message: "Successful, Editing profile"
    });
  });
});

  //User address
  router.route('/address')
  .get(checkJWT, (req,res,next)=>{
    User.findOne({_id:req.decoded.user._id},(err,user)=>{
    res.json({
      success: true,
      address: user.address,
      message: "Successful"
    });
  });
})

// Edit address
.post(checkJWT, (req,res,next)=>{
  User.findOne({_id:req.decoded.user._id},(err,user)=>{
    if(err)
    return next(err);
    if(req.body.addr1) user.address.addr1=req.body.addr1;
    if(req.body.addr2) user.address.addr2=req.body.addr2;
    if(req.body.city) user.address.city=req.body.city;
    if(req.body.state) user.address.state=req.body.state;
    if(req.body.country) user.address.country=req.body.country;
    if(req.body.postalCode) user.address.postalCode=req.body.postalCode;

    user.save();
    res.json({
      success: true,
      user: user.address,
      message: "Successful, Editing address"
    });
  });
});



//Order API
router.get('/orders',checkJWT,(req,res,next)=>{
  Order.find({owner:req.decoded.user._id})
  .populate('products.prod')
  .populate('owner')
  .exec((err,orders)=>{
      if(err){
        res.json({
          success:false,
          message:"Couldn't find your order"
        });
      }
      else
      {
        res.json({
          success:true,
          message:"Found your Order",
          orders:orders
        });
      }
  });
});

//Post Order
router.post('/order', checkJWT,(req,res,next)=>{
        let order = new Order();
          order.owner = req.decoded.user._id;
          if(req.body.totalPrice) order.totalPrice = req.body.totalPrice;
          order.products=[{prod:req.body.product,quantity:req.body.quantity}];
         // res.send(order);
          order.save();
          console.log(order);
          res.json({
              success:true,
              message:"Successfully added the order"
            });
          });

 //Single Order API
 //Get Specific Order       
          router.get('/orders/:id',checkJWT,(req,res,next)=>{
            Order.find({_id:req.params.id})
            .populate('products.prod')
            .populate('owner')
            .exec((err,order)=>{
                if(err){
                  res.json({
                    success:false,
                    message:"Couldn't find your order"
                  });
                }
                else
                {
                  res.json({
                    success:true,
                    message:"Found your Order",
                    order:order
                  });
                }
            });
          });


          
//url : api/accounts/users
//Get All Users
   router.route('/users')
   .get((req,res,next)=>{
    User.find({},(err,users)=>{
      if(err){
        res.send('Something Wrong!');
        next();
      }
         res.json({
             success:true,
             users:users,
             message:"Successful"
         });
     })
 })
module.exports=router;
