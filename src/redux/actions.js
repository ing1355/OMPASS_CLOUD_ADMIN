import { menuStateChange } from "./reducers/menuStateReducer";
import { localeChange } from "./reducers/localeReducer";
import { setIsLogin } from "./reducers/loginReducer";

const ActionCreators = Object.assign({}, {menuStateChange, localeChange, setIsLogin});

export default ActionCreators;
