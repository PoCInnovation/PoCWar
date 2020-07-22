#!/bin/bash

declare -a images=(
	"c_app"
	"cpp_app"
    "go_app"
	"javascript_app"
	"python_app"
	"rust_app"
)

path="$(git rev-parse --show-toplevel)/backend/Dockerfiles/"

for image in "${images[@]}"
do
	(cd "$path$image" && docker build . -t $image)
done
