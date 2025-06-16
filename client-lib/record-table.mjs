import { View } from '@webhandle/backbone-view'
import Tablesort from '@dankolz/tablesort'
import frameTemplate from '../views/webhandle/record-table/frame.tri'
import createTypeDescriptions from "objs-to-sql/lib/create-type-descriptions.mjs"
import FormAnswerDialog from '@webhandle/form-answer-dialog'
import csvConversion from '@webhandle/objs-to-csv-string'

import ListView from '@webhandle/drag-sortable-list'


export default class RecordTable extends View {

	constructor(options) {
		super(options)

		if (!this.chosenFields) {
			this.chosenFields = ['_id', 'id']
		}
		if (options.fieldDescriptions) {
			this.keyedFieldDescriptions = options.fieldDescriptions.reduce((acc, item) => {
				acc[item.field] = item
				return acc
			}, {})

			this.searchFieldOptions = options.fieldDescriptions.map(item => {
				return `<option value="${item.field}">${item.label || item.field}</option>`
			}).join()
		}
		this.numberishFieldTypes = options.numberishFieldTypes || ['number', 'cents']
		if (!this.displayClasses) {
			this.displayClasses = 'ei-styling ei-form'
		}


	}


	preinitialize() {
		this.events = {
			'click .show-all': 'showAll'
			, 'click .search button': 'doSearch'
			, 'click [name="fieldOptions"]': 'showFieldOptions'
			, 'keyup .search input[name=search]': 'doSearchValueChange'
			, 'click .download-csv': 'doDownloadObjectsCsv'
			, 'click .download-json': 'doDownloadObjectsJson'
			, 'click .download-table-csv': 'doDownloadTableCsv'
			, 'click tbody tr': 'selectRow'
			, 'click .row-options .edit-row': 'editRow'
			, 'click .row-options .delete-rows': 'deleteRows'
		}
	}

	_generateDownloadButtons() {
		return `<div class="data-download-buttons">
			<button class="download-table-csv" type="button">Download Table CSV</button>	
			<button class="download-csv" type="button">Download Objects CSV</button>	
			<button class="download-json" type="button">Download Objects JSON</button>	
		</div>
		`
	}

	getSelectedRows() {
		let rows = this.el.querySelectorAll('tbody tr.selected')
		return rows
	}

	deselectAllRows() {
		let rows = this.getSelectedRows()
		for (let row of rows) {
			row.classList.remove('selected')
		}
	}

	async editRow(evt, selected) {
		evt.preventDefault()
		if (this.editUrlCreator) {
			let url = this.editUrlCreator(this.getSelectedRows()[0])
			window.location = url
		}
	}

	async deleteRows(evt, selected) {
		evt.preventDefault()

		let dialog = new FormAnswerDialog({
			title: 'Delete?'
			, body: `Are you sure you'd like to delete?`
			, data: {}
		})
		let data = await dialog.open()
		if (!data) {
			return
		}

		let rows = this.getSelectedRows()
		for (let row of rows) {
			let id = row.getAttribute('data-id') || row.getAttribute('data-_id')
			await this.dataService.remove(id)
		}

		this.showObjs(this.lastObjs)
		let status = this.getStatusElement()
		status.innerHTML = `Selected objects deleted.`
		this.el.querySelector('.records').innerHTML = ''
		this.setRowWorkClasses()
	}

	setRowWorkClasses() {
		let selectedRowsCount = this.getSelectedRows().length
		let rowOptions = this.el.querySelector('.row-work .row-options')

		if (selectedRowsCount == 0) {
			rowOptions.classList.remove('edit')
			rowOptions.classList.remove('delete')
		}
		else if (selectedRowsCount == 1) {
			if (this.editUrlCreator) {
				rowOptions.classList.add('edit')
			}
			rowOptions.classList.add('delete')
		}
		else if (selectedRowsCount > 1) {
			rowOptions.classList.remove('edit')
			rowOptions.classList.add('delete')
		}

	}

