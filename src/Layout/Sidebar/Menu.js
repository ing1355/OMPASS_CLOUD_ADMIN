import React from 'react';
import { connect, useSelector } from 'react-redux';
import route_info from '../../Constants/Route_items';
import './Menu.css'
import MenuItem from './Menu_Item';

const Menu = ({userProfile}) => {
    const {role} = userProfile;
    const {standalone} = useSelector(state => ({
      standalone: state.standalone
    }))
    return (
        <div className="menu">
            {route_info(role, standalone.standalone).map(item =>
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
  