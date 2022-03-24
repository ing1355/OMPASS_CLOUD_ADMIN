import { FormattedMessage } from "react-intl";

export const planStatusCodes = {
    EXPIRED: <FormattedMessage id="NONEUSED" />,
    RUN: <FormattedMessage id="Valid" />,
    RUN_REFUNDABLE: <FormattedMessage id="Valid" />,
    FREE: <FormattedMessage id="Valid" />,
    CANCEL: (
      <>
        <FormattedMessage id="Valid" /> (<FormattedMessage id="ValidCancel" />)
      </>
    ),
    FAILED_REGULAR_PAYMENT: <><FormattedMessage id="Valid" /> (<FormattedMessage id="PAYMENT_FAILED"/>)</>
  };