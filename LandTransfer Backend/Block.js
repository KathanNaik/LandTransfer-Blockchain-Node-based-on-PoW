const { GENESIS_DATA, MINE_RATE } = require('./config.js');        
const CryptoHash = require('./CryptoHash');

class Block {
    constructor({ timeStamp, lastHash, hash, data, Nonce, difficulty }) {           //constructor that will be the basis of a Block Object
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.Nonce = Nonce;
        this.difficulty = difficulty;
    }

    static Genesis() {
        return new this( GENESIS_DATA );
    }

    static mineBlock({ lastBlock, data }) {     //to mine a block. It will impliment the leading Zeros method of PoW through variation of Nonce, and returns the Mined block
        let hash, timeStamp;
        //const timeStamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let Nonce = 0;

        let beta=Block.merkleTree(data);

        do {
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timeStamp});
            hash = CryptoHash(timeStamp, lastHash, beta, Nonce, difficulty);
            Nonce++;
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        
        Nonce--;

        return new this({
            timeStamp,
            lastHash,
            data,
            difficulty,
            Nonce,
            hash
            //hash : CryptoHash(timeStamp, lastHash, data, Nonce, difficulty)
        });         
    };

    static merkleTree(data)     //a statiic implimentation of MerkleTree, where we load Transactions in Block Based on the number of transactions. Here we did it for 4 transactions being bound togehter, but it can be easily modified to work for multiple transactions(through use of array and array lenght being passed. We just did it simple, because here there was no need to do so.)
    {
        const hash0=CryptoHash(data.t1);
        const hash1=CryptoHash(data.t2);
        const hash2=CryptoHash(data.t3);
        const hash3=CryptoHash(data.t4);

        const hash01=CryptoHash(hash0,hash1);
        const hash23=CryptoHash(hash2,hash3);

        const hash0123=CryptoHash(hash01,hash23);

        return hash0123;
    } 

    static adjustDifficulty({ originalBlock, timeStamp }) {     //another gold feature of Pow is the ability to mold its difficulty according to the audience's computation power. It works on comparing the current computation power with the originally set mine rate. We do it everytime, while it is done once per 2016 times in BitCoin
        const { difficulty } = originalBlock;
  
        if ( difficulty < 1){
             return 1;
        }
        if ( (timeStamp - originalBlock.timeStamp) > MINE_RATE ) {
            return (difficulty -1);
        }
        return difficulty + 1;
      }
}


module.exports = Block;

