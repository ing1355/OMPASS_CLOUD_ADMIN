import serverErrorMsg from "./ServerErrorMsg";
import patternErrorMsg from "./PatternErrorMsg";
import localeText from "./LocaleText";

const locales = {
  en: {
    ...serverErrorMsg.en,
    ...patternErrorMsg.en,
    ...localeText.en,
  },
  ko: {
    ...serverErrorMsg.ko,
    ...patternErrorMsg.ko,
    ...localeText.ko,
  },
};

export default locales;
