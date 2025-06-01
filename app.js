require('dotenv').config()
const express = require('express')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js

const {getCityInfo, getJobs} = require('./util')

// TODO: Statically serve the public folder

app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

app.get('/api/city/:city', async (req, res) => {
  const city = req.params.city

  try {
    const cityInfo = await getCityInfo(city)
    const jobs = await getJobs(city)

    if (!cityInfo && !jobs) {
      return res.status(404).json({error: 'City info and jobs not found'})
    }

    return res.status(200).json({
      cityInfo: cityInfo || false,
      jobs: jobs || false
    })
  }

  catch (error) {
    return res.status(500).json({error: 'Server error'})
  }
})

module.exports = app
