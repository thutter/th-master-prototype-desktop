.PHONY: help integration test db

help: ## this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: ## setup environment
	cd app && yarn

backend: ## start docker
	docker-compose -f ./docker/docker-compose.yml up -d

stop: ## stop
	docker-compose -f ./docker/docker-compose.yml down

logs: ## docker logs
	docker-compose -f ./docker/docker-compose.yml logs -f

db-dump: ## create psql dump
	./docker/dump/utils.sh db-dump

db-load: ## load psql dump
	./docker/dump/utils.sh db-load

dev: ## start gatsby dev environment
	cd app && gatsby develop

build-prod: ## build gatsby prod image
	cd app && gatsby build && docker build -t master/example-page .

serve-prod: ## serve gatsby prod image
	docker run --rm -p 80:80 master/example-page