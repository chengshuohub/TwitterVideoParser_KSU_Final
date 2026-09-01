
const PARSER =
    "https://savetwitter.net/zh-cn3";

const $ =
    id => document.getElementById(id);


function status(text) {

    $("status").textContent = text;

}


async function execRoot(command) {

    try {

        if (
            window.kernelsu &&
            typeof window.kernelsu.exec ===
            "function"
        ) {

            return await
                window.kernelsu.exec(command);

        }

        if (
            window.ksu &&
            typeof window.ksu.exec ===
            "function"
        ) {

            return await
                window.ksu.exec(command);

        }

        return {
            errno: 1,
            stdout: "",
            stderr:
            "KernelSU API unavailable"
        };

    } catch (e) {

        return {
            errno: 1,
            stdout: "",
            stderr:
            String(e)
        };

    }

}


function validUrl(url) {

    return /^https?:\/\/(x\.com|twitter\.com)\/.+\/status\/[0-9]+/i
        .test(url);

}


$("paste").onclick =
async function () {

    status("正在读取剪贴板...");

    const r =
        await execRoot(
            "cmd clipboard get text 2>/dev/null"
        );

    const text =
        (r.stdout || "").trim();

    if (!text) {

        status("剪贴板为空");

        return;

    }

    $("url").value = text;

    if (validUrl(text)) {

        status(
            "已获取有效 X/Twitter 链接"
        );

    } else {

        status(
            "已粘贴，但链接格式可能不正确"
        );

    }

};


$("parse").onclick =
function () {

    const url =
        $("url").value.trim();

    if (!validUrl(url)) {

        status(
            "请输入有效的 X/Twitter 状态链接"
        );

        return;

    }

    localStorage.setItem(
        "twitter_url",
        url
    );

    status(
        "链接有效，打开解析页面..."
    );

    window.open(
        PARSER,
        "_blank"
    );

};


$("open").onclick =
function () {

    window.open(
        PARSER,
        "_blank"
    );

};


(async function () {

    const old =
        localStorage.getItem(
            "twitter_url"
        );

    if (old) {

        $("url").value = old;

    }

    const r =
        await execRoot(
            "getprop ro.product.model"
        );

    $("device").textContent =
        (r.stdout || "").trim()
        ||
        "KernelSU";

})();

