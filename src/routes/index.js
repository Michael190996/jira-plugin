import KoaRouter from 'koa-router';
import JiraApi from '../manager/JiraApi';
import token from '../manager/token';
import logger from '../manager/logger';

const router = new KoaRouter();

router.post('/installed', (ctx, next) => {
    const {baseUrl: BASEURL} = ctx.request.body;
    token.add(BASEURL, ctx.request.body);

    ctx.body = {};
});

router.post('/uninstalled', (ctx, next) => {
    const {baseUrl: BASEURL} = ctx.request.body;
    token.remove(BASEURL);
});

router.post('/enabled', async (ctx, next) => {
    logger.info('install', ctx.request.body.baseUrl);

    ctx.body = {};
});

router.post('/disabled', (ctx, next) => {
    logger.info('uninstall', ctx.request.body.baseUrl);

    ctx.body = {};
});

router.get('/api/project/issues', async (ctx, next) => {
    const {url: BASEURL} = ctx.query;
    ctx.body = await JiraApi.issues(BASEURL);
});

// адреса сред
router.get('/api/urls', async (ctx, next) => {
    ctx.body = token.getURLS();
});

export default router;