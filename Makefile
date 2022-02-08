dev:
	NODE_ENV=development webpack-dev-server --config=webpack.config.ts --port=8000 --compress --open --history-api-fallback

build:
	NODE_ENV=production webpack --config=webpack.config.ts
	npx ts-node scripts/index.ts

watch:
	tsc --watch
