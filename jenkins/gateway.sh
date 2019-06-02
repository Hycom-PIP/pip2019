#!/bin/bash
#Compiling and testing maven projects
BUILD_ID=dontKillMe
#GATEWAY START
mvn -f ./gateway/pom.xml package
kill -9 $(lsof -i:8080 -t)
java -jar ./gateway/target/*.jar &
iteration=3
IsDiscoveryRunning=$(wget --server-response localhost:8080/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
for i in $(seq 1 $iteration); do
echo "Waiting 3 seconds for survey-service service to start"
if [ $IsDiscoveryRunning -eq 0 ] ; then
echo "Survey service is up"
exit 0
fi
sleep 3
IsDiscoveryRunning=$(wget --server-response localhost:8080/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
done
echo "Survey service failed to start"
exit 1
#GATEWAY END