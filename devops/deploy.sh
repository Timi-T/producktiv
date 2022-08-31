#!/bin/bash

#=========Create infrastructure with terraform=========#
#OUTPUT='public_ip = "20.583.578.489"'

echo "Applying terrraform manifest..."
OUTPUT=$(terraform apply --auto-approve | grep public_ip)
echo "Done...1"
sleep 1

echo "Getting IP address"
IFS='"'
read -ra arr <<< "$OUTPUT"
IP_ADDR=${arr[1]}
echo "Done...2"
sleep 1

SERVER_BLOCK=$(cat /etc/ansible/hosts | grep producktivServer)
IP_EXISTS=$(cat /etc/ansible/hosts | grep ${IP_ADDR})

echo "Exporting IP address to ansible host file"
if [ -z "$SERVER_BLOCK" ]
then
    echo '[producktivServer]' | sudo tee -a /etc/ansible/hosts
fi

if [ -z "$IP_EXISTS" ]
then
    echo 'ubuntu@'$IP_ADDR | sudo tee -a /etc/ansible/hosts
fi
echo "Done...3"
sleep 1

#=========Provision infrastructure using ansible=========#

echo "Provisioning infrastructure using ansible"
ansible-playbook provision.yml
echo "Done...4"
sleep 1