	async selectRow(evt, selected) {
		if(evt.target.closest('a')) {
			// somebody clicked a link, so let's let that go through
			return
		}
		evt.preventDefault()

		if (evt.shiftKey) {
			selected.classList.toggle('selected')

		}
		else if (evt.ctrlKey) {
			selected.classList.toggle('selected')
		}
		else {
			this.deselectAllRows()
			selected.classList.toggle('selected')
		}

		this.setRowWorkClasses()
	}

	_generateHeaders() {
		let head = `<thead>
			<tr>`
		for (let field of this.chosenFields) {
			let label = field
			let comparatorAttribute = ''
			if (this.keyedFieldDescriptions && this.keyedFieldDescriptions[field]) {
				let fieldDef = this.keyedFieldDescriptions[field]
				label = fieldDef.label || label
				if (this.numberishFieldTypes.includes(fieldDef.type)) {
					comparatorAttribute = ' data-comparator="numberish" '
				}
			}
			head += `<th data-field=${field}" ${comparatorAttribute}>${label}</th>`
		}
		head += `</tr>
		</thead>	
		`
		return head
	}

	_generateObjectHeaders() {
		let headers = {}
		for (let field of this.chosenFields) {
			let label = field
			if (this.keyedFieldDescriptions && this.keyedFieldDescriptions[field]) {
				let fieldDef = this.keyedFieldDescriptions[field]
				label = fieldDef.label || label
			}
			headers[field] = label
		}
		return headers
	}

	_valToString(val) {
		if (!val) {
			return ''
		}
		return val
	}

	defaultValueFormatter(value, fieldName, obj) {
		return value
	}

	_processingRecordSelection() {
		this.getRecordsElement().innerHTML = ''
		this.getStatusElement().innerHTML = `<p style="text-align: center">(The records are being found.)</p>`
	}

	_renderObject(obj) {
		let rendered = {}
		for (let field of this.chosenFields) {
			let desc = this.keyedFieldDescriptions[field]
			let formatter = this.defaultValueFormatter
			if (desc && desc.formatter) {
				formatter = desc.formatter
			}
			rendered[field] = formatter(obj[field], field, obj)
		}
		return rendered
	}
	_renderRow(obj) {
		let row = `
		<tr data-id="${obj.id || ''}" data-_id="${obj._id}" >`
		for (let field of this.chosenFields) {
			let desc = this.keyedFieldDescriptions[field]
			let formatter = this.defaultValueFormatter
			if (desc && desc.formatter) {
				formatter = desc.formatter
			}
			row += `<td>${formatter(obj[field], field, obj)}</td>`
		}
		row += `</tr>`
		return row
	}

	async doDownloadObjectsJson(evt, selected) {
		evt.preventDefault()
		if (!this.lastObjs) {
			return
		}
		let lines = this.lastObjs.map(obj => JSON.stringify(obj))
		this.downloadData(lines.join('\n'), "object-data.jsonl")
	}

	async doDownloadObjectsCsv(evt, selected) {
		evt.preventDefault()
		if (!this.lastObjs) {
			return
		}
		let csv = csvConversion(this.lastObjs)
		this.downloadData(csv, "object-data.csv")
	}

	async doDownloadTableCsv(evt, selected) {
		evt.preventDefault()
		if (!this.lastObjs) {
			return
		}
		let data = []
		let headers = this._generateObjectHeaders()
		let records = this.getRecordsElement()
		let rows = records.querySelectorAll('table tbody tr')
		for (let row of rows) {
			let obj = {}
			let dats = [...row.querySelectorAll('td')].map(td => td.innerText)
			let heads = Object.keys(headers)
			while (heads.length > 0 && dats.length > 0) {
				obj[heads.pop()] = dats.pop()
			}
			data.push(obj)
		}
		let csv = csvConversion(data, {
			headers: headers
		})
		this.downloadData(csv, "table-data.csv")
	}

	async showAll(evt, selected) {
		evt.preventDefault()
		this._processingRecordSelection()
		setTimeout(async () => {
			let objs = await this.dataService.fetch({})
			this.lastObjs = objs
			this.showObjs(objs)
			let status = this.getStatusElement()
			status.innerHTML = `Showing ${objs.length} objects. ${this._generateDownloadButtons()}`

		}, 1)
	}

