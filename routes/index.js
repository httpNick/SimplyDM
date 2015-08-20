var express = require('express')
var router = express.Router()
var config = require('../config.js')
var User = require('../models/User.js')
var braintree = require('braintree')
var utils = require('../utils/utils');
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'qg8kkp87dm253bf5',
    publicKey: 'rypncz4tks8w4dpk',
    privateKey: 'f86e1039f4cfe6ec614c5b5dbc6442fc'
  })
  /* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  console.log(res.locals);
  if (req.session.passport.user) {
    res.render('index', {
      title: 'Express',
      username: req.session.passport.user.displayName,
      home: true,
      loggedIn: true
    })
  } else {
    res.render('index', {
      title: 'Express',
      username: '',
      home: true,
      loggedIn: false
    })
  }
})

router.get('/logout', utils.ensureAuthenticated, function(req, res) {
  req.logout()
  res.redirect('/')
})

// router.get('/login', function(req, res) {
//   res.render('login')
// })
router.get('/account', utils.ensureAuthenticated, function (req, res) {
  var account = {}
  User.findOne({'identifier' : req.session.passport.user.identifier},
  'subscriber displayname steamid avatar', function (err, doc) {
    account.displayname = req.session.passport.user.displayName,
    account.steamid = doc.steamid,
    account.avatar = doc.avatar
    res.render('account', {account: account})
  })
})

// TODO: rewrite subscription page
// router.post('/checkout', utils.ensureAuthenticated, function(req, res) {
//   var nonce = req.body.payment_method_nonce
//   User.findOne({
//     'identifier': req.session.passport.user.identifier
//   }, 'subscriber displayname steamid', function(err, doc) {
//     if (doc.subscriber === false) {
//       gateway.subscription.create({
//         paymentMethodNonce: nonce,
//         planId: 'simplydm'
//       }, function(err, result) {
//         console.log('MADE SUBSCRIPTION')
//         console.log(result)
//         res.redirect('subscribe')
//       })
//     } else {
//       console.log('ALREADY A SUBSCRIBER')
//     }
//   })
// })

// router.get('/subscribe', utils.ensureAuthenticated, function(req, res) {
//   // res.render('subscribe')
//   User.findOne({
//       'identifier': req.session.passport.user.identifier
//     }, 'subscriber displayName id clientToken',
//     function(err, doc) {
//       if (doc.subscriber !== true) {
//         gateway.customer.create({
//           firstName: doc.displayName,
//           id: doc.id
//         }, function(err, result) {
//           if (result.success) {
//             gateway.clientToken.generate({
//               customerId: doc.id
//             }, function(err, response) {
//               user.clientToken = response.clientToken
//               user.save(function(err) {
//                 if (err) return err
//               })
//               res.render('subscribe', {
//                 token: response.clientToken
//               })
//             })
//           }
//         })
//       } else if (doc.subscriber === true && doc.clientToken) {
//         res.render('manage', {
//           clientToken: doc.clientToken
//         })
//       } else {
//         console.log('error')
//         res.redirect('/')
//       }
//     })
// })
module.exports = router
