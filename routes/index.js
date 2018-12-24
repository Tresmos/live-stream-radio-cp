var express = require('express')
var router = express.Router()
var config = require('../config.json')
var request = require('request')

/* GET home page. */
router.get('/', (req, res, next) => {
  request.get(`${config.url}/stream?api_key=${config.apiKey}`, (err, response, body) => {
    if (err) { console.log(err) }
    var streamBodyJSON = JSON.parse(body)
    request.get(`${config.url}/library/audio?api_key=${config.apiKey}`, (err, response, body) => {
      if (err) { console.log(err) }
      var libraryBodyJSON = JSON.parse(body)
      request.get(`${config.url}/config?api_key=${config.apiKey}`, (err, response, body) => {
        if (err) { console.log(err) }
        var configBodyJSON = JSON.parse(body)
        res.render('index', { title: 'Dashboard', status: streamBodyJSON.isRunning, library: libraryBodyJSON.audio, config: configBodyJSON })
      })
    })
  })
})

router.get('/stream/start', (req, res, next) => {
  request.post(`${config.url}/stream/start?api_key=${config.apiKey}`, (err, response, body) => {
    if (err) { console.log(err) }
    res.redirect('/')
  })
})

router.get('/stream/stop', (req, res, next) => {
  request.post(`${config.url}/stream/stop?api_key=${config.apiKey}`, (err, response, body) => {
    if (err) { console.log(err) }
    res.redirect('/')
  })
})

router.get('/stream/restart', (req, res, next) => {
  request.post(`${config.url}/stream/restart?api_key=${config.apiKey}`, (err, response, body) => {
    if (err) { console.log(err) }
    setTimeout(() => {
      res.redirect('/')
    }, 2000)
  })
})

module.exports = router
