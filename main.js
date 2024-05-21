import SHA256 from 'crypto-js/sha256.js';

class Data{
    constructor({name,CertificateID}){
        this.name = name;
        this.CertificateID = CertificateID;
    }
}
class Block{
    constructor(index,timestamp,data,publicKey,previousHash = ''){
        this.index=index;
        this.timestamp = timestamp;
        this.data = new Data(data);
        this.publicKey = publicKey;
        this.previousHash = previousHash;
        this.hash=this.calculateHash();

    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.publicKey).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block("0","01/01/2024","Genesis block","0x123456789","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let myBlockChain = new Blockchain();
myBlockChain.addBlock(new Block(1,"10/07/2024",new Data({ name: "Abdul Wahab", CertificateID: "B4567" }),"0x123456789",myBlockChain.getLatestBlock().hash));
myBlockChain.addBlock(new Block(2,"10/07/2024",new Data({ name: "Khadija", CertificateID: "B7891" }),"0x123456789",myBlockChain.getLatestBlock().hash));

myBlockChain.chain[1].data.name = "Mateen";
console.log(myBlockChain.isChainValid());


//console.log(JSON.stringify(myBlockChain,null,4));