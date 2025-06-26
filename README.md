# Record Table

A way show and work with large sets of data as tables. Allows users to 
choose the columns and column order, as well as search and sort the rows.


## Install

```bash
npm i @webhandle/record-table
```


## Client Side Usage

Client JS
```js
import RemoteDataService from '@dankolz/data-service-server/client-lib/remote-data-service.mjs'
import RecordTable from '@webhandle/record-table'

let dataService = new RemoteDataService({
	urlPrefix: '/data2'
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
			, retriever: (fieldName, obj) => {
				return 'something'
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
	]
})

let container = document.querySelector('#dynamic-products-list')
recordTable.appendTo(container)
recordTable.render()
```

LESS

Styling is pretty basic at this point, but for layout purposes probably include this.

```less
@import "../node_modules/@webhandle/record-table/less/record-table";
```

HTML
```html
<div id="dynamic-products-list" >
</div>
```

## Server Side Usage
```js
import recordTableIntegrator from "@webhandle/record-table"
recordTableIntegrator()
```

## Providing Data
The are a number of ways to provide data to the table, but generally it's got to be a Data Service object.
Here it is done by loading objects from a mongo dump, but there's a mongo Data Service as well. It's also
possible to create an in memory data service on the client side as well.

```js
import ServerDataService from '@dankolz/data-service-server'
import InMemoryDataService from '@dankolz/in-memory-data-service/lib/in-memory-data-service-sift.mjs'

let data = await webhandle.sinks.project.read('test-data/products.json')
let lines = data.toString().split('\n').filter(line => !!line)

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


```
