export default async function ({content}) {
    return new Promise((resolve,reject)=>{
        const fakeElem = document.createElement("textarea");
        fakeElem.style.position = "absolute",
          fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px",
          fakeElem.setAttribute("readonly", ""),
          fakeElem.value = content;
        document.body.appendChild(fakeElem);
        fakeElem.select();
        try {
            document.execCommand('copy');
        } catch (e) {
            reject({hasCopied:false});
        }
        document.body.removeChild(fakeElem);
        resolve({hasCopied:true, time:Date.now()});
    });
}
