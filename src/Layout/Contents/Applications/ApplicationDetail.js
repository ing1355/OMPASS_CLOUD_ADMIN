import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getApplicationDetailApi, getNewSecretKeyApi } from '../../../Constants/Api_Route';
import { CustomAxiosGet, CustomAxiosPatch } from '../../../Functions/CustomAxios';
import ContentsTitle from '../ContentsTitle';

const ApplicationDetail = ({userProfile, location, history}) => {
    const {appId} = useParams();
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