import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ActionCreators from '../redux/actions';
import './Breadcrumb.css'

const Breadcrumb = ({ menuState }) => {
    const { pathname } = window.location;
    const temp = pathname.split('/').length <= 3 ? pathname.split('/').slice(1,) : pathname.split('/').slice(1, -1);
    const history = useHistory();

    return <p className="breadcrumb">
        {temp.map((name, ind, arr) => <>
            {
                ind === arr.length - 1 ? <span key={ind}>
                    {name}
                </span>
                    : <Link key={ind} to={'/' + arr.slice(0,ind + 1).join('/')}>
                        <span>
                            {name}
                        </span>
                        {ind === arr.length - 1 ? null : ' / '}
                    </Link>
            }
        </>)}
    </p>
}

function mapStateToProps(state) {
    return {
        menuState: state.menuState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuChange: toggle => {
            dispatch(ActionCreators.menuStateChange(toggle));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);