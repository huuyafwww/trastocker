# @trastocker/app-proxy-server

ローカル環境用のリバースプロキシサーバー。
フロントエンドとバックエンドのoriginを統一させるために必要。
それぞれの待受ポート違いでcross originとなるので、
リバースプロキシによって同一ポートにてリクエストを受け付けてcross originを解消している。
