import Koa from 'koa';
import path from 'path';
import koaMount from 'koa-mount';
import koaLogger from 'koa-logger';
import koaStatic from 'koa-static';
import koaRes from 'koa-res';
import koaBodyparser from 'koa-bodyparser';
import koaCors from 'koa-cors';
import config from './config';
import router from './routes';
import logger from './manager/logger';

const koa = new Koa();

koa
    .use(koaMount('/', koaStatic(path.join(__dirname, 'static'), {'404': 'next'})))
    .use(koaCors()) // для фронта, но лучше настроить редирект
    .use(koaRes())
    .use(koaLogger())
    .use(koaBodyparser())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(config.SERVERPORT, () => {
    logger.info('App server start at localhost:' + config.SERVERPORT);
    console.log('App server start at localhost:' + config.SERVERPORT);
});
