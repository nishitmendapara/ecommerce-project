var express = require('express');
var router = express.Router();
const auth = require("../middlewear/aouth");
const adminauth = require("../middlewear/adminauth");
const user = require("../controler/controler");
const usercontroler = require("../controler/usercontroler");
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

////login register
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/refresh', user.refresh);
 
////admin product
router.post('/addproduct', auth,adminauth, upload.single('image'), user.addproduct);
router.put('/updateproduct/:id', auth, adminauth, upload.single('image'), user.updateproduct);
router.delete('/deleteproduct/:id', auth, adminauth, user.deleteproduct);
router.get('/getcontact', auth, adminauth, user.getcontact);  
router.delete('/deletecontact/:id', auth, adminauth, user.deletecontact);  
router.get('/allusers', auth, adminauth, user.allusers); 
router.get('/allcart', auth, adminauth, user.getallcarts); 

////user product
router.get('/getproducts',auth, usercontroler.getproducts);
router.get('/singleproduct/:id', auth, usercontroler.singleproduct);
router.get('/searchproduct', auth, usercontroler.searchproduct);
router.post('/contact', auth, usercontroler.contact);

router.post('/cart', auth, usercontroler.addcart);
router.get('/getcart', auth, usercontroler.getcart);
router.delete('/deletecart', auth, usercontroler.deletecart);
router.put('/updatecart', auth, usercontroler.updatecart);

router.post('/logout', user.logout);  
 
module.exports = router;