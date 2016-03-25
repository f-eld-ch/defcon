#!/bin/bash
DOCKER=$1
VERSION=$2
CURRENT_DIR=`basename $PWD`
BUILD_DIR=../$CURRENT_DIR-build

echo "=> Cleanup old $BUILD_DIR"
rm -rf $BUILD_DIR

echo "=> Building to $BUILD_DIR"
meteor build --architecture=os.linux.x86_64 --directory $BUILD_DIR


cp package.json $BUILD_DIR/bundle/
cp Dockerfile $BUILD_DIR/bundle/
cp .dockerignore $BUILD_DIR/bundle/
cd $BUILD_DIR/bundle/

echo "=> Building Dockercontainer..."
docker build -t ${DOCKER}:${VERSION} .
