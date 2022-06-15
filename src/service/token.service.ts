import { httpService } from "./http.service";   
import { transferData } from '../interfaces/transferData.js';

export async function transferToken(data:transferData){

  return await httpService.post('token', data );
};