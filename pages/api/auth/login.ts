import type { NextApiRequest, NextApiResponse } from 'next'
import * as services from "../../../services/services";

export default async function handler(  req: NextApiRequest, res: NextApiResponse<{name:string, email:string, id: number}|null>) {//Método a ser acessado pelo autenticador do NextAuth
    console.log("Requisição recebida em api/auth/login");
    if(req.method!="POST"){//Se o método não for POST, retorna erro
        console.log("Método diferente de POST, retorna erro 405");
        res.status(405).json(null);
        return;
    }
    const { email, password }:{email:string, password:string} = req.body;
    const user = await services.checaCredenciais(email, password);
    if(user){
        console.log(`Usuário com as credenciais informadas encontrado, retorna usuário ${JSON.stringify(user)}`);
        res.status(200).json(user);//Retorna o usuário encontrado
    }else{
        console.log("Usuário com as credenciais informadas não encontrado, retorna erro 401");
        res.status(401).json(null); //Caso o usuário não seja encontrado, responde com null e o NextAuth irá retornar um erro, que será tratado pelo componente "Login" do NextAuth
    }
}