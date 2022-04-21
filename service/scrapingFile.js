const axios = require('axios')
const cheerio = require('cheerio')
const Buffer = require('buffer').Buffer
const { source } = require('../source/newsSource')

exports.hindustanTimes = async (pageNo, news, url) => {

    if (pageNo == 1) {
        
        //To get india news from hindustan times
        let response = await axios.get(url)
        let $ = cheerio.load(response.data)

        let arr = $('div.cartHolder.listView.track')

        for(let i = 0; i < arr.length; i++){
                const title = $(arr[i]).find('h3.hdg3').text()
                const link = $($(arr[i]).find('h3.hdg3')).find('a').attr('href')
                const category = $($(arr[i]).find('div.catName.pt10')).find('a').text();
                const image = $(arr[i]).find('img').attr('src')

                //encode story url
                // The original utf8 string
                let originalString = url + link;
                
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
                })                
        }

    }

    //paging in /india-news
    if(pageNo>1){
        const subResponse = await axios.get(url + '/page-' + pageNo)
        const $sub = cheerio.load(subResponse.data)

        let arr2 = $sub('div.cartHolder.listView.track')

        for(let i = 0; i < arr2.length; i++){
            const title = $sub(arr2[i]).find('h3.hdg3').text()
            const link = $sub($sub(arr2[i]).find('h3.hdg3')).find('a').attr('href')
            const category = $sub($sub(arr2[i]).find('div.catName.pt10')).find('a').text();
            const image = $sub(arr2[i]).find('img').attr('src')

            //encode story url
            // The original utf8 string
            let originalString = url + link;
            
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
            })
        }
    }

    return news;

}

const timesOfIndia = async (pageNo, news, url) => {

    if (pageNo == 1) {
        
        //To get india news from times of india
        let response = await axios.get(url)
        let $ = cheerio.load(response.data)

        let arr = $('li')
        console.log(arr);
        for(let i = 0; i < arr.length; i++){
                const title = $(arr[i]).find('span.clamp').text()
                const link = $(arr[i]).find('a').attr('href')
                const image = $(arr[i]).find('img').attr('src')

                //encode story url
                // The original utf8 string
                let originalString = url + link;
                
                // Create buffer object, specifying utf8 as encoding
                let bufferObj = Buffer.from(originalString, "utf8");
                
                // Encode the Buffer as a base64 string
                let base64String = bufferObj.toString("base64");

                //To get detailed story news from sub-url            
                news.push({
                    title,
                    image,
                    fullStory: base64String
                })                
        }

    }

    //paging in /india
    if(pageNo>1){
        const subResponse = await axios.get(url + '/' + pageNo)
        const $sub = cheerio.load(subResponse.data)

        let arr2 = $sub('li').attr('data-autoload-item', 'listing')

        for(let i = 0; i < arr2.length; i++){
            const title = $sub(arr2[i]).find('span.clamp').text()
            const link = $sub(arr2[i]).find('a').attr('href')
            const image = $sub(arr2[i]).find('img').attr('src')

            //encode story url
            // The original utf8 string
            let originalString = url + link;
            
            // Create buffer object, specifying utf8 as encoding
            let bufferObj = Buffer.from(originalString, "utf8");
            
            // Encode the Buffer as a base64 string
            let base64String = bufferObj.toString("base64");

            //To get detailed story news from sub-url            
            news.push({
                title,
                image,
                fullStory: base64String
            })
        }
    }

    return news;

}