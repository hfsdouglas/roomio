import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

// User Modules
import { createUser } from "@/modules/user/create-user.js";
import fastifyCors from "@fastify/cors";
import z from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: "*"
})

app.register(createUser);

app.listen({ port: 3000 }).then(() => {
    console.log("Roomio server is running on port 3000! 🏨");
})