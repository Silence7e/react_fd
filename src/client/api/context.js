export function createSMSContext({cid, mobile, code, id}) {
    return {
        'X-SMS': `cid=${cid}&mobile=${mobile}&smscode=${code}&smscodeid=${id}`
    };
}

export function createPasswordContext({cid, uid, nonce, ts, hash}) {
    return {
        'X-PASSWORD': `cid=${cid}&uid=${uid}&nonce=${nonce}&ts=${ts}&hash=${hash}`
    };
}

export function createTokenContext({cid, uid, tid, nonce, ts, hash}) {
    return {
        'Authorization': `cid=${cid}&uid=${uid}&tid=${tid}&nonce=${nonce}&ts=${ts}&hash=${hash}`
    };
}

export function createCaptchaContext({cid, capid, answer}) {
    return {
        'X-CAPTCHA': `cid=${cid}&capid=${capid}&capanswer=${answer}`
    };
}

export function createAdminContext({hash}) {
    return {
        'Authorization': hash
    };
}

export default {
    createSMSContext,
    createPasswordContext,
    createTokenContext,
    createCaptchaContext,
    createAdminContext
}
