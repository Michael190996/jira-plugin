FROM node:9

ADD . /workspace
WORKDIR /workspace

RUN npm i

EXPOSE 8000

CMD npm run start