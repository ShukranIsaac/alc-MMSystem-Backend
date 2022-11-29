import { Module } from '@nestjs/common';
import { InMemoryMessageStore, RedisMessageStore } from './messages.store.redis'
import { InMemorySessionStore, RedisSessionStore } from './sessions.store.redis';

@Module({
    imports: [],
    controllers: [],
    providers: [InMemoryMessageStore, RedisMessageStore,
        RedisSessionStore, InMemorySessionStore],
    exports: [InMemoryMessageStore, RedisMessageStore,
        RedisSessionStore, InMemorySessionStore]
})
export class RedisModule { }
