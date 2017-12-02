FROM lambci/lambda:build-nodejs6.10

RUN mkdir -p "/root/.ssh"
ADD /docker/keys/* "/root/.ssh/"
RUN echo "IdentityFile ~/.ssh/ve-build" >> /root/.ssh/config
RUN chmod 0600 /root/.ssh/*
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

ENV PATH="/var/task/node_modules/.bin:${PATH}"
