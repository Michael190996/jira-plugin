import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import util from 'util';
import path from 'path';
import fs from 'fs';
import acc from '../../data/acc.json';

const writeFile = util.promisify(fs.writeFile);

class Token {
    constructor() {
        this._acc = acc;
    }

    // адреса сред
    getURLS() {
        return this._acc.map(e => e.baseUrl);
    }

    getAccByUrl(url) {
        const ACC = this._acc.find(e => e.baseUrl === url);

        if (!ACC) {
            throw Error('acc of undefined');
        }

        return ACC;
    }

    async add(url, acc) {
        if (this.check(url)) {
            throw Error('acc of exists');
        }

        this._acc.push(acc);
        await this._save();
    }

    async remove(url) {
        const INDEX = this._acc.find(e => e.baseUrl === url);

        if (INDEX === -1) {
            throw Error('acc of undefined');
        }

        this._acc.splice(INDEX, 1);
        await this._save();
    }

    check(url) {
        return !!this._acc.find(e => e.baseUrl === url);
    }

    async _save() {
        await writeFile(path.join(__dirname, '..', '..', 'data', 'acc.json'), JSON.stringify(this._acc));
    }

    // jwt token
    sign(method, url, baseUrl) {
        const ACC = this.getAccByUrl(baseUrl);

        // todo: maybe error
        const URL = encodeURIComponent(`${method.toUpperCase()}&${url.toLowerCase()}&`)
            .split('%2F')
            .join('/')
            .split('%26')
            .join('&')
            .replace(/[!'()]/g, escape)
            .replace(/\*/g, '%2A');

        //   console.log(URL);

        const {
            sharedSecret: SECRET,
            clientKey: CLIENTKEY,
            key: KEY
        } = ACC;

        const HASH = crypto.createHash('sha256')
            .update(URL, 'utf8')
            .digest('hex');

        return jwt.sign({
            qsh: HASH
        }, SECRET, {
            expiresIn: 60 * 60,
            issuer: KEY,
            audience: [CLIENTKEY]
        });
    }
}

export default new Token();