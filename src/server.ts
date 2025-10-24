import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/", () => {
    return { hello: "world" };
})

app.listen({ port: 3000 }).then(() => {
    console.log("Roomio server is running on port 3000! 🏨");
})