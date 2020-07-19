#!/bin/bash

declare -a images=(
	"c_app"
	"javascript_app"
	"python_app"
)

for image in "${images[@]}"
do
	(cd "$image" && docker build . -t $image)
done
