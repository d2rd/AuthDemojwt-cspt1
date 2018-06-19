const jwt = require('jsonwebtoken');
const SECRET = 'THIS SHOULD BE YOUR SECRET as an ENV VAR';

const makeToken = (user) => {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    name: user.username,
    iat: timestamp,
    // loggedIn: true,
  }
  const options = {
    expiresIn: '24h'
  }
  return jwt.sign(payload, SECRET, options)
}

const verifyToken = (req, res, next) => {
  // SECRET is available here as well
  const token = req.headers.authorization
      console.log(token) // test only
      console.log(req.headers) // test only
  // get the Authorization header
  // make suer it exists
  // if it doesn't send error
  if (token === undefined) {
    res.sendStatus(401)
    return
  }
  // if it does exist decode
  jwt.verify(token, SECRET, (err, payload) => {
  // make suere it decodes
    if (err) {
      res.statusStatus(401).json({msg: 'Must contain a valid token'})
      return
    }
    // pass the decoded payload on the req object
    req.jwtpayload = payload
    next()
  })
}

module.exports = {
  makeToken
}
