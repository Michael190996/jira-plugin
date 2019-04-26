import Koa from 'koa';
import path from 'path';
import url from 'url';
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

if (!config.PROD) {
    koa
        .use(koaMount('/', koaStatic(path.join(__dirname, 'static'), {'404': 'next'})))
        .use(koaCors()) // для фронта, но лучше настроить редирект
}

koa
    .use(koaRes())
    .use(koaLogger())
    .use(koaBodyparser())
    .use(router.routes())
    .use(router.allowedMethods());

const {
    port: PORT,
    hostname: HOSTNAME,
    href: HREF
} = url.parse(config.API);

koa.listen(PORT, HOSTNAME, () => {
    logger.info('App server start at ' + HREF);
    console.log('App server start at ' + HREF);
});
