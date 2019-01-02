include .env

.PHONY: up down stop prune ps shell drush logs

default: up

DRUPAL_ROOT ?= $(PROJECT_ROOT)

up:
	@echo "Starting up containers for $(PROJECT_NAME)..."
	docker-compose pull --parallel
	docker-compose up -d --remove-orphans

down: stop

stop:
	@echo "Stopping containers for $(PROJECT_NAME)..."
	@docker-compose stop

prune:
	@echo "Removing containers for $(PROJECT_NAME)..."
	@docker-compose down -v

ps:
	@docker ps --filter name='$(PROJECT_NAME)*'

shell:
	docker exec -ti -e COLUMNS=$(shell tput cols) -e LINES=$(shell tput lines) $(shell docker ps --filter name='$(PROJECT_NAME)_php' --format "{{ .ID }}") sh

logs:
	@docker-compose logs -f $(filter-out $@,$(MAKECMDGOALS))