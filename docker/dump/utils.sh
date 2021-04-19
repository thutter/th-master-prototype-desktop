#!/usr/bin/env bash
set -e

# get script dir
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

db_container="strapi_db"

##################
# create db dump #
##################
db-dump() {
  echo "Dumping strapi database"
  docker exec -e PGPASSWORD=strapi $db_container bash -c "pg_dump -U strapi -h postgres -Fc -c strapi > /tmp/psql.dump"
  docker cp $db_container:/tmp/psql.dump "$dir"/psql.dump
  docker exec $db_container rm /tmp/psql.dump
}

################
# load db dump #
################
db-load() {
  docker cp $dir/psql.dump $db_container:/tmp/psql.dump
  docker exec -e PGPASSWORD=strapi $db_container bash -c "pg_restore -U strapi -h postgres -d strapi -c /tmp/psql.dump"
  docker exec $db_container rm /tmp/psql.dump
}

####################
# actual execution #
####################
if [ -z "$1" ]; then
  echo "No argument supplied, execution stopped."
  exit 1
fi

case $1 in
"db-dump") db-dump ;;
"db-load") db-load ;;
esac
