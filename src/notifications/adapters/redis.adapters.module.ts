import { Module } from '@nestjs/common';
import { SocketIOServer } from './socket.io.server'

@Module({
    imports: [],
    controllers: [],
    providers: [SocketIOServer],
    exports: [SocketIOServer]
})
export class SocketIOServerModule { }
