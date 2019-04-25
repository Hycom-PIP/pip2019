#!/bin/bash
#Compiling and testing maven projects
BUILD_ID=dontKillMe
#DISCOVERY START
mvn -f ./discovery/pom.xml package
kill -9 $(lsof -i:8082 -t)
java -jar ./discovery/target/*.jar &
iteration=3
IsDiscoveryRunning=$(wget --server-response localhost:8082/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
while [ $IsDiscoveryRunning -eq 0 -a $iteration -ge 0 ] ; do
echo "Waiting 3 seconds for discovery service to start"
sleep 3
((iteration--))
IsDiscoveryRunning=$(wget --server-response localhost:8082/actuator/health 2>&1| grep -c 'HTTP/1.1 200')
done
if [ $iteration -ge 0 ] ; then
echo "Discovery service is up"
exit 0
else
echo "Discovery service failed to start"
exit 1
fi
#DISCOVERY END