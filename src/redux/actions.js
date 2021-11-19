import { menuStateChange } from "./reducers/menuStateReducer";
import { localeChange } from "./reducers/localeReducer";
import { setIsLogin } from "./reducers/loginReducer";
import { setProfile } from "./reducers/profileReducer";

const ActionCreators = Object.assign({}, {menuStateChange, localeChange, setIsLogin, setProfile});

export default ActionCreators;
