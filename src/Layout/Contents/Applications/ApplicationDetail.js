import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getApplicationDetailApi, getNewSecretKeyApi } from '../../../Constants/Api_Route';
import { CustomAxiosGet, CustomAxiosPatch } from '../../../Functions/CustomAxios';
import ContentsTitle from '../ContentsTitle';

const ApplicationDetail = ({userProfile}) => {
    const appId = window.location.pathname.split('/')[3];
    useLayoutEffect(() => {
        CustomAxiosGet(getApplicationDetailApi(userProfile.adminId,appId), (data) => {
            console.log(data);
        })
    },[])

    const resetSecretKey = () => {
        CustomAxiosPatch(getNewSecretKeyApi(userProfile.adminId,appId),null, data => {
            console.log(data);
        })
    }
    return <>
        <ContentsTitle/>
    </>
}

function mapStateToProps(state) {
    return {
      userProfile: state.userProfile
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);