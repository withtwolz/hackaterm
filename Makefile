.PHONY: up down build install clean help

help:  # Default target
	@echo "Available commands:"
	@echo "  make up      - Start development server"
	@echo "  make build   - Build for production"
	@echo "  make install - Install dependencies"
	@echo "  make clean   - Clean node_modules and reinstall"
	@echo "  make preview - Preview production build"

up:  # Start development server
	npm run dev

build:  # Build for production
	npm run build

preview:  # Preview production build
	npm run preview

install:  # Install dependencies
	npm install

clean:  # Clean and reinstall
	rm -rf node_modules
	rm -rf dist
	npm install