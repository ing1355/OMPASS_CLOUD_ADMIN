import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import TermsOfPurchase from '../../CustomComponents/TermsOfPurchase';
import ActionCreators from '../../redux/actions';
import './Footer.css';

const Footer = ({setVisible}) => {
    const openTermsOfService = useCallback(() => {
        setVisible(true)
    },[])
    return <>
        <div className="footer">
            © OneMoreSecurity Inc. All Rights Reserved. <a href="#" onClick={openTermsOfService}>Terms of service</a>
        </div>
        <TermsOfPurchase/>
    </>
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setVisible: (toggle) => {
            dispatch(ActionCreators.termsOfPurchaseVisibleChange(toggle));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);