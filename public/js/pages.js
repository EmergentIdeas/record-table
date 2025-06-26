/******/ var __webpack_modules__ = ({

/***/ "./client-js/dynamic-products-list.mjs":
/*!*********************************************!*\
  !*** ./client-js/dynamic-products-list.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupDynamicProductsList)
/* harmony export */ });
/* harmony import */ var _client_lib_record_table_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client-lib/record-table.mjs */ "./client-lib/record-table.mjs");
/* harmony import */ var _format_price_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format-price.mjs */ "./client-js/format-price.mjs");
/* harmony import */ var _dankolz_in_memory_data_service_lib_in_memory_data_service_sift_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs */ "./node_modules/@dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs");
/* harmony import */ var _dankolz_data_service_server_client_lib_remote_data_service_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dankolz/data-service-server/client-lib/remote-data-service.mjs */ "./node_modules/@dankolz/data-service-server/client-lib/remote-data-service.mjs");






async function setupDynamicProductsList() {
	let container = document.querySelector('#dynamic-products-list')
	if(container) {
		// let data = (await (await fetch('/data1')).text())
		// let objs = data.split('\n').filter(line => !!line).map(line => JSON.parse(line))
		// let dataService = new InMemoryDataService({
		// 	collections: {
		// 		default: objs
		// 	}
		// })

		let data2 = new _dankolz_data_service_server_client_lib_remote_data_service_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]({
			urlPrefix: '/data2'
		})
		
		let recordTable = new _client_lib_record_table_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]({
			// dataService: dataService
			dataService: data2
			, chosenFields: ['title', 'sku', 'upc']
			, editUrlCreator: (row) => {
				return `/products/${(row.getAttribute('data-_id') || row.getAttribute('data-id')).toString()}/edit`
			}
			, fieldDescriptions: [
				{
					field: 'sku'
					, label: 'SKU'
					, formatter: (value, fieldName, obj) => {
						return `<a href="/products/${obj.id || obj._id}/edit">${value}</a>`
					}
				}
				, {
					field: 'price'
					, label: 'Price'
					, formatter: (value, fieldName, obj) => {
						return (0,_format_price_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(value)
						
					}
					, type: 'cents'
				}
				, {
					field: 'quantity'
					, label: 'Quantity'
					, type: 'number'
				}
				, {
					field: 'dne'
					, label: 'Does Not Exist'
					, type: 'number'
				}
				, {
					field: 'madeup'
					, label: 'Made up'
					, type: 'number'
					, retriever: (fieldName, obj) => {
						return 'made'
					}
				}
				, {
					field: 'productCategory'
					, label: 'Category'
					, formatter: (value, fieldName, obj) => {
						let val = value
						
						if(obj.productSubtype) {
							val += ' / ' + obj.productSubtype
						}
						return val
					}
				}
				, {
					field: 'title'
					, label: 'Title'
					, formatter: (value, fieldName, obj) => {
						return `<a href="/products/${(obj.id || obj._id || '').toString()}/edit">${value}</a>`
					}
				}
				, {
					field: 'artcode'
					, label: 'Artist Code'
				}
				, {
					field: 'upc'
					, label: 'UPC'
				}
				, {
					field: 'image'
					, label: 'Image'
					, formatter: (value, fieldName, obj) => {
						let src = ''
						if(obj.productimage) {
							src += obj.productimage
						}
						else if(obj.secondaryImages && obj.secondaryImages.length > 0) {
							src += obj.secondaryImages[0]
						}
						
						if(src) {
							src += '?webhandle-image-resizer&maxWidth=100px'
							return `<img src="${src}" style="width: 100px;" />`
						}
						return ''
					}
				}
			]
		})
		recordTable.appendTo(container)
		recordTable.render()
	}

}


/***/ }),

/***/ "./client-js/format-price.mjs":
/*!************************************!*\
  !*** ./client-js/format-price.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatPrice)
/* harmony export */ });

function reverseString(str) {
	return str.split("").reverse().join("")
}

function formatPrice(data) {
	if (!data) {
		return ''
	}
	let num = parseFloat(data)
	let s = '$' + Math.round(num * 100) / 100
	let i = s.lastIndexOf('.')
	if (i > 0) {
		while (i > s.length - 3) {
			s += '0'
			i = s.lastIndexOf('.')
		}
	}
	else {
		s += '.00'
	}
	if (s.length > 10) {
		s = reverseString(s)
		s = s.substring(0, 6) + ',' + s.substring(6, 9) + ',' + s.substring(9)
		s = reverseString(s)
	}
	else if (s.length > 7) {
		s = reverseString(s)
		s = s.substring(0, 6) + ',' + s.substring(6)
		s = reverseString(s)
	}
	return s
}


/***/ }),

/***/ "./client-lib/record-table.mjs":
/*!*************************************!*\
  !*** ./client-lib/record-table.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecordTable)
/* harmony export */ });
/* harmony import */ var _webhandle_backbone_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webhandle/backbone-view */ "./node_modules/@webhandle/backbone-view/client-js/index.js");
/* harmony import */ var _dankolz_tablesort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dankolz/tablesort */ "./node_modules/@dankolz/tablesort/lib/tablesort.js");
/* harmony import */ var _views_webhandle_record_table_frame_tri__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/webhandle/record-table/frame.tri */ "./views/webhandle/record-table/frame.tri");
/* harmony import */ var objs_to_sql_lib_create_type_descriptions_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! objs-to-sql/lib/create-type-descriptions.mjs */ "./node_modules/objs-to-sql/lib/create-type-descriptions.mjs");
/* harmony import */ var _webhandle_form_answer_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @webhandle/form-answer-dialog */ "./node_modules/@webhandle/form-answer-dialog/client-lib/form-answer-dialog.mjs");
/* harmony import */ var _webhandle_objs_to_csv_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @webhandle/objs-to-csv-string */ "./node_modules/@webhandle/objs-to-csv-string/index.mjs");
/* harmony import */ var _webhandle_drag_sortable_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @webhandle/drag-sortable-list */ "./node_modules/@webhandle/drag-sortable-list/client-lib/list-view.mjs");










class RecordTable extends _webhandle_backbone_view__WEBPACK_IMPORTED_MODULE_0__.View {

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

		let dialog = new _webhandle_form_answer_dialog__WEBPACK_IMPORTED_MODULE_4__["default"]({
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
		if(value === undefined) {
			return ''
		}
		if(value === null) {
			return ''
		}
		return value
	}

	defaultValueRetriever(fieldName, obj) {
		return obj[fieldName]
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
			let retriever = this.defaultValueRetriever
			if(desc && desc.retriever) {
				retriever = desc.retriever
			}
			let value = retriever(field, obj)
			rendered[field] = formatter(value, field, obj)
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
			let retriever = this.defaultValueRetriever
			if(desc && desc.retriever) {
				retriever = desc.retriever
			}
			let value = retriever(field, obj)
			row += `<td>${formatter(value, field, obj)}</td>`
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
		let csv = (0,_webhandle_objs_to_csv_string__WEBPACK_IMPORTED_MODULE_5__["default"])(this.lastObjs)
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
		let csv = (0,_webhandle_objs_to_csv_string__WEBPACK_IMPORTED_MODULE_5__["default"])(data, {
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
			let descs = (0,objs_to_sql_lib_create_type_descriptions_mjs__WEBPACK_IMPORTED_MODULE_3__["default"])(objs)
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
		this.tablesort = new _dankolz_tablesort__WEBPACK_IMPORTED_MODULE_1__(table)
	}

	getStatusElement() {
		let status = this.el.querySelector('.status')
		return status
	}

	getRecordsElement() {
		return this.el.querySelector('.records')
	}

	render() {
		this.el.innerHTML = _views_webhandle_record_table_frame_tri__WEBPACK_IMPORTED_MODULE_2__({
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


		let dialog = new _webhandle_form_answer_dialog__WEBPACK_IMPORTED_MODULE_4__["default"]({
			title: 'Choose Fields for Table'
			, body: form
			, data: cur
		})
		dialog.answerAfterOpen = dialog.afterOpen
		dialog.afterOpen = function (bodyElement, self) {

			dialog.answerAfterOpen(bodyElement, self)

			let list1 = new _webhandle_drag_sortable_list__WEBPACK_IMPORTED_MODULE_6__["default"]({
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

/***/ }),

/***/ "./node_modules/@dankolz/abstract-data-service/abstract-data-service-browser.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@dankolz/abstract-data-service/abstract-data-service-browser.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const DataService = __webpack_require__(/*! ./abstract-data-service */ "./node_modules/@dankolz/abstract-data-service/abstract-data-service.js")

class DataServiceBrowser extends DataService {
	/**
	 * Generates storage system independent random ids
	 * @returns a base64 string, 256 bits of randomness
	 */
	generateId() {
		let array = new Uint8Array(32)
		window.crypto.getRandomValues(array)
		let value = btoa(array)
		value = value.replace(/\//g, "_").replace(/\+/g, "-").replace(/=+$/, "")
		return value
	}

}

module.exports = DataServiceBrowser


/***/ }),

/***/ "./node_modules/@dankolz/abstract-data-service/abstract-data-service.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@dankolz/abstract-data-service/abstract-data-service.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const filog = __webpack_require__(/*! filter-log */ "./node_modules/filter-log/filter-log-browser.js")
const addCallbackToPromise = __webpack_require__(/*! add-callback-to-promise */ "./node_modules/add-callback-to-promise/add-callback-to-promise.js")


class DataService {

	/**
	 * 
	 * @param {object} options
 	 * @param {string} [options.serviceName] Sets the name of this service for logging, and possibly other purposes
 	 * @param {boolean} [options.useIndependentIds] If true, records will get unique ID strings which are not tied to the underylying datastore
 	 * @param {object} options.collections an object holding the MongoDB collections this service will use, keyed by collection name
 	 * @param {object} [options.collections.default] the default collection. Technically optional, but the basic functions which
	 * don't require the caller to specify the collection won't work if not set.
	 * @param {EventEmitter} [options.notification] An EventEmitter that will be notified on create, update, and delete. The notification is:
	 * emit('object-change', { the object }, changeType: create, update, delete)
	 * @param {string} [options.eventName] The event name which will be used for the emitter. By default this is 'object-change'.
	 * 
	 */
	constructor({serviceName = 'dataService', useIndependentIds = true, eventName = 'object-change'} = {}) {
		Object.assign(this, {
			log: filog(serviceName + ':')
			, collections: {}
			, useIndependentIds: useIndependentIds
			, eventName: eventName
		}, arguments[0])
	}
	
	/**
	 * EXTENDING CLASSES MUST IMPLEMENT THIS METHOD.
	 * Generates storage system independent random ids
	 * @returns a string
	 */
	generateId() {
		throw new Error('generateId not implemented')
		/*
			check out abstract-data-service-node and abstract-data-service-browser for implementations
		*/
	}
	
	/**
	 * Finds documents via a MongoDB query object
	 * @param {object} query 
	 * @returns An array of resultant objects, possibly empty.
	 */
	async fetch(query) {
		return this._fetchByQuery(this.collections.default, query)
	}
	
	/**
	 * Fetch a single document.
	 * @param {*} id A query or a string which is the id
	 * @returns Either a single document or null
	 */
	async fetchOne(id) {
		let items = await this._fetchById(this.collections.default, id)
		if(items && items.length > 0) {
			return items[0]
		}
		return null
	}
	/**
	 * Store a document. It will replace or insert if there's no _id member
	 * @param {*} focus 
	 * @returns A promise that resolves to the saved object and the native mongo result
	 * in an result object [obj, native]
	 */
	async save(focus) {
		return this._save(this.collections.default, focus) 
	}
	/**
	 * Stores an array of documents. Returns an array of promises.
	 * @param {array} foci 
	 * @returns 
	 */
	saveMany(foci) {
		return this._saveMany(this.collections.default, foci) 
	}
	/**
	 * Removes one of more documents. This assumes the id is actually just an id,
	 * but will work fine if a broader query is passed.
	 * @param {*} id A query or a string which is the id
	 * @returns 
	 */
	async remove(id) {
		return this._removeByQuery(this.collections.default, this.createIdQuery(id))
	}

	/**
	 * Creates an object to query the db by an object's ID
	 * @param {*} id 
	 * @returns 
	 */
	createIdQuery(id) {
		if (Array.isArray(id)) {
			return id.map(this.createIdQuery)
		}
		if (typeof id === 'string') {
			return {
				$or: [{
					_id: id
				}
				, {
					id: id
				}]
			}
		}
		return id
	}

	/**
	 * Transforms the results of fetches. This is sometimes done when the object from the database should be augmented
	 * with additional information or should be converted into an object with a specific class. Override this function
	 * at need. By default it does essentially nothing.
	 * @param {object[]} result An array of objects from the database
	 * @param {string} collectionName The name of the collection these objects came from. If this class only queries a single
	 * collection, this parameter won't be of much use. If it queries multiple collection, this will help inform the method
	 * what to do with the object.
	 * @returns A promise which results in an array of objects.
	 */
	async postFetchesProcessor(result, collectionName) {
		return new Promise((resolve, reject) => {
			resolve(result)
		})
	}

	/**
	 * The internal implementation of fetching objects
	 * @param {object} collection Could be anyting. An array, a mongo collection, even just a string to 
	 * identify what underlying datastore to use
	 * @param {object|array} query An object in the mongodb query style, or an array of those objects
	 * @returns a promise which resolves to the result of the fetch, generally an array of result objects.
	 */
	async _doInternalFetch(collection, query) {
		throw new Error('_doInternalFetch not implemented')
		/*
			// Code will look something like this:

			return new Promise((resolve, reject) => {
				resolve([{}])
			})
		*/
	}
	
	/**
	 * Fetches a list of documents from the collection.
	 * @param {Collection} collection A MongoDB Collection
	 * @param {object,array} query A mongodb query object. Can me null or {} if you want all documents. 
	 * @param {function} callback (optional) A callback if that's how you get down. This function would normally be used with promises and await.
	 * @returns A promise which resolves to an array of documents
	 */
	_fetchByQuery(collection, query = {}, callback) {
		let p = new Promise((resolve, reject) => {
			this._doInternalFetch(collection, query).then(result => {
				this.postFetchesProcessor(result, collection.collectionName).then((processed) => {
					resolve(processed)
				})
			}).catch(err => {
				this.log.error(err)
				return reject(err)
			})
		})
		return addCallbackToPromise(p, callback)
	}
	
	/**
	 * EXTENDING CLASSES MUST IMPLEMENT THIS METHOD.
	 * The internal implementation of removing objects based on a query.
	 * @param {object} collection Could be anyting. An array, a mongo collection, even just a string to 
	 * identify what underlying datastore to use
	 * @param {object|array} query An object in the mongodb query style, or an array of those objects
	 * @returns a promise which resolves to the result of the delete, generally an internal result object
	 */
	async _doInternalRemove(collection, query) {
		throw new Error('_doInternalRemove not implemented')
		/*
			// Code will look something like this:

			return new Promise((resolve, reject) => {
				resolve(query)
			})
		*/
	}
	
	_removeByQuery(collection, query = {}, callback) {
		let p = new Promise((resolve, reject) => {
			this._doInternalRemove(collection, query).then(result => {
				this._notify(query, 'delete')
				resolve(result)
			}).catch(err => {
				this.log.error(err)
				return reject(err)
			})
		})
		return addCallbackToPromise(p, callback)
	}

	/**
	 * Fetches a list of documents from the collection.
	 * 
	 * @param {Collection} collection A MongoDB Collection
	 * @param {*} id A query. If it's an object, that's used directly. If it's a string, we'll try to turn it into a MongoDB style ID query object.
	 *  If an array is passed, each element is assumed to be an id of the objects to fetch.
	 * @param {function} callback (optional) A callback if that's how you get down. This function would normally be used with promises and await.
	 * @returns A promise which resolves to an array of documents containing either one of zero items
	 */
	_fetchById(collection, id, callback) {
		return this._fetchByQuery(collection, this.createIdQuery(id), callback)
	}
	

	/**
	 * EXTENDING CLASSES MUST IMPLEMENT THIS METHOD.
	 * The internal implementation of saving objects, either insert or update. 
	 * @param {object} collection Could be anyting. An array, a mongo collection, even just a string to 
	 * identify what underlying datastore to use
	 * @param {object} focus An object to save
	 * @returns a promise which resolves to the result of the save, an array of the [result, change-type(update,create), native-result].
	 */
	async _doInternalSave(collection, focus) {
		throw new Error('_doInternalSave not implemented')
		/*
			// Code will look something like this:

			let p = new Promise((resolve, reject) => {
				return resolve([focus, 'update', null])
			})
			return p
		*/
	}

	/**
	 * Saves an object. If it already has an _id attribute, it replaces the existing document, otherwise inserts it.
	 * @param {Collection} collection A MongoDB Collection
	 * @param {object} focus The object to save
	 * @param {function} callback (optional) A callback if that's how you get down. This function would normally be used with promises and await.
	 * @returns Promise
	 */
	async _save(collection, focus, callback) {
		let p = new Promise((resolve, reject) => {
			if(this.useIndependentIds && !focus.id) {
				focus.id = this.generateId()
			}
			this._doInternalSave(collection, focus).then(([saved, saveType, nativeResult]) => {
				this._notify(saved, saveType)
				return resolve([saved, nativeResult])
			})
			.catch(err => {
				reject(err)
			})
		})
		return addCallbackToPromise(p, callback)
	}

	
	/**
	 * Saves an array of objects. If the objects already have an _id attribute, it replaces the existing document, otherwise inserts it.
	 * @param {Collection} collection A MongoDB Collection
	 * @param {object[]} foci An array of objects to save
	 * @param {function} callback (optional) A callback if that's how you get down. Called when Promise.all is done. This function would normally be used with promises and await.
	 * @returns Array An array of promises which represent saves for each object in the array. If you want to wait on the results, try:
	 * 		Promise.all(service._saveMany(col, items)).then(result => {
	 * 			// some code
	 * 		})
	 * 	or
	 * 		await Promise.all(service._saveMany(col, items))
	 */
	_saveMany(collection, foci, callback) {
		let promises = []
		for(let focus of foci) {
			promises.push(this._save(collection, focus))
		}	
		if(callback) {
			addCallbackToPromise(Promise.all(promises), callback)
		}	
		return promises
	}
	
	_notify(obj, type) {
		if(this.notification) {
			this.notification.emit(this.eventName, obj, type)
		}
	}
}

module.exports = DataService

/***/ }),

/***/ "./node_modules/@dankolz/data-service-server/client-lib/remote-data-service.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/@dankolz/data-service-server/client-lib/remote-data-service.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RemoteDataService)
/* harmony export */ });
/* harmony import */ var _dankolz_abstract_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dankolz/abstract-data-service */ "./node_modules/@dankolz/abstract-data-service/abstract-data-service-browser.js");
/* harmony import */ var _utils_replace_regexp_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/replace-regexp.mjs */ "./node_modules/@dankolz/data-service-server/client-lib/utils/replace-regexp.mjs");
/* harmony import */ var _utils_presend_transformer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/presend-transformer.mjs */ "./node_modules/@dankolz/data-service-server/client-lib/utils/presend-transformer.mjs");
/* harmony import */ var _utils_postreceive_transformer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/postreceive-transformer.mjs */ "./node_modules/@dankolz/data-service-server/client-lib/utils/postreceive-transformer.mjs");





