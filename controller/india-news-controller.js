const axios = require('axios')
const cheerio = require('cheerio')
const { source } = require('../source/newsSource')
const Buffer = require('buffer').Buffer
const { hindustanTimes } = require('../service/scrapingFile')

exports.fullStory = async (req, res) => {

    //decode url
    // The base64 encoded input string
    let base64string = req.params.fullStory;
    
    // Create a buffer from the string
    let bufferObj = Buffer.from(base64string, "base64");
    
    // Encode the Buffer as a utf8 string
    let decodedString = bufferObj.toString("utf8"); 

    //To get detailed story news from sub-url
    const response = await axios.get(decodedString)
    const $ = cheerio.load(response.data)
    const story = $('div.detail').find('p').text()
    res.status(200).json({story})
}

exports.news = async (req, res) => {

    
    const news = [];
    const getIndiaNewsURL = source.indiaNews;

    //To get india news from hindustan times
    let response = await axios.get(getIndiaNewsURL)
    let $ = cheerio.load(response.data)
    let arr = $('div.cartHolder.listView.track')

        //To get india news from hindustan times
        for(let i = 0; i < arr.length; i++){
                const title = $(arr[i]).find('h3.hdg3').text();
                const link = $($(arr[i]).find('h3.hdg3')).find('a').attr('href');
                const category = $($(arr[i]).find('div.catName.pt10')).find('a').text();
                const image = $(arr[i]).find('img').attr('src');

                //encode story url
                // The original utf8 string
                let originalString = getIndiaNewsURL + link;
                
                // Create buffer object, specifying utf8 as encoding
                let bufferObj = Buffer.from(originalString, "utf8");
                
                // Encode the Buffer as a base64 string
                let base64String = bufferObj.toString("base64");

                //To get detailed story news from sub-url            
                news.push({
                    title,
                    image,
                    category,
                    fullStory: base64String
                });           
        }
        
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)
}

exports.indiaNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/india-news'

    news = await hindustanTimes(pageNo, news, getNewsURL)
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.worldNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/world-news'

    news = await hindustanTimes(pageNo, news, getNewsURL)
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.entertainmentNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/entertainment'

    news = await hindustanTimes(pageNo, news, getNewsURL)
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.sportsNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    let getNewsURL = source.indiaNews+'/sports'

    news = await hindustanTimes(pageNo, news, getNewsURL)    

    getNewsURL = source.indiaNews+'/cricket'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.educationNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/education'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.trendingNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/trending'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.lifeStyleNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/lifestyle'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.electionsNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/elections'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.businessNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/business'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}

exports.scienceNews = async (req, res) => {

    const pageNo = req.params.page
    let news = []
    const getNewsURL = source.indiaNews+'/science'

    news = await hindustanTimes(pageNo, news, getNewsURL)   
    
    news.length === 0 ? res.status(501).json({messege:"No data found!"}) : res.status(200).json(news)

}