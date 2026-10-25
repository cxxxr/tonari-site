// 最新の版のファイルを GitHub の Releases から引き、OS ごとのボタンに直接の URL を入れる。
// 取れないときはボタンは Releases のページのまま（HTML に書いてある href）。
(async () => {
  const match = {
    mac: (n) => /\.dmg$/.test(n),
    win: (n) => /\.exe$/.test(n),
    deb: (n) => /\.deb$/.test(n),
    appimage: (n) => /\.AppImage$/.test(n),
  };
  const ua = navigator.userAgent;
  const mine = /Mac/.test(ua) ? "mac" : /Win/.test(ua) ? "win" : /Linux|X11/.test(ua) ? "deb" : null;
  const buttons = Array.from(document.querySelectorAll("#os .btn"));
  const main = document.getElementById("dl-main");
  const note = document.getElementById("dl-note");
  const version = document.getElementById("version");

  // 自分の OS の印は、取得の前に付ける
  const mineBtn = buttons.find((b) => b.dataset.os === mine);
  if (mineBtn) mineBtn.classList.add("is-mine");

  try {
    const res = await fetch("https://api.github.com/repos/cxxxr/tonari-releases/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return;
    const rel = await res.json();
    const assets = Array.isArray(rel.assets) ? rel.assets : [];
    for (const b of buttons) {
      const a = assets.find((x) => match[b.dataset.os]?.(x.name));
      if (a) b.href = a.browser_download_url;
    }
    const appimage = assets.find((x) => match.appimage(x.name));
    const appimageLink = document.getElementById("dl-appimage");
    if (appimage && appimageLink) appimageLink.href = appimage.browser_download_url;
    // 自分の OS のファイルが分かったときだけ、上のボタンを直接のダウンロードにする
    if (mineBtn && /\/download\//.test(mineBtn.href)) {
      main.href = mineBtn.href;
      const label = { mac: "macOS", win: "Windows", deb: "Linux" }[mine];
      main.textContent = `${label} 向けをダウンロード`;
      note.textContent = `${rel.tag_name ?? ""}。ほかの OS と、初めて開くときの手順`.replace(/^。/, "");
    }
    const metaVersion = document.getElementById("meta-version");
    if (metaVersion && rel.tag_name && rel.published_at) {
      const d = new Date(rel.published_at);
      metaVersion.textContent = `最新の版は ${rel.tag_name}（${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日公開）。`;
    }
    if (rel.tag_name && rel.published_at) {
      const d = new Date(rel.published_at);
      version.textContent = `最新は ${rel.tag_name}（${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日）。`;
      const link = document.createElement("a");
      link.href = "https://github.com/cxxxr/tonari-releases/releases";
      link.textContent = "版の一覧";
      version.append(link, "。");
    }
  } catch {
    // ネットワークが無いときなどは、そのまま
  }
})();

// 動きを減らす設定の人には、動画を自動では流さない（ポスターのまま。押せば再生）
(() => {
  const v = document.getElementById("hero-video");
  if (!v) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    v.removeAttribute("autoplay");
    v.pause();
    v.controls = true;
  }
})();
