# Private Blockchain APIs

In this project I built a RESTful API using Express.js that will interface with my private bockchain. The project consists of two enpoints:

* GET block
* POST block 

## Setup

To setup the project do the following:

1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## API Service

I configured the API service using port 8000 to open channels of communication in `app.js`. The URL path is:

[http://localhost:8000](http://localhost:8000)

The endpoinds are defined in `BlockController.js`.

### GET Block Endpoint

get a block from the blockchain, I configured the GET request using URL path with a block height parameter. The response for the endpoint should provide block object is JSON format.

#### URL 

[http://localhost:8000/block/[blockheight]](http://localhost:8000/block/[blockheight])

Example: [http://localhost:8000/block/0](http://localhost:8000/block/0), where '0' is the block height.

#### Response

```
{
    "hash": "66bf36bbb312cf83f8d1e8deeca86489298a6f7b134a2708928a5a3102d24aea",
    "height": 0,
    "body": "First block in the chain - Genesis block",
    "time": "1548141425",
    "previousBlockHash": ""
}
```

### POST Block Endpoint

Post a new block with data payload option to add data to the block body. The block supports a string of text. The response provides the added block object in JSON format.

The new block's data goes into the request body:

```
{
	"data": "Some sample data"
}
```

#### Response

```
{
    "hash": "67704fa231666e782cc95ca9819e37121d2ae60abef226bb003daab1eef8b415",
    "height": 1,
    "body": "Some sample data",
    "time": "1548141605",
    "previousBlockHash": "66bf36bbb312cf83f8d1e8deeca86489298a6f7b134a2708928a5a3102d24aea"
}
```

I also did a simple validation - if the request's payload is empty, the service will not create a block and return an error:

```
{
    "status": "Error",
    "message": "Block content is required."
}
```
