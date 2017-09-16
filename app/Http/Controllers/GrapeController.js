'use strict'

const Grape = use('App/Model/Grape')
const Database = use('Database')

class GrapeController {

	* createGrape (req, resp){
		
		const input = req.only('grapeObj','campaigns_id') 

		

		let grape = yield Grape.create(input)
		console.log(input)
		
		grape.campaigns_id = input.campaigns_id
		grape.grapeObj     = JSON.stringify(input.grapeObj)

		let result = yield grape.save()
		console.log(result)
        return resp.json(grape);
	}

	* index (request, resp){
	    const user = request.authUser
	    const input = request.only('campaigns_id')

	    const campGrapes = yield Database.from("grapes").where("campaigns_id", input.campaigns_id);
	    let grapeJson = campGrapes;
	    // grapeJson.map((obj)=>{
	    // 	obj.grapeObj = JSON.parse(obj.grapeObj);
	    // });
	    return resp.json(grapeJson)

    }

	

}

module.exports = GrapeController