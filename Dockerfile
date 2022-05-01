FROM nginx:1.21 as base


FROM node:16.15 AS publish
WORKDIR /src-node

COPY ["Web2-Traveler/package*.json", "Web2-Traveler/"]
RUN cd /src-node/Web2-Traveler && npm install --legacy-peer-deps									#cache point
WORKDIR /src-node
COPY ./Web2-Traveler ./Web2-Traveler
RUN cd /src-node/Web2-Traveler && npm run build

RUN rm -rf /src-node/Web2-Traveler/build/config


FROM base AS final
COPY --from=publish /src-node/Web2-Traveler/build /usr/share/nginx/html
COPY ./custom-params/applocations.conf /etc/nginx/conf.d/applocations.conf
