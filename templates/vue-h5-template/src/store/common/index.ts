import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

const state = () => ({});

export const common = {
  namespace: true,
  mutations,
  actions,
  getters,
  state,
};
