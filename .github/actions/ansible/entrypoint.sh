#!/bin/sh
echo "Ansible Entrypoint"

echo "ansible_ssh_pass=goli" >> /hosts
echo "ansible_become_pass=goli" >> /hosts

echo "Entering the ansible using ansible-playbook"

ansible-playbook ansible/playbook.yml --user ubuntu