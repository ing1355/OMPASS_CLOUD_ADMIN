import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomConfirm from './CustomConfirm';
import './SalesLevelAgreement.css';
import { FormattedMessage, useIntl } from "react-intl";
import { connect } from "react-redux";


const SalesLevelAgreement = ({visible, setVisible}) => {
    const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!visible) navigate(location.pathname);
  }, [visible]);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const scrollToElement = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

    return <CustomConfirm
    className="privacy-modal"
    centered
    maskClosable
    width={800}
    style={{
      maxHeight: 800,
      overflow: "auto",
      justifyContent: "start",
      overflowX: "hidden",
      padding: "0.5rem",
    }}
    visible={visible}
    footer={null}
    cancelCallback={closeModal}
  >
     <div className="agree-title">
        <ul className="agree-title-top">
          <p>
            <b>
              <FormattedMessage id="Sales_Level_Agreement" />
            </b>
          </p>
          <p>
            <b>
              <FormattedMessage id="Effective_date_2" />
            </b>
          </p>
        </ul>
        <ul className="en-title">
          <h4>
            <FormattedMessage id="Sales_Level_Agreement_text" />
            <br />
            <FormattedMessage id="Sales_Level_Agreement_text2" />
          </h4>
          <br />
          <div>
            <label>1.</label>
            <p onClick={() => scrollToElement("1st")}>
              {" "}
              <FormattedMessage id="Sales_Level_Agreement_title_1" />
            </p>
          </div>

          <div>
            <label>2.</label>
            <p onClick={() => scrollToElement("2nd")}>
              {" "}
              <FormattedMessage id="Sales_Level_Agreement_title_2" />
            </p>
          </div>
          <div>
            <label>3.</label>
            <p onClick={() => scrollToElement("3rd")}>
              {" "}
              <FormattedMessage id="Sales_Level_Agreement_title_3" />
            </p>
          </div>
          <div>
            <label>4.</label>
            <p onClick={() => scrollToElement("4th")}>
              {" "}
              <FormattedMessage id="Sales_Level_Agreement_title_4" />
            </p>
          </div>
        </ul>
      </div>
      <div className="agree-text-box2">
        <p id="1st">
          <h5>
            <FormattedMessage id="Sales_Level_Agreement_title1" />
          </h5>
          <FormattedMessage id="Sales_Level_Agreement_title1_1" />
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Sales_Level_Agreement_title1_2" />
            </li>
          </ul>
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Sales_Level_Agreement_title1_3" />
            </li>
          </ul>
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Sales_Level_Agreement_title1_4" />
            </li>
          </ul>
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Sales_Level_Agreement_title1_5" />
            </li>
          </ul>
          <ul>
            <table className='Sales_Level_Agreement_table'>
              <tr>
                <th>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_1" />
                </th>
                <th>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_2" />
                </th>
              </tr>
              <tbody>
              <tr>
                <td>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_3" />
                </td>
                <td>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_4" />
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_5" />
                </td>
                <td>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_6" />
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_7" />
                </td>
                <td>
                  <FormattedMessage id="Sales_Level_Agreement_title1_5_8" />
                </td>
              </tr>
              </tbody>
            </table>
          </ul>
        </p>

        <p id="2nd">
          <h5>
            <FormattedMessage id="Sales_Level_Agreement_title2" />
          </h5>
            <FormattedMessage id="Sales_Level_Agreement_title2_1" />
        </p>

        <p id="3rd">
          <h5>
            <FormattedMessage id="Sales_Level_Agreement_title3" />
          </h5>
          <FormattedMessage id="Sales_Level_Agreement_title3_1" />
        </p>

        <p id="4th">
          <h5>
            <FormattedMessage id="Sales_Level_Agreement_title4" />
          </h5>
          <FormattedMessage id="Sales_Level_Agreement_title4_1" />
          <ul>
            <li>
            <FormattedMessage id="Sales_Level_Agreement_number1" />
            </li>
            <li>
            <FormattedMessage id="Sales_Level_Agreement_title4_2_1" />
            </li>
          </ul>
          <ul>
            <li>
            <FormattedMessage id="Sales_Level_Agreement_number2" />
            </li>
            <li>
            <FormattedMessage id="Sales_Level_Agreement_title4_2_2" />
            </li>
          </ul>
        </p>
      </div>
  </CustomConfirm>
}

function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

export default SalesLevelAgreement