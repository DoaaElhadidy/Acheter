const router= require('express').Router();
const algoliasearch= require('algoliasearch');
const client=algoliasearch('4G2KXOXKQG','31884b4341c942c8fd99beef83e3c3bb');
const index=client.initIndex('ecommerce');

router.get('/',(req,res,next)=>{
    if(req.query.query)
    {
        index.search({
            query:req.query.query,
            page:req.query.page,

        },(err,content)=>{
            res.json({
                success:true,
                message:"Here is your search",
                content:content,
                search_result:req.query.query
            });
        });
       
    }
});

module.exports=router;