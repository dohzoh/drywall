/**
 * SignupController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var SignupController = {
    
  
    /**
    * Action blueprints:
    *    `/signup/index`
    *    `/signup`
    */
    index: function (req, res) {
        var self = this;
    //console.log("req.body", req.body);
        if(req.method !== 'POST'){
            return res.view();
        }
        else{
            var list = [];
            for(var key in User)
                list.push(key);
//            console.log("User", list);
            // this.param('username')
            // this.param('email')
            // this.param('password')
            console.info("createUser:", req.body);
//            console.log(User);

            User.create(
                {
//                    user_id: req.body.username
                    name: req.body.username
                    , email: req.body.email
                    , password: req.body.password
                    , encrypted_password: req.body.password
                    , isActive: true
                }
                , function(error, results){
                    if(error) {
                        if("ValidationError" in error){
                            console.log(error.ValidationError.name);
                            console.log(error.ValidationError.email);
                            console.log(error.ValidationError.password);
                        }

                        var holds = {
                            username: req.body.username
                            , email:req.body.email
                            , error: [
                                'name'
                            ]
                            , errfor: {
                                name: 'required'
                            }
                        }

                        console.warn("user create failed", error);
                        return res.json(holds);
                    }
                    else{
                        console.log("create success", results);
                        return res.json({"success": true});
                    }
                }

            );

        }
    },

    _crateUser: function(req, res){
        var self = SignupController;
        // this.param('username')
        // this.param('email')
        // this.param('password')
        console.warn("createUser:", req.body);
        console.log(User);
/*
        User.create(
            {
                username: this.param('username')
                , email: this.param('email')
                , password: this.param('password')
                , isActive: true
            }
            , function(error, results){
                if(!error){
                    console.warn("createUser Success");
                    controller.redirect('/');
                }

                else if(error.code !== 'ConditionalCheckFailedException'){
                    controller.req.flash('error', 'ConditionalCheckFailedException');
                    console.error(error);
                    controller.res.redirect('signup');
                }
                else{
                    console.error(error.code, error);
                    controller.res.redirect('signup');
                }
            });
*/
    }

    ,


  /**
   * Action blueprints:
   *    `/signup/add`
   */
   add: function (req, res) {
//console.log("req.method", req.method);
//console.log("req.body", req.body);
//res.send({redirect: '/'});

  res.writeHead(302, {
      'Location': '/'
  });
  res.end();
//res.redirect("/");
    // Send a JSON response
//    return res.view(req.body);
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SignupController)
   */
  _config: {}

  
};

module.exports = SignupController;