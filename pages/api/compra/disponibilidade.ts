import type { NextApiRequest, NextApiResponse } from 'next'
import * as services from "../../../services/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number|null>
) {
console.log("Requisição recebida em api/compra/disponibilidade");
  if (req.method!=="GET"){
    console.log("Método diferente de GET, retorna erro 405")
    res.status(405).json(null);
  }
  else{
    try{
        const ingressosDisponiveis = await services.ingressosDisponiveis();
        if (ingressosDisponiveis){
            console.log(`Ingressos disponíveis: ${ingressosDisponiveis}`);
            res.status(200).json(ingressosDisponiveis);
        }
        else{
            console.log("Erro ao obter ingressos disponíveis");
            res.status(400).json(null);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(null);
    }
  }
}
