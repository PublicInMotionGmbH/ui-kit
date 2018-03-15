FROM nginx:1.13.9-alpine

RUN apk add --update nodejs nodejs-npm

COPY . /app/code/
WORKDIR /app/code/

RUN npm run init && \
    rm -rf /usr/share/nginx/html && \
    npm run build-storybook -- -o /usr/share/nginx/html && \
    rm -rf /app/code
