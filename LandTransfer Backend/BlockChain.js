const Block = require('./Block');
const Blocky = require('./Block');      
const CryptoHash = require('./CryptoHash');

class BlockChain{
    constructor() {
        this.Chain = [Blocky.Genesis()];
    }

    addBlock({ data }) {//here the input could be an obj/block or just a data feild, (but we wish for Block) So, here we take it in an object manner to make it more fexible, as decided in BlockChain.test.js
        this.Chain[this.Chain.length] = Block.mineBlock({ lastBlock: this.Chain[this.Chain.length - 1], data });
    }

    static isValidChain(Chainy) {       //this is another function of BlockChain, to verify the Block Chain to make it more temper-resistant. We made it but have it left it out of our user website. This will be useful for keeping checks and increasing security. Also, SOrry for the Chainy(nickname for the Chain)
        if (JSON.stringify(Chainy[0]) !== JSON.stringify(Block.Genesis()))
            return false;     
        
        for (let i = 1; i < Chainy.length; i++)
        {
            const lastDifficulty = Chainy[i-1].difficulty;
            if (Chainy[i - 1].hash != Chainy[i].lastHash)
                return false;
            
            const { timeStamp, lastHash, hash, data, Nonce, difficulty } = Chainy[i];

            if (hash !== CryptoHash(timeStamp, lastHash, data, Nonce, difficulty))
                return false;

            if ((lastDifficulty - difficulty) > 1) return false;
        }
        
        return true;
    }

    replaceChain(Chainy) {      //another feature of BlockChain is replace Chain
        if (Chainy.length <= this.Chain.length)
        {
            
            console.error('!The incoming Chain must be longer');
            return;
            }
        
        if (!BlockChain.isValidChain(Chainy))
        {
            console.error('!The incoming Chain must be Valid');
            return;
            }

        console.log('replacing Chain with', Chainy);
        this.Chain = Chainy;
    }
};

module.exports = BlockChain;
