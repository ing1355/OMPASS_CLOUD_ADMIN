import { menuStateChange } from "./reducers/menuStateReducer";
import { localeChange } from "./reducers/localeReducer";

const ActionCreators = Object.assign({}, {menuStateChange, localeChange});

export default ActionCreators;