class RemoteDataService extends _dankolz_abstract_data_service__WEBPACK_IMPORTED_MODULE_0__ {
	constructor(options) {
		super(options)
		this.urlPrefix = options.urlPrefix
		if(!options.collections) {
			this.collections = {
				default: {
					collectionName: 'default'
				}
			}
		}
		this.closeConnection = options.closeConnection || false
		this.cacheValue = options.cacheValue 
		this.authToken = options.authToken
		this.presaveTransformer = options.presaveTransformer || _utils_presend_transformer_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]
		this.postfetchTransformer = options.postfetchTransformer || _utils_postreceive_transformer_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]
	}
	
	/**
	 * Adds headers to the request for caching and connection
	 * @param {Request} request 
	 */
	addExtraHeaders(request) {
		if(this.closeConnection) {
			request.headers['Connection'] = 'close'
		}
		if(this.cacheValue) {
			request.headers['cache'] = this.cacheValue
		}
		
		if(this.authToken) {
			request.headers['Authorization'] = 'Bearer ' + this.authToken
		}

	}

	/**
	 * The internal implementation of saving objects, either insert or update. 
	 * @param {object} collection Could be anyting. An array, a mongo collection, even just a string to 
	 * identify what underlying datastore to use
	 * @param {object} focus An object to save
	 * @returns a promise which resolves to the result of the save, an array of the [result, change-type(update,create), native-result].
	 */
	async _doInternalSave(collection, focus) {
		
		let records = [focus]
		records = await this.presaveTransformer(records)
		
		let request = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ records: records})
			, mode: 'cors'
		}
		this.addExtraHeaders(request)

		let response = await fetch(this.urlPrefix, request)
		let result = await response.json()
		return result[0]
	}

	/**
	 * The internal implementation of removing objects based on a query.
	 * @param {object} collection Could be anyting. An array, a mongo collection, even just a string to 
	 * identify what underlying datastore to use
	 * @param {object|array} query An object in the mongodb query style, or an array of those objects
	 * @returns a promise which resolves to the result of the delete, generally an internal result object
	 */
	async _doInternalRemove(collection, query) {
		query = (0,_utils_replace_regexp_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(query)
		let request = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ query: query })
			, mode: 'cors'
		}
		this.addExtraHeaders(request)

		let response = await fetch(this.urlPrefix, request)
		let result = await response.json()
		return result
	}

	/**
	 * The internal implementation of fetching objects
	 * @param {object} collection Could be anyting. An array, a mongo collection, even just a string to 
	 * identify what underlying datastore to use
	 * @param {object|array} query An object in the mongodb query style, or an array of those objects
	 * @returns a promise which resolves to the result of the fetch, generally an array of result objects.
	 */
	async _doInternalFetch(collection, query) {
		query = (0,_utils_replace_regexp_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(query)
		let request = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ query: query })
			, mode: 'cors'
		}
		this.addExtraHeaders(request)

		let response = await fetch(this.urlPrefix + '/fetch', request)
		let result = await response.json()
		if(!Array.isArray(result)) {
			result = [result]
		}
		result = await this.postfetchTransformer(result)
		return result
	}

	/**
	 * Creates an object to query the db by an object's ID. We're not going to change anything though
	 * and let that all happen on the receiving side.
	 * @param {*} id 
	 * @returns 
	 */
	createIdQuery(id) {
		return id
	}
}

/***/ }),

/***/ "./node_modules/@dankolz/data-service-server/client-lib/utils/postreceive-transformer.mjs":
/*!************************************************************************************************!*\
  !*** ./node_modules/@dankolz/data-service-server/client-lib/utils/postreceive-transformer.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ postReceiveTransformer)
/* harmony export */ });
async function postReceiveTransformer(records) {
	return records
}

/***/ }),

/***/ "./node_modules/@dankolz/data-service-server/client-lib/utils/presend-transformer.mjs":
/*!********************************************************************************************!*\
  !*** ./node_modules/@dankolz/data-service-server/client-lib/utils/presend-transformer.mjs ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ presendTransformer)
/* harmony export */ });
async function presendTransformer(records) {
	return records
}

/***/ }),

/***/ "./node_modules/@dankolz/data-service-server/client-lib/utils/replace-regexp.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/@dankolz/data-service-server/client-lib/utils/replace-regexp.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ replaceRegexp)
/* harmony export */ });

function isRegExp(value) {
	if(!value) {
		return false
	}
	return value instanceof RegExp
}

function transform(regexp) {
	let result = {
		$regex: regexp.source, 
	}
	if(regexp.flags) {
		result.$options = regexp.flags
	}
	return result
}

function replaceRegexp(focus) {
	if(!focus) {
		return focus
	}
	
	if(isRegExp(focus)) {
		return transform(focus)
	}
	
	if(typeof focus === 'object') {
		for(let key of Object.keys(focus)) {
			try {
				focus[key] = replaceRegexp(focus[key])	
			}
			// In case we raise an error setting a member
			catch(e) {}
		}
	}

	return focus
}

/***/ }),

/***/ "./node_modules/@dankolz/in-memory-data-service/lib/id-filter-generator.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/@dankolz/in-memory-data-service/lib/id-filter-generator.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function filterGenerator(query) {
	return function(item) {
		if(!query) {
			return true
		}
		if(!item) {
			return false
		}
		if(typeof query == 'string') {
			return item._id == query || item.id == query
		}
		return item._id == query._id || item.id == query.id
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filterGenerator);

/***/ }),

/***/ "./node_modules/@dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SiftMemoryService)
/* harmony export */ });
/* harmony import */ var sift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sift */ "./node_modules/sift/es5m/index.js");
/* harmony import */ var _in_memory_data_service_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in-memory-data-service.mjs */ "./node_modules/@dankolz/in-memory-data-service/lib/in-memory-data-service.mjs");



class SiftMemoryService extends _in_memory_data_service_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor(options) {
		super(options)

		if (!options.filterGenerator) {
			this.filterGenerator = sift__WEBPACK_IMPORTED_MODULE_1__["default"]
		}
	}
	async _doInternalFetch(collection, query) {
		if(typeof query === 'string') {
			// Sometimes a simple id string will get all the way down here. We need to 
			// make sure it's a query for sift
			query = this.createIdQuery(query)
		}
		
		return super._doInternalFetch(collection, query)
	}

	/**
	 * Creates an object to query the db by an object's ID
	 * @param {*} id 
	 * @returns 
	 */
	createIdQuery(id) {
		if (Array.isArray(id)) {
			return id.map(this.createIdQuery)
		}
		if (typeof id === 'string') {
			return {
				$or: [{
					_id: id
				}
				, {
					id: id
				}]
			}
		}
		return id
	}

}

/***/ }),

/***/ "./node_modules/@dankolz/in-memory-data-service/lib/in-memory-data-service.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/@dankolz/in-memory-data-service/lib/in-memory-data-service.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InMemoryDataService)
/* harmony export */ });
/* harmony import */ var _dankolz_abstract_data_service_abstract_data_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dankolz/abstract-data-service/abstract-data-service.js */ "./node_modules/@dankolz/abstract-data-service/abstract-data-service.js");
/* harmony import */ var _webhandle_id_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @webhandle/id-generator */ "./node_modules/@webhandle/id-generator/generate-id-browser.mjs");
/* harmony import */ var _id_filter_generator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id-filter-generator.mjs */ "./node_modules/@dankolz/in-memory-data-service/lib/id-filter-generator.mjs");






class InMemoryDataService extends _dankolz_abstract_data_service_abstract_data_service_js__WEBPACK_IMPORTED_MODULE_0__ {
	/**
	 * 
	 * @param {object} options
	   * @param {string} [options.serviceName] Sets the name of this service for logging, and possibly other purposes
	   * @param {boolean} [options.useIndependentIds] If true, records will get unique ID strings which are not tied to the underylying datastore
	   * @param {object} options.collections an object holding the arrays this service will use, keyed by object storename
	   * @param {string} [options.collections.default] the default object store name. Technically optional, but the basic functions which
	 * don't require the caller to specify the object store won't work if not set. For this DataService type these should be arrays.
	 * @param {EventEmitter} [options.notification] An EventEmitter that will be notified on create, update, and delete. The notification is:
	 * emit('object-change', { the object }, changeType: create, update, delete)
	 * @param {string} [options.eventName] The event name which will be used for the emitter. By default this is 'object-change'.
	 * @param {function} [options.filterGenerator] A function which is passed a query object and returns a function which can be use for
	 * array.filter. Check out the npm package sift as an easy way to do this. If this is null, queries that are not
	 * id queries will fail.
	 * 
	 */
	constructor(options) {
		super(options)
		
		if(!this.collections) {
			this.collections = {
				default: []
			}
		}
		if(!this.collections.default) {
			this.collections.default = []
		}
		
		if(!this.filterGenerator) {
			this.filterGenerator = _id_filter_generator_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]
		}
	}
	
	generateId() {
		return (0,_webhandle_id_generator__WEBPACK_IMPORTED_MODULE_1__["default"])()
	}

	/**
	 * Creates an object to query the db by an object's ID
	 * @param {*} id 
	 * @returns 
	 */
	createIdQuery(id) {
		// We do NOT want to transform this into a more complex object because there's
		// no piece of code which knows how to interpret it.
		return id
	}

	async _doInternalFetch(collection, query) {
		return new Promise(async (resolve, reject) => {
			if(Array.isArray(query)) {
				let result = []
				try {
					for(let subquery of query) {
						let subresult = await this._doInternalFetch(collection, subquery)
						result.push(...subresult)
					}
				}
				catch(e) {
					return reject(e)
				}
				return resolve(result)
			}
			
			if(!query || Object.keys(query).length == 0) {
				return resolve([...collection])
			}
			
			let filter = this.filterGenerator(query)
			let result = collection.filter(filter)
			resolve(result)
		})
	}

	async _doInternalSave(collection, focus) {
		let p = new Promise(async (resolve, reject) => {
			let type = 'update'
			if(!focus._id) {
				focus._id = this.generateId()
				type = 'create'
			}
			else {
				await this._doInternalRemove(collection, focus._id)
			}
			collection.push(focus)
			return resolve([focus, type, null])
		})
		return p
	}

	async _doInternalRemove(collection, query) {
		return new Promise(async (resolve, reject) => {
			let matchedRecords = await this._doInternalFetch(collection, query)
			for(let found of matchedRecords) {
				for(let i = 0; i < collection.length; i++) {
					if(collection[i]._id == found._id || collection[i].id == found.id) {
						collection.splice(i, 1)
						i--
					}
				}

			}

			resolve(query)
		})
	}
}


/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/anti.js":
/*!*****************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/anti.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Creates a comparator based on another comparator which has the opposite
 * sort order.
 * @param {function} comparator 
 * @returns 
 */
function anti(comparator) {
	return function(valueOne, valueTwo, cellOne, cellTwo) {
		return -1 * comparator(valueOne, valueTwo, cellOne, cellTwo)
	}
}

module.exports = anti

/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/comparator-default.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/comparator-default.js ***!
  \*******************************************************************/
/***/ ((module) => {

function comparator(valueOne, valueTwo, cellOne, cellTwo) {
	valueOne = valueOne.trim()
	valueTwo = valueTwo.trim()
	if(valueOne == '' && valueTwo == '') {
		return 0
	}
	if(valueOne == '') {
		return -1
	}
	if(valueTwo == '') {
		return 1
	}
	return valueOne.toLowerCase().localeCompare(valueTwo.toLowerCase())
}

module.exports = comparator

/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/comparator-numberish.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/comparator-numberish.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const numberishOnly = __webpack_require__(/*! ./numberish-only */ "./node_modules/@dankolz/tablesort/lib/numberish-only.js")

function comparator(valueOne, valueTwo, cellOne, cellTwo) {
	let [one, two] = [valueOne, valueTwo].map(numberishOnly).map(parseFloat)
	if(Number.isNaN(one) && Number.isNaN(two)) {
		return 0
	}
	if(Number.isNaN(one)) {
		return -1
	}
	if(Number.isNaN(two)) {
		return 1
	}
	if(one < two) {
		return -1
	}
	if(one > two) {
		return 1
	}
	return 0
}
module.exports = comparator

/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/comparator-sku.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/comparator-sku.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const numberishOnly = __webpack_require__(/*! ./numberish-only */ "./node_modules/@dankolz/tablesort/lib/numberish-only.js")
// const charactersOnly = require('./characters-only')
const firstCharactersOnly = __webpack_require__(/*! ./first-characters-only */ "./node_modules/@dankolz/tablesort/lib/first-characters-only.js")

function trim(val) {
	return val.trim()
}

function comparator(valueOne, valueTwo, cellOne, cellTwo) {
	let [one, two] = [valueOne, valueTwo].map(trim).map(firstCharactersOnly).map(trim)
	if(!one && two) {
		return -1
	}
	if(one && !two) {
		return 1
	}
	
	let diff = one.toLowerCase().localeCompare(two.toLowerCase())
	if(diff != 0) {
		return diff
	}
	
	[one, two] = [valueOne, valueTwo].map(numberishOnly).map(trim).map(parseFloat)
	if(Number.isNaN(one) && Number.isNaN(two)) {
		return 0
	}
	if(Number.isNaN(one)) {
		return -1
	}
	if(Number.isNaN(two)) {
		return 1
	}
	if(one < two) {
		return -1
	}
	if(one > two) {
		return 1
	}
	return 0
}
module.exports = comparator

/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/first-characters-only.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/first-characters-only.js ***!
  \**********************************************************************/
/***/ ((module) => {

function firstCharactersOnly(val) {
	if (val) {
		if(typeof val !== 'string') {
			val = val.toString()
		}
		let match = val.match(/^[a-zA-Z]+/)
		if(!match) {
			return ''
		}
		return match[0]
	}
	return ''
}

module.exports = firstCharactersOnly

/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/numberish-only.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/numberish-only.js ***!
  \***************************************************************/
/***/ ((module) => {

function numberishOnly(val) {
	if (val) {
		if(typeof val !== 'string') {
			val = val.toString()
		}
		return val.replace(/[^0123456789\-.]/g, '')
	}
	return ''
}

module.exports = numberishOnly

/***/ }),

/***/ "./node_modules/@dankolz/tablesort/lib/tablesort.js":
/*!**********************************************************!*\
  !*** ./node_modules/@dankolz/tablesort/lib/tablesort.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let comparatorDefault = __webpack_require__(/*! ./comparator-default */ "./node_modules/@dankolz/tablesort/lib/comparator-default.js")
let comparatorNumberish = __webpack_require__(/*! ./comparator-numberish */ "./node_modules/@dankolz/tablesort/lib/comparator-numberish.js")
let comparatorSku = __webpack_require__(/*! ./comparator-sku */ "./node_modules/@dankolz/tablesort/lib/comparator-sku.js")

const anti = __webpack_require__(/*! ./anti */ "./node_modules/@dankolz/tablesort/lib/anti.js")

class Tablesort {
	constructor(tableElement, options = {}) {
		this.tableElement = tableElement
		this.options = Object.assign({}, options)
		
		this.options.comparators = Object.assign({
			default: comparatorDefault
			, numberish: comparatorNumberish
			, sku: comparatorSku
		}, this.options.comparators)
		
		let headers = tableElement.querySelectorAll('th:not(.no-sort)')
		for(let header of headers) {
			header.addEventListener('click', this.headerClick.bind(this))
		}
	}
	
	headerClick(evt) {
		let header = evt.currentTarget
		let position = Array.from(header.parentNode.children).indexOf(header)
		let reverse = header.getAttribute('aria-sort') == 'forward' ? true : false
		this.tableElement.querySelectorAll('th').forEach(cell => cell.removeAttribute('aria-sort'))
		header.setAttribute('aria-sort', reverse ? 'reverse' : 'forward')
		

		let comparatorName = header.getAttribute('data-comparator') || 'default'
		let comparator = this.options.comparators[comparatorName] || this.options.comparators.default
		if(reverse) {
			comparator = anti(comparator)
		}

		this.sort(position, comparator)
	}
	
	sort(position, comparator = this.options.comparators.default) {
		let tbody = this.tableElement.querySelector('tbody')
		let rows = Array.from(tbody.querySelectorAll('tr'))
		rows.sort((one, two) => {
			let cellOne = one.children[position]
			let cellTwo = two.children[position]

			return comparator(cellOne.innerText, cellTwo.innerText, cellOne, cellTwo)
		})
		for(let row of rows) {
			tbody.appendChild(row)
		}
	}
	


}

module.exports = Tablesort

/***/ }),

/***/ "./node_modules/@webhandle/backbone-view/client-js/event-entry-mapper.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@webhandle/backbone-view/client-js/event-entry-mapper.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ eventEntryMapper)
/* harmony export */ });
function eventEntryMapper([key, value]) {
	key = key.trim()
	let parts = key.split(' ')
	let event = parts.shift().trim()
	let selector = parts.join(' ').trim()
	
	if(typeof value === 'string') {
		value = value.trim()
	}	
	
	return {
		event: event,
		selector: selector,
		handler: value
	}
}

/***/ }),

/***/ "./node_modules/@webhandle/backbone-view/client-js/extract-event-names.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@webhandle/backbone-view/client-js/extract-event-names.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extractEventNames)
/* harmony export */ });
function extractEventNames(eventTriggers) {
	let eventNames = Array.from(eventTriggers.reduce((acc, trigger) => {
		acc.add(trigger.event)
		return acc
	}, new Set()))
	return eventNames
}

/***/ }),

/***/ "./node_modules/@webhandle/backbone-view/client-js/generate-id.js":
/*!************************************************************************!*\
  !*** ./node_modules/@webhandle/backbone-view/client-js/generate-id.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateId)
/* harmony export */ });
/**
 * Generates a random string id in the browser. Will probably not work
 * on the server.
 * @returns A base64 web url safe string
 */
function generateId() {
	let array = new Uint8Array(32)
	window.crypto.getRandomValues(array)
	let value = btoa(array)
	value = value.replace(/\//g, "_").replace(/\+/g, "-").replace(/=+$/, "")
	return value
}

/***/ }),

/***/ "./node_modules/@webhandle/backbone-view/client-js/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@webhandle/backbone-view/client-js/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* reexport safe */ _view_js__WEBPACK_IMPORTED_MODULE_0__.View)
/* harmony export */ });
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ "./node_modules/@webhandle/backbone-view/client-js/view.js");




/***/ }),

