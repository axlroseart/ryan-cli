import { createStore, createLogger } from 'vuex';
import { common } from './common';

const debug = process.env.NODE_ENV !== 'production';

export const store = createStore({
  modules: {
    common,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
