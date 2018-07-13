FROM node:slim
LABEL maintainer="Collins <james.macharia@andela.com>"
RUN yarn global add express@4.16.2
RUN yarn global add morgan
WORKDIR /art-dashboard
COPY build  /art-dashboard
COPY server /art-dashboard
ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/
RUN chmod +x ./server
CMD ./server 3030
