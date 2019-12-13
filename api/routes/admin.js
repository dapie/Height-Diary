const { Router } = require('express');
const router = Router();
var Realm = require('realm');

/* get admin */
router.get('/admin/getUsers', async function (req, res, next) {
  if(req.session.authUser && req.session.authUser.isAdmin){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    let users = database.objects('Users');
    res.json(users)
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/admin/getUserInfo', async function (req, res, next) {
  if(req.session.authUser && req.session.authUser.isAdmin){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    if(req.body.id != undefined){
      let user = database.objects('Users').filtered('id="'+req.body.id+'"')[0];
      let heights = database.objects('Height').filtered('user_id="'+req.body.id+'"');
      user.heights = heights
      res.json(user)
    } else {
      res.json({})
    }
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/admin/toggleAdmin', async function (req, res, next) {
  if(req.session.authUser && req.session.authUser.isAdmin){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    database.write(() => {
      let user = database.objects('Users').filtered('email="'+req.body.email+'"')[0];
      user.isAdmin = !user.isAdmin
    });
    res.json({})
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/admin/changeName', async function (req, res, next) {
  if(req.session.authUser && req.session.authUser.isAdmin){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    database.write(() => {
      let user = database.objects('Users').filtered('email="'+req.body.email+'"')[0];
      user.name = req.body.name
    });
    res.json({})
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/admin/deleteHeights', async function (req, res, next) {
  if(req.session.authUser){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    database.write(() => {
      for( id in req.body.id ){
        let obj = database.objects('Height').filtered('id = "' + req.body.id[id] + '"')[0];
        database.delete(obj);
      }
    })
    res.json({})
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

router.post('/admin/deleteAccount', async function (req, res, next) {
  if(req.session.authUser){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    database.write(() => {
      let obj = database.objects('Users').filtered('email = "' + req.body.email + '"')[0];
      let heights = database.objects('Height').filtered('user_id = "' + obj.id + '"');
      console.log(heights)
      console.log(heights.length)
      for(var i = 0; i < heights.length-1; i++){
        database.delete(heights[i]);
      }
      database.delete(obj);
    })
    res.json({})
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

module.exports = router