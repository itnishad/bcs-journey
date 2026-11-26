import { Global, Module } from "@nestjs/common";
import {Redis} from "ioredis";
import { ConfigService } from "@nestjs/config";

export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

const createRedisClient = (configService: ConfigService) => {
    const client = new Redis({
        host: configService.getOrThrow<string>('REDIS_HOST'),
        port: configService.getOrThrow<number>('REDIS_PORT'),
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        enableOfflineQueue: true,
        connectTimeout: 10000,
        lazyConnect: true,
    })

    client.on('connect', ()=>{
        console.log('Redis connection done')
    })
    client.on('close', ()=>{
        console.log("Redis-connection close")
    })
    client.on('reconnecting', ()=>{
        console.log('Redis reconnecting...')
    })

    return client;
}

@Global()
@Module({
    providers: [
        {
            provide: REDIS_CLIENT,
            inject:[ConfigService],
            useFactory: createRedisClient
        }
    ],
    exports: [REDIS_CLIENT]
})
export class RedisModule {}