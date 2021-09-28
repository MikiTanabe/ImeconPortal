#!/bin/sh

#node_modulesインストール
echo "npm install"
npm install

#いらないものアンインストールしてみる
#echo "npm uninstall -g vue-cli"
#npm uninstall -g vue-cli

#vue起動
echo "npm run serve"
npm run serve

#メモ出力
echo "localhost:18082"
