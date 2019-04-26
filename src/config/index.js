import dotenv from 'dotenv';

const data = dotenv.config();

export default {
    API: `${data.parsed.BACK_HOST}:${data.parsed.BACK_PORT}`,
    PROD: !!data.parsed.PROD
}