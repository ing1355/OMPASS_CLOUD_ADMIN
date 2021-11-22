import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Menu.css'
import MenuItem from './Menu_Item';
import Menu_Items from './Menu_Items';

const Menu = ({userProfile}) => {
    const {role} = userProfile;
    return (
        <div className="menu">
            {Menu_Items(role).map(item =>
                <MenuItem {...item} />
            )}
        </div>
    )
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Menu);
  