/***/ "./node_modules/@webhandle/backbone-view/client-js/view.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@webhandle/backbone-view/client-js/view.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _generate_id_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate-id.js */ "./node_modules/@webhandle/backbone-view/client-js/generate-id.js");
/* harmony import */ var _event_entry_mapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-entry-mapper.js */ "./node_modules/@webhandle/backbone-view/client-js/event-entry-mapper.js");
/* harmony import */ var _extract_event_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extract-event-names.js */ "./node_modules/@webhandle/backbone-view/client-js/extract-event-names.js");

// import pick from "./pick.js"



let defaultOptions = {
	// The default `tagName` of a View's element is `"div"`.
	tagName: 'div'
	
	, events: {}

}
let viewOptions = ['model', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

/**
 * A way to connect data to be displayed, a way to display it, and an organization
 * of functions to handle events.
 */
class View {
	constructor(options) {
		this.id = (0,_generate_id_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
		Object.assign(this, defaultOptions)
		this.preinitialize.apply(this, arguments);
		Object.assign(this, options)
		this._ensureElement()
		this.initialize.apply(this, arguments);
	}


	/**
	 * preinitialize is an empty function by default. You can override it with a function
	 * or object.  preinitialize will run before any instantiation logic is run in the View
	 */
	preinitialize() { }

	/**
	 * Initialize is an empty function by default. Override it with your own
	 * initialization logic.
	 */
	initialize() { }

	/**
	 * **render** is the core function that your view should override, in order
	 * to populate its element (`this.el`), with the appropriate HTML. The
	 * convention is for **render** to always return `this`.
	 * @returns this
	 */
	render() {
		return this
	}
	
	/**
	 * Removes the element from the dom. Does not disable event listeners
	 */
	remove() {
		this.el.parentElement.removeChild(this.el)
	}
	
	/**
	 * Adds this view as a child to a containing element. Nothing special is going on here.
	 * This is just a shortcut for container.appendChild
	 * @param {Element} container 
	 */
	appendTo(container) {
		container.appendChild(this.el)
	}

	/**
	 * Clears the contents of the container and adds this view.
	 * @param {Element} container 
	 */
	replaceContentsOf(container) {
		container.innerHTML = ''
		this.appendTo(container)
	}

	/**
	 * Set the element for this view, and if new, adds listeners to it in accordance
	 * with the "events" member.
	 * @param {Element} el The dom element which will be the root of this view
	 * @returns this
	 */
	setElement(el) {
		if (this.el !== el) {
			this.el = el
			this._addListeners()
		}
		return this
	}

	/**
	 * Produces a DOM element to be assigned to your view. Exposed for
	 * subclasses using an alternative DOM manipulation API.
	 * @param {string} name The element tag name
	 * @returns The dom element
	 */
	_createElement(name) {
		let el = document.createElement(name)
		el.setAttribute('id', this.id)
		el.view = this
		return el
	}

	/**
	 * Ensures that the element exists. Applies attributes and className
	 * to it regardless
	 */
	_ensureElement() {
		if (!this.el) {
			this.setElement(this._createElement(this.tagName))
		}
		else {
			this._addListeners()
		}
		this._setAttributes()
		if (this.className) {
			this.el.classList.add(this.className)
		}
	}

	/**
	 * Set attributes from a hash on this view's element.  Exposed for
	 * subclasses using an alternative DOM manipulation API.
	 * @param {object} attributes 
	 */
	_setAttributes(attributes) {
		if (this.attributes) {
			for (let [key, value] of Object.entries(this.attributes)) {
				this.el.setAttribute(key, value)
			}
		}
	}

	/**
	 * 
	 * Set callbacks, where `this.events` is a hash of
	 * *{"event selector": "callback"}*
	 *
	 *    {
	 *       'mousedown .title':  'edit',
	 *       'click .button':     'save',
	 *       'click .open':       function(e) { ... },
	 *       'keydown .':     	  'handleKey'
	 *    }
	 * pairs. Callbacks will be bound to the view, with `this` set properly.
	 * 
	 * 
	 * Note that the selector `.` will match the root element and can be used
	 * as a final chance to handle events or for events like an escape key
	 * which are essentially global to the widget.
	 * 
	 */
	_addListeners() {
		this.eventTriggers = Object.entries(this.events).map(_event_entry_mapper_js__WEBPACK_IMPORTED_MODULE_1__["default"])
		let eventNames = (0,_extract_event_names_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.eventTriggers)		

		for(let eventName of eventNames) {
			this.el.addEventListener(eventName, this._eventHandler.bind(this))
		}
	}
	
	/**
	 * Get the elements from the view which match the selector
	 * @param {string} selector A css selector. `.` will select the root element
	 * @returns An array of elements
	 */
	_getCandidates(selector) {
		if(selector === '.') {
			return [this.el]
		}
		return Array.from(this.el.querySelectorAll(selector))
	}
	
	/**
	 * Handles all events for all elements within the view. It attempts to find a
	 * trigger matching the event and then process it. It will match and invoke
	 * only one trigger.
	 * @param {Event} evt 
	 */
	_eventHandler(evt) {
		for(let trigger of this.eventTriggers) {
			if(evt.type == trigger.event) {
				let candidates = this._getCandidates(trigger.selector)
				let found = null
				for(let candidate of candidates) {
					if(candidate === evt.target || candidate.contains(evt.target)) {
						found = candidate
						break
					}
				}
				if(found) {
					if(typeof trigger.handler === 'string') {
						this[trigger.handler].call(this, evt, found)
					}	
					else if(typeof trigger.handler === 'function') {
						trigger.handler.call(this, evt, found)
					}
					break
				}
			}
		}
	}
}


/***/ }),

/***/ "./node_modules/@webhandle/drag-sortable-list/client-lib/data-item-worker.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/@webhandle/drag-sortable-list/client-lib/data-item-worker.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataItemWorker)
/* harmony export */ });

class DataItemWorker {

	async getFileFromEntry(entry) {
		let p = new Promise(async (resolve, reject) => {
			try {
				if (entry.file) {
					entry.file(file => {
						file.entry = entry
						resolve(file)
					}, (err) => {
						console.error(err)
						resolve(null)
					})
				}
				else {
					resolve(null)
				}
			}
			catch (e) {
				console.error(e)
				resolve(null)
			}
		})
		return p
	}

	async readDirectoryEntries(entry) {
		let p = new Promise((resolve, reject) => {
			let dirReader = entry.createReader()
			let result = []
			let readThem = () => {
				dirReader.readEntries(async (entries) => {
					try {
						if(entries && entries.length > 0) {
							for (let entry of entries) {
								result.push(entry)
							}
							readThem()
						}
						else {
							resolve(result)
						}
					}
					catch (e) {
						console.error(e)
						resolve(result)
					}
				})
			}
			readThem()
		})
		return p
	}

	/**
	 * 
	 * Takes a list of DataTransferItems and resolves them to FileEntry objects.
	 * 
	 * Note, you can get a real File object by calling `getFileFromEntry`
	 * @param {array[DataTransferItem|File|FileEntry|DirectoryEntry]} entries 
	 * @param {*} [options]
	 * @returns 
	 */
	async expandEntries(entries, options) {
		options = Object.assign({
			keepDirectories: false
			, recursive: true
		}, options)
		let expanded = []
		let target = [...entries]	
		
		while(target.length > 0) {
			
			// You MUST process all of the DataTransferItems first. If you do a directory read
			// it will blank out the information on those items.
			let item = target.shift()
			
			if(item instanceof File) {
				expanded.push(item)
			}
			else if(item.isFile === true && item.isDirectory === false) {
				expanded.push(item)
			}
			else if(item.isFile === false && item.isDirectory === true) {
				let dirEntries = await this.readDirectoryEntries(item)
				if(options.recursive) {
					target.push(...dirEntries)
				}
				else {
					if(!options.keepDirectories) {
						dirEntries = dirEntries.filter(item => item.isFile)
					}
					expanded.push(...dirEntries)
				}
				if(options.keepDirectories) {
					expanded.push(item)
				}
			}
			else if (item.kind === "file") {
				if (item.webkitGetAsEntry) {
					let entry = item.webkitGetAsEntry()
					if (entry) {
						target.push(entry)
					}
				}
				else if(item.getAsFile) {
					target.push(item.getAsFile())
				}
			}
		}
		
		expanded = expanded.filter(item => !!item)
		return expanded
	}

	/**
	 * A utility function to extract the file entries from a file drop event.
	 * @param {Event} evt 
	 * @returns 
	 */
	async getFileEntriesFromEvent(evt, options) {
		let entries = []
		// items is the new interface we should use if that's available
		if (evt.dataTransfer.items) {
			entries.push(...evt.dataTransfer.items)
		} 
		else if(evt.dataTransfer.files) {
			entries.push(...evt.dataTransfer.files)
		}
		let result = await this.expandEntries(entries, options)
		return result.filter(item => !!item)
	}


}

/***/ }),

/***/ "./node_modules/@webhandle/drag-sortable-list/client-lib/list-view.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/@webhandle/drag-sortable-list/client-lib/list-view.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListView)
/* harmony export */ });
/* harmony import */ var _webhandle_backbone_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webhandle/backbone-view */ "./node_modules/@webhandle/backbone-view/client-js/index.js");
/* harmony import */ var _webhandle_minimal_browser_event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @webhandle/minimal-browser-event-emitter */ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/index.js");
/* harmony import */ var _data_item_worker_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-item-worker.mjs */ "./node_modules/@webhandle/drag-sortable-list/client-lib/data-item-worker.mjs");




let dataItemWorker = new _data_item_worker_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]()

class ListView extends _webhandle_backbone_view__WEBPACK_IMPORTED_MODULE_0__.View {

	/**
	 * Setup the event listners and default objects.
	 * @param {Object} options 
	 */
	preinitialize(options = {}) {
		this.desktopHandleSelector = options.desktopHandleSelector
		this.mobileHandleSelector = options.mobileHandleSelector || '.handle'
		this.events = Object.assign({}, {
			'drop .': 'handleDrop'
			, 'dragend .': 'handleDragEnd'
			, 'dragleave .': 'handleDragLeave'
			, 'dragover .': 'handleDragover'
			, 'dragenter .': 'dragEnter'
			, 'dragover *': 'dragEnterCell'
			, 'dragstart *': 'dragStart'
			, ['touchstart ' + this.mobileHandleSelector]: 'touchDrag'
			, ['touchmove ' + this.mobileHandleSelector]: 'touchMove'
			, ['touchend ' + this.mobileHandleSelector]: 'touchEnd'
			, ['touchcancel ' + this.mobileHandleSelector]: 'touchCancel'
		}, options.events)
		this.placeholderName = options.placeholderName || 'New Item'
		options.events = this.events
		if (!this.emitter) {
			this.emitter = new _webhandle_minimal_browser_event_emitter__WEBPACK_IMPORTED_MODULE_1__["default"]()
		}
		this.overscrollCaptures = {}
	}

	/**
	 * Returns true if a file is being dragged into the list.
	 * @param {Event} evt 
	 * @returns 
	 */
	isFileTypeDrag(evt) {
		if (evt.dataTransfer && evt.dataTransfer.item && evt.dataTransfer.item.length > 0) {
			if (evt.dataTransfer.items[0].kind === 'file') {
				return true
			}
		}
		if (evt.dataTransfer && evt.dataTransfer.types) {
			for (let type of evt.dataTransfer.types) {
				if (type.toLowerCase() == 'files') {
					return true
				}
			}
		}

		return false
	}

	/**
	 * Looks to see if there's a resource label and we should therefore consider this an
	 * external resource object that's being dragged into the list.
	 * @param {Event} evt 
	 * @returns 
	 */
	isResourceTypeDrag(evt) {
		return !!this.extractLabel(evt)
	}

	/**
	 * Watches for entry of dragging into a cell so we can tell of the user is still
	 * performing a drag operation.
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	dragEnterCell(evt, selected) {
		this.canCancel = false
	}

	/**
	 * Watch for the end of dragging for one of the existing cells. This is the cleanup
	 * for the case where a user is dragging and then presses escape.
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	handleDragEnd(evt, selected) {
		this.cleanupDrag()
	}

	/**
	 * Watches for the mouse leaving the list area. The spec has no good way to tell if the user
	 * has stopped dragging within our control area, so here we're doing a little dance to watch
	 * when the user leaves any of the top level elements and then perform a cancel if we don't
	 * see another drag event within a few milliseconds.
	 * 
	 * This does sometimes lead to false positives, but that's generally okay since the code just
	 * interprets the next drag event as if the user just started their drag, so it recovers 
	 * fairly well.
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	handleDragLeave(evt, selected) {
		if (this.externalDrag) {
			if (evt.target == this.el || this.getCells().includes(evt.target)) {
				// so we're leaving the whole list. If we don't immediately enter someplace else
				// then we should interpret this as a cancel
				// In this case, "the whole list" is one of the cells or the container
				this.canCancel = true
				setTimeout(() => {
					if (this.canCancel) {
						this.cleanupDrag()
					}
				}, 20)
			}
		}
	}

	/**
	 * Returns true if this is a type of object from outside the list that can be added
	 * to the list. By default it allows files and uri-list types. To turn off the abilty
	 * to drag other items into the list, just override to return false.
	 * @param {Event} evt 
	 * @returns 
	 */
	shouldInsertCellForExternalDrag(evt) {
		return this.isFileTypeDrag(evt) || this.isResourceTypeDrag(evt)
	}


	/**
	 * This is the mobile/touch equivalent of dragStart
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	touchDrag(evt, selected) {
		this.captureOverscroll('html')
		this.captureOverscroll('body')
		this.dragStart(evt, selected)
	}

	/**
	 * Handle the user touch dragging an item.
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	touchMove(evt, selected) {
		let top = this.boxTop()
		let pos = Math.max(0, evt.touches[0].pageY) - top
		this.positionOnDrag(pos)
	}

	/**
	 * This is essentially a mobile/touch drop
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	touchEnd(evt, selected) {
		this.handleDrop(evt, selected)
	}

	/**
	 * Cleanup after a mobile drag
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	touchCancel(evt, selected) {
		this.cleanupDrag()
	}

	/**
	 * Listens for the element being dragged. The spec seems to indicate that this is
	 * fired on mobile as well, but in practice is seems to only get fired on 
	 * desktop.
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	dragStart(evt, selected) {
		this.dragging = this.getCellFromChild(selected)
		this.dragging.classList.add('dragging')
		if (evt.dataTransfer) {
			evt.dataTransfer.setDragImage(document.createElement('div'), 0, 0)
		}
	}

	/**
	 * Extracts a placeholder label from the data transfer types. The label name is
	 * part of the type name. So, a type of `data:text/label,awesome` would indicate
	 * that the placeholder is supposed to be `awesome`.
	 * @param {Event} evt 
	 * @returns 
	 */
	extractLabel(evt) {
		let labelPrefix = 'data:text/label,'
		for (let type of evt.dataTransfer.types) {
			if (type.indexOf(labelPrefix) == 0) {
				return type.substring(labelPrefix.length)
			}
		}

		return null
	}

	/**
	 * Restores the elements previous overscroll behavior (see captureOverscroll for why we need
	 * this)
	 * @param {string} elName 
	 */
	restoreOverscroll(elName) {
		if (elName in this.overscrollCaptures) {
			document.querySelector(elName).style['overscroll-behavior'] = this.overscrollCaptures[elName]
			delete this.overscrollCaptures[elName]
		}
	}

	/**
	 * Used for mobile to get the present value of what happens when the user drags their finger
	 * farther than the screen can scroll. By default what happens is a page reload. That won't 
	 * be what we want if a user is dragging a list item, so we have to capture that behavior and
	 * change it so that nothing happens to the page.
	 * @param {string} elName 
	 */
	captureOverscroll(elName) {
		let el = document.querySelector(elName)
		this.overscrollCaptures[elName] = el.style['overscroll-behavior']
		el.style['overscroll-behavior'] = 'none'
	}

	/**
	 * Utility function to create a dom node based on html
	 * @param {string} html 
	 * @returns 
	 */
	_makeElementFromHTML(html) {
		let div = document.createElement('div')
		div.innerHTML = html
		let child = div.children[0]
		return child
	}


	/**
	 * Creates markup for the external drag event placeholder cell. Attempts
	 * to determine a reasonable label.
	 * @param {Event} evt 
	 * @returns 
	 */
	createExternalDragPlaceholderHTML(evt) {
		let placeholder = this.extractLabel(evt) || this.placeholderName
		let html = `<div class="cell">
			<span class="handle">↕</span>
			${placeholder}
		</div>`
		return html

	}

	/**
	 * Creates a placeholder cell for a drag event where the source is an
	 * external object like a file or something else on the page.
	 * @param {Event} evt 
	 */
	createExternalDragPlaceholderCell(evt) {
		let html = this.createExternalDragPlaceholderHTML(evt)
		let cell = this._makeElementFromHTML(html)
		cell.setAttribute('draggable', true)
		this.addCell(cell)
		this.dragStart(evt, cell)
	}

	dragEnter(evt, selected) {
		if (!this.dragging && this.shouldInsertCellForExternalDrag(evt)) {
			// If we're not already doing a drag operation, we need to start one
			// We create a placeholder for this event and then move it up and down
			// like a pre-existing cell. 
			// NOTE: We do not have much information about the contents of the
			// drag until the drop event occurs. This placeholder may have to be
			// somewhat generic.
			this.externalDrag = true
			this.createExternalDragPlaceholderCell(evt)
		}
	}

	/**
	 * Watch for movement of something being dragged
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	handleDragover(evt, selected) {
		evt.preventDefault()
		this.canCancel = false
		let top = this.boxTop()
		let pos = evt.y - top

		if (this.dragging) {
			if (evt.dataTransfer) {
				evt.dataTransfer.dropEffect = 'move'
			}
			this.positionOnDrag(pos)
		}
		else {
			if (evt.dataTransfer) {
				evt.dataTransfer.dropEffect = 'copy'
			}
		}
	}

	/**
	 * Creates permanent cells for files dropped into the list
	 * @param {array[FileEntry|File]} files 
	 * @returns an array of Elements
	 */
	createCellsForFiles(files) {
		let cells = files.map(file => {
			let html = `<div class="cell">
				<span class="handle">↕</span>
				${file.name}
			</div>`
			let el = this._makeElementFromHTML(html)
			el.data = file
			return el
		})
		return cells
	}

	/**
	 * Creates permanent cells for resource objects dropped into the list
	 * @param {array[string]} uriList 
	 * @returns an array of Elements
	 */
	createCellsForUriList(uriList) {
		if (!Array.isArray(uriList)) {
			uriList = [uriList]
		}
		let cells = uriList.map(uri => {
			let html = `<div class="cell">
				<span class="handle">↕</span>
				${uri}
			</div>`
			let el = this._makeElementFromHTML(html)
			el.data = uri
			return el
		})
		return cells
	}

	/**
	 * Creates permanent cells for drops of unknown types.
	 * @param {Event} evt 
	 * @returns An array of elements
	 */
	createCellsForUnknownType(evt) {
		return []
	}
	
