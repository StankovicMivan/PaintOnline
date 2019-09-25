var express = require('express');
var router = express.Router();
var UserService = require('../services/UserService');

/* GET users listing. */
router.get('/', async function(req,res,next){
  // res.json({error:"Invalid User UID."});
  let collection = await UserService.all();
  return res.json(collection);
});


//Adds a new user to the list
router.post('/',async (req,res,next) =>{
  const body = req.body;
  try{
    const user = await UserService.create(body);
    if(body.guid != null){
      res.cookie('guid',user.guid,{maxAge:900000,httpOnly:true});
      //create the user
      return res.status(201).json({user: user});
    }

  }
  catch(err)
  {
    if (err.name === 'ValidationError')
    {
      return res.status(400).json({ error: err.message });
    }

    // unexpected error
    return next(err);
  }
});
//get
router.get('/:id',async (req,res,next)=>
{
  try {
    const user = await UserService.retrive(req.params.id);
  }
  catch( err) {
    return next(err);
  }
});

//update the user by uid
router.put('/:id', async (req,res,next)=>
{
  try {
    const user = await UserService.update(req.params.id,req.body);
    return res.json({user: user});
  }
  catch (err) {
    //unexpected error
    return next(err);
  }
});
//remove the user from the user list by uid
router.delete('/:id', async (req,res,next)=>
{
  try {
    const user = await UserService.delete(req.params.id);
    return res.json({success:true});
  }catch (err) {
    //unexpercted error
    return next(err);
  }
});

module.exports = router;
