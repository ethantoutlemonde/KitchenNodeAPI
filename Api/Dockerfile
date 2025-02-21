FROM node:20-alpine AS tsc-builder
WORKDIR /workspace

COPY package.json package-lock.json /workspace/
RUN npm ci

COPY . /workspace/
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /workspace

COPY package.json package-lock.json /workspace/
RUN npm ci --omit=dev

COPY --from=tsc-builder /workspace/dist /workspace/dist


ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
