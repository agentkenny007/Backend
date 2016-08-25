'use strict'

const Campaign = use('App/Model/Campaigns')

class CampaignController {

	* createCampaign (req, resp){
		const user  = req.authUser
		const input = req.only('title', 'description')
		input.user_id = user.id;
		console.log(input);
		const campaign = yield Campaign.create(input)
        return resp.json(campaign);
	}
 
    * index (request, resp){
    const user = request.authUser

    const camps = yield user.campaigns().fetch();
    return resp.json(camps)

    }
	

}

module.exports = CampaignController