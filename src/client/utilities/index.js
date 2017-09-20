import base64url from 'base64-url';
import sjcl from 'sjcl';
import moment from 'moment';
import _ from 'lodash';
import numeral from 'numeral';

const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.';

export function randomString(length) {
    return _.join(_.sampleSize(charset, _.max([length, 1])), '');
}

export function generateKey(salt, password) {
    return base64url.escape(sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(salt + ' ' + password)));
}

export function generateSignature(nonce, ts, cid, uid, hash) {
    return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(nonce + ' ' + ts + ' ' + cid + ' ' + uid + ' ' + hash))
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}

export function generateTokenSignature(nonce, ts, cid, uid, tid, hash) {
    return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(nonce + ' ' + ts + ' ' + cid + ' ' + uid + ' ' + tid + ' ' + hash))
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}

export function generateTimestamp(sts, cts) {
    return moment(sts, 'X').add(moment().diff(moment(cts, 'X'), 's')).unix();
}

export function getLastChars(input, size) {
    return input.substring(input.length - size);
}

export function getScrollbarWidth() {
    let outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);
    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";
    // add innerdiv
    let inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    let widthWithScroll = inner.offsetWidth;
    // remove divs
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}

export function lastFourChar(input) {
    if (input) {
        let res = '';
        for (let i =0; i < input.length - 4; i++){
            res +='*';
        }
        res += input.substring(input.length - 4);
        return res;
    }
}

export function getLastFourChar(input) {
    if (input) {
        return input.substring(input.length - 4);
    }
}

export function maskMobileNumber(input) {
    if (input) {
        return input.substring(0,3)+"****"+input.substring(7,11);
    }
}

export function getRemainingTimeStrInHours(expirationTime) {
    let now = new Date().getTime();
    let diff = Math.floor((new Date(expirationTime).getTime() - now) / 1000);
    if (diff <= 0) {
        return "0小时0分0秒";
    }
    let time = '';
    let hours = Math.floor(diff / 3600);
    let minutes = Math.floor((diff - hours * 3600) / 60);
    let seconds = Math.floor(diff - hours * 3600 - minutes * 60);
    time = time + hours +'小时';
    time = time + minutes + '分';
    time = time + seconds + '秒 ';
    return time;
}

export const regExp = {
    mobile: /^(13|15|17|18|14)\d{9}$/,
    idNumber: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    bankCard: /^\d{10,25}$/,
    idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    currency: /^\$?[\d,]+(\.\d{1,2})?$/
};

export function durationStr(arg) {
    return `${arg.duration}${arg.durationUnit.code === 'M' ? '个' : ''}${arg.durationUnit.name}`;
}

export function percent(arg) {
    return `${numeral(arg * 100).format('0,0.00')}%`;
}
export function mul(a, b) {
    let c = 0,
        d = a.toString(),
        e = b.toString();
    if(d.split(".").length > 1){
        c += d.split(".")[1].length;
    }
    if(e.split(".").length > 1){
        c += e.split(".")[1].length;
    }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

export function add(a, b) {
    let c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
export function sub(num1, num2) {
    let baseNum, baseNum1, baseNum2;
    let precision;// 精度
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return parseFloat(((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision));
};
export function divNum(num1, num2) {
    let baseNum1 = 0, baseNum2 = 0;
    let baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
};

/*保留两位小数*/
export function toDecimal(x) {
    if((''+x).indexOf('.') === x.length-1){
        return x;
    }
    let f = parseFloat(x);
    if (isNaN(f)) {
        return '';
    }
    f = Math.round(x*100)/100;
    return f;
}
export default {
    randomString,
    generateKey,
    generateSignature,
    generateTokenSignature,
    generateTimestamp,
    getLastChars,
    getScrollbarWidth,
    lastFourChar,
    getLastFourChar,
    maskMobileNumber,
    getRemainingTimeStrInHours,
    regExp,
    durationStr,
    mul,
    add,
    sub,
    divNum,
    toDecimal
}
