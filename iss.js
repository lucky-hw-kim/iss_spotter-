const request = require('request')
const ipURL = 'https://api.ipify.org/?format=json'

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request(ipURL, (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null)
      return
    }

    const ip = JSON.parse(body).ip
    callback(null, ip)
  })
}

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for passTime . Response: ${body}`
      callback(Error(msg), null)
      return
    }

    const { latitude, longitude } = JSON.parse(body)

    callback(null, { latitude, longitude })
  })
}

const fetchISSFlyOverTimes = function (coords, callback) {
  const passTimeURL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`

  request(passTimeURL, (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`, null))
      return
    }
    const passTime = JSON.parse(body).response
    callback(null, passTime)
  })
}

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(coords, (error, nextPass) => {
        if (error) {
          return callback(error, null)
        }
        callback(null, nextPass)
      })
    })
  })
}

module.exports = { nextISSTimesForMyLocation }