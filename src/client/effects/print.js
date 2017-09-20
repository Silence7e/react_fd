export default async function (content) {
    return new Promise((resolve) => {
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        document.body.appendChild(frame);

        frame.onload = function() {
            this.contentWindow.focus();
            this.contentWindow.print();

            document.body.removeChild(frame);
            resolve();
        };

        if (content.startsWith('http://') || content.startsWith('https://')) {
            frame.src = content;
        } else {
            frame.contentWindow.contents = content;
            frame.src = 'javascript:window["contents"]';
        }
    });
}
