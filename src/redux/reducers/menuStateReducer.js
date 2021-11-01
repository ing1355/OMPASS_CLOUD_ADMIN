import types from '../types';

const menuState = 'Dashboard';

export default (state = menuState, action) => {
  switch (action.type) {
    case types.menuStateChange:
      return action.payload;
    default:
      return state;
  }
};

export function menuStateChange(info) {
    return {
        type: types.menuStateChange,
        payload: info
    };
}