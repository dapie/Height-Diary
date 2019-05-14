const { Router } = require('express');
const router = Router();
var Realm = require('realm');

/* get height */
router.get('/height', async function (req, res, next) {
  if(req.session.authUser){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    let user = database.objects('Users').filtered('email = "' +req.session.authUser.email + '"')[0];
    let array = database.objects('Height').filtered('user_id = "' + user.id + '"').slice(-10);
    res.json(array)
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/height', async function (req, res, next) {
  if(req.session.authUser){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    let user = database.objects('Users').filtered('email = "' +req.session.authUser.email + '"')[0];
    var timestamp = new Date();
    database.write(() => {
      database.create('Height', {
        timestamp: timestamp, 
        user_id: user.id,
        height: parseInt(req.body.height)
      });
    });
    let array = database.objects('Height').filtered('user_id = "' + user.id + '"');
    res.json(array)
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})
module.exports = router