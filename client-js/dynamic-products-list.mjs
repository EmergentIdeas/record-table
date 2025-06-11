import RecordTable from '../client-lib/record-table.mjs'
import formatPrice from './format-price.mjs'
import InMemoryDataService from '@dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs'

export default async function setupDynamicProductsList() {
	let container = document.querySelector('#dynamic-products-list')
	if(container) {
		let data = (await (await fetch('/data1')).text())
		let objs = data.split('\n').filter(line => !!line).map(line => JSON.parse(line))
		let dataService = new InMemoryDataService({
			collections: {
				default: objs
			}
		})
		
		let recordTable = new RecordTable({
			dataService: dataService
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
						return formatPrice(value)
						
					}
					, type: 'cents'
				}
				, {
					field: 'quantity'
					, label: 'Quantity'
					, type: 'number'
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
