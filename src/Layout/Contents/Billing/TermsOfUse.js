import axios from 'axios';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import CustomConfirm from '../../../CustomComponents/CustomConfirm';
import './TermsOfUse.css'
const cheerio = require('cheerio')

const TermsOfUse = ({ visible, setVisible, userProfile, lang }) => {
    const {country} = userProfile;
    const [termsData, setTermsData] = useState([])
    
    useLayoutEffect(() => {
        if(country === 'KR') {
            axios.get('/v1/terms/iamport').then(({data}) => {
                const $ = cheerio.load(data)
                const result = [];
                $('.privacy_wrap').each((ind, item) => {
                    const _$ = cheerio.load(item);
                    result.push(_$.html().replace(/\n|\s{2}|\s*(?=\<)/g,''))
                })
                setTermsData(result)
            })
        } else {
            axios.get('/v1/terms/paypal',{
                params: {
                    'locale.x': 'ko_KR'
                }
            }).then(({data}) => {
                console.log(data)
            })
            
            console.log(country, lang)
        }
    },[userProfile, lang])

    const closeModal = useCallback(() => {
        setVisible(false);
    }, [])
    return <CustomConfirm
        centered
        maskClosable
        width={864}
        className="payment-terms-modal-container"
        visible={visible}
        footer={null}
        cancelCallback={closeModal}
    >
        {termsData.map((t,ind) => <div key={ind} dangerouslySetInnerHTML={{__html: t}}></div>)}
    </CustomConfirm>
}

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    lang: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);