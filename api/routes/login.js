const { Router } = require('express');
const router = Router();
var Realm = require('realm');
const bcrypt = require('bcrypt');

/* POST login */
router.post('/login', async function (req, res, next) {
  var database = await Realm.open(
    {path: 'heightschema.realm'},
  );
  let user = database.objects('Users').filtered('email = "' +req.body.email + '"')[0];
  if(user){
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(result) {
        req.session.authUser = { email: req.body.email, name: user.name }
        return res.json({ email: req.body.email, name: user.name })
      } else {
        res.status(401).json({ message: 'Не верен Email или пароль' })
      } 
    });
  } else{
    res.status(401).json({ message: 'Не верен Email или пароль' })
  }
})
module.exports = router