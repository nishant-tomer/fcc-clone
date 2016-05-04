var validator = require('validator');

var helpers = module.exports = {}

  helpers.validateProfile = function(req, res, next){

        var username = ( validator.isAlphanumeric(req.body.username) &&
                         validator.isLength(req.body.username,{min:2,max:40})
                       )
        var password = ( validator.isAlphanumeric(req.body.password) &&
                         validator.isLength(req.body.password,{min:6,max:15}) &&
                         validator.equals(req.body.password, req.body.confirmpassword)
                       )

        if ( username && password ) { return next() }
        req.flash("message","Invalid values passed!")
        res.redirect("/")

  }

  helpers.validatePassword = function(req, res, next){

        var password    = ( validator.isAlphanumeric(req.body.currentpassword) &&
                            validator.isLength(req.body.currentpassword,{min:6,max:40})
                          )
        var newpassword = ( validator.isAlphanumeric(req.body.newpassword) &&
                            validator.isLength(req.body.newpassword,{min:6,max:15}) &&
                            validator.equals(req.body.newpassword, req.body.confirmnewpassword)
                          )

        if ( newpassword && password ) { return next() }
        req.flash("message","Invalid values passed!")
        res.redirect("/profile")
  }

  helpers.validatePin = function(req, res, next){
    var title = ( !req.body.title.match(/[^a-z A-Z0-9]/) &&
                  validator.isLength(req.body.username,{min:2,max:40})
                )
    var url   = ( validator.isURL(req.body.url) )

    if ( title && url ) { return next() }
    req.flash("message","Invalid values passed!")
    res.redirect("/profile")
  }

  helpers.isLoggedIn = function(req, res, next) {
          if (req.isAuthenticated()) {
              return next()
          }
          req.flash("message", "You need to Login First")
          res.redirect('/')
  }
