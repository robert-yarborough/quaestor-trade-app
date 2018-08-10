const $ = window.jQuery;
const desktopN = 1616;
const desktopNM = 1224;
const tabletNL = 1024;
const tabletN = 768;
const mobileMNBT = 576;
const mobileMN = 544;
const devicesMQ = {
    touch: (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),
    desktopN,
    desktopNM,
    tabletNL,
    tabletN,
    mobileMNBT,
    mobileMN,
    mqBaseTxt: 'only screen and ',
    desktopMQ: `only screen and (min-width: ${desktopN}px)`,
    desktopMMQ: `only screen and (min-width: ${desktopNM}px)`,
    tabletMLQ: `only screen and (max-width: ${tabletNL - 1}px)`,
    tabletMQ: `only screen and (min-width: ${tabletN}px) and (max-width: ${desktopN - 1}px)`,
    mobileMQ: `only screen and (max-width: ${tabletN - 1}px)`,
    mobileMBTQ: `only screen and (max-width: ${mobileMNBT - 1}px)`,
    mobileMMQ: `only screen and (max-width: ${mobileMN - 1}px)`,
    desktop: false,
    desktopM: false,
    tabletL: false,
    tablet: false,
    mobile: false,
    mobileM: false,
    mobileMBT: false,
};

window.devicesMQ = devicesMQ;

const $w = $(window);
$(document.documentElement).addClass(`${(devicesMQ.touch ? '' : 'no-')}touch`);

const addMediaQueryListener = (query, callback) => {
    const host = {};
    const res = window.matchMedia(query);

    callback.apply(host, [res.matches, res.media]);
    res.addListener((changed) => {
        callback.apply(host, [changed.matches, changed.media]);
    });
};
window.addMediaQueryListener = addMediaQueryListener;

const mq = addMediaQueryListener;

const addMqTriggers = () => {
    // desktop
    addMediaQueryListener(
        devicesMQ.desktopMQ,
        (match) => {
            devicesMQ.desktop = match;
            $w.trigger('desktop.mq', [match]);
        },
    );
    // desktop less
    addMediaQueryListener(
        devicesMQ.desktopMMQ,
        (match) => {
            devicesMQ.desktopM = match;
            $w.trigger('desktopM.mq', [match]);
        },
    );
    // tablet large
    addMediaQueryListener(
        devicesMQ.tabletMLQ,
        (match) => {
            devicesMQ.tabletL = match;
            $w.trigger('tabletL.mq', [match]);
        },
    );
    // tablet
    addMediaQueryListener(
        devicesMQ.tabletMQ,
        (match) => {
            devicesMQ.tablet = match;
            $w.trigger('tablet.mq', [match]);
        },
    );
    // mobile
    addMediaQueryListener(
        devicesMQ.mobileMQ,
        (match) => {
            devicesMQ.mobile = match;
            $w.trigger('mobile.mq', [match]);
        },
    );
    // mobile less for Bootstrap
    addMediaQueryListener(
        devicesMQ.mobileMBTQ,
        (match) => {
            devicesMQ.mobileMBT = match;
            $w.trigger('mobileMBT.mq', [match]);
        },
    );
    // mobile less
    addMediaQueryListener(
        devicesMQ.mobileMMQ,
        (match) => {
            devicesMQ.mobileM = match;
            $w.trigger('mobileM.mq', [match]);
        },
    );
};

export { $w, devicesMQ, mq, addMqTriggers };
