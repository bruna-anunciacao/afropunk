import type { NextApiRequest, NextApiResponse } from 'next'
import * as services from "../../../services/services";
import { JWT, getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<services.IngressoObj[]|null>
) {
  console.log("Requisição recebida em api/compra");
  if (req.method!=="POST"){
    console.log("Método diferente de POST, retorna erro 405");
    res.status(405).json(null);
  }
  else{
    try{
        const jwtoken:JWT|null = await getToken({req});
        if (jwtoken){
            const userId = jwtoken.id;
            if(!(typeof userId === 'number')){
                console.log("userId não é um número");
                throw new Error("Tipo de userId inválido");
            }
            const {inteira, meia, meiasocial}:{inteira:number, meia:number, meiasocial:number} = req.body;
            if(inteira===undefined||inteira===null){
                console.log("Número de inteiras não foi informado");
                throw new Error("inteira é null");
            }
            if(meia===undefined||meia===null){
                console.log("Número de meias não foi informado");
                throw new Error("meia é null");
            }
            if(meiasocial===undefined||meiasocial===null){
                console.log("Número de meias sociais não foi informado");
                throw new Error("meiasocial é null");
            }
            const compra = await services.efetuarPedido(userId, inteira, meia, meiasocial);
            if (compra){
                console.log("Compra efetuada com sucesso");
                res.status(200).json(compra);
            }
        }
        else{
            console.log("Usuário não está logado");
            res.status(401).json(null);
        }
    } catch(error) {
        console.log(error);
        res.status(500).json(null);
    }
  }
}
