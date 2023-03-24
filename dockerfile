FROM node:9

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . . 

EXPOSE 4060

CMD [ "npm", "start" ]