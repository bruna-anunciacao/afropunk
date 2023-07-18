import type { NextApiRequest, NextApiResponse } from 'next'
import * as services from "../../../services/services";
import { JWT, getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<services.IngressoObj[]|null>
) {
  console.log("Requisição recebida em api/usuario/ingressos");
  let usuarioId:number=-1; //Placeholder para o id do usuário. Se continuar -1, algo de errado aconteceu e um erro será lançado
  let finalizado:boolean=false; //Flag para indicar se a requisição já foi finalizada e não precisa mais ser processada
    try{
        const jwtoken:JWT|null = await getToken({req});
        if (jwtoken){
            const userId = jwtoken.id;
            if(!(typeof userId === 'number')){
                console.log("userId não é um número");
                throw new Error("Tipo de userId inválido");
            }
            usuarioId = userId;
        }
        else{
            console.log("Usuário não está logado");
            finalizado=true;
            res.status(401).json(null);
        }
    } catch(error) {
        console.log(error);
        finalizado=true;
        res.status(500).json(null);
    }
    if (usuarioId<0 && !finalizado){
        console.log("Algo de errado aconteceu com o id do usuário durante a requisição");
        finalizado=true;
        res.status(500).json(null);
    }
    if(!finalizado){
        if(req.method!="GET"){
            console.log(`Método ${req.method} não permitido`);
            res.status(405).json(null);
        }
        else{
            const ingressos = await services.getIngressos(usuarioId);
            if(ingressos){
                res.status(200).json(ingressos);
            }
            else{
                res.status(500).json(null);
            }
        }
    }
}
