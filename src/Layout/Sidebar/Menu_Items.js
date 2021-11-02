import Route_items from "../../Constants/Route_items"

export default Route_items.map(item => ({
    key: item.key,
    name: item.name
}))