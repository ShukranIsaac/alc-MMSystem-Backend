/* abstract */ class SessionStore {
    findSession(id: any) { }
    saveSession(id: any, session: any) { }
    findAllSessions() { }
}

export class InMemorySessionStore extends SessionStore {
    constructor(private sessions = new Map()) {
        super();
    }

    findSession(id: any) {
        return this.sessions.get(id);
    }

    saveSession(id: any, session: any) {
        this.sessions.set(id, session);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}

const SESSION_TTL = 24 * 60 * 60;

const mapSession = ([userID, username, connected]) =>
    userID ? { userID, username, connected: connected === "true" } : undefined;

export class RedisSessionStore extends SessionStore {
    constructor(private readonly redisClient: any) {
        super();
    }

    findSession(id: any) {
        return this.redisClient
            .hmget(`session:${id}`, "userID", "username", "connected")
            .then(mapSession);
    }

    saveSession(id: any, { userID, username, connected }) {
        this.redisClient
            .multi()
            .hset(
                `session:${id}`,
                "userID",
                userID,
                "username",
                username,
                "connected",
                connected
            )
            .expire(`session:${id}`, SESSION_TTL)
            .exec();
    }

    async findAllSessions() {
        const keys = new Set();
        let nextIndex = 0;
        do {
            const [nextIndexAsStr, results] = await this.redisClient.scan(
                nextIndex,
                "MATCH",
                "session:*",
                "COUNT",
                "100"
            );
            nextIndex = parseInt(nextIndexAsStr, 10);
            results.forEach((s: unknown) => keys.add(s));
        } while (nextIndex !== 0);

        const commands = [];
        keys.forEach((key) => {
            commands.push(["hmget", key, "userID", "username", "connected"]);
        });

        return this.redisClient
            .multi(commands)
            .exec()
            .then((results: [any, any][]) => {
                return results
                    .map(([err, session]) => (err ? undefined : mapSession(session)))
                    .filter((v: any) => !!v);
            });
    }
}

