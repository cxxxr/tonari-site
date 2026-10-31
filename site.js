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
  // スマホは先に見分ける（iPhone の UA は Mac に、Android の UA は Linux に当たるため）
  const mobile = /iPhone|iPad|iPod|Android|Mobile/.test(ua);
  const mine = mobile ? null : /Mac/.test(ua) ? "mac" : /Win/.test(ua) ? "win" : /Linux|X11/.test(ua) ? "deb" : null;
  const buttons = Array.from(document.querySelectorAll("#os .btn"));
  const main = document.getElementById("dl-main");
  const note = document.getElementById("dl-note");
  const version = document.getElementById("version");

  if (mobile) {
    main.textContent = "PC でダウンロードしてください";
    note.textContent = "対応は macOS・Windows・Linux の PC です";
    // ブラウザ版もスマホでは確かめていないので、ブラウザ版の案内（とページの最後の節）は出さず、ダウンロードの案内を主にする
    const web = document.getElementById("dl-web");
    if (web) web.hidden = true;
    const closing = document.getElementById("closing");
    if (closing) closing.hidden = true;
    main.classList.add("btn-primary");
  }
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
    const tag = typeof rel.tag_name === "string" ? rel.tag_name : "";
    // 自分の OS のファイルが分かったときだけ、上のボタンを直接のダウンロードにする
    if (mineBtn && /\/download\//.test(mineBtn.href)) {
      main.href = mineBtn.href;
      const label = { mac: "macOS（Apple シリコン）", win: "Windows", deb: "Linux" }[mine];
      main.textContent = `${label} 向けをダウンロード`;
      note.textContent = `${tag ? tag + " ・ " : ""}ほかの OS と、初めて開くときの手順`;
    }
    if (tag && rel.published_at) {
      const d = new Date(rel.published_at);
      const date = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
      version.textContent = `最新は ${tag}（${date}）。ほかの版は `;
      const link = document.createElement("a");
      link.href = "https://github.com/cxxxr/tonari-releases/releases";
      link.textContent = "Releases";
      version.append(link, " に。");
      const metaVersion = document.getElementById("meta-version");
      if (metaVersion) metaVersion.textContent = `最新の版は ${tag}（${date}公開）。`;
    }
  } catch {
    // ネットワークが無いときなどは、そのまま
  }
})();

// ヒーローの動画。既定は無音で自動再生。「声を聞く」で音を出して頭から、「止める」で止める。
// 動きを減らす設定の人と小さい画面では自動では流さない（ポスターのまま。押せば再生）
(() => {
  const v = document.getElementById("hero-video");
  const unmute = document.getElementById("unmute");
  const pause = document.getElementById("pause");
  if (!v) return;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 600px)").matches;
  if (still) {
    v.removeAttribute("autoplay");
    v.pause();
    v.controls = true;
    if (pause) pause.hidden = true;
  }
  v.addEventListener("error", () => {
    if (unmute) unmute.hidden = true;
    if (pause) pause.hidden = true;
  }, true);
  unmute?.addEventListener("click", () => {
    if (v.muted) {
      v.muted = false;
      v.currentTime = 0;
      void v.play();
      unmute.textContent = "音を消す";
      if (pause) { pause.textContent = "止める"; pause.setAttribute("aria-pressed", "false"); }
    } else {
      v.muted = true;
      unmute.textContent = "声を聞く";
    }
  });
  pause?.addEventListener("click", () => {
    if (v.paused) {
      void v.play();
      pause.textContent = "止める";
      pause.setAttribute("aria-pressed", "false");
    } else {
      v.pause();
      pause.textContent = "再生する";
      pause.setAttribute("aria-pressed", "true");
    }
  });
})();
