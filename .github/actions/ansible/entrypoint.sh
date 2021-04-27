#!/bin/sh
echo "Ansible Entrypoint"

echo "ansible_ssh_pass=$SSH_PASSWORD" >> /hosts
echo "ansible_become_pass=$SSH_PASSWORD" >> /hosts

echo "Entering the ansible using ansible-playbook"

ansible-playbook ansible/playbook.yml --user ubuntu