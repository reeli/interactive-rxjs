dev:
	NODE_ENV=development webpack-dev-server --config=webpack.config.ts --port=8000 --compress --open --history-api-fallback

test:
	jest

build:
	webpack --config=webpack.config.ts

watch:
	tsc --watch

doc:
	typedoc
	ts-node scripts/doc.ts
