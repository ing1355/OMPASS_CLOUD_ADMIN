import serverErrorMsg from "./ServerErrorMsg";
import patternErrorMsg from "./PatternErrorMsg";
import localeText from "./LocaleText";

const locales = {
  en: {
    ...serverErrorMsg.US,
    ...patternErrorMsg.US,
    ...localeText.US,
  },
  ko: {
    ...serverErrorMsg.KR,
    ...patternErrorMsg.KR,
    ...localeText.KR,
  },
};

export default locales;
