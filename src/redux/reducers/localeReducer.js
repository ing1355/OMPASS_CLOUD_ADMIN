import types from "../types";

const locale = localStorage.getItem('locale') || document.documentElement.lang;

const localeReducer = (state = locale, action) => {
  switch (action.type) {
    case types.localeChange:
      return action.payload;
    default:
      return state;
  }
};

export function localeChange(info) {
  return {
    type: types.localeChange,
    payload: info,
  };
}

export default localeReducer;
