const { Router } = require('express')
var Realm = require('realm');

let HeightSchema = {
  name: 'Height',
  properties: {
    timestamp: 'date',
    user_id: 'int',
    height: 'int'
  }
};

var database = new Realm({
  path: 'heightschema.realm',
  schema: [HeightSchema]
});

const router = Router()

const height = [
  { name: 'Test' },
  { name: 'Test' },
  { name: 'Sébastien' }
]

/* GET height */
router.get('/height', function (req, res, next) {
  let posts = database.objects('Height').sorted('timestamp', true);
  res.json(posts)
})

/* POST height. */
router.get('/height/:id', function (req, res, next) {
  console.log(database);
  var height = 180,
    user_id = parseInt(req.params.id),
    timestamp = new Date();
   console.log("here");
  database.write(() => {
    database.create('Height', {user_id: user_id, height: height, timestamp: timestamp});
  });
   console.log("HERE");
  res.send('POST request to the homepage');
})

module.exports = router
