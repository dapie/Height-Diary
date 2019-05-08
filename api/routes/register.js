const { Router } = require('express');
const router = Router();
var Realm = require('realm');

/* POST register */
router.post('/register', async function (req, res, next) {
  var response = {
    error: null
  }

  var database = await Realm.open(
    {path: 'heightschema.realm'},
  );
  if (database.objects('Users').filtered('email = "' +req.body.email + '"').length > 0){
    response.error = "Email " + req.body.email + " занят.";
    res.send(response)
    return
  }
  var timestamp = new Date();
  var id = parseInt(database.objects('Users').max('id'));
  id = id ? id++: 0;
  database.write(() => {
    database.create('Users', {
      id: id, 
      name: req.body.name, 
      email: req.body.email, 
      timestamp: timestamp, 
      password: req.body.password
    });
  });
  res.send(response)
})
module.exports = router