const { Router } = require('express');
const router = Router();

/* POST logout */
router.post('/logout', async function (req, res, next) {
  delete req.session.authUser
  res.json({ ok: true })
})
module.exports = router