import Route_items from "../../Constants/Route_items"
import {isADMINRole} from '../../Constants/GetRole';

const getMenuItems = (role) => Route_items.filter(item => isADMINRole(role) || item.name !== 'Billing').map(item => ({
    key: item.key,
    name: item.name,
    route: item.route
}))

export default getMenuItems;