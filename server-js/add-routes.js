
import path from "path"
import express from "express"
import filog from "filter-log"
import loadTemplates from "./add-templates.js"
import webhandle from "webhandle"

import ServerDataService from '@dankolz/data-service-server'
import InMemoryDataService from '@dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs'


let log

export default async function(app) {
	log = filog('unknown')

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	loadTemplates()
	
	webhandle.routers.preStatic.get(/.*\.cjs$/, (req, res, next) => {
		console.log('cjs')
		res.set('Content-Type', "application/javascript")
		next()
	})

	let data = await webhandle.sinks.project.read('test-data/products.json')
	let lines = data.toString().split('\n').filter(line => !!line)
	let objs = lines.map(line => {
		let obj = JSON.parse(line)
		obj._id = obj._id.$oid
		return obj
	})
	
	app.get('/data1', async (req, res, next) => {
		let lines = objs.map(obj => JSON.stringify(obj))
		res.end(lines.join('\n'))
	})
	
	let dataService = new InMemoryDataService({
		collections: {
			default: objs
		}
	})
	let server = new ServerDataService({
		dataService: dataService
	})
	let serviceRouter = express.Router()
	server.addToRouter(serviceRouter)
	app.use('/data2', serviceRouter)
	


}