	isExternalDrop(evt) {
		let uriList
		if (evt.dataTransfer) {
			uriList = evt.dataTransfer.getData('text/uri-list')
		}

		if (this.externalDrag || uriList) {
			return true
		}
		return false
	}
	
	async getFilesEntries(evt) {
		let files = await dataItemWorker.getFileEntriesFromEvent(evt, {
			keepDirectories: false
			, recursive: true
		})
		return files
	}

	/**
	 * Creates permanent cells for external items dropped into the list,
	 * emits events, and does cleaup
	 * @param {Event} evt 
	 * @param {Element} selected 
	 */
	handleDrop(evt, selected) {
		evt.preventDefault()
		
		// Sometimes the placeholder gets cleaned up before the insertion of the new nodes
		// happens. Let's capture the following element just in case we need it.
		let afterDragElement
		if(this.dragging) {
			afterDragElement = this.dragging.nextElementSibling
		}

		let p = new Promise(async (resolve, reject) => {
			if (this.isExternalDrop(evt)) {
				// if a link is dropped, there's no exteralDrag object, just a drop object
				let uriList
				if (evt.dataTransfer) {
					uriList = evt.dataTransfer.getData('text/uri-list')
				}

				let changes = []
				let files = await this.getFilesEntries(evt)
				let cells = []
				if (files && files.length > 0) {
					cells = this.createCellsForFiles(files)
					for (let count = 0; count < cells.length; count++) {
						let cell = cells[count]
						if (!cell.file) {
							cell.file = files[count]
						}
					}
				}
				else if (uriList) {
					if (typeof uriList == 'string') {
						// Acording to the spec, this should be a list with one uri on every line
						// In practice, it seems like the browser is eating the return characters
						// In my tests, I'm passing multiple uris as comma separated. I'm handling
						// both cases here.
						let parts = [uriList]
						for (let sep of ['\r\n', '\n', ',']) {
							let newParts = []
							for (let part of parts) {
								newParts.push(...part.split(sep))
							}
							parts = newParts
						}
						uriList = parts
					}
					cells = this.createCellsForUriList(uriList)
				}
				else {
					cells = this.createCellsForUnknownType(evt)
				}

				for (let cell of cells) {
					cell.setAttribute('draggable', true)
					this.addCell(cell, {
						before: this.dragging || afterDragElement
					})
					changes.push({
						cell: cell
						, file: cell.file
					})
				}
				if (this.dragging) {
					this.dragging.remove()
				}
				this.emitter.emit('list-change', {
					type: 'drop'
					, cells: cells
					, files: files
					, changes: changes
					, event: evt
				})
			}
			else {
				this.emitter.emit('list-change', {
					type: 'reorder'
					, cells: [this.dragging]
				})
			}

		})
		this.cleanupDrag()
		return p
	}

	/**
	 * Adds a new item to the list, last item by default 
	 * @param {string|Element} cell The item to add 
	 * @param {*} [options]
	 * @param {boolean} options.first If true inserted at the start of the list
	 * @param {boolean} options.last If true inserted at the end of the list
	 * @param {Element} options.after Insert after this item 
	 * @param {Element} options.before Insert before this item
	 * @param {*} options.data Data to be set on the element
	 */
	addCell(cell, options = {}) {
		if (typeof cell === 'string') {
			cell = this._makeElementFromHTML(cell)
		}

		if (options.data) {
			cell.data = options.data
		}

		if (options.first) {
			this.el.insertAdjacentElement('afterbegin', cell)
		}
		else if (options.before) {
			this.el.insertBefore(cell, options.before)
		}
		else if (options.after) {
			options.after.after(cell)
		}
		else {
			this.el.insertAdjacentElement('beforeend', cell)
		}
		return cell
	}

	/**
	 * 
	 * @param {int} pos position of pointer relative to the top of the box
	 */
	positionOnDrag(pos) {
		let over = this.findOver(pos)
		this.addCell(this.dragging, {
			before: over
		})
	}

	/**
	 * Gets the top level objects of the list.
	 * @returns 
	 */
	getCells() {
		return [...this.el.children]
	}

	/**
	 * Cleanup after a drag event by deleting any placeholder objects
	 * and restoring the browser to its pre-drag settings
	 */
	cleanupDrag() {
		if (this.dragging && this.externalDrag) {
			this.dragging.remove()
		}

		delete this.dragging
		delete this.externalDrag
		this.getCells().forEach(cell => {
			cell.classList.remove('dragging')
		})
		this.restoreOverscroll('html')
		this.restoreOverscroll('body')
	}

	/**
	 * Determine which cell the pointer/finger is currently over.
	 * @param {Object} pos 
	 * @returns 
	 */
	findOver(pos) {
		let locations = this.findLocations()
		for (let loc of locations) {
			if (pos >= loc.top && pos <= loc.bottom) {
				return loc.cell
			}
		}
	}

	/**
	 * Gets the top of the list box
	 * @returns 
	 */
	boxTop() {
		let boxRect = this.el.getBoundingClientRect()
		let top = boxRect.top
		return top
	}


	/**
	 * Sets up the cells to be draggable and makes the mobile touch handles ready for drag.
	 */
	render() {
		if (this.desktopHandleSelector) {
			this.el.querySelectorAll(this.desktopHandleSelector).forEach(handle => {
				handle.setAttribute("draggable", true)
			})
		}
		else {
			this.getCells().forEach(cell => {
				cell.setAttribute("draggable", true)
			})
		}
		if (this.mobileHandleSelector) {
			this.el.querySelectorAll(this.mobileHandleSelector).forEach(handle => {
				handle.style['touch-action'] = 'none'
			})
		}
	}

	/**
	 * 
	 * @returns The relative locations of the cells in the list
	 */
	findLocations() {
		let top = this.boxTop()

		let locations = []
		this.getCells().forEach(cell => {
			let rect = cell.getBoundingClientRect()
			locations.push({
				top: rect.top - top
				, bottom: rect.bottom - top
				, cell: cell
			})
		})
		return locations
	}

	/**
	 * Give a node for the cell or a descendent of a cell, returns the node
	 * for the cell.
	 * @param {Node} child 
	 * @returns 
	 */
	getCellFromChild(child) {
		if (child.parentElement == this.el) {
			return child
		}
		if (!child) {
			return null
		}
		return this.getCellFromChild(child.parentElement)
	}
}




/***/ }),

/***/ "./node_modules/@webhandle/form-answer-dialog/client-lib/form-answer-dialog.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/@webhandle/form-answer-dialog/client-lib/form-answer-dialog.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormAnswerDialog)
/* harmony export */ });
/* harmony import */ var ei_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ei-dialog */ "./node_modules/ei-dialog/dialog.js");
/* harmony import */ var form_value_injector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! form-value-injector */ "./node_modules/form-value-injector/form-value-injector.js");
/* harmony import */ var _webhandle_gather_form_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @webhandle/gather-form-data */ "./node_modules/@webhandle/gather-form-data/gather-form-data.mjs");





class FormAnswerDialog extends ei_dialog__WEBPACK_IMPORTED_MODULE_0__ {
	/**
	 * 
	 * @param {Object} options Properties to create the dialog box. In addition to the properties from Dialog
	 * there those below.
	 * @param {Object} options.data The data which will be used to populate the controls in the dialog
	 */
	constructor(options) {
		super(Object.assign({}, options,
			{
				on: {
					'.btn-ok': () => {
						this.resolve(this.gatherData())
						return true
					},
					'.mask': () => {
						this.resolve()
						return true
					},
					'.btn-cancel': () => {
						this.resolve()
						return true
					}
				}

			}
		))
		if (this.afterOpen) {
			this.afterOpenOriginal = this.afterOpen
		}
		this.afterOpen = function (bodyElement, self) {
			if (this.data) {
				bodyElement.innerHTML = form_value_injector__WEBPACK_IMPORTED_MODULE_1__(bodyElement.innerHTML, this.data)
			}
			let firstInput = bodyElement.querySelector('input, textarea')
			if (firstInput) {
				firstInput.focus()
			}

			if (this.afterOpenOriginal) {
				this.afterOpenOriginal(bodyElement, self)
			}
		}
	}
	gatherData() {
		let dialogBody = document.querySelector(this.getBodySelector())
		return (0,_webhandle_gather_form_data__WEBPACK_IMPORTED_MODULE_2__["default"])(dialogBody)
	}

	async open() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve
			this.reject = reject
		})
		super.open()

		return this.promise
	}

}

/***/ }),

/***/ "./node_modules/@webhandle/gather-form-data/gather-form-data.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@webhandle/gather-form-data/gather-form-data.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gatherFormData)
/* harmony export */ });
/**
 * Gathers the data from the form controls.
 * @param {HTMLElement} formBody The html element containing the controls. Probably
 * a form tag element, but it really doesn't matter.
 */
function gatherFormData(formBody) {
	let result = {}
	let controls = formBody.querySelectorAll('input, textarea, select')
	for (let control of controls) {
		if (control.type === 'checkbox') {
			if (!control.checked) {
				continue
			}
		}
		else if (control.type === 'radio') {
			if (!control.checked) {
				continue
			}
		}
		result[control.getAttribute('name')] = control.value
	}
	return result
}



/***/ }),

/***/ "./node_modules/@webhandle/id-generator/generate-id-browser.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/@webhandle/id-generator/generate-id-browser.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateId)
/* harmony export */ });

function generateId() {
	let array = new Uint8Array(32)
	window.crypto.getRandomValues(array)
	let value = btoa(array)
	value = value.replace(/\//g, "_").replace(/\+/g, "-").replace(/=+$/, "")
	return value
}

/***/ }),

/***/ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/event-emitter.mjs":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@webhandle/minimal-browser-event-emitter/client-js/event-emitter.mjs ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
/* harmony import */ var _streamish_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./streamish.mjs */ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/streamish.mjs");


/**
 * Add this most basic of the EventEmitter functions (on, emit, removeListener) to the browser's
 * EventTarget functionality.
 * 
 * The eventEmitter.emit() method allows an arbitrary set of arguments to be passed to the listener 
 * functions. Keep in mind that when an ordinary listener function is called, the standard this 
 * keyword is intentionally set to reference the EventEmitter instance to which the listener is attached.
 */
let base = typeof EventTarget === 'undefined' ? _streamish_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] : EventTarget
class EventEmitter extends base {
	constructor(target) {
		super(target)
		if(target) {
			this.innerEventTarget = target
		}
		else {
			this.innerEventTarget = this
		}
	}
	/**
	 * Adds the listener function to the end of the listeners array for the event named eventName. No checks 
	 * are made to see if the listener has already been added. Multiple calls passing the same combination 
	 * of eventName and listener will result in the listener being added, and called, multiple times.
	 * @param {string} eventName The event type name
	 * @param {*} listener The listener function where has arbitrary arguments
	 */
	on(eventName, listener) {
		if(this.innerEventTarget.addEventListener) {
			let nativeListener = (event) => {
				listener.apply(this, event.detail)
			}
			listener.nativeListener = nativeListener
			this.innerEventTarget.addEventListener(eventName, nativeListener)
		}
		else {
			super.on(eventName, listener)
		}
		return this
	}

	/**
	 * Synchronously calls each of the listeners registered for the event named eventName, in the order 
	 * they were registered, passing the supplied arguments to each.
	 * 
	 * @param {string} eventName The event type name
	 * @param  {...any} args 
	 */
	emit(eventName, ...args) {
		if(this.innerEventTarget.dispatchEvent) {
			this.innerEventTarget.dispatchEvent(this._makeEvent(eventName, args))
		}
		else {
			super.emit(eventName, ...args)
		}
		return this
	}

	/**
	 * Removes the specified listener from the listener array for the event named eventName.
	 * @param {string} eventName The event type name
	 * @param {function} listener The listener function
	 */
	removeListener(eventName, listener) {
		if(this.innerEventTarget.removeEventListener) {
			listener = listener.nativeListener || listener
			this.innerEventTarget.removeEventListener(eventName, listener)
		}
		else {
			super.removeListener(eventName, listener)
		}
		return this
	}
	
	_makeEvent(eventName, args) {
		if(typeof CustomEvent === 'function') {
			return new CustomEvent(eventName, {
				detail: args
			})
		}
		else {
			let evt = new Event(eventName)
			evt.detail = args
			return evt
		}
	}
}

/***/ }),

/***/ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/index.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@webhandle/minimal-browser-event-emitter/client-js/index.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _streamish_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./streamish.mjs */ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/streamish.mjs");
/* harmony import */ var _event_emitter_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-emitter.mjs */ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/event-emitter.mjs");
let Emitter
;


if (typeof EventTarget !== 'undefined') {
	Emitter = _event_emitter_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]
}
else {
	Emitter = _streamish_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Emitter);

/***/ }),

/***/ "./node_modules/@webhandle/minimal-browser-event-emitter/client-js/streamish.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/@webhandle/minimal-browser-event-emitter/client-js/streamish.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Streamish)
/* harmony export */ });

class Streamish {
	constructor() {
		this.handles = {}
	}

	on(evt, handle) {
		let handles = this.handles[evt]
		if (!handles) {
			handles = this.handles[evt] = []
		}
		handles.push(handle)
		return this
	}

	emit(evt, ...args) {
		if (evt in this.handles) {
			for (let handle of this.handles[evt]) {
				handle.apply(this, args)
			}
		}
	}

	/**
	 * Removes the specified listener from the listener array for the event named eventName.
	 * @param {string} eventName The event type name
	 * @param {function} listener The listener function
	 */
	removeListener(eventName, listener) {
		if (eventName in this.handles) {
			this.handles[eventName] = this.handles[eventName].filter(func => {
				return func !== listener
			})
		}
	}
}

/***/ }),

/***/ "./node_modules/@webhandle/objs-to-csv-string/all-keys.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/@webhandle/objs-to-csv-string/all-keys.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ allKeys)
/* harmony export */ });
function allKeys(data) {
	let keys = new Set()
	for(let obj of data) {
		for(let key of Object.keys(obj)) {
			keys.add(key)
		}
	}
	
	return Array.from(keys)
}

/***/ }),

/***/ "./node_modules/@webhandle/objs-to-csv-string/index.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/@webhandle/objs-to-csv-string/index.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var _all_keys_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./all-keys.mjs */ "./node_modules/@webhandle/objs-to-csv-string/all-keys.mjs");



/**
 * Converts an array of objects to a CSV string
 * @param {array[object]} data 
 * @param {object} [options] 
 * @param {object} [options.headers] an object representing the headers to use, which the keys are the same as they keys in the data
 * objects and the values are the strings to use for the column heads. If no headers are specified there will be a column for each of
 * the keys present in any of the data objects 
 * @param {object} [options.separator] column separator. ',' by default 
 * @param {object} [options.newline] line separator. '\n' by default 
 * @param {object} [options.sendHeaders] if true, column headers will be generated. true by default
 * @returns {string} csv text
 */
function convert(data, {
	headers
	, separator = ','
  	, newline = '\n'
  	, sendHeaders = true

} ={}) {
	data = [...data]
	let rows = []
	let keys
	if(!headers) {
		keys = (0,_all_keys_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(data)
		if(sendHeaders) {
			headers = keys.reduce((acc, key) => {
				acc[key] = key
				return acc
			}, {})
		}
	}
	else {
		keys = Object.keys(headers)
	}

	if(sendHeaders) {
		rows.push(valuesRow(Object.values(headers), separator))
	}
	
	for(let obj of data) {
		let values = []
		for(let key of keys) {
			values.push(obj[key])
		}
		rows.push(valuesRow(values, separator))
	}

	
	return rows.join(newline)
}


function valuesRow(values, separator) {
	let cols = values.map(makeStringValue).map(quoteValue)
	return cols.join(separator)
}

function makeStringValue(value) {
	if(value === null || value === undefined ) {
		return ''
	}
	if(typeof value !== 'string') {
		return '' + value
	}
	return value
}

function quoteValue(value) {
	return '"' + value.split('"').join('""') + '"'
}

/***/ }),

/***/ "./node_modules/add-callback-to-promise/add-callback-to-promise.js":
/*!*************************************************************************!*\
  !*** ./node_modules/add-callback-to-promise/add-callback-to-promise.js ***!
  \*************************************************************************/
/***/ ((module) => {

function addCallbackToPromise(promise, callback) {
	if(callback) {
		promise = promise.then((obj) => {
			callback(null, obj)
		}).catch((err) => {
			callback(err)
		})
	}
	
	return promise
}

module.exports = addCallbackToPromise

/***/ }),

/***/ "./node_modules/ei-dialog/dialog-styles.txt":
/*!**************************************************!*\
  !*** ./node_modules/ei-dialog/dialog-styles.txt ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".dialog-frame {\n\tposition: fixed;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tz-index: 11000;\n\topacity: 0;\n\ttransition: opacity .3s;\n\toverflow: hidden;\n\t\n\t\n\tdisplay: grid;\n\tjustify-content: center;\n\talign-content: center;\n\tpadding: 5vh 5%;\n}\n\n.dialog-frame.open {\n\topacity: 1;\n}\n\n.dialog-frame .mask {\n\tposition: absolute;\n\tbox-sizing: border-box;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground-color: #333333;\n\topacity: .7;\n\theight: 100%;\n\tz-index: 0;\n\t\n}\n\n\n.dialog-frame .the-dialog {\n\tposition: relative;\n\tdisplay: inline-block;\n\tz-index: 1;\n\tborder-radius: 5px;\n\tbackground-color: white;\n\toverflow: hidden;\n\ttransform: scale(.84);\n\ttransition: transform 0.262s cubic-bezier(.77,-1.72,.08,1);\n}\n\n.dialog-frame.open .the-dialog {\n\ttransform: scale(1);\n}\n\n.dialog-frame .the-dialog .close {\n\tposition: absolute;\n\ttop: 0px;\n\tright: 0px;\n\tpadding: 8px 10px 10px 10px;\n\tcursor: pointer;\n}\n\n.dialog-frame .the-dialog .head {\n\tborder-bottom: solid #aaaaaa 1px;\n\tline-height: 2em;\n\tpadding: 0 10px;\n}\n\n.dialog-frame .the-dialog .body {\n\tbox-sizing: border-box;\n\tpadding: 20px;\n\toverflow: auto;\n\tmax-height: calc(90vh - 75px);\n}\n\n.dialog-frame .the-dialog .foot {\n\tborder-top: solid #aaaaaa 1px;\n\tpadding: 10px;\n}\n\n.dialog-frame .the-dialog .foot button {\n\tmargin-right: 15px;\n}");

/***/ }),

/***/ "./node_modules/ei-dialog/dialog.js":
/*!******************************************!*\
  !*** ./node_modules/ei-dialog/dialog.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let dialogStyles = __webpack_require__(/*! ./dialog-styles.txt */ "./node_modules/ei-dialog/dialog-styles.txt")
let sequence = 0

