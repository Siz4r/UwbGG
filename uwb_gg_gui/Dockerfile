FROM node:14.17.0-alpine as builder

ENV NODE_OPTIONS --max_old_space_size=8192
ENV GENERATE_SOURCEMAP false
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production
WORKDIR /uwb_gg_gui/

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY docker/fix_gui.sh /usr/
COPY --from=builder /uwb_gg_gui/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD bash -c /usr/fix_gui.sh
ENTRYPOINT ["nginx", "-g", "daemon off;"]