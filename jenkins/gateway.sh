#!/bin/bash
#Compiling and testing maven projects
BUILD_ID=dontKillMe
#GATEWAY START
mvn -f ./gateway/pom.xml package
kill -9 $(lsof -i:8080 -t)
java -jar ./gateway/target/*.jar &
iteration=3
IsDiscoveryRunning=$(wget --server-response localhost:8080/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
while [ $IsDiscoveryRunning -eq 0 -a $iteration -ge 0 ] ; do
echo "Waiting 3 seconds for gateway service to start"
sleep 3
((iteration--))
IsDiscoveryRunning=$(wget --server-response localhost:8080/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
done
if [ $iteration -ge 0 ] ; then
echo "Gateway service is up"
exit 0
else
echo "Gateway service failed to start"
exit 1
fi
#GATEWAY END