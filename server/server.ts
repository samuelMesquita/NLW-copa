import Fastify from  "fastify";
import cors from "@fastify/cors";
import {PrismaClient} from "@prisma/client";
import { z } from 'zod';
import ShortUniqueId from "short-unique-id";

const prisma = new PrismaClient({log: ['query']});

async function bootstrap (){

    const fastify = Fastify({
        logger: true
    });

    await fastify.register(cors, {
        origin: true
    })

    fastify.get("/pools/count",async ()=>{
        return {
            pools: await prisma.pool.count()
        }
    });

    
    fastify.get("/users/count",async ()=>{
        return {
            pools: await prisma.user.count()
        }
    });

    
    fastify.get("/guesses/count",async ()=>{
        return {
            pools: await prisma.guess.count()
        }
    });

    fastify.post("/pools",async (request, response)=>{
        const validationRequest = z.object({
            title: z.string(),
        });
        
        const { title } = validationRequest.parse(request.body);

        const generate = new ShortUniqueId({length: 6});
        const code = String(generate()).toUpperCase();

        await prisma.pool.create({
            data:{
                title,
                code
            }
        });

        return response.status(201).send({ code });
    });

    await fastify.listen({port:3333 /*, host: '0.0.0.0'*/});
}

bootstrap();