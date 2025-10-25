import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

// User Modules
import { createUser } from "@/modules/user/create-user.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: "*"
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Roomio',
            description: 'Roomio — seu HMS para gerenciar hóspedes, reservas e experiências inesquecíveis.',
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(createUser);

app.listen({ port: 3000 }).then(() => {
    console.log("Roomio server is running on port 3000! 🏨");
})