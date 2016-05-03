var userController = require("./controllers/userController"),
    helpers = require("./controllers/helpers")


module.exports = function(app, passport){

  app.get("/", userController.getPins, function(req,res){
    res.render("home.jade", {"message": req.flash("message"), "pins" : req.pins })
  })

  app.get("/profile", helpers.isLoggedIn, userController.getProfile,function(req,res){
    res.render("profile.jade", {"message": req.flash("message"), "pins" : req.pins , "user": req.user.username })
  })

  app.post('/signup', helpers.validateProfile, userController.register)

  app.get('/logout', helpers.isLoggedIn, function (req,res){
    req.logout()
    res.redirect("/")
  });

  app.post('/login',
            passport.authenticate('local', { failureRedirect: '/',
                                             successRedirect: '/profile',
                                             failureFlash : "Invalid Credentials. Try again"
                                           }
                                  )
  )

  app.get('/auth/twitter', passport.authenticate('twitter'))

  app.get('/auth/twitter/callback',
          passport.authenticate('twitter', { failureRedirect: '/',
                                             successRedirect: '/profile',
                                             failureFlash : "Invalid Credentials. Try again"
                                            }
                                )
  )


  app.post('/editpassword', helpers.isLoggedIn, helpers.validatePassword, userController.editPassword)

  app.post('/addpin', helpers.isLoggedIn, helpers.validatePin, userController.addPin)

  app.post('/removepin', helpers.isLoggedIn, userController.removePin)


}
