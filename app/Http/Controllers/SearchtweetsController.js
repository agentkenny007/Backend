'use strict'


const Env = use("Env");
const httpReq = use("request");

class SearchtweetsController {



	* search (request, response) {
		const input = request.only('q');
		// console.log(Env.get('BEARER_TOKEN'))
		// console.log(request);
		var options = {
			url: 'https://api.twitter.com/1.1/search/tweets.json',
			headers: {
				'authorization': Env.get("BEARER_TOKEN")
			},
			qs: {
				q: input.q
			}
		};
		console.log(options)

		let tweets; 


		httpReq(options, function (error, res, body) {
			// console.log(body);

			

			let twitter_filter = function(obj){
				let newRes = [];
				// console.log(obj);


				obj.statuses.map(function(tweet){
					let resObj = {};
					resObj.user = {};
					resObj.timezone ={};
					resObj.likes = tweet.favorite_count;
					resObj.text = tweet.text;
					resObj.retweet_count = tweet.retweet_count;
					resObj.user.created_at = tweet.created_at;
					resObj.user.userAtname = '@' + tweet.user.screen_name;
					resObj.user.usersTotaltweets = tweet.user.statuses_count;
					resObj.timezone.zone = tweet.user.timezone;
					resObj.timezone.utc_offset = tweet.user.utc_offset;
					resObj.user.img = tweet.user.profile_image_url;
					newRes.push(resObj);

					
				});

				return newRes;


			}
			let newBody = twitter_filter(JSON.parse(body));


			








			tweets = response.json(newBody)	;
		});
	};





}


module.exports = SearchtweetsController
