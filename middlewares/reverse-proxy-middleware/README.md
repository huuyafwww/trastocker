# @trastocker/reverse-proxy-middleware

ローカル環境用のリバースプロキシサーバー。
フロントエンドとバックエンドのoriginを統一させるために必要。
それぞれの待受ポート違いでcross originとなるので、
リバースプロキシによって同一ポートにてリクエストを受け付けてcross originを解消している。

80番のwell known portを使っているため、
起動時に管理者権限を求められるが、
別ポートでも問題は無い。
