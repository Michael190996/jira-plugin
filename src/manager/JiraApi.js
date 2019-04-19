import nodeFetch from 'node-fetch';
import token from './token';

export default class JiraApi {

    /**
     * @param {string} url - адрес среды
     * @returns {Promise} - задачи
     */
    static issues(url) {
        const REST = '/rest/api/2/search';
        const METHOD = 'get';
        const TOKEN = token.sign(METHOD, REST, url);

        return nodeFetch(`${url}${REST}?jwt=${TOKEN}`, {
            method: METHOD
        }).then(res => res.json());
    };
}