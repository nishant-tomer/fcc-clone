var User = require("../models/user")

var userController = module.exports = {}

userController.register = function(req, res){
  User.findOne({username:req.body.username},function(err, user){
    if ( err) {
        req.flash("message","Unable to create an account.")
        res.redirect("/")
    }
    else if ( user.username == req.body.username){

      req.flash("message","User already exists.")
      res.redirect("/")
    }
    else {

      var newUser = new User()
      newUser.username = req.body.username
      newUser.password = req.body.password
      newUser.save(function(err,user) {
          if ( err) {
              req.flash("message","Unable to create an account.")
              res.redirect("/")
          }
          req.login(user, function(err){
            if(err){
              req.flash("message","Unable to create an account.")
              res.redirect("/")
            }
            res.redirect("/profile")
          })

      })
    }

  })

}

userController.editPassword = function(req, res){

  User.findOne({username:req.user.username}, function(err, user){
      if (err){ console.log(err); req.flash("message","Unable to edit Password"); res.redirect("/profile") }

      user.comparePassword(req.body.currentpassword, function(err, isMatch){
          if (err) { console.log(err); req.flash("message","Unable to edit Password") ; res.redirect("/profile")}

          if( !isMatch ){ req.flash("message","Invalid password") ; res.redirect("/profile") }
          user.password = req.body.newpassword
          user.save( function(err, data){
                      if (err){ console.log(err) ; req.flash("message","Unable to edit Password"); res.redirect("/profile")}
                     req.flash("message","Password changed Succesfully.")
                      res.redirect("/profile")
                    })
      })
  })

}

userController.getPins = function(req, res, next ){

  User.find({}, function(err, users){
      if (err){
        console.log(err)
        req.flash("message","Unable to Load Pins")
        req.pins = []
        return next ()
      }

      req.pins = []
      users.forEach( function(user, index){
            user.pins.forEach(function(pin,index){
                pin.owner = user.username
                req.pins.push(pin)
                req.pins = shuffleArray(req.pins)
            })
      })
      return next()
  })
}


userController.getProfile = function(req, res, next){

  User.find({}, function(err, users){
      if (err){
        console.log(err)
        req.flash("message","Unable to Load Pins")
        req.pins = []
        return next ()
       }

      req.pins = {
                    "allPins":[],
                    "myPins" :[]
                 }

      users.forEach( function(user, index){
          if(user.username == req.user.username){
            user.pins.forEach(function(pin,index){
                pin.owner = user.username
                req.pins.myPins.push(pin)
                req.pins.myPins = shuffleArray(req.pins.myPins)
            })
          }
          else {
            user.pins.forEach(function(pin,index){
                pin.owner = user.username
                req.pins.allPins.push(pin)
                req.pins.allPins = shuffleArray(req.pins.allPins)
            })

          }

      })
      return next()

  })
}

userController.getPublicProfile = function(req, res, next){

  User.find({ username:req.params.username }, function(err, user){
      if (err){
        console.log(err)
        req.flash("message","Unable to find the User")
        req.pins = []
        return next ()
       }

      req.pins = []
      user[0].pins.forEach(function(pin,index){
                    pin.owner = user[0].username
                    req.pins.push(pin)
                    req.pins = shuffleArray(req.pins)
                  })

      return next()
      }

    )

}


userController.addPin = function(req, res){

  User.findOne({username:req.user.username}, function(err, user){
      if (err){ console.log(err); req.flash("message","Unable to add Pin") ; res.redirect("/profile") }

      var pin = { "title" : req.body.title,
                  "url"   : req.body.url
                }
      user.pins.push(pin)
      user.save( function(err, data){
                  if (err){ console.log(err) ; req.flash("message","Unable to add Pin") ;res.redirect("/profile")}
                  req.flash(  "message","Pin added Succesfully.")
                  res.redirect("/profile")
                })
  })
}

userController.removePin = function(req, res){

  User.findOne({username:req.user.username}, function(err, user){
      if (err){ console.log(err); req.flash("message","Unable to remove Pin") ; res.redirect("/profile") }
      console.log(req.body.pinID)
      user.pins.id(req.body.pinID).remove()
      user.save( function(err, data){
                  if (err){ console.log(err) ; req.flash("message","Unable to remove Pin") ;res.redirect("/profile")}
                  req.flash(  "message","Pin removed Succesfully.")
                  res.redirect("/profile")
                })
  })
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
