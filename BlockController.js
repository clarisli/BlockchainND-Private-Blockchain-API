const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const BlockchainClass = require('./simpleChain.js')

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blockChain = new BlockchainClass.Blockchain();
        //this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:index", (req, res) => {
            // Add your code here
            let blockHeight = req.params["index"];
            this.blockChain.getBlock(blockHeight).then((block) => {
                res.send(JSON.stringify(block));
            }).catch((err) => {console.log(err);});
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/api/block", (req, res) => {
            if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.send({
                    status: 'Error',
                    message: 'Block content is required.'
                    });
                return;
            } else {
                let newBlock = new BlockClass.Block(req.body.data);
                this.blockChain.addBlock(newBlock).then((newBlock) => {
                    res.send(newBlock);
                }).catch((err) => {
                    console.log('No errors detected' + err);
                });
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blockChain.getBlockHeight() === 0){
            for (let index = 0; index < 10; index++) {
                let blockTest = new BlockClass.Block("Test Block - " + (i + 1));
                this.blockChain.addBlock(blockTest).then((result) => {
                    console.log(result);
                }).catch((err) => {
                  console.log('No errors detected' + err);
                });
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}