export const detect = {
  os: () => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.indexOf(platform) !== -1) {
      return 'macOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      return 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      return 'Windows';
    } else if (/Android/.test(userAgent)) {
      return 'Android';
    } else if (/Linux/.test(platform)) {
      return 'Linux';
    }

    return 'Unknown';
  },

  browser: () => {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (ua.indexOf("Chrome") > -1) {
      browserName = "Chrome";
    } else if (ua.indexOf("Safari") > -1) {
      browserName = "Safari";
    } else if (ua.indexOf("Firefox") > -1) {
      browserName = "Firefox";
    } else if (ua.indexOf("Edge") > -1) {
      browserName = "Edge";
    }

    const match = ua.match(new RegExp(`${browserName}\\/([0-9.]+)`));
    if (match) browserVersion = match[1];

    return { name: browserName, version: browserVersion };
  }
};