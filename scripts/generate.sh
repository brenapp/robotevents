curl -o robotevents.yaml https://www.robotevents.com/api/v2/swagger.yml
npx openapi-typescript ./robotevents.yaml --output ../src/generated/robotevents.ts --export-type