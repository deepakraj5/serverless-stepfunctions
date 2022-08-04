'use strict';

module.exports.randomNumber = async (event) => {

  const randomNumberMin = Math.floor(Math.random() * (999 - 111 - 1) + 111)
  const randomNumberMax = Math.floor(Math.random() * (9999 - 1111 - 1) + 1111)

  return {
    statusCode: 200,
    min: randomNumberMin,
    max: randomNumberMax
  }
};


module.exports.randomNumberFromRange = async (event, context) => {
  try {

    console.log(event)
    
    let min = event.min
    let max = event.max

    const randomNumber = Math.floor(Math.random() * (max - min -1) + min)

    console.log(randomNumber)

    return {
      statusCode: 200,
      body: randomNumber
    }

  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error
    }
  }
}