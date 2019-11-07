NAME=html
PORT=8090
INTERNAL_PORT=80

SHELL_DIR=$(dirname "$BASH_SOURCE")
APP_DIR=$(cd $SHELL_DIR; pwd)

cd $APP_DIR

if [ "$(sudo docker ps -aq -f name=$NAME)" ]; then
	# stop and run
	sudo docker stop $NAME && sudo docker rm $NAME && sudo docker run --name $NAME -d -p $PORT:$INTERNAL_PORT -v $APP_DIR/web:/usr/share/nginx/html:z nginx
else
	# run
	sudo docker run --name $NAME -d -p $PORT:$INTERNAL_PORT -v $APP_DIR/web:/usr/share/nginx/html nginx
fi