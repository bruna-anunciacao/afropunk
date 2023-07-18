import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import * as services from "../../../services/services";
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({//Provider para autenticação com username e senha
        id: 'credentials',
        name: 'Username & Senha',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "exemplo@exemplo.com" },
          password: { label: "Senha", type: "password" }
        },
        async authorize(credentials, req) {//Aqui é feita a autenticação, que chama a rota de login
            const {email,password} = credentials as any;
            //No fetch abaixo, a url deve ser absoluta, pois o NextAuth não está rodando no mesmo servidor que o NextJS?
            //O uso de url relativa estava causando um erro
            const res = await fetch(services.url+"/api/auth/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password
                })
          })
          const user = await res.json();
          if (res.ok && user) {
            return user
          }
          return null
        }
      })
  ],
    session:{
        strategy: "jwt",//Usamos JWT para armazenar a sessão, ao invés de usar a strategy "database"
    },
    callbacks: {
        jwt: async ({token, user}) => {
            if(user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
          if(token){
            if(session.user){//Guarda o nome, email e id do usuário na sessão, em name, email e image
              session.user.name = token.name;
              session.user.email = token.email;
              session.user.image = String(token.id);
            }
          }
          return session;
        }
    },
    pages: {//Caso criemos uma página customizada para substituir uma página padrão do nextauth, devemos informar aqui
      signIn: '/login'
    }
}
export default NextAuth(authOptions)