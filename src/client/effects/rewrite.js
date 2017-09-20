export default async function (content) {
    return new Promise((resolve) => {
        document.open();
        document.write(content);
        document.close();
        resolve();
    });
}
