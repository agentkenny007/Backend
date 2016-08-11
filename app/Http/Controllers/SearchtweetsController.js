'use strict'


const Env = use("Env");
const httpReq = use("request");

class SearchtweetsController {

	* search (request, response) {
		const query = request.only('q');
		console.log(Env.get('BEARER_TOKEN'))
		var options = {
			url: 'https://api.twitter.com/1.1/search/tweets.json',
			headers: {
				'authorization': Env.get("BEARER_TOKEN")
			},
			qs: {
				q: query.q
			}
		};
		console.log(options)

		httpReq(options, function (error, res, body) {
			return response.json(body).toJson();
		});
	};

}


module.exports = SearchtweetsController
