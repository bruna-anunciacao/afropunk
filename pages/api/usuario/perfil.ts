import type { NextApiRequest, NextApiResponse } from 'next'
import * as services from "../../../services/services";
import { JWT, getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<services.Perfil|null>
) {
  console.log("Requisição recebida em api/usuario/perfil");
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
        switch(req.method){
            case "GET":
                try{
                    const perfil:services.Perfil|null = await services.getPerfil(usuarioId);
                    if (perfil){
                        res.status(200).json(perfil);
                    }
                    else{
                        res.status(400).json(null);
                    }
                } catch(error){
                    console.log(error);
                    res.status(500).json(null);
                }
                break;
            case "PATCH":
                try{
                    const {nome, idade, telefone, endereco}:{nome:string, idade:number, telefone:string, endereco:string} = req.body;
                    if(nome===undefined || idade===undefined || telefone===undefined || endereco===undefined){
                        console.log("Dados incompletos");
                        res.status(400).json(null);
                        break;
                    }
                    const perfil:services.Perfil|null = await services.setPerfil(usuarioId,nome,idade,telefone,endereco);
                    if (perfil){
                        res.status(200).json(perfil);
                    }
                    else{
                        res.status(400).json(null);
                    }
                } catch(error){
                    console.log(error);
                    res.status(500).json(null);
                }
                break;
            default:
                console.log(`Método ${req.method} inválido. Retorna erro 405`);
                res.status(405).json(null);
        }
    }
}
