import config from 'config';

export default function* () {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
    let clientId = config.clientId;
    let v;
    for (v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            clientId = config.mobileClientId;
            break;
        }
    }
    if(window.screen.width>=768){
        clientId = config.clientId;
    }
    return clientId;
}
