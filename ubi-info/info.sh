#!/bin/bash

echo '--- OS release'
cat /etc/os-release

echo '--- Host name:'
cat /proc/sys/kernel/hostname
echo
echo '--- Free memory'
grep '^Mem' /proc/meminfo
echo
echo '--- Mounted file systems (partial)'
df -h

echo '--- netstat and ip infos'
netstat -tulnp && ip a

echo '--- system env'
env

echo '---'
while true
do
  echo 'sleeping for 5 sec'
  sleep 5
done