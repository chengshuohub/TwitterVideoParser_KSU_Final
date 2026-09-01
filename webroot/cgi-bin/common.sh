#!/system/bin/sh

urldecode() {
    printf '%s' "$1" | sed 's/+/ /g;s/%/\\x/g' | while IFS= read -r line
    do
        printf '%b' "$line"
    done
}

json_escape() {
    printf '%s' "$1" | sed 's/\\/\\\\/g;s/"/\\"/g'
}
