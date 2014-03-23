/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
    if (req.session.authenticated) {
        User.findOne({user_id:req.session.user_id}, function(error, userInfo){
            if(error) req.send("500", 500);
            else{
                delete userInfo.password;
                req.session.userInfo = userInfo;
            }
        });
        return next();
    }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
