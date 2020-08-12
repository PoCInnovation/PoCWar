#!/bin/env

docker run --name pocwar-db		\
	-e POSTGRES_PASSWORD=postgres 	\
	-e POSTGRES_USER=postgres     	\
	-p 5432:5432			\
	-d postgres			\
