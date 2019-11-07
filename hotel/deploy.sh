
NAME=hotel
PORT=9090
INTERNAL_PORT=9090

SHELL_DIR=$(dirname "$BASH_SOURCE")
APP_DIR=$(cd $SHELL_DIR; pwd)

cd $APP_DIR
mvn clean package

if [ "$(sudo docker ps -aq -f name=$NAME)" ]; then
	# stop and run
	sudo docker stop $NAME && sudo docker rm $NAME && sudo docker run --name $NAME -d -p $PORT:$INTERNAL_PORT -v $APP_DIR/target:/opt:z openjdk /bin/sh -c "java -jar /opt/app.jar"
else
	# run
	sudo docker run --name $NAME -d -p $PORT:$INTERNAL_PORT -v $APP_DIR/target:/opt openjdk /bin/sh -c "java -jar /opt/app.jar"
fi