export const GetFullDate = (date) => {
    const _ = new Date(date);
    const _m = _.getMonth() < 10 ? '0' + _.getMonth() : _.getMonth();
    const _d = _.getDate() < 10 ? '0' + _.getDate() : _.getDate();
    return _.getFullYear() + '-' + _m + '-' + _d
}