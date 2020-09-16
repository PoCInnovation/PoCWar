#!/bin/bash

npm install && \
npm run prisma:migrate && \
if [ "$START_ENVIRONMENT" = "dev" ]; then npm run seed ; fi && \
npm run prisma:generate && \
npm run "$START_ENVIRONMENT"