// If we're loading via a module system or packed by webpack, we may
// have a module here instead of the value. We need to check for default
// and use that if it exists.
if(typeof dialogStyles !== 'string' && dialogStyles.default) {
	dialogStyles = dialogStyles.default	
}


/**
 * A button definition.
 * @typedef {Object} Button
 * @property {string} classes Classes to add to the button
 * @property {string} label Text shown to the user
 */



/**
 * A whole page dialog. 
 * @param {object} options 
 * @param {string,function} options.body The contents of the body section. This can be a string,
 * in which case it will just be inserted into the body. It can be a function, in which case
 * it is expected to return a string (which will be inserted) or a Promise, which should resolve to
 * a string, which will be inserted. However, this function is passed the body element and dialog
 * object as arguments, so it can also modify content directory and return an empty string.
 * @param {object} options.on An object which the key is the selector and the value is a funtion
 * which is called when the object with that selector is clicked. If the function returns false the
 * dialog will not be closed. If it returns a Promise, the promise will be resolved and if the resolved
 * value is false, it will not be closed. Any other return condition will result in the dialog being
 * closed.
 * @param {Button[]} options.buttons The buttons that will show up in the footer of the dialog. If buttons are not
 * specified, "OK" and "Cancel" buttons will be added.
 * @param {string} options.title The title of the dialog
 * @param {string} options.dialogFrameClass An additional string inserted into the class attribute for
 * specific styling of specific types of dialog boxes.
 * @param {function} options.afterOpen A function which is called after open with the body element and dialog object
 * as arguments.
 */
var Dialog = function(options) {
	this.id = "dialog" + (new Date().getTime()) + (sequence++)
	Object.assign(this, options)
	if(!this.on) {
		this.on = {}
	}
	if(!this.on['.btn-cancel']) {
		this.on['.btn-cancel'] = function() {
		}
	}
	if(!this.on['.btn-close']) {
		this.on['.btn-close'] = function() {
		}
	}
	
	if(!options.buttons) {
		this.buttons = [
			{
				classes: 'btn btn-primary btn-ok',
				label: 'OK'
			},
			{
				classes: 'btn btn-cancel',
				label: 'Cancel'
			}
		]
	}
	
	this.body = options.body
}

Dialog.prototype.getBodySelector = function() {
	return '#' + this.id + ' .body'
}

Dialog.prototype.getFrameSelector = function() {
	return '#' + this.id 
}

Dialog.prototype.addStylesIfNeeded = function() {
	if(!document.querySelector('#dialog-frame-styles')) {
		document.querySelector('head').insertAdjacentHTML('beforeend', 
			'<style type="text/css" id="dialog-frame-styles">' +
			dialogStyles + 
			'</style>')
	}
}

Dialog.prototype.renderButton = function(button) {
	return `<button class="${button.classes}" type="button">${button.label}</button>`
}

Dialog.prototype.generateFrame = function() {
	let buttons = this.buttons.map(this.renderButton).join('')
	
	return `
<div class="dialog-frame ${this.dialogFrameClass || ''}" id="${this.id}" >
	<div class="mask">
	</div>
	<div class="the-dialog">
		<div class="close btn-close">&times;</div>
		<div class="head">
			${this.title}
		</div>
		<div class="body">
		</div>
		<div class="foot">
			${buttons}
		</div>
	</div>
</div>
	`
}

Dialog.prototype.open = function() {
	let self = this
	this.addStylesIfNeeded()
	document.querySelector('body').insertAdjacentHTML('beforeend', this.generateFrame())
	
	let bodySelector = this.getBodySelector()
	let frameSelector = this.getFrameSelector()
	
	let bodyContent
	let bodyElement = document.querySelector(bodySelector)
	let frameElement = document.querySelector(frameSelector)

	
	
	frameElement.addEventListener('click', function(evt) {
		for(let selector in self.on) {
			let target = frameElement.querySelector(selector)
			if(evt.target == target) {
				let result = self.on[selector]()
				if(typeof result === 'boolean') {
					if(result) {
						self.close()
					}
				}
				else if(typeof Promise === 'function' && result instanceof Promise) {
					result.then(function(result) {
						if(result !== false) {
							self.close()
						}
					})
				}
				else {
					self.close()
				}
				
				break
			}
		}
	})
	
	function afterOpenResizeSetup() {
		setTimeout(function() {
			let head = document.querySelector(frameSelector + ' .head').clientHeight 
			let foot = document.querySelector(frameSelector + ' .foot').clientHeight
			let topAndBottom = head + foot

			bodyElement.style.maxHeight = 'calc(90vh - ' + topAndBottom + 'px)'
			frameElement.classList.add('open')
			
			if(self.afterOpen) {
				self.afterOpen(bodyElement, self)
			}
		})
	}
	
	if(typeof this.body === 'function') {
		bodyContent = this.body(bodyElement, this)
	}
	else if(typeof this.body == 'string') {
		bodyContent = this.body
	}

	if(typeof bodyContent === 'string') {
		bodyElement.insertAdjacentHTML('beforeend', bodyContent)
		afterOpenResizeSetup()
	}
	else if(typeof Promise === 'function' && bodyContent instanceof Promise) {
		bodyContent.then(function(content) {
			bodyElement.insertAdjacentHTML('beforeend', content)
			afterOpenResizeSetup()
		})
	}
	

	return this
}

Dialog.prototype.close = function() {
	let frame = document.querySelector(this.getFrameSelector())
	frame.remove()
	return this
}

module.exports = Dialog



/***/ }),

/***/ "./node_modules/filter-log/filter-log-browser.js":
/*!*******************************************************!*\
  !*** ./node_modules/filter-log/filter-log-browser.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function createTransformFunctionFromStream(stream) {
	stream.innerFilter = stream.transform || stream._transform
	let last

	stream.push = function(pushed) {
		last = pushed
	}

	return function(data) {
		last = null
		stream.innerFilter(data, 'utf-8', function(){})
		return last
	}
}

function isNullish(data) {
	return typeof data === 'undefined' || typeof data === 'null' 
}


function writeToProcessors(data) {
	Object.values(filterLog.logsProc).forEach(processor => processor.head.write(data))
}

function makeLogger(name, stream) {
	stream._name = name
	
	stream.write = function(data, enc, callback) {
		if(typeof data == 'string') {
			data = {
				msg: data
			}
		}
		writeToProcessors(Object.assign(filterLog.baseInformationGenerator(), 
		{loggerName: name}, filterLog.logsData[name], stream.loggerSpecificData, data))

		if(callback) {
			callback()
		}
	}
	
	Object.keys(filterLog.levels).forEach(key => {
		stream[key.toLowerCase()] = function(data) {
			if(typeof data == 'string') {
				data = {
					msg: data
				}
				
				let args = [...arguments]
				args.shift()
				if(args.length > 0) {
					data.args = args
				}
			}
			if(data instanceof Error) {
				data = {
					error: {
						message: data.message
						, stack: data.stack
					}
				}
			}
			if(typeof data == 'object') {
				stream.write(Object.assign({}, data, {level: filterLog.levels[key]}))
			}
		}
	})
	return stream
}


var filterLog = function() {
	var args = []
	
	for(var i = 0; i < arguments.length; i++) {
		args.push(arguments[i])
	}
	
	
	var initData = {}
	var loggerName = filterLog.defaultData.loggerName
	var hasSpecificData = false
	
	// Look at the first two arguments. This is either a name and base information
	// object or just a base information object (probably with a name, but not always)
	// or neither of these things, where let's assume they're tring to define the
	// standard logger
	if(args.length > 0) {
		var first = args.shift()
		
		if(typeof first == 'string') {
			loggerName = first
			
			if(args.length > 0 && typeof args[0] == 'object') {
				initData = args.shift()
				loggerName = initData.loggerName || loggerName
				hasSpecificData = true
			}
		}
		else if(typeof first == 'object') {
			loggerName = first.loggerName || loggerName
			initData = first
			hasSpecificData = true
		}
	}
	
	initData.loggerName = loggerName
	
	var logger = makeLogger(loggerName, {})
	if(hasSpecificData) {
		// They have some logger specifc data they want to use
		logger.loggerSpecificData = initData
	}
	
	return logger
}

if(!__webpack_require__.g['filter-log-logsData']) {
	__webpack_require__.g['filter-log-logsData'] = {}
}
filterLog.logsData = __webpack_require__.g['filter-log-logsData']

if(!__webpack_require__.g['filter-log-logsProc']) {
	__webpack_require__.g['filter-log-logsProc'] = {}
}
filterLog.logsProc = __webpack_require__.g['filter-log-logsProc']


filterLog.defineLoggerBaseData = function(loggerName, data) {
	data = Object.assign({}, data)
	delete data.loggerName
	filterLog.logsData[loggerName] = data
}

filterLog.defineProcessor = function(/* string */ name, /* object */ baseData, 
	/* stream */ destination, /* function */ filter, /* stream */ transformer) {
	var procData = {
		name: name,
		destination: destination || console.log,
		baseData: Object.assign({}, baseData, { processorName: name }),
		
		// should be a function or stream of some sort
		filter: filter || function(item) { return true }
	}
	
	// should be a function or stream of some sort
	if(transformer) {
		procData.transformer = transformer
	}
	else {
		if(procData.destination._writableState && procData.destination._writableState.objectMode == false) {
			procData.transformer = ((data) => { return JSON.stringify(data) + '\n' })
		} 
		else {
			procData.transformer = ((data) => { return data })
		}
	}
	
	if(typeof procData.filter === 'object') {
		// Assume this is a stream then
		procData.filter = createTransformFunctionFromStream(procData.filter)
	}
	if(typeof procData.transformer === 'object') {
		// Assume this is a stream then
		procData.transformer = createTransformFunctionFromStream(procData.transformer)
	}

	procData.head = {
		write(data) {
			if(isNullish(data)) {
				return
			}
			let included = procData.filter(data)
			
			if(isNullish(included)) {
				// it was probably transformed by a filtering stream
				return
			}
			if(typeof included === 'boolean') {
				if(!included) {
					return
				}
			}
			else if(typeof included === 'object') {
				// it was probably transformed by a filtering stream
				data = included
			}
			
			if(isNullish(data)) {
				return
			}

			data = procData.transformer(data)
			if(isNullish(data)) {
				return
			}
			
			
			if(procData.destination.write) {
				// probably a stream
				procData.destination.write(data)
			}
			else if(typeof procData.destination === 'function') {
				procData.destination(data)
			}
		}
	}
	
	filterLog.logsProc[name] = procData
}

filterLog.createStdOutProcessor = function() {
	filterLog.defineProcessor('std-out', {}, console.log)
}

filterLog.defaultData = {
	loggerName: 'standard'
}

filterLog.clearProcessors = function() {
	filterLog.logsProc = {}
}

filterLog.removeProcessor = function(name) {
	delete filterLog.logsProc[name] 
}

filterLog.baseInformationGenerator = function() {
	return {
		date: new Date()
	}
}

filterLog.levels = __webpack_require__(/*! ./levels */ "./node_modules/filter-log/levels.js")


module.exports = filterLog

/***/ }),

/***/ "./node_modules/filter-log/levels.js":
/*!*******************************************!*\
  !*** ./node_modules/filter-log/levels.js ***!
  \*******************************************/
/***/ ((module) => {

var levels = {
	DEBUG: 10,
	INFO: 20,
	WARN: 30,
	ERROR: 40,
	FATAL: 50,
	OFF: 60
}

module.exports = levels

/***/ }),

/***/ "./node_modules/form-value-injector/form-value-injector.js":
/*!*****************************************************************!*\
  !*** ./node_modules/form-value-injector/form-value-injector.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const inputInjector = __webpack_require__(/*! input-value-injector */ "./node_modules/input-value-injector/input-value-injector.js")
const textareaInjector = __webpack_require__(/*! textarea-value-injector */ "./node_modules/textarea-value-injector/textarea-value-injector.js")
const selectInjector = __webpack_require__(/*! select-value-injector */ "./node_modules/select-value-injector/select-value-injector.js")

let injectValues = function(text, values) {
	
	let result = inputInjector(text, values)
	result = textareaInjector(result, values)
	result = selectInjector(result, values)
	
	
	return result
}

module.exports = injectValues

/***/ }),

/***/ "./node_modules/input-value-injector/input-value-injector.js":
/*!*******************************************************************!*\
  !*** ./node_modules/input-value-injector/input-value-injector.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
	evalFunction
	, attributeEscapes
	, fetchValue
	, isOrContains
	, escForRegex
	, escapeAttributeValue
} = __webpack_require__(/*! value-injector-common */ "./node_modules/value-injector-common/value-injector-common.js")


function makeDate(date) {
	if(date instanceof Date) {
		return date
	}
	
	if(typeof date === 'string') {
		if(date.indexOf('T') > -1) {
			// this is probably a full date time string with time zone
			return new Date(date)
		}
		else {
			// This is just a raw date and won't be back converted correctly if not shifted
			// to gmt
			return new Date(then.getTime() + (new Date().getTimezoneOffset() * 60 * 1000))
		}
	}
	return new Date(date)
}

function pad(value, len, pad) {
	value = '' + value
	while(value.length < len) {
		value = pad + value
	}
	return value
}

function formatDate(date) {
	if(typeof date === 'string') {
		return date
	}
	date = makeDate(date)
	let year = date.getFullYear()
	let month = pad(date.getMonth() + 1, 2, '0')
	let day = pad(date.getDate(), 2, '0')

	return `${year}-${month}-${day}`
}
function formatTime(date) {
	if(typeof date === 'string') {
		return date
	}
	date = makeDate(date)
	let hour = pad(date.getHours(), 2, '0')
	let minute = pad(date.getMinutes(), 2, '0')
	let sec = pad(date.getSeconds(), 2, '0')
	let milli = pad(date.getMilliseconds(), 4, '0')
	return `${hour}:${minute}`
}

function formatCombined(date) {
	if(typeof date === 'string') {
		return date
	}
	return formatDate(date) + 'T' + formatTime(date)
}

let nameAttrPattern = /\sname=["'](.*?)["']/i
let valAttrPattern = /\svalue=["'](.*?)["']/i
let typeAttrPattern = /\stype=["'](.*?)["']/i
let inputPattern = /(<input.*?>)/i
let checkedAttrPattern = /\schecked(=["'](.*?)["'])?/i


let injectValues = function(text, values) {
	
	let result = ''
	
	text.split(inputPattern).forEach((item) => {
		if(item.toLowerCase().indexOf('<input') == 0) {
			let r = item.match(nameAttrPattern)
			let name = r ? r[1] : null
			
			r = item.match(typeAttrPattern)
			let type = (r ? r[1] : 'text').toLowerCase()
			
			
			if(type === 'text' || type === 'hidden' || type === 'date' || type === 'time' || type === 'datetime-local'
			|| type === 'search' || type === 'email' || type === 'number' || type === 'tel' || type === 'url' 
			|| type === 'month' || type === 'week' || type === 'color' || type === 'week'
			) {
				r = item.match(valAttrPattern)
				let value = r ? r[1] : null
				
				let newVal = fetchValue(values, name)
				if(type === 'date') {
					if(newVal) {
						let orgValue = newVal
						try {
							newVal = formatDate(newVal)
						} catch(e) {
							newVal = orgValue
						}
						if(newVal == 'Invalid date') {
							newVal = orgValue
						}
					}
				}
				else if(type === 'time') {
					if(newVal) {
						let orgValue = newVal
						try {
							newVal = formatTime(newVal)
						} catch(e) {
							newVal = orgValue
						}
						if(newVal == 'Invalid date') {
							newVal = orgValue
						}
					}
				}
				else if(type === 'datetime-local') {
					if(newVal) {
						let orgValue = newVal
						try {
							newVal = formatCombined(newVal)
						} catch(e) {
						}
						

						if(newVal == 'Invalid date') {
							newVal = orgValue
						}
					}
				}
				
				let replacementText
				if(newVal === null || newVal === undefined) {
					replacementText = ''
				}
				else {
					newVal = escapeAttributeValue(newVal)
					replacementText = ' value="' + newVal + '"'
				}


				if(value != null) {
					if(newVal != null) {
						item = item.replace(valAttrPattern, replacementText)
					}
				}
				else {
					if(item.endsWith('/>')) {
						item = item.slice(0, -2)
					}
					else {
						item = item.slice(0, -1)
					}
					item = item + replacementText + ' />'
				}
				
				result += item
			}
			else if(type === 'radio') {
				r = item.match(valAttrPattern)
				let value = r ? r[1] : null
				let newVal = fetchValue(values, name)
				
				if(!value) {
					// We don't have a specific value, so we'll say it's checked
					// if the new value is truthy.
					
					if(!newVal || newVal == 'false' || newVal == 'off') {
						item = item.replace(checkedAttrPattern, '')
					}
					else {
						// so we should have it checked
						if(!item.match(checkedAttrPattern)) {
							if(item.endsWith('/>')) {
								item = item.slice(0, -2)
							}
							else {
								item = item.slice(0, -1)
							}
							item = item + ' checked="checked" />'  
						}
						// if the above were not true, it's because it's already checked
					}
				}
				else {
					if(!newVal || newVal != value) {
						// if the new value is blank or does not equal the value in
						// in the value attribute, we'll make it unchecked
						item = item.replace(checkedAttrPattern, '')
					}
					else {
						// so we should have it checked
						if(!item.match(checkedAttrPattern)) {
							if(item.endsWith('/>')) {
								item = item.slice(0, -2)
							}
							else {
								item = item.slice(0, -1)
							}
							item = item + ' checked="checked" />'  
						}
						// if the above were not true, it's because it's already checked
					}
				}
				
				result += item
			}
			else if(type === 'checkbox') {
				r = item.match(valAttrPattern)
				let value = r ? r[1] : null
				let newVal = fetchValue(values, name)
				
				if(!value) {
					// We don't have a specific value, so we'll say it's checked
					// if the new value is truthy.
					
					if(!newVal || isOrContains('false', newVal) || isOrContains('off', newVal)) {
						item = item.replace(checkedAttrPattern, '')
					}
					else {
						// so we should have it checked
						if(!item.match(checkedAttrPattern)) {
							if(item.endsWith('/>')) {
								item = item.slice(0, -2)
							}
							else {
								item = item.slice(0, -1)
							}
							item = item + ' checked="checked" />'  
						}
						// if the above were not true, it's because it's already checked
					}
				}
				else {
					if(!newVal || !isOrContains(value, newVal)) {
						// if the new value is blank or does not equal the value in
						// in the value attribute, we'll make it unchecked
						item = item.replace(checkedAttrPattern, '')
					}
					else {
						// so we should have it checked
						if(!item.match(checkedAttrPattern)) {
							if(item.endsWith('/>')) {
								item = item.slice(0, -2)
							}
							else {
								item = item.slice(0, -1)
							}
							item = item + ' checked="checked" />'  
						}
						// if the above were not true, it's because it's already checked
					}
				}
				
				result += item
			}
			else {
				result += item
			}
			
		}
		else {
			result += item
		}
	})
	
	return result
}


module.exports = injectValues


/***/ }),

/***/ "./node_modules/objs-to-sql/lib/common-type-reducer.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/objs-to-sql/lib/common-type-reducer.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ commonTypeReducer)
/* harmony export */ });
/* harmony import */ var _types_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.mjs */ "./node_modules/objs-to-sql/lib/types.mjs");
/* harmony import */ var _determine_type_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./determine-type.mjs */ "./node_modules/objs-to-sql/lib/determine-type.mjs");



