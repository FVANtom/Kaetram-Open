#!/bin/sh
cd ./packages/
cd ./client/extensions/ && ln -s ./sot-stub ./sot
cd ../server/extensions/ && ln -s ./sot-stub ./sot
cd ../common/extensions/ && ln -s ./sot-stub ./sot
