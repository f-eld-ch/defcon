#!/bin/bash
VERSION=$1
CURRENT_DIR=`basename $PWD`
BUILD_DIR=../$CURRENT_DIR-build
DOCKER_TAG=nimdanitro/defcon

rm -rf $BUILD_DIR

echo "Building to $BUILD_DIR"
meteor build --architecture=os.linux.x86_64 --directory $BUILD_DIR

cp package.json $BUILD_DIR/bundle/
cp Dockerfile $BUILD_DIR/bundle/
cp .dockerignore $BUILD_DIR/bundle/
cd $BUILD_DIR/bundle/

echo "Building Dockerfile..."
docker build -t ${DOCKER_TAG}:${VERSION} .
gcloud docker ${DOCKER_TAG}:${VERSION}
kubectl rolling-update ${CURRENT_DIR} --update-period=15s --image=${DOCKER_TAG}:${VERSION}
