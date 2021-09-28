#イメージの作成とコンテナ起動
#alias bouquet-pj="docker-compose up --build bouquet"

#コンテナ内のshファイルを起動
#alias vue-exec="docker exec -it vuecli3 sh"

#dockerコンテナを外部アクセステスト状態で起動
#alias vue-dev-run="docker run -t -p 9000:18081 -d --rm vuecli:1"

#外部アクセステスト状態コンテナでshファイルを起動
#alias vue-dev-exec="docker exec -it wonderful_burnell sh"

#bouquetコンテナ内のshファイルを起動
#alias bouquet-exec="docker run -it bouquet sh"

#imeconportal内のbouquetコンテナのshファイルを起動
alias bouquet-exec="docker exec -it bouquet /bin/sh"

