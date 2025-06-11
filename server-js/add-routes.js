
import path from "path"
import express from "express"
import filog from "filter-log"
import loadTemplates from "./add-templates.js"
import webhandle from "webhandle"

let log

export default function(app) {
	log = filog('unknown')

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	loadTemplates()
	
	webhandle.routers.preStatic.get(/.*\.cjs$/, (req, res, next) => {
		console.log('cjs')
		res.set('Content-Type', "application/javascript")
		next()
	})
	
	app.get('/data1', async (req, res, next) => {
		let data = await webhandle.sinks.project.read('test-data/products.json')
		let lines = data.toString().split('\n').filter(line => !!line)
		lines = lines.map(line => {
			let obj = JSON.parse(line)
			obj._id = obj._id.$oid
			return JSON.stringify(obj)
		})
		res.end(lines.join('\n'))
	})

}

