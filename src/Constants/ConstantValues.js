export const dashboardChartLineColors = ["#8b94fe", "#d15a69", "#d37f13", "#4baeb6", "#150c76", "#ef9076", "#11a374", "#a71f57", "#81d123", "#7c694c", "#c90f17", "#036436", "#e997d6", "#5f7cbd", "#c85127", "#304052", "#5e9ffb", "#896179", "#ea991e", "#6e786e", "#063b7f", "#40835f", "#fc8f78"]
export const billingStatusColor = (status) => status === "EXPIRED" ? "#d60002" : "#00d134";
export const getColorByUserNum = (num, maxNum) => {
    const rate = getRateByUserNum(num, maxNum);
    if (rate < 33) {
        return "#00a9ec";
    } else if (rate < 66) {
        return "#00ec90";
    } else {
        return "#ecbf00";
    }
};
export const getRateByUserNum = (num, maxNum) => {
    return (num / maxNum) * 100;
};
export const codeBlockLanguage = 'jsx'
export const homepageUrl = (locale, uri) => (process.env.REACT_APP_SERVICE_TARGET === 'aws' ? 'https://ompasscloud.com' : (process.env.REACT_APP_SERVICE_TARGET === 'awsTest' ? 'https://d1t0x3qw1y6q7d.cloudfront.net' : (locale === 'ko' ? 'https://ompass.kr:4003/ko' : 'https://ompass.kr:4003'))) + (uri ? ('/' + uri) : '')
export const CopyRightText = `OMPASS v${process.env.REACT_APP_VERSION} © OneMoreSecurity Inc. All Rights Reserved.`