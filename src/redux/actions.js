import { menuStateChange } from "./reducers/menuStateReducer";
import { localeChange } from "./reducers/localeReducer";
import { setIsLogin } from "./reducers/loginReducer";
import { setProfile } from "./reducers/profileReducer";
import { showSuccessMessage, showErrorMessage } from "./reducers/messageReducer";

const ActionCreators = Object.assign({}, {menuStateChange, localeChange, setIsLogin, setProfile, showSuccessMessage, showErrorMessage});

export default ActionCreators;
