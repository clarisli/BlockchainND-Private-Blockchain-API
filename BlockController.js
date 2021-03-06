const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const BlockchainClass = require('./simpleChain.js')
const { check, validationResult } = require('express-validator/check');

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
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", (req, res) => {
            let blockHeight = req.params["index"];
            this.blockChain.getBlock(blockHeight).then((block) => {
                res.json(block);
            }).catch((err) => {console.log(err);});
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/block"
     */
    postNewBlock() {
        this.app.post("/block", [
            // body must exists
            check('body').exists()
            ],(req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }

                let newBlock = new BlockClass.Block(req.body.body);
                this.blockChain.addBlock(newBlock).then((newBlock) => {
                    res.json(newBlock);
                }).catch((err) => {
                    console.log('No errors detected' + err);
                });
        });
    }


}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}