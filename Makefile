dev:
	NODE_ENV=development webpack-dev-server --config=webpack.config.ts --port=8000 --compress --open --history-api-fallback

build:
	rm -rf public/
	NODE_ENV=production webpack --config=webpack.config.ts
	pnpx ts-node scripts/index.ts

watch:
	tsc --watch

deploy-gh-pages:
	pnpx gh-pages -d public
