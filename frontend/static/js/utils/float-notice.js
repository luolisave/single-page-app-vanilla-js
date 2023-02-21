export function createFloatNotice(message, isSuccess = true) {
    const notice = document.createElement("div");
    notice.classList.add("float-notice");
    notice.innerText = message;
    if (isSuccess) {
        notice.classList.add("float-notice-success");
    } else {
        notice.classList.add("float-notice-fail");
    }
    document.body.appendChild(notice);
    setTimeout(() => {
        notice.classList.add("float-notice-hide");
        setTimeout(() => {
            notice.remove();
        }, 500);
    }, 4000);
}
