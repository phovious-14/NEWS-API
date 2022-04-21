const express = require("express")
const route = express.Router()
const controller = require("../controller/india-news-controller")

route.get('/', controller.news)
route.get('/:fullStory', controller.fullStory)

route.get('/india-news/:page', controller.indiaNews)
route.get('/india-news/:page/:fullStory', controller.fullStory)

route.get('/sports/:page', controller.sportsNews)
route.get('/sports/:page/:fullStory', controller.fullStory)

route.get('/education/:page', controller.educationNews)
route.get('/education/:page/:fullStory', controller.fullStory)

route.get('/world-news/:page', controller.worldNews)
route.get('/world-news/:page/:fullStory', controller.fullStory)

route.get('/entertainment/:page', controller.entertainmentNews)
route.get('/entertainment/:page/:fullStory', controller.fullStory)

route.get('/trending/:page', controller.trendingNews)
route.get('/trending/:page/:fullStory', controller.fullStory)

route.get('/lifestyle/:page', controller.lifeStyleNews)
route.get('/lifestyle/:page/:fullStory', controller.fullStory)

route.get('/elections/:page', controller.electionsNews)
route.get('/elections/:page/:fullStory', controller.fullStory)

route.get('/business/:page', controller.businessNews)
route.get('/business/:page/:fullStory', controller.fullStory)

route.get('/science/:page', controller.scienceNews)
route.get('/science/:page/:fullStory', controller.fullStory)

module.exports = route