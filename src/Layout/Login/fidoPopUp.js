export function popupCenter ({ url, title, w, h }) {
    const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
    const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
    const left = (width - w) / 2
    const top = (height - h) / 2
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
}