const router = require('express').Router();
const checkJWT = require('../middlewares/check-jwt');
const multer = require('multer');
const faker = require('faker');
const Category = require('../models/category');
const Product = require('../models/product');
const User=require('../models/user');



//Get All Categories
router.route('/categories')
    .get((req, res, next) => {
        Category.find({}, (err, categories) => {
            res.json({
                success: true,
                categories: categories,
                message: "Successful"
            });
        })
    })
    //Create Category
    .post((req, res, next) => {
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            category: category,
            message: "Successful"
        });
    });

//Get specific category
//Create Single Category API
router.get('/categories/:id', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    //To prevent doing many mongo operations (callback hell)
    async.parallel([
        function (callback) {
            Product.count({ category: req.params.id }, (err, count) => {
                var totalProducts = count;
                callback(err, totalProducts)
            });
        },
        //To Prevent error if category has no products
        function (callback) {
            Product.find({ category: req.params.id })
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                });
        },
        function (callback) {
            Category.findOne({ _id: req.params.id }, (err, category) => {
                callback(err, category)
            });
        }
    ],
        function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            var category = results[2];
            res.json({
                success: true,
                message: 'category',
                products: products,
                categoryName: category.name,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage)
            });
        }
    );
});

//delete Catgeory
router.delete('/category/:id', async (req, res, next) => {
    try {
        var result = await Category.deleteOne({ _id: req.params.id });
        if (result) {
            res.send({ result });
        } else {
            res.status(404).send({ error: "user not found" })
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});



//edit Category 
router.put('/:id', async (req, res, next) => {
    try {
        var result = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (result) {
            res.send({ result });
        }
        else {
            res.status(404).send({ error: "Category not found" })
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});



//Edit Category
// router.post('/:id', (req,res,next)=>{
//     Category.findOne({_id:req.decoded.category._id},(err,category)=>{
//       if(err)
//       return next(err);
//       if(req.body.name) category.name=req.body.name;
     
//       category.save();
//       res.json({
//         success: true,
//         category: category.name,
//         message: "Successful, Editing Category"
//       });
//     });
//   });


//Get products
router.get('/products', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
        function (callback) {
            Product.count({}, (err, count) => {
                var totalProducts = count;
                callback(err, totalProducts)
            });
        },
        function (callback) {
            Product.find({})
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .populate('review')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                });
        },
        function (callback) {
            Category.findOne({ _id: req.params.id }, (err, category) => {
                callback(err, category)
            });
        }
    ],
        function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            res.json({
                success: true,
                message: 'category',
                products: products,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage)
            });
        }
    );
});

//delete User
router.delete('/accounts/users/:id',async(req,res,next)=>{

    try {
        var result = await User.deleteOne({ _id: req.params.id });
        if (result) {
            res.send({ result });
        } else {
            res.status(404).send({ error: "User not found" })
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//delete Product
router.delete('/products/:id',async(req,res,next)=>{

    try {
        var result = await Product.deleteOne({ _id: req.params.id });
        if (result) {
            res.send({ result });
        } else {
            res.status(404).send({ error: "Product not found" })
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});



// Admin Login API
router.post('/login', (req, res, next) => {
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
                mesage: "Hello Admin, Enjoy your token",
                token: token
              });
            }
          }
      
        });
      });

      

module.exports = router;
