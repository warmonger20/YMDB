import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';

export default (req, res, next) => {

  const JWT_SECRET = 'Its a secret';

  console.log('Auth Module');
  if (!req.header('Cookie')){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
    try {

    let cookie = req.header('Cookie').split(';');
    let token = cookie.filter(x => {
      let indexOfx = x.indexOf("token");
      return (indexOfx!==-1)
    })
    token = token[0].split('=')[1];
    // console.log(token);

    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    console.log("Auth succesfull");
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}