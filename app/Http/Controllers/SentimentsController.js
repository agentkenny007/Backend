'use strict'

const ENV = use('Env')
const REQUEST = use('request-promise')

class SentimentsController {
    * get (request, response){
        const INPUT = request.only('q')
        let promises = [],
            sentimentReq = {
                uri: 'https://twinword-sentiment-analysis.p.mashape.com/analyze/',
                method: 'POST',
                headers: {
                    'X-Mashape-Key': ENV.get('TWIN_TOKEN'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }, posts, post_filter = function(postArray){
                posts = postArray
                    .filter(post => post.type === 'answer' || post.type === 'photo' || post.type === 'text')
                    .map(post => {
                        return {
                            tumblog: `@${post.blog_name}`,
                            date: post.date,
                            timestamp: post.timestamp,
                            url: post.short_url,
                            notes: post.note_count,
                            text: post.answer || post.body || post.caption
                        }
                    }).filter(post => post.text && post.text.length > 40)
            }, tumblrReq = {
                url: 'https://api.tumblr.com/v2/tagged',
                qs: {
                    api_key: ENV.get('TUMBLR_CONSUMER_KEY'),
                    filter: 'text',
                    tag: INPUT.q
                }
            }, tweets = [], twitter_filter = function(obj){
                obj.statuses.forEach(tweet =>{
                    tweets.push({
                        likes: tweet.favorite_count,
                        retweet_count: tweet.retweet_count,
                        text: tweet.text,
                        timezone: {
                            utc_offset: tweet.user.utc_offset,
                            zone: tweet.user.timezone
                        }, user: {
                            atName: `@${tweet.user.screen_name}`,
                            created_at: tweet.created_at,
                            img: tweet.user.profile_image_url,
                            totalTweets: tweet.user.statuses_count
                        }
                    })
                })
            }, twitterReq = {
                url: 'https://api.twitter.com/1.1/search/tweets.json',
                resolveWithFullResponse: true,
                headers: {
                    Authorization: ENV.get('BEARER_TOKEN')
                },
                qs: {
                    q: INPUT.q
                }
            }

        yield REQUEST(twitterReq)
            .then(resp =>{
                twitter_filter(JSON.parse(resp.body))
                tweets.forEach((tweet, index)=>{
                    let options = sentimentReq
                    options.form = { text: tweet.text }
                    promises.push(REQUEST(options))
                })
		        return null // needed since we are inside of a promise resolve
            })

        yield REQUEST(tumblrReq)
            .then(resp =>{
                post_filter(JSON.parse(resp).response)
                posts.forEach((post, index)=>{
                    let options = sentimentReq,
                        text = post.text
                            .toLowerCase().split('. ')
                            .filter(sentence =>{
                                let buzzwords = INPUT.q.toLowerCase().split(' ')
                                for (var i = 0, l = buzzwords.length; i < l; i++)
                                    if (sentence.includes(buzzwords[i])) return true
                            }).join('. ')
                    options.form = { text: (text ? text : post.text).substr(0, 1500) }
                    promises.push(REQUEST(options))
                })
                return null
            })

        // Wait for all promises to resolve.
        Promise.all(promises).then(resp =>{
        	resp.forEach((data, index)=>{
                if (tweets[index]) tweets[index].sentiment = JSON.parse(data)
                else posts[index - tweets.length].sentiment = JSON.parse(data)
        	})
        	response.json({ tweets: tweets, tumblrPosts: posts }) // data to send back
        })
    }
}

module.exports = SentimentsController
