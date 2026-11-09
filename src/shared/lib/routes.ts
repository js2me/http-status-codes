import { createRoute } from 'mobx-route';

export const routes = {
  home: createRoute('/', { hash: true, exact: true }),
  code: createRoute('/:code', { hash: true, exact: true }),
};
