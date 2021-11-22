import Route_items from "../../Constants/Route_items"

const getMenuItems = (role) => Route_items.filter(item => role === 'ADMIN' || item.name !== 'Billing').map(item => ({
    key: item.key,
    name: item.name,
    route: item.route
}))

export default getMenuItems;