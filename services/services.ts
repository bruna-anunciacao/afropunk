import { PrismaClient, user, ingresso} from "@prisma/client";

export const prisma = new PrismaClient();//Cliente do prisma: Conexão com o banco de dados
export const url = process.env.NEXTAUTH_URL;//URL do site, para ser usada em requisições
export const maxIngressos= 250;//Número máximo de ingressos que podem ser vendidos

export type UserObj = user;
export type IngressoObj = ingresso;
export enum TiposIngressos{
	inteira = "inteira",
	meia = "meia",
	meiasocial = "meiasocial"
}
export type Perfil = {
	nome:string,
	email:string,
	cpf:string,
	idade:number,
	telefone:string|null,
	endereco:string|null
}

export async function newUser(nome:string, email:string, cpf:string, senha:string, idade:number):Promise<UserObj|null>{//Tenta cadastrar um novo usuário no banco de dados
	let usuario:UserObj|null = null;
	try{
		usuario = await prisma.user.create({
			data:{
				nome:nome,
				email:email,
				cpf:cpf,
				senha:senha,
				idade:idade
			}
		});
	} catch (error) {
		console.log("Erro ao criar usuário: "+error);
	} finally{
		return usuario;
	}
}

export async function checaCredenciais(email:string, senha:string):Promise<{name:string, email:string, id: number}|null>{//Tenta fazer login com o email e senha fornecidos
	let usuario:UserObj|null = null;
	try{
		usuario = await prisma.user.findFirst({
			where:{
				email:email,
				senha:senha
			}
		});
	} catch (error) {
		console.log(error);
	} finally{
		if (usuario){
			return {name:usuario.nome, email:usuario.email, id:usuario.id};
		}
		else{
			return null;
		}
	}
}

export async function ingressosDisponiveis():Promise<number>{//Retorna o número de ingressos disponíveis
	const vendidos = await prisma.ingresso.count();
	return maxIngressos - vendidos;
}

export async function compraIngresso(idUsuario:number, tipo:TiposIngressos):Promise<IngressoObj|null>{//Tenta comprar um ingresso para o usuário com o id fornecido e do tipo fornecido
	if (await ingressosDisponiveis()===0){
		console.log("Não há ingressos disponíveis. Compra não realizada.");
		return null;
	}
	const ingresso = await prisma.ingresso.create({
		data: {
		  tipo: tipo,
		  user: { connect: { id: idUsuario } },
		},
	  });
	if(ingresso){
		console.log(`Ingresso ${ingresso.id} do tipo ${ingresso.tipo} comprado com sucesso para o usuário de id ${idUsuario}`);
		return ingresso;
	}
	else{
		console.log(`Erro ao comprar ingresso para o usuário de id ${idUsuario}`);
		return null;
	}
}

export async function efetuarPedido(idUsuario:number, inteiras:number, meias:number, meiasSociais:number):Promise<IngressoObj[]|null>{//Tenta efetuar um pedido de ingressos para o usuário com o id fornecido
	const qtdIngressos = inteiras + meias + meiasSociais;
	if (qtdIngressos>await ingressosDisponiveis()){
		console.log(`Não há ingressos suficientes para o pedido. Compra não realizada.`);
		return null;
	}
	let ingressos:IngressoObj[] = [];
	let newIngresso:IngressoObj|null;
	for (let i=0; i<inteiras; i++){
		newIngresso = await compraIngresso(idUsuario, TiposIngressos.inteira);
		if (newIngresso){
			ingressos.push(newIngresso);
		}
	}
	for (let i=0; i<meias; i++){
		newIngresso = await compraIngresso(idUsuario, TiposIngressos.meia);
		if (newIngresso){
			ingressos.push(newIngresso);
		}
	}
	for (let i=0; i<meiasSociais; i++){
		newIngresso = await compraIngresso(idUsuario, TiposIngressos.meiasocial);
		if (newIngresso){
			ingressos.push(newIngresso);
		}
	}
	return ingressos;
}

export async function getPerfil(idUsuario:number):Promise<Perfil|null>{//Retorna o perfil do usuário com o id fornecido
	const usuario = await prisma.user.findFirst({
		where:{
			id:idUsuario
		}
	});
	if (usuario){
		console.log(`Usuário ${usuario.nome} de id ${usuario.id} encontrado.`);
		return{
			nome:usuario.nome,
			email:usuario.email,
			cpf:usuario.cpf,
			idade:usuario.idade,
			telefone:usuario.telefone,
			endereco:usuario.endereco
		}
	}
	else{
		console.log(`Usuário de id ${idUsuario} não encontrado.`);
		return null;
	}
}

export async function setPerfil(userId:number, nome:string, idade:number, telefone:string, endereco:string):Promise<Perfil|null>{//Atualizar o perfil do usuário com o id fornecido e retorna o perfil atualizado (ou null se o usuário não for encontrado)
	let newTelefone:string|null = telefone;
	let newEndereco:string|null = endereco;
	if (telefone===""){
		newTelefone = null;
	}
	if (endereco===""){
		newEndereco = null;
	}
	if (nome===""){
		throw new Error("Nome não pode ser vazio.");
	}
	const usuario = await prisma.user.update({
		where:{
			id:userId
		},
		data:{
			nome:nome,
			idade:idade,
			telefone:newTelefone,
			endereco:newEndereco
		}
	});
	if (usuario){
		console.log(`Perfil do usuário ${usuario.nome} de id ${usuario.id} atualizado.`);
		return{
			nome:usuario.nome,
			email:usuario.email,
			cpf:usuario.cpf,
			idade:usuario.idade,
			telefone:usuario.telefone,
			endereco:usuario.endereco
		}
	}
	else{
		console.log(`Usuário de id ${userId} não encontrado.`);
		return null;
	}
}

export async function getIngressos(idUsuario:number):Promise<IngressoObj[]|null>{//Retorna os ingressos do usuário com o id fornecido
	const user = await prisma.user.findUnique({
		where: { id: idUsuario },
		include: { ingressos: true },
	  });
	if (user){
		console.log(`Usuário ${user.nome} de id ${user.id} encontrado.`);
		return user.ingressos;
	}
	else{
		console.log(`Usuário de id ${idUsuario} não encontrado.`);
		return null;
	}
}