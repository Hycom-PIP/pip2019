#!/bin/bash
#Compiling and testing maven projects
BUILD_ID=dontKillMe
#CONFIG START
mvn -f ./config/pom.xml package
kill -9 $(lsof -i:8081 -t)
java -jar ./config/target/*.jar &
iteration=3
IsDiscoveryRunning=$(wget --server-response localhost:8081/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
while [ $IsDiscoveryRunning -eq 0 -a $iteration -ge 0 ] ; do
echo "Waiting 3 seconds for config service to start"
sleep 3
((iteration--))
IsDiscoveryRunning=$(wget --server-response localhost:8081/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
done
if [ $iteration -ge 0 ] ; then
echo "Config service is up"
exit 0
else
echo "Config service failed to start"
exit 1
fi
#CONFIG END