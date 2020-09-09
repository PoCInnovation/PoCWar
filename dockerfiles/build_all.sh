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

cd "$(git rev-parse --show-toplevel)/dockerfiles/"

for image in "${images[@]}"
do
	docker build -f "$image.Dockerfile" . -t $image
done
