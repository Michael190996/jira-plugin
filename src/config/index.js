import dotenv from 'dotenv';

const data = dotenv.config();

export default {
    SERVERPORT: data.parsed.SERVERPORT,
    PROD: !!data.parsed.PROD
}