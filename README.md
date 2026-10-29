# tonari-site

[tonari](https://github.com/cxxxr/tonari-releases) の紹介ページ。字体は OS のもの（外部のフォントは読まない）。GitHub Pages で https://cxxxr.github.io/tonari-site/ に出る。

- 静的なページ（`index.html`・`style.css`・`site.js` と、下の月額プランのためのページ）。ビルドは無い
- ダウンロードのボタンは、開いたときに tonari-releases の最新の Release から OS ごとのファイルの URL を引く（`site.js`）。引けないときは Releases のページへ
- `images/` の screenshot は tonari-releases の README と同じもの、choose-work は録画の再生の画面、og.png は OG 用（PIL で作った）。`video/` の動画は本物の回の録画を「録画を流す」で再生して録り、声を後から同じ声で付けたもの
- 使い方の本文は書かない（README に任せる）。入れ方・はじめの準備・見ないものが変わる版を出すときは、README と一緒にここも直す
- `tokushoho.html`（特定商取引法に基づく表記）・`terms.html`（利用規約）・`thanks.html`（tonari のサーバーが、申し込みとお支払いの管理から戻す先。`?checkout=done` か `?checkout=cancel` で文を選ぶ）は月額プランのためのページ。検索には出さない（noindex）
