'use strict';
const redis = require('redis');

class Cacher {

    /**
     * new a Cacher to cache chrome-render html string
     * @param options @see https://github.com/NodeRedis/node_redis#options-object-properties
     * options.expires cache expires time in seconds, if omitted cache forever
     */
    constructor(options = {}) {
        this.client = redis.createClient(options);
        this.expires = options.expires;
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            });
        });
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            let cmd = [key, value];
            if (this.expires) {
                cmd = cmd.concat(['EX', this.expires]);
            }
            this.client.set(cmd, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            });
        });
    }
}


module.exports = Cacher;