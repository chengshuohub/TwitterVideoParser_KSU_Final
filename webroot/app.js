const API = "http://127.0.0.1:17890";
const CONTROL = "http://127.0.0.1:17891";

const $ = id => document.getElementById(id);

function msg(t) {
    $("message").textContent = t;
}

async function checkStatus() {

    try {

        const r = await fetch(
            CONTROL + "/cgi-bin/status",
            {
                cache: "no-store"
            }
        );

        const d = await r.json();

        if (d.running === true) {

            $("dot").className = "dot green";
            $("status").textContent = "后端运行中";

            $("startBtn").style.display = "none";
            $("stopBtn").style.display = "";

        } else {

            $("dot").className = "dot red";
            $("status").textContent = "后端已停止";

            $("startBtn").style.display = "";
            $("stopBtn").style.display = "none";
        }

    } catch(e) {

        $("dot").className = "dot red";
        $("status").textContent = "控制服务异常";

        $("startBtn").style.display = "";
        $("stopBtn").style.display = "none";
    }
}

async function startServer() {

    msg("正在启动解析服务...");

    try {

        const r = await fetch(
            CONTROL + "/cgi-bin/start",
            {
                cache: "no-store"
            }
        );

        const d = await r.json();

        msg(d.message || "启动完成");

        setTimeout(checkStatus, 800);

    } catch(e) {

        msg("无法连接控制服务");

    }
}

async function stopServer() {

    msg("正在停止解析服务...");

    try {

        const r = await fetch(
            CONTROL + "/cgi-bin/stop",
            {
                cache: "no-store"
            }
        );

        const d = await r.json();

        msg(d.message || "停止完成");

        setTimeout(checkStatus, 1000);

    } catch(e) {

        msg("停止请求失败");

    }
}

async function parseVideo() {

    const url = $("url").value.trim();

    if (!url) {
        msg("请输入 X / Twitter 链接");
        return;
    }

    if (!/(twitter\.com|x\.com)\/.+\/status\/\d+/i.test(url)) {
        msg("请输入有效的 X / Twitter 链接");
        return;
    }

    msg("正在解析...");
    $("results").innerHTML = "";

    try {

        const r = await fetch(
            API + "/cgi-bin/parse",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },
                body:
                    "url=" +
                    encodeURIComponent(url)
            }
        );

        const d = await r.json();

        if (!d.success) {
            msg(d.error || "解析失败");
            return;
        }

        if (!d.videos || !d.videos.length) {
            msg("没有找到视频");
            return;
        }

        d.videos.sort((a,b) =>
            (b.width * b.height) -
            (a.width * a.height)
        );

        msg("发现 " + d.videos.length + " 个视频版本");

        d.videos.forEach(v => {

            const box =
                document.createElement("div");

            box.className = "video";

            const q =
                document.createElement("div");

            q.className = "quality";
            q.textContent =
                v.quality || "未知";

            const dim =
                document.createElement("div");

            dim.className = "dimension";
            dim.textContent =
                v.width + " × " + v.height;

            const btn =
                document.createElement("button");

            btn.className = "download";
            btn.textContent =
                "下载 " +
                (v.quality || "");

            btn.onclick = () =>
                downloadVideo(v.url, v.quality);

            box.appendChild(q);
            box.appendChild(dim);
            box.appendChild(btn);

            $("results").appendChild(box);
        });

    } catch(e) {

        msg("无法连接解析后端");
        checkStatus();

    }
}

async function downloadVideo(url, quality) {

    msg("正在下载 " + (quality || "") + "...");

    try {

        const r = await fetch(
            API + "/cgi-bin/download",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },
                body:
                    "url=" +
                    encodeURIComponent(url) +
                    "&quality=" +
                    encodeURIComponent(quality || "")
            }
        );

        const d = await r.json();

        if (d.success) {

            msg(
                "下载完成：" +
                d.file
            );

        } else {

            msg(
                d.error ||
                "下载失败"
            );
        }

    } catch(e) {

        msg("下载请求失败");

    }
}

checkStatus();

setInterval(
    checkStatus,
    3000
);