function commonTypeReducer(current, next) {

	if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].OBJECT) {
		// This is the most general type, so just keep returning it
		return current
	}

	let type = (0,_determine_type_mjs__WEBPACK_IMPORTED_MODULE_1__.determineType)(next)
	if(type === null) {
		return current
	}
	
	if(type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].OBJECT) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].OBJECT
	}
	

	if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DATETIME
		&& current === null
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DATETIME
	}
	else if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DATETIME
		&& current !== _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DATETIME
	) {
		if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT) {
			return current
		}
		else {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
	}

	if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT
		&& current === null
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT
	}
	else if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT
		&& current !== _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT
	) {
		if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT) {
			return current
		}
		else if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT) {
			return current
		}
		else {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
	}
	

	if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
		&& current === null
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
	}
	else if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
		&& current !== _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
	) {
		if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT) {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
		}
		else if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT) {
			return current
		}
		else {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
	}
	
	if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].BOOL
		&& current === null
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].BOOL
	}
	else if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].BOOL
		&& current !== _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].BOOL
	) {
		if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT) {
			return current
		}
		else {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
	}
	
	if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		&& current === null
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
	}
	else if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		&& current !== _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
	) {
		if(current === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT) {
			return current
		}
		else {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
	}

	
	if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT
		&& current === null
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT
	}
	else if(
		type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT
		&& current !== _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT
	) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT
	}

	return current
}

/***/ }),

/***/ "./node_modules/objs-to-sql/lib/create-type-descriptions.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/objs-to-sql/lib/create-type-descriptions.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTypeDescriptions)
/* harmony export */ });
/* harmony import */ var _determine_types_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./determine-types.mjs */ "./node_modules/objs-to-sql/lib/determine-types.mjs");


/**
 * Create type description objects, one per field, for the the fields
 * of the `objects` objects. 
 * 
 * Type descriptions look like:
 * 
 * ```js
 * { field: 'a', type: 'INT' }
 * ```
 * @param {array[object]} objects 
 */
function createTypeDescriptions(objects) {
	if(Array.isArray(objects) === false) {
		throw new Error('argument is not an array')
	}
	
	let descriptions = []

	objects = objects.filter(obj => !!obj)

	let keys = new Set()
	for(let obj of objects) {
		for(let key of Object.keys(obj)) {
			keys.add(key)
		}
	}
	
	for(let key of keys) {
		let values = []
		for(let obj of objects) {
			values.push(obj[key])
		}
		
		let type = (0,_determine_types_mjs__WEBPACK_IMPORTED_MODULE_0__.determineTypes)(values)
		
		let desc = {
			field: key
			, type: type
		}
		descriptions.push(desc)

	}

	return descriptions
}




/***/ }),

/***/ "./node_modules/objs-to-sql/lib/determine-type.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/objs-to-sql/lib/determine-type.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   determineType: () => (/* binding */ determineType)
/* harmony export */ });
/* harmony import */ var _types_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.mjs */ "./node_modules/objs-to-sql/lib/types.mjs");

let maxTextFieldSize = 65000
;

let maxIntSize = 1000000000
let maxIntLength = 9
/**
 * Determine which SQL type should be use for this value. If no determination
 * can be made, null is returned.
 * 
 * NaN always returns null
 * @param {any} value 
 * @returns Types.TEXT, Types.MEDIUMTEXT, Types.BOOL, Types.INT, Types.FLOAT, 'DATETIME', 'OBJECT', null
 */
function determineType(value) {
	if(value === null || value === undefined) {
		return null
	}
	
	if(typeof value === 'boolean') {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].BOOL
	}
	
	if(value instanceof Date) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DATETIME
	}
	
	if(Array.isArray(value)) {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].OBJECT
	}
	
	if(Number.isInteger(value)) {
		if(value > maxIntSize) {
			// Because it will probably overflow the SQL INT size
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT
	}

	try {
		if(typeof value === 'string') {
			if(
				value.trim().toLowerCase() === 'true'
				|| value.trim().toLowerCase() === 'false'
			) {
				return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].BOOL
			}
		}
	}
	catch(e) {
		// no problem. Just not a bool
	}
	

	try {
		if(typeof value === 'string') {
			let i = parseInt(value.trim())
			if(
				Number.isNaN(i) === false 
				&& i == value
			) {
				if(value.length > maxIntLength || i > maxIntSize) {
					return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
				}
				return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].INT
			}
		}
	}
	catch(e) {
		// no problem. Just not an int
	}
	
	if(typeof value === 'number') {
		if(Number.isNaN(value)) {
			return null
		}
		if(value > maxIntSize) {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
	}

	try {
		if(typeof value === 'string') {
			let f = parseFloat(value.trim())
			if(
				Number.isNaN(f) === false 
				&& f == value
			) {
				if(value.length > maxIntLength || f > maxIntSize) {
					return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
				}
				return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].FLOAT
			}
		}
	}
	catch(e) {
		// no problem. Just not an float
	}
	
	
	try {
		if(typeof value === 'string') {
			let d = new Date(value.trim())
			if(
				Number.isNaN(d.getTime()) === false 
				&& ('' + d) !== 'Invalid Date'
			) {
				return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DATETIME
			}
		}
	}
	catch(e) {
		// no problem. Just not an date
	}
	
	if(typeof value === 'string') {
		if(value.length < maxTextFieldSize) {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].TEXT
		}
		else {
			return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIUMTEXT
		}
	}
	
	if(typeof value === 'object') {
		return _types_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].OBJECT
	}
	
	return null

}


/***/ }),

/***/ "./node_modules/objs-to-sql/lib/determine-types.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/objs-to-sql/lib/determine-types.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   determineTypes: () => (/* binding */ determineTypes)
/* harmony export */ });
/* harmony import */ var _common_type_reducer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-type-reducer.mjs */ "./node_modules/objs-to-sql/lib/common-type-reducer.mjs");


/**
 * Determine the SQL type which should be used for these values. Nulls will
 * be ignored. 
 * @param {array} values 
 */
function determineTypes(values) {
	
	if(!values) {
		return null
	}
	if(Array.isArray(values) === false) {
		return null
	}
	
	return values.reduce(_common_type_reducer_mjs__WEBPACK_IMPORTED_MODULE_0__["default"], null)


}

/***/ }),

/***/ "./node_modules/objs-to-sql/lib/types.mjs":
/*!************************************************!*\
  !*** ./node_modules/objs-to-sql/lib/types.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	
	TEXT: 'TEXT'
	, MEDIUMTEXT: 'MEDIUMTEXT'
	, BOOL: 'BOOL'
	, INT: 'INT'
	, FLOAT: 'FLOAT'
	, DATETIME: 'DATETIME'
	, OBJECT: 'OBJECT'
});

/***/ }),

/***/ "./node_modules/select-value-injector/select-value-injector.js":
/*!*********************************************************************!*\
  !*** ./node_modules/select-value-injector/select-value-injector.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
	evalFunction
	, attributeEscapes
	, fetchValue
	, isOrContains
	, escForRegex
	, escapeAttributeValue
} = __webpack_require__(/*! value-injector-common */ "./node_modules/value-injector-common/value-injector-common.js")



let nameAttrPattern = /\sname=["'](.*?)["']/i
let valAttrPattern = /\svalue=["'](.*?)["']/i
let typeAttrPattern = /\stype=["'](.*?)["']/i
let selectPattern = /(<select[\w\W]*?select\w*>)/im
let selectedAttrPattern = /\sselected(=["'](.*?)["'])?/i


let injectValues = function(text, values) {
	
	let result = ''
	
	text.split(selectPattern).forEach((item) => {
		if(item.toLowerCase().indexOf('<select') == 0) {
			let r = item.match(nameAttrPattern)
			let name = r ? r[1] : null
			
			let newVal = fetchValue(values, name)
			if(typeof newVal != 'undefined' && newVal !== null) {
				item = item.replace(selectedAttrPattern, '')
				let optionMatch = item.match( new RegExp('value=["\']' + escForRegex(newVal) + '["\']', 'i'))
				if(optionMatch) {
					let breakIndex = item.indexOf(optionMatch[0]) + optionMatch[0].length
					item = item.slice(0, breakIndex) + ' selected="selected" ' + item.substring(breakIndex)
				}
			}
			
			result += item
		}
		else {
			result += item
		}
	})
	
	return result
}


module.exports = injectValues


/***/ }),

/***/ "./node_modules/sift/es5m/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sift/es5m/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Size: () => (/* binding */ $Size),
/* harmony export */   $all: () => (/* binding */ $all),
/* harmony export */   $and: () => (/* binding */ $and),
/* harmony export */   $elemMatch: () => (/* binding */ $elemMatch),
/* harmony export */   $eq: () => (/* binding */ $eq),
/* harmony export */   $exists: () => (/* binding */ $exists),
/* harmony export */   $gt: () => (/* binding */ $gt),
/* harmony export */   $gte: () => (/* binding */ $gte),
/* harmony export */   $in: () => (/* binding */ $in),
/* harmony export */   $lt: () => (/* binding */ $lt),
/* harmony export */   $lte: () => (/* binding */ $lte),
/* harmony export */   $mod: () => (/* binding */ $mod),
/* harmony export */   $ne: () => (/* binding */ $ne),
/* harmony export */   $nin: () => (/* binding */ $nin),
/* harmony export */   $nor: () => (/* binding */ $nor),
/* harmony export */   $not: () => (/* binding */ $not),
/* harmony export */   $options: () => (/* binding */ $options),
/* harmony export */   $or: () => (/* binding */ $or),
/* harmony export */   $regex: () => (/* binding */ $regex),
/* harmony export */   $size: () => (/* binding */ $size),
/* harmony export */   $type: () => (/* binding */ $type),
/* harmony export */   $where: () => (/* binding */ $where),
/* harmony export */   EqualsOperation: () => (/* binding */ EqualsOperation),
/* harmony export */   createDefaultQueryOperation: () => (/* binding */ createDefaultQueryOperation),
/* harmony export */   createEqualsOperation: () => (/* binding */ createEqualsOperation),
/* harmony export */   createOperationTester: () => (/* binding */ createOperationTester),
/* harmony export */   createQueryOperation: () => (/* binding */ createQueryOperation),
/* harmony export */   createQueryTester: () => (/* binding */ createQueryTester),
/* harmony export */   "default": () => (/* binding */ createDefaultQueryTester)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var typeChecker = function (type) {
    var typeString = "[object " + type + "]";
    return function (value) {
        return getClassName(value) === typeString;
    };
};
var getClassName = function (value) { return Object.prototype.toString.call(value); };
var comparable = function (value) {
    if (value instanceof Date) {
        return value.getTime();
    }
    else if (isArray(value)) {
        return value.map(comparable);
    }
    else if (value && typeof value.toJSON === "function") {
        return value.toJSON();
    }
    return value;
};
var coercePotentiallyNull = function (value) {
    return value == null ? null : value;
};
var isArray = typeChecker("Array");
var isObject = typeChecker("Object");
var isFunction = typeChecker("Function");
var isProperty = function (item, key) {
    return item.hasOwnProperty(key) && !isFunction(item[key]);
};
var isVanillaObject = function (value) {
    return (value &&
        (value.constructor === Object ||
            value.constructor === Array ||
            value.constructor.toString() === "function Object() { [native code] }" ||
            value.constructor.toString() === "function Array() { [native code] }") &&
        !value.toJSON);
};
var equals = function (a, b) {
    if (a == null && a == b) {
        return true;
    }
    if (a === b) {
        return true;
    }
    if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
        return false;
    }
    if (isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0, length_1 = a.length; i < length_1; i++) {
            if (!equals(a[i], b[i]))
                return false;
        }
        return true;
    }
    else if (isObject(a)) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        for (var key in a) {
            if (!equals(a[key], b[key]))
                return false;
        }
        return true;
    }
    return false;
};

/**
 * Walks through each value given the context - used for nested operations. E.g:
 * { "person.address": { $eq: "blarg" }}
 */
var walkKeyPathValues = function (item, keyPath, next, depth, key, owner) {
    var currentKey = keyPath[depth];
    // if array, then try matching. Might fall through for cases like:
    // { $eq: [1, 2, 3] }, [ 1, 2, 3 ].
    if (isArray(item) &&
        isNaN(Number(currentKey)) &&
        !isProperty(item, currentKey)) {
        for (var i = 0, length_1 = item.length; i < length_1; i++) {
            // if FALSE is returned, then terminate walker. For operations, this simply
            // means that the search critera was met.
            if (!walkKeyPathValues(item[i], keyPath, next, depth, i, item)) {
                return false;
            }
        }
    }
    if (depth === keyPath.length || item == null) {
        return next(item, key, owner, depth === 0, depth === keyPath.length);
    }
    return walkKeyPathValues(item[currentKey], keyPath, next, depth + 1, currentKey, item);
};
var BaseOperation = /** @class */ (function () {
    function BaseOperation(params, owneryQuery, options, name) {
        this.params = params;
        this.owneryQuery = owneryQuery;
        this.options = options;
        this.name = name;
        this.init();
    }
    BaseOperation.prototype.init = function () { };
    BaseOperation.prototype.reset = function () {
        this.done = false;
        this.keep = false;
    };
    return BaseOperation;
}());
var GroupOperation = /** @class */ (function (_super) {
    __extends(GroupOperation, _super);
    function GroupOperation(params, owneryQuery, options, children) {
        var _this = _super.call(this, params, owneryQuery, options) || this;
        _this.children = children;
        return _this;
    }
    /**
     */
    GroupOperation.prototype.reset = function () {
        this.keep = false;
        this.done = false;
        for (var i = 0, length_2 = this.children.length; i < length_2; i++) {
            this.children[i].reset();
        }
    };
    /**
     */
    GroupOperation.prototype.childrenNext = function (item, key, owner, root, leaf) {
        var done = true;
        var keep = true;
        for (var i = 0, length_3 = this.children.length; i < length_3; i++) {
            var childOperation = this.children[i];
            if (!childOperation.done) {
                childOperation.next(item, key, owner, root, leaf);
            }
            if (!childOperation.keep) {
                keep = false;
            }
            if (childOperation.done) {
                if (!childOperation.keep) {
                    break;
                }
            }
            else {
                done = false;
            }
        }
        this.done = done;
        this.keep = keep;
    };
    return GroupOperation;
}(BaseOperation));
var NamedGroupOperation = /** @class */ (function (_super) {
    __extends(NamedGroupOperation, _super);
    function NamedGroupOperation(params, owneryQuery, options, children, name) {
        var _this = _super.call(this, params, owneryQuery, options, children) || this;
        _this.name = name;
        return _this;
    }
    return NamedGroupOperation;
}(GroupOperation));
var QueryOperation = /** @class */ (function (_super) {
    __extends(QueryOperation, _super);
    function QueryOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    /**
     */
    QueryOperation.prototype.next = function (item, key, parent, root) {
        this.childrenNext(item, key, parent, root);
    };
    return QueryOperation;
}(GroupOperation));
var NestedOperation = /** @class */ (function (_super) {
    __extends(NestedOperation, _super);
    function NestedOperation(keyPath, params, owneryQuery, options, children) {
        var _this = _super.call(this, params, owneryQuery, options, children) || this;
        _this.keyPath = keyPath;
        _this.propop = true;
        /**
         */
        _this._nextNestedValue = function (value, key, owner, root, leaf) {
            _this.childrenNext(value, key, owner, root, leaf);
            return !_this.done;
        };
        return _this;
    }
    /**
     */
    NestedOperation.prototype.next = function (item, key, parent) {
        walkKeyPathValues(item, this.keyPath, this._nextNestedValue, 0, key, parent);
    };
    return NestedOperation;
}(GroupOperation));
var createTester = function (a, compare) {
    if (a instanceof Function) {
        return a;
    }
    if (a instanceof RegExp) {
        return function (b) {
            var result = typeof b === "string" && a.test(b);
            a.lastIndex = 0;
            return result;
        };
    }
    var comparableA = comparable(a);
    return function (b) { return compare(comparableA, comparable(b)); };
};
var EqualsOperation = /** @class */ (function (_super) {
    __extends(EqualsOperation, _super);
    function EqualsOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    EqualsOperation.prototype.init = function () {
        this._test = createTester(this.params, this.options.compare);
    };
    EqualsOperation.prototype.next = function (item, key, parent) {
        if (!Array.isArray(parent) || parent.hasOwnProperty(key)) {
            if (this._test(item, key, parent)) {
                this.done = true;
                this.keep = true;
            }
        }
    };
    return EqualsOperation;
}(BaseOperation));
var createEqualsOperation = function (params, owneryQuery, options) { return new EqualsOperation(params, owneryQuery, options); };
var numericalOperationCreator = function (createNumericalOperation) {
    return function (params, owneryQuery, options, name) {
        return createNumericalOperation(params, owneryQuery, options, name);
    };
};
var numericalOperation = function (createTester) {
    return numericalOperationCreator(function (params, owneryQuery, options, name) {
        var typeofParams = typeof comparable(params);
        var test = createTester(params);
        return new EqualsOperation(function (b) {
            var actualValue = coercePotentiallyNull(b);
            return (typeof comparable(actualValue) === typeofParams && test(actualValue));
        }, owneryQuery, options, name);
    });
};
var createNamedOperation = function (name, params, parentQuery, options) {
    var operationCreator = options.operations[name];
    if (!operationCreator) {
        throwUnsupportedOperation(name);
    }
    return operationCreator(params, parentQuery, options, name);
};
var throwUnsupportedOperation = function (name) {
    throw new Error("Unsupported operation: ".concat(name));
};
var containsOperation = function (query, options) {
    for (var key in query) {
        if (options.operations.hasOwnProperty(key) || key.charAt(0) === "$")
            return true;
    }
    return false;
};
var createNestedOperation = function (keyPath, nestedQuery, parentKey, owneryQuery, options) {
    if (containsOperation(nestedQuery, options)) {
        var _a = createQueryOperations(nestedQuery, parentKey, options), selfOperations = _a[0], nestedOperations = _a[1];
        if (nestedOperations.length) {
            throw new Error("Property queries must contain only operations, or exact objects.");
        }
        return new NestedOperation(keyPath, nestedQuery, owneryQuery, options, selfOperations);
    }
    return new NestedOperation(keyPath, nestedQuery, owneryQuery, options, [
        new EqualsOperation(nestedQuery, owneryQuery, options),
    ]);
};
var createQueryOperation = function (query, owneryQuery, _a) {
    if (owneryQuery === void 0) { owneryQuery = null; }
    var _b = _a === void 0 ? {} : _a, compare = _b.compare, operations = _b.operations;
    var options = {
        compare: compare || equals,
        operations: Object.assign({}, operations || {}),
    };
    var _c = createQueryOperations(query, null, options), selfOperations = _c[0], nestedOperations = _c[1];
    var ops = [];
    if (selfOperations.length) {
        ops.push(new NestedOperation([], query, owneryQuery, options, selfOperations));
    }
    ops.push.apply(ops, nestedOperations);
    if (ops.length === 1) {
        return ops[0];
    }
    return new QueryOperation(query, owneryQuery, options, ops);
};
var createQueryOperations = function (query, parentKey, options) {
    var selfOperations = [];
    var nestedOperations = [];
    if (!isVanillaObject(query)) {
        selfOperations.push(new EqualsOperation(query, query, options));
        return [selfOperations, nestedOperations];
    }
    for (var key in query) {
        if (options.operations.hasOwnProperty(key)) {
            var op = createNamedOperation(key, query[key], query, options);
            if (op) {
                if (!op.propop && parentKey && !options.operations[parentKey]) {
                    throw new Error("Malformed query. ".concat(key, " cannot be matched against property."));
                }
            }
            // probably just a flag for another operation (like $options)
            if (op != null) {
                selfOperations.push(op);
            }
        }
        else if (key.charAt(0) === "$") {
            throwUnsupportedOperation(key);
        }
        else {
            nestedOperations.push(createNestedOperation(key.split("."), query[key], key, query, options));
        }
    }
    return [selfOperations, nestedOperations];
};
var createOperationTester = function (operation) {
    return function (item, key, owner) {
        operation.reset();
        operation.next(item, key, owner);
        return operation.keep;
    };
};
var createQueryTester = function (query, options) {
    if (options === void 0) { options = {}; }
    return createOperationTester(createQueryOperation(query, null, options));
};

