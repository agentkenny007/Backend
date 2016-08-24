'use strict'

const Grape = use('App/Model/Grape')

class GrapeController {

	* createGrape (req, resp){
		
		const input = req.only('grapeObj','campaigns_id') 

		const grape = yield Grape.create(input)
		console.log(input)
		
		grape.campaigns_id = input.campaigns_id

		grape = yield grape.save()

        return response.json(grape);
	}

	

}

module.exports = GrapeController