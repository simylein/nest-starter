echo enter name of new migration
read name
node ./scripts/generate-orm-config.js
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -n $name
