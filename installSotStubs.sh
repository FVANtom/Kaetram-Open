#!/bin/sh
cd ./packages/
cd ./client/extensions/ && unlink ./sot || true && cp -R ./sot-stub ./sot
cd ../../server/extensions/ && unlink ./sot || true && cp -R ./sot-stub ./sot
cd ../../common/extensions/ && unlink ./sot || true && cp -R ./sot-stub ./sot
cd ../../tools/extensions/ && unlink ./sot || true && cp -R ./sot-stub ./sot
cd ../../e2e/cypress/e2e/extensions/ && unlink ./sot || true && cp -R ./sot-stub ./sot
cd ../../../
