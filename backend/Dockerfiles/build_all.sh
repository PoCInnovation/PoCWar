#!/bin/bash

declare -a images=(
	"c_app"
	"cpp_app"
    "go_app"
	"javascript_app"
	"python_app"
	"rust_app"
)

for image in "${images[@]}"
do
	(cd "$(git rev-parse --show-toplevel)/backend/Dockerfiles/$image" && docker build . -t $image)
done
