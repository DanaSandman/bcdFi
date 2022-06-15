import React, { useState, useEffect, useRef} from "react";
import { transferData } from '../interfaces/transferData.js';
import { transferToken } from '../service/token.service';
import  {TextField}  from "@material-ui/core";

export const LandingPage: React.FC = () => {

    const initialReq: transferData = {
      to: '',
      amount: null,
    };

    interface responseData {
      status: string | null,
      hash: string | null,
    };
  
    const [request, setRequest] = useState<transferData>(initialReq);
    const [response, setResponse] = useState<responseData>({status:null, hash: null});

    const handleChange = ({ target }: any) =>  {
        const field:any = target.name;
        const value:any = target.value;
        setRequest({ ...request, [field]: value });
    };

    const onTransferTokens = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setResponse({...response, status: 'Pending...', hash: null})
      const res = await transferToken(request);
      if(res){
        setResponse({...response, status: res.status, hash: res.hash})
        setRequest({ ...request, to: '', amount: 0, });
      };
  };

    return(
        <div>
        <form>
        <TextField
          label="Amount"
          variant="outlined"
          name="amount"
          value={request.amount}
          onChange={handleChange}
          required
        />
        <TextField
          label="Wallet Address"
          variant="outlined"
          name="to"
          value={request.to}
          onChange={handleChange}
          required
        />
      <button onClick={onTransferTokens}>Click To Transfer</button>
      </form>
      <h2>{response.status && `Transaction ${response.status}`}</h2>
      <h4>{response.hash &&`transation Hash: ${response.hash}`}</h4>
      </div>
    );
;}
