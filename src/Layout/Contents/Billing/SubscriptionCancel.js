import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  cancelSubscriptionIamportApi,
  cancelSubscriptionPayPalApi,
} from "../../../Constants/Api_Route";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import { CustomAxiosPost } from "../../../Functions/CustomAxios";
import {
  getDateFormatEn,
  getDateFormatKr,
} from "../../../Functions/GetFullDate";
import ActionCreators from "../../../redux/actions";
import "./SubscriptionCancel.css";

const SubscriptionCancel = ({
  userProfile,
  showSuccessMessage,
  isKorea,
  setCurrentPlan,
  currentPlan,
  editions,
}) => {
  const [cancelConfirmModal, setCancelConfirmModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { adminId, email } = userProfile;

  const openCancelConfirmModal = useCallback(() => {
    setCancelConfirmModal(true);
  }, []);

  const closeCancelConfirmModal = useCallback(() => {
    setCancelConfirmModal(false);
  }, []);

  const cancelIamPort = () => {
    setConfirmLoading(true);
    CustomAxiosPost(
      !isKorea()
        ? cancelSubscriptionPayPalApi
        : cancelSubscriptionIamportApi(adminId),
      {},
      (data) => {
        showSuccessMessage("SUBCRIPTION_CANCEL_SUCCESS");
        setCurrentPlan(data);
        setConfirmLoading(false);
        setCancelConfirmModal(false);
      },
      () => {
        setConfirmLoading(false);
      }
    );
  };
  return (
    <>
      <button
        disabled={
          (currentPlan && (currentPlan.status === "CANCEL" || currentPlan.status === 'EXPIRED' || currentPlan.status === 'FREE')) ||
          !editions.find((e) => e.name === currentPlan.name)
        }
        onClick={openCancelConfirmModal}
      >
        <FormattedMessage id="SUBSCRIPTIONCANCEL" />
      </button>

      <CustomConfirm
        visible={cancelConfirmModal}
        className="billing-modal"
        footer={true}
        confirmCallback={cancelIamPort}
        okLoading={confirmLoading}
        cancelCallback={closeCancelConfirmModal}
      >
        <p className="subscription-cancel-title">
          <FormattedMessage id="SUBSCRIPTION_CANCEL_TITLE" />
        </p>
        <div className="subscription-cancel-description">
          <FormattedMessage
            id="SUBSCRIPTION_CANCEL_DESCRIPTION"
            values={{
              email,
              date: currentPlan
                ? isKorea()
                  ? getDateFormatKr(currentPlan.expirationDate)
                  : getDateFormatEn(currentPlan.expirationDate)
                : null,
            }}
          />
        </div>
        <div className="subscription-cancel-confirm">
          <FormattedMessage id="CANCELSUBSCRIPTION" />
        </div>
      </CustomConfirm>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionCancel);
