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

    fastify.post("/pools",async (request, response)=>{
        const validationRequest = z.object({
            title: z.string(),
        });
        
        const { title } = validationRequest.parse(request.body);

        const generate = new ShortUniqueId({length: 6});
        const code = String(generate()).toUpperCase();

        prisma.pool.create({
            data:{
                title,
                code
            }
        });

        return response.status(201).send({title});
    });

    await fastify.listen({port:3333 /*, host: '0.0.0.0'*/});
}

bootstrap();