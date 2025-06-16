import path from 'path'
import webhandle from 'webhandle'

let templatesAdded = false

export default function integrate() {

	let opt = Object.assign({
		templateDir: 'node_modules/@webhandle/record-table/views'
	}, options || {})
	

	if(!templatesAdded) {
		templatesAdded = true

		// add templates directory
		if (opt.templateDir) {
			webhandle.addTemplateDir(path.join(webhandle.projectRoot, opt.templateDir), {
				immutable: process.env.NODE_ENV === 'development' ? false : true
			})
		}
	}
}