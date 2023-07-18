import type { NextApiRequest, NextApiResponse } from 'next'
import * as services from "../../services/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<services.UserObj|null>
) {
console.log("Requisição recebida em api/registrar");
  if (req.method!=="POST"){
    console.log("Método diferente de POST, retorna erro 405");
    res.status(405).json(null);
  }
  else{
    try{
        const {nome, email ,senha, cpf, idade}:{nome:string, email:string, senha:string, cpf:string, idade:number} = req.body;
        const newUser = await services.newUser(nome,email,cpf,senha,idade);
        if (newUser){
            console.log(`Usuário ${newUser.nome} criado com sucesso. ID: ${newUser.id}`);
            res.status(200).json(newUser);
        }
        else{
            console.log("Usuário não foi criado com sucesso.");
            res.status(400).json(null);
        }
    } catch(error){
        console.log(error);
        res.status(500).json(null);
    }
  }
}
