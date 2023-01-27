const express=require('express');
const router=express.Router()
const {createUser,login,getUser,updateUser,like,comment,getUserData}=require('../controllers/userController');
const {authentication, authorization}=require('../middlewares/authrentication')


//Users Api's
router.post('/register',createUser)
router.post('/login',login)
router.get('/getUser/:userId',authentication, authorization,getUser)
router.put('/updateUser/:userId',authentication, authorization,updateUser)


router.post('/like',like)
router.post('/comment',comment)
router.get('/getUserData',getUserData)



//errorHandling for wrong address
router.all("/**",(_, res) =>{
    res.status(400).send({status: false,message: "The api you request is not available"})
})

module.exports=router