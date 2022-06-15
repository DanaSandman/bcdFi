const {transfer} = require('../../service/web3.service')

interface responseData {
    status: string | null,
    hash: string | null,
  }

  interface transferData {
    to: string,
    amount: number,
  }

export async function transferService(data:transferData) {

    let success:responseData = {
        status: null,
        hash: null,
    };

    try {
        success.hash = await transfer(data.to, data.amount)        
        success.status = 'Complited';

    } catch (err) {
        success.status = 'Failed';
        throw err
    }
    return success
}














