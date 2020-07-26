#!/bin/bash

declare -a images=(
	"c_app"
	"cpp_app"
    "go_app"
	"javascript_app"
	"python_app"
	"ruby_app"
	"rust_app"
)

for image in "${images[@]}"
do
	docker rmi $image
done
