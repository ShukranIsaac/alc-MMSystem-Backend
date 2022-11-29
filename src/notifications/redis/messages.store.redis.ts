/* abstract */ class MessageStore {
    saveMessage(message: any) { }
    findMessagesForUser(userID: any) { }
}

export class InMemoryMessageStore extends MessageStore {
    constructor(private readonly messages: any[]) {
        super();
    }

    saveMessage(message: any) {
        this.messages.push(message);
    }

    findMessagesForUser(userID: any) {
        return this.messages.filter(
            ({ from, to }) => from === userID || to === userID
        );
    }
}

const CONVERSATION_TTL = 24 * 60 * 60;

export class RedisMessageStore extends MessageStore {
    constructor(private readonly redisClient: any) {
        super();
    }

    saveMessage(message: any) {
        const value = JSON.stringify(message);
        this.redisClient
            .multi()
            .rpush(`messages:${message.from}`, value)
            .rpush(`messages:${message.to}`, value)
            .expire(`messages:${message.from}`, CONVERSATION_TTL)
            .expire(`messages:${message.to}`, CONVERSATION_TTL)
            .exec();
    }

    async findMessagesForUser(userID: any) {
        const results = await this.redisClient
            .lrange(`messages:${userID}`, 0, -1);
        return results.map((result: string) => JSON.parse(result));
    }
}