var $Ne = /** @class */ (function (_super) {
    __extends($Ne, _super);
    function $Ne() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    $Ne.prototype.init = function () {
        this._test = createTester(this.params, this.options.compare);
    };
    $Ne.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.keep = true;
    };
    $Ne.prototype.next = function (item) {
        if (this._test(item)) {
            this.done = true;
            this.keep = false;
        }
    };
    return $Ne;
}(BaseOperation));
// https://docs.mongodb.com/manual/reference/operator/query/elemMatch/
var $ElemMatch = /** @class */ (function (_super) {
    __extends($ElemMatch, _super);
    function $ElemMatch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    $ElemMatch.prototype.init = function () {
        if (!this.params || typeof this.params !== "object") {
            throw new Error("Malformed query. $elemMatch must by an object.");
        }
        this._queryOperation = createQueryOperation(this.params, this.owneryQuery, this.options);
    };
    $ElemMatch.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._queryOperation.reset();
    };
    $ElemMatch.prototype.next = function (item) {
        if (isArray(item)) {
            for (var i = 0, length_1 = item.length; i < length_1; i++) {
                // reset query operation since item being tested needs to pass _all_ query
                // operations for it to be a success
                this._queryOperation.reset();
                var child = item[i];
                this._queryOperation.next(child, i, item, false);
                this.keep = this.keep || this._queryOperation.keep;
            }
            this.done = true;
        }
        else {
            this.done = false;
            this.keep = false;
        }
    };
    return $ElemMatch;
}(BaseOperation));
var $Not = /** @class */ (function (_super) {
    __extends($Not, _super);
    function $Not() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    $Not.prototype.init = function () {
        this._queryOperation = createQueryOperation(this.params, this.owneryQuery, this.options);
    };
    $Not.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._queryOperation.reset();
    };
    $Not.prototype.next = function (item, key, owner, root) {
        this._queryOperation.next(item, key, owner, root);
        this.done = this._queryOperation.done;
        this.keep = !this._queryOperation.keep;
    };
    return $Not;
}(BaseOperation));
var $Size = /** @class */ (function (_super) {
    __extends($Size, _super);
    function $Size() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    $Size.prototype.init = function () { };
    $Size.prototype.next = function (item) {
        if (isArray(item) && item.length === this.params) {
            this.done = true;
            this.keep = true;
        }
        // if (parent && parent.length === this.params) {
        //   this.done = true;
        //   this.keep = true;
        // }
    };
    return $Size;
}(BaseOperation));
var assertGroupNotEmpty = function (values) {
    if (values.length === 0) {
        throw new Error("$and/$or/$nor must be a nonempty array");
    }
};
var $Or = /** @class */ (function (_super) {
    __extends($Or, _super);
    function $Or() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = false;
        return _this;
    }
    $Or.prototype.init = function () {
        var _this = this;
        assertGroupNotEmpty(this.params);
        this._ops = this.params.map(function (op) {
            return createQueryOperation(op, null, _this.options);
        });
    };
    $Or.prototype.reset = function () {
        this.done = false;
        this.keep = false;
        for (var i = 0, length_2 = this._ops.length; i < length_2; i++) {
            this._ops[i].reset();
        }
    };
    $Or.prototype.next = function (item, key, owner) {
        var done = false;
        var success = false;
        for (var i = 0, length_3 = this._ops.length; i < length_3; i++) {
            var op = this._ops[i];
            op.next(item, key, owner);
            if (op.keep) {
                done = true;
                success = op.keep;
                break;
            }
        }
        this.keep = success;
        this.done = done;
    };
    return $Or;
}(BaseOperation));
var $Nor = /** @class */ (function (_super) {
    __extends($Nor, _super);
    function $Nor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = false;
        return _this;
    }
    $Nor.prototype.next = function (item, key, owner) {
        _super.prototype.next.call(this, item, key, owner);
        this.keep = !this.keep;
    };
    return $Nor;
}($Or));
var $In = /** @class */ (function (_super) {
    __extends($In, _super);
    function $In() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    $In.prototype.init = function () {
        var _this = this;
        var params = Array.isArray(this.params) ? this.params : [this.params];
        this._testers = params.map(function (value) {
            if (containsOperation(value, _this.options)) {
                throw new Error("cannot nest $ under ".concat(_this.name.toLowerCase()));
            }
            return createTester(value, _this.options.compare);
        });
    };
    $In.prototype.next = function (item, key, owner) {
        var done = false;
        var success = false;
        for (var i = 0, length_4 = this._testers.length; i < length_4; i++) {
            var test = this._testers[i];
            if (test(item)) {
                done = true;
                success = true;
                break;
            }
        }
        this.keep = success;
        this.done = done;
    };
    return $In;
}(BaseOperation));
var $Nin = /** @class */ (function (_super) {
    __extends($Nin, _super);
    function $Nin(params, ownerQuery, options, name) {
        var _this = _super.call(this, params, ownerQuery, options, name) || this;
        _this.propop = true;
        _this._in = new $In(params, ownerQuery, options, name);
        return _this;
    }
    $Nin.prototype.next = function (item, key, owner, root) {
        this._in.next(item, key, owner);
        if (isArray(owner) && !root) {
            if (this._in.keep) {
                this.keep = false;
                this.done = true;
            }
            else if (key == owner.length - 1) {
                this.keep = true;
                this.done = true;
            }
        }
        else {
            this.keep = !this._in.keep;
            this.done = true;
        }
    };
    $Nin.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._in.reset();
    };
    return $Nin;
}(BaseOperation));
var $Exists = /** @class */ (function (_super) {
    __extends($Exists, _super);
    function $Exists() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propop = true;
        return _this;
    }
    $Exists.prototype.next = function (item, key, owner, root, leaf) {
        if (!leaf) {
            this.done = true;
            this.keep = !this.params;
        }
        else if (owner.hasOwnProperty(key) === this.params) {
            this.done = true;
            this.keep = true;
        }
    };
    return $Exists;
}(BaseOperation));
var $And = /** @class */ (function (_super) {
    __extends($And, _super);
    function $And(params, owneryQuery, options, name) {
        var _this = _super.call(this, params, owneryQuery, options, params.map(function (query) { return createQueryOperation(query, owneryQuery, options); }), name) || this;
        _this.propop = false;
        assertGroupNotEmpty(params);
        return _this;
    }
    $And.prototype.next = function (item, key, owner, root) {
        this.childrenNext(item, key, owner, root);
    };
    return $And;
}(NamedGroupOperation));
var $All = /** @class */ (function (_super) {
    __extends($All, _super);
    function $All(params, owneryQuery, options, name) {
        var _this = _super.call(this, params, owneryQuery, options, params.map(function (query) { return createQueryOperation(query, owneryQuery, options); }), name) || this;
        _this.propop = true;
        return _this;
    }
    $All.prototype.next = function (item, key, owner, root) {
        this.childrenNext(item, key, owner, root);
    };
    return $All;
}(NamedGroupOperation));
var $eq = function (params, owneryQuery, options) {
    return new EqualsOperation(params, owneryQuery, options);
};
var $ne = function (params, owneryQuery, options, name) { return new $Ne(params, owneryQuery, options, name); };
var $or = function (params, owneryQuery, options, name) { return new $Or(params, owneryQuery, options, name); };
var $nor = function (params, owneryQuery, options, name) { return new $Nor(params, owneryQuery, options, name); };
var $elemMatch = function (params, owneryQuery, options, name) { return new $ElemMatch(params, owneryQuery, options, name); };
var $nin = function (params, owneryQuery, options, name) { return new $Nin(params, owneryQuery, options, name); };
var $in = function (params, owneryQuery, options, name) {
    return new $In(params, owneryQuery, options, name);
};
var $lt = numericalOperation(function (params) { return function (b) {
    return b != null && b < params;
}; });
var $lte = numericalOperation(function (params) { return function (b) {
    return b === params || b <= params;
}; });
var $gt = numericalOperation(function (params) { return function (b) {
    return b != null && b > params;
}; });
var $gte = numericalOperation(function (params) { return function (b) {
    return b === params || b >= params;
}; });
var $mod = function (_a, owneryQuery, options) {
    var mod = _a[0], equalsValue = _a[1];
    return new EqualsOperation(function (b) { return comparable(b) % mod === equalsValue; }, owneryQuery, options);
};
var $exists = function (params, owneryQuery, options, name) { return new $Exists(params, owneryQuery, options, name); };
var $regex = function (pattern, owneryQuery, options) {
    return new EqualsOperation(new RegExp(pattern, owneryQuery.$options), owneryQuery, options);
};
var $not = function (params, owneryQuery, options, name) { return new $Not(params, owneryQuery, options, name); };
var typeAliases = {
    number: function (v) { return typeof v === "number"; },
    string: function (v) { return typeof v === "string"; },
    bool: function (v) { return typeof v === "boolean"; },
    array: function (v) { return Array.isArray(v); },
    null: function (v) { return v === null; },
    timestamp: function (v) { return v instanceof Date; },
};
var $type = function (clazz, owneryQuery, options) {
    return new EqualsOperation(function (b) {
        if (typeof clazz === "string") {
            if (!typeAliases[clazz]) {
                throw new Error("Type alias does not exist");
            }
            return typeAliases[clazz](b);
        }
        return b != null ? b instanceof clazz || b.constructor === clazz : false;
    }, owneryQuery, options);
};
var $and = function (params, ownerQuery, options, name) { return new $And(params, ownerQuery, options, name); };
var $all = function (params, ownerQuery, options, name) { return new $All(params, ownerQuery, options, name); };
var $size = function (params, ownerQuery, options) { return new $Size(params, ownerQuery, options, "$size"); };
var $options = function () { return null; };
var $where = function (params, ownerQuery, options) {
    var test;
    if (isFunction(params)) {
        test = params;
    }
    else if (!process.env.CSP_ENABLED) {
        test = new Function("obj", "return " + params);
    }
    else {
        throw new Error("In CSP mode, sift does not support strings in \"$where\" condition");
    }
    return new EqualsOperation(function (b) { return test.bind(b)(b); }, ownerQuery, options);
};

var defaultOperations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    $Size: $Size,
    $all: $all,
    $and: $and,
    $elemMatch: $elemMatch,
    $eq: $eq,
    $exists: $exists,
    $gt: $gt,
    $gte: $gte,
    $in: $in,
    $lt: $lt,
    $lte: $lte,
    $mod: $mod,
    $ne: $ne,
    $nin: $nin,
    $nor: $nor,
    $not: $not,
    $options: $options,
    $or: $or,
    $regex: $regex,
    $size: $size,
    $type: $type,
    $where: $where
});

var createDefaultQueryOperation = function (query, ownerQuery, _a) {
    var _b = _a === void 0 ? {} : _a, compare = _b.compare, operations = _b.operations;
    return createQueryOperation(query, ownerQuery, {
        compare: compare,
        operations: Object.assign({}, defaultOperations, operations || {}),
    });
};
var createDefaultQueryTester = function (query, options) {
    if (options === void 0) { options = {}; }
    var op = createDefaultQueryOperation(query, null, options);
    return createOperationTester(op);
};


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/textarea-value-injector/textarea-value-injector.js":
/*!*************************************************************************!*\
  !*** ./node_modules/textarea-value-injector/textarea-value-injector.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
	evalFunction
	, attributeEscapes
	, fetchValue
	, isOrContains
	, escForRegex
	, escapeAttributeValue
} = __webpack_require__(/*! value-injector-common */ "./node_modules/value-injector-common/value-injector-common.js")


let nameAttrPattern = /\sname=["'](.*?)["']/i
let valAttrPattern = /\svalue=["'](.*?)["']/i
let typeAttrPattern = /\stype=["'](.*?)["']/i
let textareaPattern = /(<textarea[\w\W]*?textarea\w*>)/im
let selectedAttrPattern = /\sselected(=["'](.*?)["'])?/i


let injectValues = function(text, values) {
	
	let result = ''
	
	text.split(textareaPattern).forEach((item) => {
		if(item.toLowerCase().indexOf('<textarea') == 0) {
			let r = item.match(nameAttrPattern)
			let name = r ? r[1] : null
			
			if(name) {
				let newVal = fetchValue(values, name)
				if(typeof newVal != 'undefined' && newVal !== null) {
					let startTagEnd = item.indexOf('>')
					let endTagStart = item.lastIndexOf('<')
					item = item.substring(0, startTagEnd + 1) + newVal + item.substring(endTagStart)
				}
			}
			
			result += item
		}
		else {
			result += item
		}
	})
	
	return result
}


module.exports = injectValues

/***/ }),

/***/ "./node_modules/tripartite/active-element.js":
/*!***************************************************!*\
  !*** ./node_modules/tripartite/active-element.js ***!
  \***************************************************/
/***/ ((module) => {


const defaultTemplateName = 'defaultTemplate'

class ActiveElement {
	constructor(conditionalExpression, dataExpression, handlingExpression, tripartite) {
		this.conditionalExpression = conditionalExpression
		this.dataExpression = dataExpression
		this.handlingExpression = handlingExpression || defaultTemplateName
		this.tripartite = tripartite
	}
}

module.exports = ActiveElement

/***/ }),

/***/ "./node_modules/tripartite/calculate-relative-path.js":
/*!************************************************************!*\
  !*** ./node_modules/tripartite/calculate-relative-path.js ***!
  \************************************************************/
/***/ ((module) => {

var calculateRelativePath = function(parentPath, currentPath) {
	if(!parentPath) {
		return currentPath
	}
	if(!currentPath) {
		return currentPath
	}
	
	if(currentPath.indexOf('../') != 0 && currentPath.indexOf('./') != 0) {
		return currentPath
	}
	
	var pparts = parentPath.split('/')
	var cparts = currentPath.split('/')
	
	// trim any starting blank sections
	while(pparts.length && !pparts[0]) {
		pparts.shift()
	}
	while(cparts.length && !cparts[0]) {
		cparts.shift()
	}
	
	if(currentPath.indexOf('../') == 0 ) {
		while(cparts.length && cparts[0] == '..') {
			pparts.pop()
			cparts.shift()
		}
		pparts.pop()
		
		while(cparts.length) {
			pparts.push(cparts.shift())
		}
		return pparts.join('/')
	}
	if(currentPath.indexOf('./') == 0 ) {
		cparts.shift()
		pparts.pop()
		while(cparts.length) {
			pparts.push(cparts.shift())
		}
		return pparts.join('/')
	}
	
	return currentPath
}

module.exports = calculateRelativePath

/***/ }),

/***/ "./node_modules/tripartite/evaluate-in-context.js":
/*!********************************************************!*\
  !*** ./node_modules/tripartite/evaluate-in-context.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const resolveDataPath = __webpack_require__(/*! ./resolve-data-path */ "./node_modules/tripartite/resolve-data-path.js")
function evaluateInContext(context, expression, dataFunctions, globalData) {
	if (!expression) {
		return null
	}
	if (typeof expression === 'string') {
		expression = expression.trim()
	}

	if (expression === '$this' || expression === 'this') {
		return context
	}
	if (typeof context === 'object' && expression in context) {
		return context[expression]
	}
	if (expression === '""' || expression === "''") {
		return ''
	}
	let resolved = resolveDataPath(context, expression)
	if (resolved === null || resolved === undefined) {
		resolved = resolveDataPath({
			'$globals': globalData
		}, expression)
	}
	if (resolved === null || resolved === undefined) {
		resolved = _evaluateInContext.call(context, context, expression, dataFunctions, globalData)
	}
	return resolved
}

let evalFunction = new Function('additionalContexts',
	`with ({
		'$globals': additionalContexts.globalData
	}) {
		with (additionalContexts.dataFunctions) {
			with (additionalContexts.context) {
				try {
					return eval(additionalContexts.expression);
				} catch (e) {
					return null;
				}
			}
		}
	}`
)

function _evaluateInContext(context, expression, dataFunctions, globalData) {
	dataFunctions = dataFunctions || {}
	globalData = globalData || {}


	let result = evalFunction.call(this, {
		globalData: globalData
		, dataFunctions: dataFunctions
		, context: context
		, expression: expression
	})
	return result
}

module.exports = evaluateInContext

/***/ }),

/***/ "./node_modules/tripartite/execution-context.js":
/*!******************************************************!*\
  !*** ./node_modules/tripartite/execution-context.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


let ActiveElement = __webpack_require__(/*! ./active-element */ "./node_modules/tripartite/active-element.js")
var calculateRelativePath = __webpack_require__(/*! ./calculate-relative-path */ "./node_modules/tripartite/calculate-relative-path.js")
let evaluateInContext = __webpack_require__(/*! ./evaluate-in-context */ "./node_modules/tripartite/evaluate-in-context.js")

