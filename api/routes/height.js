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
    let array = database.objects('Height').filtered('user_id = "' + user.id + '"');
    res.json(array)
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/height', async function (req, res, next) {
  if(req.session.authUser){
    var id
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    let user = database.objects('Users').filtered('email = "' +req.session.authUser.email + '"')[0];
    let objects = database.objects('Height');
    let length = objects.length
    if(objects[length-1]){
      id = objects[length-1].id + 1;
    } else {
      id = 0
    }
    var timestamp = new Date();
    database.write(() => {
      database.create('Height', {
        id: id,
        timestamp: timestamp, 
        user_id: user.id,
        height: parseFloat(req.body.height)
      });
    });
    let array = database.objects('Height').filtered('user_id = "' + user.id + '"');
    res.json(array)
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/height/deleteLast', async function (req, res, next) {
  if(req.session.authUser){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    let user = database.objects('Users').filtered('email = "' +req.session.authUser.email + '"')[0];
    database.write(() => {
      let last = database.objects('Height').filtered('user_id = "' + user.id + '"').sorted('timestamp', true)[0];
      if(last) database.delete(last);
    })
    let array = database.objects('Height').filtered('user_id = "' + user.id + '"');
    res.json(array)
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})
module.exports = router