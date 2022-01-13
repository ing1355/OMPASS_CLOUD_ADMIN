const browser_json = [{"regex":"Web Explorer/(\\d+[\\.\\d]+).*Chrome","name":"Web Explorer","version":"$1","engine":{"default":"Webkit"}},{"regex":"Kiwi Chrome","name":"Kiwi","version":"","engine":{"default":""}},{"regex":"Silk/(\\d+[\\.\\d]+) like Chrome","name":"Mobile Silk","version":"$1","engine":{"default":"Blink"}},{"regex":"Chrome/.+ Quark(?:/(\\d+[\\.\\d]+))?","name":"Quark","version":"$1","engine":{"default":"WebKit"}},{"regex":"Whale/(\\d+[\\.\\d]+)","name":"Whale Browser","version":"$1","engine":{"default":"Blink"}},{"regex":"(?:Mobile|Tablet).*Servo.*Firefox(?:/(\\d+[\\.\\d]+))?","name":"Firefox Mobile","version":"$1","engine":{"default":"Servo"}},{"regex":"(?:Mobile|Tablet).*Firefox(?:/(\\d+[\\.\\d]+))?","name":"Firefox Mobile","version":"$1","engine":{"default":"Gecko"}},{"regex":"FxiOS/(\\d+[\\.\\d]+)","name":"Firefox Mobile iOS","version":"$1","engine":{"default":"WebKit"}},{"regex":".*Servo.*Firefox(?:/(\\d+[\\.\\d]+))?","name":"Firefox","version":"$1","engine":{"default":"Servo"}},{"regex":"Firefox(?:/(\\d+[\\.\\d]+))?","name":"Firefox","version":"$1","engine":{"default":"Gecko"}},{"regex":"(?:BonEcho|GranParadiso|Lorentz|Minefield|Namoroka|Shiretoko)/(\\d+[\\.\\d]+)","name":"Firefox","version":"$1","engine":{"default":"Gecko"}},{"regex":"Edge[ /](\\d+[\\.\\d]+)","name":"Microsoft Edge","version":"$1","engine":{"default":"Edge"}},{"regex":"EdgiOS[ /](\\d+[\\.\\d]+)","name":"Microsoft Edge","version":"$1","engine":{"default":"WebKit"}},{"regex":"EdgA[ /](\\d+[\\.\\d]+)","name":"Microsoft Edge","version":"$1","engine":{"default":"Blink"}},{"regex":"Edg[ /](\\d+[\\.\\d]+)","name":"Microsoft Edge","version":"$1","engine":{"default":"Blink"}},{"regex":"OPRGX(?:/(\\d+[\\.\\d]+))?","name":"Opera GX","version":"$1","engine":{"default":"Blink"}},{"regex":"(?:Opera Tablet.*Version|Opera/.+Opera Mobi.+Version|Mobile.+OPR)/(\\d+[\\.\\d]+)","name":"Opera Mobile","version":"$1","engine":{"default":"Presto","versions":{"15":"Blink"}}},{"regex":"MMS/(\\d+[\\.\\d]+)","name":"Opera Neon","version":"$1","engine":{"default":"Blink"}},{"regex":"OMI/(\\d+[\\.\\d]+)","name":"Opera Devices","version":"$1","engine":{"default":"Blink"}},{"regex":"OPT/(\\d+[\\.\\d]+)","name":"Opera Touch","version":"$1","engine":{"default":"Blink"}},{"regex":"Opera/(\\d+[\\.\\d]+).+Opera Mobi","name":"Opera Mobile","version":"$1","engine":{"default":"Presto","versions":{"15":"Blink"}}},{"regex":"Opera ?Mini/(?:att/)?(\\d+[\\.\\d]+)","name":"Opera Mini","version":"$1","engine":{"default":"Presto"}},{"regex":"Opera ?Mini.+Version/(\\d+[\\.\\d]+)","name":"Opera Mini","version":"$1","engine":{"default":"Presto"}},{"regex":"OPiOS/(\\d+[\\.\\d]+)","name":"Opera Mini iOS","version":"$1","engine":{"default":"WebKit"}},{"regex":"Opera.+Edition Next.+Version/(\\d+[\\.\\d]+)","name":"Opera Next","version":"$1","engine":{"default":"Presto","versions":{"15":"Blink"}}},{"regex":"(?:Opera|OPR)[/ ](?:9.80.*Version/)?(\\d+[\\.\\d]+).+Edition Next","name":"Opera Next","version":"$1","engine":{"default":"Presto","versions":{"15":"Blink"}}},{"regex":"(?:Opera[/ ]?|OPR[/ ])(?:9.80.*Version/)?(\\d+[\\.\\d]+)","name":"Opera","version":"$1","engine":{"default":"","versions":{"7":"Presto","15":"Blink","3.5":"Elektra"}}},{"regex":"BlackBerry|PlayBook|BB10","name":"BlackBerry Browser","version":""},{"regex":"Version/.* Chrome(?:/(\\d+[\\.\\d]+))?","name":"Chrome Webview","version":"$1","engine":{"default":"WebKit","versions":{"28":"Blink"}}},{"regex":"CrMo(?:/(\\d+[\\.\\d]+))?","name":"Chrome Mobile","version":"$1","engine":{"default":"WebKit","versions":{"28":"Blink"}}},{"regex":"CriOS(?:/(\\d+[\\.\\d]+))?","name":"Chrome Mobile iOS","version":"$1","engine":{"default":"WebKit"}},{"regex":"Chrome(?:/(\\d+[\\.\\d]+))? Mobile","name":"Chrome Mobile","version":"$1","engine":{"default":"WebKit","versions":{"28":"Blink"}}},{"regex":"chromeframe(?:/(\\d+[\\.\\d]+))?","name":"Chrome Frame","version":"$1","engine":{"default":"WebKit"}},{"regex":"Chromium(?:/(\\d+[\\.\\d]+))?","name":"Chromium","version":"$1","engine":{"default":"WebKit","versions":{"28":"Blink"}}},{"regex":"HeadlessChrome(?:/(\\d+[\\.\\d]+))?","name":"Headless Chrome","version":"$1","engine":{"default":"Blink"}},{"regex":"Chrome(?!book)(?:/(\\d+[\\.\\d]+))?","name":"Chrome","version":"$1","engine":{"default":"WebKit","versions":{"28":"Blink"}}},{"regex":"(?:Polaris|Embider)(?:[/ ](\\d+[\\.\\d]+))?","name":"Polaris","version":"$1"},{"regex":"Samsung ?Browser(?:[/ ](\\d+[\\.\\d]+))?","name":"Samsung Browser","version":"$1"},{"regex":"ybrowser/(?:(\\d+[\\.\\d]+))?","name":"Yahoo! Japan Browser","version":"$1"},{"regex":"(?:(?:iPod|iPad|iPhone).+Version|MobileSafari)/(\\d+[\\.\\d]+)","name":"Mobile Safari","version":"$1","engine":{"default":"WebKit"}},{"regex":"(?:Version/(\\d+[\\.\\d]+).*)?Mobile.*Safari/","name":"Mobile Safari","version":"$1","engine":{"default":"WebKit"}},{"regex":"(?:iPod|iPhone|iPad)","name":"Mobile Safari","version":"","engine":{"default":"WebKit"}},{"regex":"Version/(\\d+[\\.\\d]+).*Safari/|Safari/\\d+","name":"Safari","version":"$1","engine":{"default":"WebKit"}}];

