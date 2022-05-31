import types from "../types";

const isStandalone = {
    standalone: false,
    loaded: false
};

const standaloneReducer = (state = isStandalone, action) => {
  switch (action.type) {
    case types.standaloneChange:
      return action.payload;
    default:
      return state;
  }
};

export function standaloneChange(info) {
  return {
    type: types.standaloneChange,
    payload: info,
  };
}

export default standaloneReducer;