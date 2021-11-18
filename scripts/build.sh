#!/usr/bin/env sh

[ ! -d "dist" ] && mkdir dist || rm -rf dist/*

npm run build --workspace=packages/ledger-mobile-app

mv ledger-mobile-app/dist dist/ledger-mobile-app
