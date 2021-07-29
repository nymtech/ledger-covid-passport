#!/usr/bin/env sh

[ ! -d "dist" ] && mkdir dist || rm -rf dist/*

npm run build --workspace=packages/docs
npm run build --workspace=packages/ledger-mobile-app

mv packages/docs/build dist/docs
mv ledger-mobile-app/dist dist/ledger-mobile-app