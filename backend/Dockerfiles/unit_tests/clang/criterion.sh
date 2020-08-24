#!/usr/bin/env bash

URL="https://github.com/Snaipe/Criterion/releases/download/v2.3.3"
TARBALL="criterion-v2.3.3-linux-x86_64.tar.bz2"
DIR="criterion-v2.3.3"
DST="/usr/local/"

cd /tmp
rm -f $TARBALL
rm -fr $DIR

wget --quiet $URL/$TARBALL

tar xjf $TARBALL

cp -r $DIR/include/* $DST/include/
cp -r $DIR/lib/* $DST/lib/
ldconfig
