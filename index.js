const { nextISSTimesForMyLocation } = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// const ip = '154.29.159.172';
// fetchCoordsByIP (ip, (error, coords) => {
// if (error) {
//   console.log("It didn't work!" , error);
//   return;
// }
//   console.log('It worked! Returned Coordinates:', coords);
// });

// const coords = { latitude: '49.27670', longitude: '-123.13000' }
// fetchISSFlyOverTimes(coords, (error, riseTime) => {
//   if (error) {
//     console.log("It didn't work!", error)
//     return
//   }
//   console.log('It worked! Returned rise time:', riseTime)
// })

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0)
    datetime.setUTCSeconds(pass.risetime)
    const duration = pass.duration
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error)
  }
  printPassTimes(passTimes)
})
