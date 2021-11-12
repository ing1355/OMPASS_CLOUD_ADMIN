import Menu_Items from '../../Layout/Sidebar/Menu_Items';
import types from '../types';

const menuState = Menu_Items.find(item => item.route === window.location.pathname).name;

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