#!/bin/bash
if test -z "$MONGODB_PASSWORD"; then
    echo "MONGODB_PASSWORD not defined"
    exit 1
fi

auth="-u user -p $MONGODB_PASSWORD"

# MONGODB USER CREATION
(
echo "setup mongodb auth"
create_user="if (!db.getUser('user')) { db.createUser({ user: 'user', pwd: '$MONGODB_PASSWORD', roles: [ {role:'readWrite', db:'professional-profile'} ]}) }"
until mongo professional-profile --eval "$create_user" || mongo professional-profile $auth --eval "$create_user"; do sleep 5; done
) &

# INIT DUMP EXECUTION
(
if test -n "$INIT_DUMP"; then
    echo "execute dump file"
	until mongo lc $auth $INIT_DUMP; do sleep 5; done
fi
) &

echo "start mongodb without auth"
chown -R mongodb /data/db
gosu mongodb mongod --bind_ip_all "$@"

echo "restarting with auth on"
sleep 5
exec gosu mongodb mongod --bind_ip_all --auth "$@"