const { Router } = require('express');
const router = Router();
var Realm = require('realm');
const bcrypt = require('bcrypt');

/* POST login */
router.post('/login', async function (req, res, next) {
  var response = {
    error: null
  }
  var database = await Realm.open(
    {path: 'heightschema.realm'},
  );

  let user = database.objects('Users').filtered('email = "' +req.body.email + '"')[0];
  if(user){
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(result) {
        //ВХОД
        req.session.authUser = { email: req.body.email}
      } else {
        response.error = "Не верен Email или пароль"
        res.send(response)
      } 
    });
  } else{
    response.error = "Не верен Email или пароль"
    res.send(response)
  }
})
module.exports = router