	downloadData(data, filename) {
		let encoder = new TextEncoder();
		let buffer = encoder.encode(data);
		let blob = new Blob([buffer])
		const blobURL = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = blobURL;
		a.style = "display: none";

		if (filename && filename.length) {
			a.download = filename;
		}
		document.body.appendChild(a);
		a.click()
	}

	showObjs(objs) {

		if (!this.keyedFieldDescriptions) {
			let descs = createTypeDescriptions(objs)
			this.fieldDescriptions = descs
			this.keyedFieldDescriptions = descs.reduce((acc, field) => {
				acc[field.field] = field
				return acc
			}, {})
		}

		let html =
			'<table>' +
			this._generateHeaders() +
			'<tbody>'
		for (let obj of objs) {
			html += this._renderRow(obj)
		}

		html += '</tbody></table>'

		let div = document.createElement('div')
		div.innerHTML = html

		this.getRecordsElement().innerHTML = ''
		this.getRecordsElement().appendChild(div)

		let table = this.el.querySelector('.records table')
		this.tablesort = new Tablesort(table)
	}

	getStatusElement() {
		let status = this.el.querySelector('.status')
		return status
	}

	getRecordsElement() {
		return this.el.querySelector('.records')
	}

	render() {
		this.el.innerHTML = frameTemplate({
			fieldOptions: this.searchFieldOptions
			, displayClasses: this.displayClasses
		})
		return this
	}

	genInputForFieldDesc(desc) {
		return `<label style="display: block;">\n
			<input name="${desc.field}" type="checkbox" value="${desc.field}" style="width: auto; display: inline-block;" /> 
			${desc.label || desc.field}</label>\n`

	}

	async showFieldOptions(evt, selected) {
		let form = `<p>
		Choose the fields to show in the table. Drag the fields up and down to change their order.
		</p>
		<div class="ei-form">`

		for (let fieldName of this.chosenFields) {
			let desc = this.keyedFieldDescriptions[fieldName]
			if (desc) {
				form += this.genInputForFieldDesc(desc)
			}
		}
		for (let desc of this.fieldDescriptions) {
			if (this.chosenFields.includes(desc.field)) {
				continue
			}
			form += this.genInputForFieldDesc(desc)
		}
		form += '</div>'

		let cur = this.chosenFields.reduce((acc, item) => {
			acc[item] = item
			return acc
		}, {})


		let dialog = new FormAnswerDialog({
			title: 'Choose Fields for Table'
			, body: form
			, data: cur
		})
		dialog.answerAfterOpen = dialog.afterOpen
		dialog.afterOpen = function (bodyElement, self) {

			dialog.answerAfterOpen(bodyElement, self)

			let list1 = new ListView({
				el: bodyElement.querySelector('.ei-form')
				, mobileHandleSelector: 'label'
			})
			list1.render()
		}


		let data = await dialog.open()
		if (data) {
			this.chosenFields = Object.keys(data)
			this.showObjs(this.lastObjs)
		}
	}

	async doSearchValueChange(evt, selected) {
		if (evt.code == 'Enter') {
			this.doSearch(evt, selected)
		}
	}

	async doSearch(evt, selected) {
		this._processingRecordSelection()
		setTimeout(async () => {
			let status = this.getStatusElement()
			let searchStringEl = this.el.querySelector('.search input')
			let searchFieldEl = this.el.querySelector('.search select')
			let searchString = searchStringEl.value
			let searchField = searchFieldEl.value

			if (!searchField || !searchString) {
				status.innerHTML = `<p>no search performed</p>`
				this.getRecordsElement().innerHTML = ''
				this.lastObjs = []
			}
			else {
				status.innerHTML = `<p>performing search</p>`

				let query = {}
				query[searchField] = new RegExp(searchString, 'i')

				let objs = await this.dataService.fetch(query)
				this.lastObjs = objs
				this.showObjs(objs)

				searchFieldEl.value = ''
				searchStringEl.value = ''

				status.innerHTML = `Showing ${objs.length} objects matching field ${searchField} to "${searchString}". ${this._generateDownloadButtons()}`
			}
		}, 1)



	}
	oneClicked(evt, selected) {
		console.log(`one clicked ${selected.id}`)
	}

}