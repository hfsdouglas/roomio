import { z } from "zod";
import { FastifyTypedInstance } from "@/types/fastify.ts";

import { db } from "@/plugins/db.ts";

import { schemas } from "@/database/schemas/index.ts";

export async function createUser(app: FastifyTypedInstance) {
    app.post("/users", {
        schema: {
            description: "Cria um novo usuário",
            tags: ["users"],
            body: z.object({
                name: z.string().min(5, "Nome completo é obrigatório"),
                email: z.email("Email inválido"),
                password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
                birth: z.coerce.date()
                    .min(new Date("1900-01-01"), "Data de nascimento inválida")
                    .refine((date) => {
                        const today = new Date();
                        const age = today.getFullYear() - date.getFullYear();
                        const monthDiff = today.getMonth() - date.getMonth();
                        
                        // Verifica se ainda não fez aniversário este ano
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
                            return age - 1 >= 18;
                        }
                        
                        return age >= 18;
                    }, "Usuário deve ser maior de 18 anos"),
                gender: z.enum(["male", "female", "other"], { message: "Gênero é obrigatório" }),
                phone: z.string().min(11, "Telefone deve ter no mínimo 11 caracteres"),
                cpf: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
                rg: z.string().nullable(),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                }).describe("Usuário criado com sucesso."),
                400: z.object({
                    error: z.string().describe("Mensagem de erro"),
                }).describe("Erro de validação"),
                500: z.object({
                    error: z.string().describe("Mensagem de erro interno"),
                }).describe("Erro interno do servidor"),
            }
        },
    }, async (request, reply) => {
        const { name, email, password, birth, gender, phone, cpf, rg } = request.body;

        await db.insert(schemas.user).values({
            name, 
            email, 
            password, 
            birth: birth.toISOString(), 
            gender, 
            phone, 
            cpf, 
            rg
        });

        return reply.status(201).send({ message: "Usuário criádo com sucesso!" });
    })
}