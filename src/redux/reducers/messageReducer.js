import types from '../types';

const msg = null;

const menuStateReducer = (state = msg, action) => {
  switch (action.type) {
    case types.successMessage:
      return {id: action.payload, type: 'success'};
    case types.errorMessage:
      return {id: action.payload, type: 'error'};
    default:
      return state;
  }
};

export function showSuccessMessage(id) {
    return {
        type: types.successMessage,
        payload: id
    };
}

export function showErrorMessage(id) {
  return {
      type: types.errorMessage,
      payload: id
  };
}

export default menuStateReducer;