export default async function (url) {
    return new Promise((resolve)=>{
        window.open(url);
        resolve();
    });
}
