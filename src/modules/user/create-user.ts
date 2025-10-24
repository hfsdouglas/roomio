import z from "zod";
import { FastifyInstance } from "fastify";

import { db } from "@/plugins/db.js";

import { schemas } from "@/database/schemas/index.js";

export function createUser(app: FastifyInstance) {
    app.post("/user", {
        schema: {
            body: z.object({
                name: z.string().min(5, "Nome completo é obrigatório"),
                email: z.string().email("Email inválido"),
                password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
                birth: z.date({ message: "Data de nascimento é obrigatória" }),
                gender: z.enum(["male", "female", "other"], { message: "Gênero é obrigatório" }),
                phone: z.string().min(11, "Telefone deve ter no mínimo 11 caracteres"),
                cpf: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
                rg: z.string().nullable(),
            })
        }
    }, async (request, reply) => {
        const { name, email, password, birth, gender, phone, cpf, rg } = request.body;

        await db.insert(schemas.user).values({
            name, 
            email, 
            password, 
            birth,
            gender,
            phone,
            cpf,
            rg
        })

        return reply.status(201).send({ message: "User created successfully" });
    })
}