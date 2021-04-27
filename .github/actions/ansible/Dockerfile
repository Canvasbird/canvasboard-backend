FROM alpine 

ENV ANSIBLE_HOST_KEY_CHECKING=False

RUN apk add ansible gcc python3-dev libc-dev libffi-dev openssl-dev
RUN apk add python3 py3-pip openssh-client sshpass
RUN pip3 install --upgrade paramiko
RUN pip3 install docker

COPY hosts /hosts

COPY ansible.cfg /etc/ansible/ansible.cfg

COPY entrypoint.sh /entrypoint.sh

CMD ["sh", "/entrypoint.sh"]