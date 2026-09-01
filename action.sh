#!/system/bin/sh

MOD="/data/adb/modules/twitter_video_parser"
BB="/data/adb/ksu/bin/busybox"

PORT=17890
WEB="$MOD/webroot"

get_pid() {
    "$BB" netstat -lntp 2>/dev/null |
        grep ":$PORT " |
        sed -n 's/.*LISTEN[[:space:]]*\([0-9][0-9]*\)\/.*/\1/p' |
        head -1
}

PID="$(get_pid)"

if [ -n "$PID" ]; then

    kill -9 "$PID" 2>/dev/null
    sleep 1

    PID="$(get_pid)"

    if [ -z "$PID" ]; then
        echo "================================"
        echo " TwitterVideoParser"
        echo " 解析服务已停止"
        echo " 端口: 17890"
        echo "================================"
    else
        echo "停止失败：17890 仍在运行"
    fi

    exit 0
fi

"$BB" httpd \
    -f \
    -p "127.0.0.1:$PORT" \
    -h "$WEB" \
    >>"$MOD/server.log" 2>&1 &

sleep 1

PID="$(get_pid)"

if [ -n "$PID" ]; then

    echo "================================"
    echo " TwitterVideoParser"
    echo " 解析服务已启动"
    echo " PID: $PID"
    echo " 端口: 17890"
    echo "================================"

else

    echo "================================"
    echo " 解析服务启动失败"
    echo "================================"

fi