class ExecutionContext {
	/**
	 * 
	 * @param {Tripartite} tripartite 
	 * @param {function} template 
	 * @param {stream} [destination]
	 */
	constructor(tripartite, template, data = {}, destination = '', dataFunctions = {}) {
		this.tripartite = tripartite
		this.template = template
		this.destination = destination
		this.initialData = data
		this.currentData = []
		this.dataFunctions = dataFunctions
		this.continueOnTripartiteError = true
		
		// Sometimes large pages have so many elements that we exceed
		// the maximum call depth. This happens when we have a lot of elements all being
		// rendered by the same templates. That is, there's no async callback when a template
		// is loaded, only instant callbacks.
		// The downside to doing very frequent async calls is that it takes a lot longer to
		// to get called from a setTimeout than it does to call directly. We want ot keep
		// the time between needing to do that reasonably long. Unfortunately, there's no
		// easy/fast way to detect the call stack depth, so we rely on this proxy.
		this.callCount = 0
		this.callDepthLimit = 1000
	}

	/**
	 * 
	 * @param {function} [callback] called when done
	 * @returns Returns the string of stream as the result of the operation
	 */
	run(callback) {
		let ourCallback
		if (callback) {
			ourCallback = () => {
				callback(null, this.destination)
			}
		}

		this._run(this.template, this.initialData, ourCallback)

		return this.destination
	}

	_resolveHandlingExpression(template, handlingExpression, data) {
		if (!handlingExpression) {
			handlingExpression = defaultTemplateName
		}
		if (handlingExpression.charAt(0) == '$') {
			// Indicates the handling espression is not a literal template name but is a string which should
			// be evaluated to determine the template name
			handlingExpression = evaluateInContext(data, handlingExpression.substring(1), this.dataFunctions, this.initialData)
		}
		// resolve relative template paths
		if (handlingExpression.indexOf('./') == 0 || handlingExpression.indexOf('../') == 0) {
			handlingExpression = calculateRelativePath(template.templateMeta.name, handlingExpression)
		}

		return handlingExpression
	}

	_run(template, data, callback) {
		let parts = [...template.parts].reverse()
		const processParts = () => {
			
			// check to see how far down in the call stack we are. If too far down,
			// come back in the next tick.
			this.callCount++
			if(this.callCount++ > this.callDepthLimit) {
				setTimeout(()=> {
					this.callCount = 0
					processParts()
				})
				return
			}

			if (parts.length > 0) {
				let part = parts.pop()
				if (typeof part === 'string') {
					this.output(part)
					processParts()
				}
				else if (part instanceof ActiveElement) {
					let conditional = part.conditionalExpression || part.dataExpression
					let conditionalResult = false
					let resultData
					if (conditional == null || conditional == undefined || conditional === '') {
						// Because if they didn't specify a condition or data, they probably 
						// just want the template to be run as is
						conditionalResult = true
					}
					else {
						if(part.conditionalExpression) {
							let result = evaluateInContext(data, part.conditionalExpression, this.dataFunctions, this.initialData)
							if (result) {
								conditionalResult = true
							}
						}
						else {
							// This means we're evaluating the data expression to see if we should run the template
							resultData = evaluateInContext(data, part.dataExpression, this.dataFunctions, this.initialData)
							if(resultData === null || resultData === undefined) {
								conditionalResult = false
							}
							else if (typeof resultData === 'number') {
								// if the result is a number, any number, we want to output it
								// unless the number is from the conditional expression, in which
								// case we want to evaluate it as truthy
								conditionalResult = true
							}
							else if(Array.isArray(resultData) && resultData.length > 0) {
								conditionalResult = true
							}
							else if(resultData) {
								conditionalResult = true
							}
						}
					}


					if (conditionalResult) {
						if (part.dataExpression && resultData === undefined) {
							resultData = evaluateInContext(data, part.dataExpression, this.dataFunctions, this.initialData)
						}
						if((resultData === null || resultData === undefined) && !part.dataExpression) {
							resultData = data
						}

						let handlingExpression = this._resolveHandlingExpression(template, part.handlingExpression, data)
						let handlingTemplate
						let children = (Array.isArray(resultData) ? [...resultData] : [resultData]).reverse()
						const applyTemplate = () => {
							if (children.length > 0) {
								let child = children.pop()
								this._run(handlingTemplate, child, () => {
									applyTemplate()
								})
							}
							else {
								processParts()
							}
						}

						if(handlingExpression in this.tripartite.templates) {
							handlingTemplate = this.tripartite.getTemplate(handlingExpression)
							if (handlingTemplate) {
								applyTemplate()
							}
							else {
								// the template has been loaded before but is empty
								if (this.continueOnTripartiteError) {
									processParts()
								}
							}
							
						}
						else {
							this.tripartite.loadTemplate(handlingExpression, (template) => {
								if (!template) {
									let msg = 'Could not load template: ' + handlingExpression
									console.error(msg)
									if (this.continueOnTripartiteError) {
										processParts()
									}
									else {
										let err = new Error(msg)
										if (callback) {
											callback(err)
										}
										else {
											throw err
										}
									}
								}
								else {
									handlingTemplate = template
									applyTemplate()
								}
							})
						}
					}
					else {
						processParts()
					}
				}
				else if (typeof part === 'function') {
					if(part.write) {
						part.write(data, this.destination, () => {
							processParts()
						})

					}
					else {
						this.output(part(data))
						processParts()
					}
				}

			}
			else {
				if (callback) {
					callback()
				}
			}
		}

		processParts()
	}

	/**
	 * 
	 * @param {string} value 
	 */
	output(value) {
		if(value === null || value === undefined) {
			return
		}
		if (typeof this.destination === 'string') {
			this.destination += value
		}
		else if (this.destination.write) {
			this.destination.write(value)
		}
	}
}


module.exports = ExecutionContext

/***/ }),

/***/ "./node_modules/tripartite/resolve-data-path.js":
/*!******************************************************!*\
  !*** ./node_modules/tripartite/resolve-data-path.js ***!
  \******************************************************/
/***/ ((module) => {

/*
function resolveDataPath(data, path) {
	if(data === null || data === undefined) {
		return data
	}
	let parts
	if(typeof path === 'string') {
		parts = path.trim().split('.')
	}
	else if(Array.isArray(path)) {
		parts = path
	}
	
	let name = parts.shift()
	if(name.indexOf(' ') > -1) {
		// there's a space, which means it's really unlikely it's a property
		return null
	}
	let child
	if(name === 'this' || name === '$this') {
		child = data
	}
	else if(typeof data === 'object') {
		if(name in data) {
			child = data[name]
		}
	}
	if(parts.length > 0) {
		return resolveDataPath(child, parts)
	}
	else {
		return child
	}
} */
function resolveDataPath(data, path) {
	try {
		if (data === null || data === undefined) {
			return data
		}
		let parts
		if (typeof path === 'string') {
			parts = path.trim().split('.')
		}
		else if (Array.isArray(path)) {
			parts = path
		}

		while (parts.length > 0) {
			let name = parts.shift()
			if (name.indexOf(' ') > -1) {
				// there's a space, which means it's really unlikely it's a property
				return null
			}
			let child
			if (name === 'this' || name === '$this') {
				child = data
			}
			else if (typeof data === 'object') {
				if (name in data) {
					child = data[name]
				}
			}
			if (parts.length == 0) {
				return child
			}
			if (child === null || child === undefined) {
				return null
			}
			data = child
		}
	}
	catch (e) {
		return null
	}
}

module.exports = resolveDataPath

/***/ }),

/***/ "./node_modules/tripartite/tripartite.js":
/*!***********************************************!*\
  !*** ./node_modules/tripartite/tripartite.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {




if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	}
}


function isStream(stream) {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}


function isTemplate(obj) {
	if (!obj) {
		return false
	}
	if (typeof obj !== 'function') {
		return false
	}
	if (!obj.write) {
		return false
	}
	if (!obj.parts) {
		return false
	}
	if (!obj.templateMeta) {
		return false
	}

	return true
}

let ExecutionContext = __webpack_require__(/*! ./execution-context */ "./node_modules/tripartite/execution-context.js")
let ActiveElement = __webpack_require__(/*! ./active-element */ "./node_modules/tripartite/active-element.js")


class Tripartite {
	constructor(options = {}) {
		this.templates = {
			defaultTemplate: this._makeTemplate(function (thedata) {
				return '' + thedata;
			})
		}
		let { constants = {
			templateBoundary: '__',
			templateNameBoundary: '##'
		} } = options
		this.constants = constants

		// This object (if set) will receive the template functions parsed from a script
		// I want to be able to call my templates as global functions, so I've set it
		// to be the window object
		this.secondaryTemplateFunctionObject = options.secondaryTemplateFunctionObject

		this.loaders = options.loaders || []

		this.dataFunctions = options.dataFunction || {}
	}

	_makeTemplate(transformationFunction) {
		if (isTemplate(transformationFunction)) {
			return transformationFunction
		}
		let tri = this
		let f = function (thedata) {
			let stream = null
			let options = null
			let callback = null
			for (let i = 1; i < arguments.length; i++) {
				let arg = arguments[i]
				if (isStream(arg)) {
					stream = arg
				}
				else if(typeof arg === 'function') {
					callback = arg
				}
				else if(typeof arg === 'object') {
					options = arg
				}
			}

			return f.write(thedata, stream, callback, options)
		}
		f.write = function (thedata, stream, callback, options = {}) {
			if(transformationFunction && transformationFunction.write) {
				// if it's not a template, but has a write method, invoke the right method directly
				return transformationFunction.write.apply(transformationFunction, arguments)
			}
			else {
				let dest = stream || ''

				let context = new ExecutionContext(tri, f, thedata, dest, tri.dataFunctions)
				if (options && 'continueOnTripartiteError' in options) {
					context.continueOnTripartiteError = options.continueOnTripartiteError
				}

				return context.run(callback)
			}
		}
		f.parts = []
		if (transformationFunction && typeof transformationFunction === 'function') {
			f.parts.push(transformationFunction)
		}
		f.templateMeta = {}
		return f
	}

	addTemplate(name, template) {
		if (typeof template === 'string') {
			template = this.parseTemplate(template);
		}
		else if (typeof template === 'function') {
			template = this._makeTemplate(template)
		}

		this.templates[name] = template;
		template.templateMeta = template.templateMeta || {}
		template.templateMeta.name = name
		return template;
	}

	createBlank() {
		return new Tripartite()
	}

	getTemplate(name) {
		return this.templates[name]
	}

	loadTemplate(name, callback) {
		if (name in this.templates) {
			callback(this.templates[name])
		}
		else {
			let tri = this
			let count = this.loaders.length
			let done = false

			if (count == 0) {
				tri.templates[name] = null
				callback(tri.getTemplate(name))
			}
			else {
				this.loaders.forEach(loader => {
					if (done) {
						return
					}
					loader(name, template => {
						if (done) {
							return
						}
						count--
						if (template) {
							done = true
							tri.addTemplate(name, template)
						}
						else if (count == 0) {
							done = true
							tri.templates[name] = null
						}
						if (done) {
							callback(tri.getTemplate(name))
						}
					})
				})
			}
		}
	}
	parseTemplateScript(tx) {
		var tks = this.tokenizeTemplateScript(tx);
		/* current template name */
		var ctn = null;
		for (var i = 0; i < tks.length; i++) {
			var token = tks[i];
			if (token.active) {
				ctn = token.content;
			}
			else {
				if (ctn) {
					var template = this.addTemplate(ctn, this.stripTemplateWhitespace(token.content));
					if (this.secondaryTemplateFunctionObject) {
						this.secondaryTemplateFunctionObject[ctn] = template;
					}
					ctn = null;
				}
			}
		}
	}

	stripTemplateWhitespace(txt) {
		var i = txt.indexOf('\n');
		if (i > -1 && txt.substring(0, i).trim() == '') {
			txt = txt.substring(i + 1);
		}
		i = txt.lastIndexOf('\n');
		if (i > -1 && txt.substring(i).trim() == '') {
			txt = txt.substring(0, i);
		}
		return txt;
	}

	/* simple template */
	_createActiveElement(/* conditional expression */ cd, data, /* handling expression */ hd, tripartite, templateMeta) {
		let el = new ActiveElement(cd, data, hd, tripartite);
		el.templateMeta = templateMeta
		return el
	}
	pt(tx) {
		return this.parseTemplate(tx)
	}
	/* parse template */
	parseTemplate(tx) {
		var tks = this.tokenizeTemplate(tx);
		let t = this._makeTemplate()
		var templateMeta = t.templateMeta

		for (let tk of tks) {
			if (tk.active) {
				t.parts.push(this.tokenizeActivePart(tk.content, templateMeta));
			}
			else if (tk.content) {
				t.parts.push(tk.content);
			}
		}

		return t
	}

	tokenizeActivePart(tx, templateMeta) {
		var con = null;
		var dat = null;
		var han = null;

		/* condition index */
		var ci = tx.indexOf('??');
		if (ci > -1) {
			con = tx.substring(0, ci);
			ci += 2;
		}
		else {
			ci = 0;
		}

		/* handler index */
		var hi = tx.indexOf('::');
		if (hi > -1) {
			dat = tx.substring(ci, hi);
			han = tx.substring(hi + 2);
		}
		else {
			dat = tx.substring(ci);
		}
		return this._createActiveElement(con, dat, han, this, templateMeta);
	}

	tokenizeTemplate(tx) {
		return this.tokenizeActiveAndInactiveBlocks(tx, this.constants.templateBoundary);
	}


	/** tokenize template script */
	tokenizeTemplateScript(tx) {
		return this.tokenizeActiveAndInactiveBlocks(tx, this.constants.templateNameBoundary);
	}

	/* tokenize active and inactive blocks */
	tokenizeActiveAndInactiveBlocks(text, /*Active Region Boundary */ boundary) {
		/* whole length */
		let length = text.length

		/* current position */
		let position = 0

		/* are we in an active region */
		let act = false

		let tokens = []

		while (position < length) {
			let i = text.indexOf(boundary, position);
			if (i == -1) {
				i = length;
			}
			var tk = { active: act, content: text.substring(position, i) };
			tokens.push(tk);
			position = i + boundary.length;
			act = !act;
		}

		return tokens;
	}

}
var tripartiteInstance = new Tripartite()

if (typeof window != 'undefined') {
	tripartiteInstance.secondaryTemplateFunctionObject = window
}


if (true) {
	module.exports = tripartiteInstance
}
else // removed by dead control flow
{}

if (typeof __webpack_require__.g != 'undefined') {
	if (!__webpack_require__.g.Tripartite) {
		__webpack_require__.g.Tripartite = Tripartite
	}
	if (!__webpack_require__.g.tripartite) {
		__webpack_require__.g.tripartite = tripartiteInstance
	}
}



/***/ }),

/***/ "./node_modules/value-injector-common/value-injector-common.js":
/*!*********************************************************************!*\
  !*** ./node_modules/value-injector-common/value-injector-common.js ***!
  \*********************************************************************/
/***/ ((module) => {


let attributeEscapes = {
	'&': '&amp;'
	, '"': '&quot;'
	, '<': '&lt;'
}

let evalFunction = new Function('data',
	`with (data.context) {
		try {
			return eval(data.expression);
		} catch (e) {
			return null;
		}
	}`
)

function fetchValue(obj, path) {
	if(typeof obj === 'null' || typeof obj === 'undefined') {
		return null
	}
	return evalFunction.call(this, {
		context: obj
		, expression: path
	})
}


function isOrContains(target, possible) {
	if(Array.isArray(possible)) {
		return possible.includes(target)
	}
	else {
		return target == possible
	}
}

function escForRegex(val) {
	if(val && val.replace) {
		return val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
	}
	else {
		return val;
	}
}

function escapeAttributeValue(attr) {
	if(attr === null || attr === undefined) {
		attr = ''
	}
	if(typeof attr !== 'string') {
		attr = '' + attr
	}
	for(let [key, value] of Object.entries(attributeEscapes)) {
		attr = attr.split(key).join(value)
	}
	return attr
}


module.exports = {
	evalFunction
	, attributeEscapes
	, fetchValue
	, isOrContains
	, escForRegex
	, escapeAttributeValue
}


/***/ }),

/***/ "./views/webhandle/record-table/frame.tri":
/*!************************************************!*\
  !*** ./views/webhandle/record-table/frame.tri ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var tri = __webpack_require__(/*! tripartite */ "./node_modules/tripartite/tripartite.js"); var t = "<div class=\"record-table-frame __displayClasses__\">\n\t<div class=\"actions\">\n\t\t<div class=\"global\">\n\t\t\t<!-- <button class=\"create\" type=\"button\">Create New<\/button>\t -->\n\t\t<\/div>\n\t\t<div class=\"options\">\n\t\t\t<button type=\"button\" name=\"fieldOptions\">Choose Fields<\/button>\n\n\t\t<\/div>\n\t<\/div>\n\t<div class=\"search\">\n\n\t\t<div class=\"comparison-def\">\n\t\t\t<button class=\"show-all\" type=\"button\">Show All<\/button>\n\t\t\t- or -\n\t\t\t<label>\n\t\t\t\tField\n\t\t\t\t<select name=\"searchField\">\n\t\t\t\t\t<option value=\"\">-- choose field --<\/option>\n\t\t\t\t\t__fieldOptions__\n\t\t\t\t<\/select>\n\n\t\t\t<\/label>\n\t\t\t<label>\n\t\t\t\t&nbsp;\n\t\t\t\t<select name=\"matchesBecause\">\n\t\t\t\t\t<option value=\"contains\">contains<\/option>\n\t\t\t\t\t<!-- <option value=\"equals\">equals<\/option>\n\t\t\t\t\t<option value=\"gt\">is greater than<\/option>\n\t\t\t\t\t<option value=\"lt\">is less than<\/option> -->\n\t\t\t\t<\/select>\n\n\t\t\t<\/label>\n\n\t\t\t<label>\n\t\t\t\tValue\n\t\t\t\t<input name=\"search\" type=\"text\" \/>\n\t\t\t<\/label>\n\t\t\t<button type=\"button\" class=\"do-search\">Search<\/button>\n\t\t<\/div>\n\n\t<\/div>\n\t<div class=\"filter\">\n\t<\/div>\n\t<div class=\"columns\">\n\n\t<\/div>\n\t<div class=\"row-work\">\n\t\t<div class=\"status\">\n\t\t\t<p>\n\t\t\t\tSearch for records or \n\t\t\t\t<button class=\"show-all\" type=\"button\">Show All<\/button>\n\t\t\t<\/p>\n\t\t<\/div>\n\t\t<div class=\"row-options\">\n\t\t\t<button class=\"edit-row\" type=\"button\">Edit<\/button>\n\t\t\t<button class=\"delete-rows\" type=\"button\">Delete<\/button>\n\t\t\t\n\t\t<\/div>\n\t<\/div>\n\t<div class=\"records\">\n\n\n\t<\/div>\n\n<\/div>"; 
module.exports = tri.addTemplate("views/webhandle/record-table/frame", t); 

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./client-js/pages.mjs ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dynamic_products_list_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dynamic-products-list.mjs */ "./client-js/dynamic-products-list.mjs");


(0,_dynamic_products_list_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])()

})();


//# sourceMappingURL=pages.js.map