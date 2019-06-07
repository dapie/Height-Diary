const { Router } = require('express');
const router = Router();
var Realm = require('realm');
const bcrypt = require('bcrypt');

/* POST register */
router.post('/register', async function (req, res, next) {
  var database = await Realm.open(
    {path: 'heightschema.realm'},
  );
  if (database.objects('Users').filtered('email = "' +req.body.email + '"').length > 0){
    return res.status(401).json({ message: 'Email '+req.body.email+' занят.' })
  }
  var timestamp = new Date();
  let objects = database.objects('Users');
  let length = objects.length
  if(objects[length-1]){
    id = objects[length-1].id + 1;
  } else {
    id = 0
  }
  let hash = bcrypt.hashSync(req.body.password, 10);
  database.write(() => {
    database.create('Users', {
      id: id, 
      name: req.body.name, 
      email: req.body.email, 
      timestamp: timestamp, 
      password: hash,
      isAdmin: false
    });
  });
  req.session.authUser = { email: req.body.email, name: req.body.name }
  return res.json({ email: req.body.email, name: req.body.name })
})
module.exports = router