import types from "../types";

const visible = false;

const termsOfPurchaseReducer = (state = visible, action) => {
  switch (action.type) {
    case types.termsOfPurchaseVisibleChange:
      return action.payload;
    default:
      return state;
  }
};

export function termsOfPurchaseVisibleChange(toggle) {
  return {
    type: types.termsOfPurchaseVisibleChange,
    payload: toggle,
  };
}

export default termsOfPurchaseReducer;
