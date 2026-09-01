#!/system/bin/sh

MOD="/data/adb/modules/twitter_video_parser"
WEB="/data/adb/modules/twitter_video_parser/webroot"
BB="/data/adb/ksu/bin/busybox"
PIDFILE="/data/adb/modules/twitter_video_parser/server.pid"

sleep 3

mkdir -p "$WEB"

# 清理旧解析服务
if [ -f "$PIDFILE" ]; then
    PID="$(cat "$PIDFILE" 2>/dev/null)"
    [ -n "$PID" ] && kill -9 "$PID" 2>/dev/null
    rm -f "$PIDFILE"
fi

# 启动解析服务
"$BB" httpd     -f     -p "127.0.0.1:17890"     -h "$WEB"     >>"$MOD/server.log" 2>&1 &

PID=$!
echo "$PID" >"$PIDFILE"

# 启动控制/WebUI
"$BB" httpd     -f     -p "127.0.0.1:17891"     -h "$WEB"     >>"$MOD/control.log" 2>&1 &
