const { Router } = require('express');
const router = Router();
var Realm = require('realm');

/* get leaderboards */
router.get('/leaderboards', async function (req, res, next) {
  if(req.session.authUser){
    var database = await Realm.open(
      {path: 'heightschema.realm'},
    );
    let yourResult
    let user = database.objects('Users').filtered('email = "' +req.session.authUser.email + '"')[0];
    let top = database.objects('Height').filter(item => 
      JSON.stringify(item.timestamp) === JSON.stringify(database
        .objects('Height')
        .filtered('user_id = "'+item.user_id+'"')
        .max('timestamp'))
    ).sort(function(a, b){
      return b.height-a.height;
    });
    for(var a in top){
      top[a]['name'] = database.objects('Users').filtered('id = "'+top[a].user_id+'"')[0].name;
      if(top[a].user_id == user.id){
        yourResult = {
          name: top[a].name,
          height: top[a].height,
          number: parseInt(a)+1
        }
      }
    }
    let average = database.objects('Height').avg('height').toFixed(1)
    if(top.length > 10) top = top.slice(0,10)
    res.json({top: top, average: average, your: yourResult})
  } else {
    res.status(401).json({ message: 'Ошибка' })
  }
})

module.exports = router