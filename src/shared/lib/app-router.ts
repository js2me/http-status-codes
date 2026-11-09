import { HashRouter } from './hash-router';

export const appRouter = new HashRouter(buildEnvs.BASE_URL || '/');