const variable_replacement = (template, variables) => {
    const regex = new RegExp(`\\$\\d`, "g");
    if (template === null)
        return "";
    return template.replace(regex, (match) => {
        const index = parseInt(match.substr(1), 10);
        const variable = variables[index - 1];
        return variable || "";
    });
}

const getRegexInstance = (rawRegex) => {
    const regexInstance = RegExp(`(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${rawRegex})`, "i");
    return regexInstance;
};

const uaParser = (rawRegex, userAgent) => {
    try {
        const regexInstance = getRegexInstance(rawRegex);
        const match = regexInstance.exec(userAgent);
        return match ? match.slice(1) : null;
    }
    catch (_a) {
        return null;
    }
}

const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    for (const browser of browser_json) {
        const match = uaParser(browser.regex, ua);
        if (!match) continue;
        const isMobile = uaParser('(?:Mobile)', ua);
        const result = variable_replacement(browser.name, match);
        return result + (isMobile && !result.includes('Mobile') ? ' Mobile' : '');
    }
}

export function popupCenter({ url, title, w, h }) {
    const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
    const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
    const left = (width - w) / 2
    const top = (height - h) / 2
    const browser_info = getBrowserInfo()
    if(browser_info.includes('Safari')) {
        window.location.href = url
    } else {
        const newWindow = window.open(url, title,
            `
              scrollbars=yes,
              resizable=no
              width=${w}, 
              height=${h}, 
              top=${top}, 
              left=${left}
              `
        )
        if (window.focus) newWindow.focus();
        return newWindow;
    }
}