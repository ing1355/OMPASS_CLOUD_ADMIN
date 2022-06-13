import serverErrorMsg from "./ServerErrorMsg";
import patternErrorMsg from "./PatternErrorMsg";
import localeText from "./LocaleText";
import messageText from './MessageText'
import DocsText from './DocsText'

const locales = {
  en: {
    ...serverErrorMsg.US,
    ...patternErrorMsg.US,
    ...localeText.US,
    ...messageText.US,
    ...DocsText.US
  },
  ko: {
    ...serverErrorMsg.KR,
    ...patternErrorMsg.KR,
    ...localeText.KR,
    ...messageText.KR,
    ...DocsText.KR
  },
};

export default locales;
