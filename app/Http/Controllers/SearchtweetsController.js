'use strict'


const Env = use("Env");
const httpReq = use("request");
const rp = use('request-promise')

class SearchtweetsController {



	* search (request, response) {
		const input = request.only('q');
		// console.log(Env.get('BEARER_TOKEN'))
		// console.log(request);

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


			var options = {
				url: 'https://api.twitter.com/1.1/search/tweets.json',
				resolveWithFullResponse: true,
				headers: {
					'authorization': Env.get("BEARER_TOKEN")
				},
				qs: {
					q: input.q
				}
			};
			console.log(options)

			let tweets;
			let tweet_data = [];
//////////////////////////////////////////////
			// rp(options)
			// 	.then(function(res){
			// 		tweets      = JSON.parse(res.body);
			// 		let newBody = twitter_filter(tweets);
			// 		console.log(newBody)
			// 		newBody.forEach(function(tweet_obj){
						// var options2 = {
						// 	url: 'https://twinword-sentiment-analysis.p.mashape.com/analyze/',
						// 	headers: {
						// 		"X-Mashape-Key": Env.get("TWIN_TOKEN"),
						// 		"Content-Type" : "application/x-www-form-urlencoded",
						// 		"Accept"       : "application/json"
						// 	},
						// 	data: {
						// 		'text': tweet_obj.text
						// 	}
						// };
			// 			console.log(Env.get("TWIN_TOKEN"))
			// 			rp(options2)
			// 				.then(function(response){
			// 					tweet_obj.sentiment = response;
			// 					tweet_data.push(tweet_obj);
			// 				});


			// 		});
			// 		return response.json(tweet_data);

			// 	})
/////////////////////////////////////////////////////////////////////



	var options2 = {
		url: 'https://twinword-sentiment-analysis.p.mashape.com/analyze/',
		method: 'GET',
		headers: {
			"X-Mashape-Key": Env.get("TWIN_TOKEN"),
			"Content-Type" : "application/x-www-form-urlencoded",
			"Accept"       : "application/json"
		},
		data: {
			'text': "There most be some type of way out of here said the liar to the thief"
		}
	};
	console.log(options2)

		rp(options2)
			.then(function(res){
				return response.json(res)
			})


		// httpReq(options, function (error, res, body) {
		// 	// console.log(body);



			// let twitter_filter = function(obj){
			// 	let newRes = [];
			// 	// console.log(obj);


			// 	obj.statuses.map(function(tweet){
			// 		let resObj = {};
			// 		resObj.user = {};
			// 		resObj.timezone ={};
			// 		resObj.likes = tweet.favorite_count;
			// 		resObj.text = tweet.text;
			// 		resObj.retweet_count = tweet.retweet_count;
			// 		resObj.user.created_at = tweet.created_at;
			// 		resObj.user.userAtname = '@' + tweet.user.screen_name;
			// 		resObj.user.usersTotaltweets = tweet.user.statuses_count;
			// 		resObj.timezone.zone = tweet.user.timezone;
			// 		resObj.timezone.utc_offset = tweet.user.utc_offset;
			// 		resObj.user.img = tweet.user.profile_image_url;
			// 		newRes.push(resObj);


			// 	});

			// 	return newRes;


			// }
		// 	let newBody = twitter_filter(JSON.parse(body));


		// 	response.json(newBody)









		// })
		// .on('response',function(response){
		// 	tweets = response;
		// })
		console.log(tweets);
		// 	var options2 = {
		// 		url: 'https://twinword-sentiment-analysis.p.mashape.com/analyze/',
		// 		headers: {
		// 			'authorization': Env.get("TWIN_TOKEN")
		// 		},
		// 		data: {
		// 			'text': newBody.data[0]
		// 		}
		// };

		// httpReq(options2, function (error, res, body){


  //     		return response.json(body)

		// });







	}
};


module.exports = SearchtweetsController;
