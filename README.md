# tonari-site

[tonari](https://github.com/cxxxr/tonari-releases) の紹介ページ。字体は OS のもの（外部のフォントは読まない）。GitHub Pages で https://cxxxr.github.io/tonari-site/ に出る。

- `index.html`・`style.css`・`site.js` だけの静的なページ。ビルドは無い
- ダウンロードのボタンは、開いたときに tonari-releases の最新の Release から OS ごとのファイルの URL を引く（`site.js`）。引けないときは Releases のページへ
- `images/` の screenshot は tonari-releases の README と同じもの、choose-work は録画の再生の画面、og.png は OG 用（PIL で作った）。`video/` の動画は本物の回の録画を「録画を流す」で再生して録り、声を後から同じ声で付けたもの
- 使い方の本文は書かない（README に任せる）。入れ方・はじめの準備・見ないものが変わる版を出すときは、README と一緒にここも直す
