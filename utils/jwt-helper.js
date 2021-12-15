const jwt = require('jsonwebtoken');

 const accessSecret = process.env.SECRET;

 function jwtTokens({ _id, first_name, last_name, role }) {
   const account = { _id, first_name, last_name, role };
   const accessToken = jwt.sign(account, accessSecret, {
     expiresIn: 3 * 86400,
   });
   return { accessToken };
 }
 
module.exports = { jwtTokens }