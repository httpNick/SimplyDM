var express = require('express')
var router = express.Router()
var passport = require('passport')
var SteamStrategy = require('passport-steam').Strategy
var config = require('../config.js')

var User = require('../models/User.js')

passport.use(new SteamStrategy({
    returnURL: 'http://' + config.domain + ':' + config.port + '/auth/steam/return',
    realm: 'http://' + config.domain + ':' + config.port + '/',
    apiKey: config.apiKey
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {
      profile.identifier = identifier
        // console.log(profile)
      if (profile) {
        User.findOne({
          'identifier': profile.identifier
        }, function(err, doc) {
          // console.log(doc)
          if (!doc) {
            //Create new User:
            var newUser = new User({
              displayName: profile.displayName,
              identifier: profile.identifier,
              steamid: profile.id,
              avatar: profile._json.avatarfull,
              subscriber: false,
              clientToken: '',
              isAdmin: false
            })

            newUser.save(function(err) {
              if (err) {
                // console.log('ERROR!')
                return done(err)
              } else {
                // console.log('New user created.')
                return done(null, profile)
              }
            })
          } else {
            return done(null, profile)
          }
        })
      } else {
        return done('no user')
      }
    })
  }
))

// router.get('/test', function(req, res) {
//   res.end('this is a test')
// })

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/steam/return',
  passport.authenticate('steam', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/')
  })

router.get('/auth/steam',
  passport.authenticate('steam', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/')
  })

module.exports = router
