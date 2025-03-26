#!/bin/bash

echo '--- Host name:'
cat /proc/sys/kernel/hostname
echo
echo '--- Free memory'
grep '^Mem' /proc/meminfo
echo
echo '--- Mounted file systems (partial)'
df -h
bash -c "while true; do echo sleeping; sleep 5; done"