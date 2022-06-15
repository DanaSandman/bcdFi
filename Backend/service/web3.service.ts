const dotenv = require("dotenv")
dotenv.config()
const Web3 = require("web3");
const bTESTContract = require('../contract/bTEST.json');
 
const CONTRACT_ADDRESS = '0x52e24c3fF852EB5dd941a64c9E21763A70E57788'
const myAddress = '0xB38e002C23A9f1B4AEa57b52De2FA1e0737270C3' 
const { PRIVATE_KEY, INFURA_ID } = process.env;

// HTTP PROVIDER
const web3 = new Web3(new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/${INFURA_ID}`));

const contract = new web3.eth.Contract(
  bTESTContract.abi,
  CONTRACT_ADDRESS
);

// Build the transaction
async function getTransaction(tx:any){
  
  const gas = await tx.estimateGas({from: myAddress});  
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(myAddress);
  const networkId = await web3.eth.net.getId();
  const data = tx.encodeABI()
  
  return {
    to: CONTRACT_ADDRESS, 
    data,
    gas,
    gasPrice,
    nonce, 
    chainId: networkId
  };
};
// unPause()
async function unPause(){

  const tx = contract.methods.unpause()  
  await sendTx(await getTransaction(tx))  
};

export async function transfer(_to:string, _amount:number){
  
  const amount = web3.utils.toWei(_amount);
  const isPaused = await contract.methods.paused().call()
  if (isPaused ) return 'Contract is paused'   
  const tx = contract.methods.transfer(_to, amount)
    
  return await sendTx(await getTransaction(tx))
};

async function sendTx(transaction:object){

  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
  let txHash = '' 
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error:any, hash:any) => {
      if (!error) {
        txHash = hash
      } else {
        txHash = error
        console.log("Transaction error:", error)
      }
   });
   return txHash
};


