TEMP_DIR=.vault

if [ -f $TEMP_DIR/pid ]; then
        kill -TERM $(cat $TEMP_DIR/pid) || true
fi
