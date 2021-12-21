import serverErrorMsg from "./ServerErrorMsg";
import patternErrorMsg from "./PatternErrorMsg";
import localeText from "./LocaleText";
import messageText from './MessageText'

const locales = {
  en: {
    ...serverErrorMsg.US,
    ...patternErrorMsg.US,
    ...localeText.US,
    ...messageText.US
  },
  ko: {
    ...serverErrorMsg.KR,
    ...patternErrorMsg.KR,
    ...localeText.KR,
    ...messageText.KR
  },
};

export default locales;
