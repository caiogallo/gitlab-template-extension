.PHONY: release

PROJECT_NAME = $(notdir $(PWD))
export PROJECT_NAME

release:
	mkdir -p release
	zip -r -FS release/$(PROJECT_NAME).zip * --exclude '*.git'
