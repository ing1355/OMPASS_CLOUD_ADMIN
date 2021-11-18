import Menu_Items from '../../Layout/Sidebar/Menu_Items';
import types from '../types';

const menuState = null;

const menuStateReducer = (state = menuState, action) => {
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

export default menuStateReducer;