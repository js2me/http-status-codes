clean:
	rm -rf node_modules
install:
	pnpm i
reinstall:
	make clean
	make install
dev:
	make reinstall
	pnpm dev
preview:
	make reinstall
	pnpm build:preview
	pnpm preview