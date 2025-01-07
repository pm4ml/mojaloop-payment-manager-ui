.PHONY: build run

NAME = mojaloop-payment-manager-ui

default: build

build:
	docker build -t $(NAME) API_BASE_URL=${API_BASE_URL}.

run:
	docker run --rm -p 8083:8083 --name $(NAME) $(NAME) 

# Makefile

# Docker build
# build:
#     docker build --build-arg API_BASE_URL=http://backend-url:3000 -t mojaloop-payment-manager-ui .

# Docker run (bind to port 8081)
# run:
#     docker run --rm -p 8081:8080 mojaloop-payment-manager-ui