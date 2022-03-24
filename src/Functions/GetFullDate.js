export const GetFullDate = (date) => {
    const _ = new Date(date);
    const _m = _.getMonth() < 10 ? '0' + _.getMonth() : _.getMonth();
    const _d = _.getDate() < 10 ? '0' + _.getDate() : _.getDate();
    return _.getFullYear() + '-' + _m + '-' + _d
}

export const getDateFormatKr = (date) =>
    date ? date.split(" ")[0].split("-").reduce((pre, cur) => {
            return pre.includes("월")
                ? pre + " " + cur + "일"
                : pre.includes("년")
                    ? pre + " " + cur + "월"
                    : pre + "년 " + cur + "월";
        }) : ''

export const getDateFormatEn = (date) => {
    const options = {
        day: "numeric",
        year: "numeric",
        month: "long",
    };
    return date ? new Date(date).toLocaleDateString("en-US", options) : '';
};