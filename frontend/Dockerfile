FROM node:14-slim

WORKDIR user/src/app

COPY ./package.json ./

RUN npm install
RUN npm install react-router-dom
RUN npm i @cloudinary/url-gen @cloudinary/react

COPY . .

EXPOSE 3000

CMD ["npm", "start"]