node ./scripts/generate-orm-config.js
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:drop
