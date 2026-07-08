(function () {
  const STORE_KEY = "side-stash-site-language";
  const SUPPORTED_LANGUAGES = ["en", "zh-CN", "zh-TW", "ja", "ko", "de", "es", "fr", "pt-BR"];

  const translations = {
    en: {
      htmlLang: "en",
      pageTitle: "Side Stash - Save snippets into a focused side panel",
      metaDescription: "Side Stash is a lightweight browser extension for saving text, links, and images into a local side panel.",
      ogDescription: "Save useful snippets as you browse. Review, filter, copy, and delete them from one focused side panel.",
      navLabel: "Primary navigation",
      navWorkflow: "Workflow",
      navPrivacy: "Privacy",
      navScreens: "Screens",
      languageLabel: "Language",
      languageAuto: "Auto",
      install: "Install",
      heroTitle: "Stash it. Find it.",
      heroBody: "Right-click text, links, or images. Side Stash keeps them local, searchable, and ready to copy.",
      primaryActions: "Primary actions",
      addToChrome: "Add to Chrome",
      seeScreens: "See screens",
      heroImageAlt: "Generated product mockup showing Side Stash beside a browser page",
      workflowTitle: "A small capture loop that stays out of the way.",
      workflowBody: "Side Stash is built for the tiny things you do not want to lose while reading, researching, or collecting references.",
      stepCaptureLabel: "Capture",
      stepCaptureTitle: "Right-click from any page.",
      stepCaptureBody: "Save selected text, a link, or an image without breaking your current tab.",
      stepReviewLabel: "Review",
      stepReviewTitle: "Open a clean side panel.",
      stepReviewBody: "Saved items stay grouped by type with source context and readable previews.",
      stepReuseLabel: "Reuse",
      stepReuseTitle: "Search, select, and copy.",
      stepReuseBody: "Filter your stash, copy a single item, or collect several items at once.",
      privacyTitle: "Local by design.",
      privacyBody: "Your saved snippets live in Chrome storage on your device. There is no account, no backend, and no analytics pipeline.",
      privacyDetails: "Privacy details",
      privacyItemStorage: "Stores data with <code>chrome.storage.local</code>",
      privacyItemMenus: "Uses context menus and the side panel API",
      privacyItemServer: "Does not send saved content to a server",
      screensTitle: "Built around real browser habits.",
      screensBody: "The interface focuses on the few states that matter: capture, search, filter, and bulk actions.",
      searchImageAlt: "Generated Side Stash mockup showing search across saved snippets",
      searchCaption: "Search saved content, titles, sources, and URLs.",
      filtersImageAlt: "Generated Side Stash mockup showing type filters in the side panel",
      filtersCaption: "Filter text, links, and images without leaving the panel.",
      bulkImageAlt: "Generated Side Stash mockup showing selected snippets and bulk actions",
      bulkCaption: "Select several items, then copy or delete them together.",
      installTitle: "Install from the Chrome Web Store.",
      installBody: "Add Side Stash to Chrome, pin it if you like, and start saving snippets from the right-click menu.",
      sourceOnGitHub: "Source on GitHub"
    },
    "zh-CN": {
      htmlLang: "zh-CN",
      pageTitle: "Side Stash - 把网页片段收进侧边栏",
      metaDescription: "Side Stash 是一款轻量浏览器扩展，可把文本、链接和图片保存到本地侧边栏。",
      ogDescription: "浏览时保存有用片段。在一个专注的侧边栏里查看、筛选、复制和删除。",
      navLabel: "主导航",
      navWorkflow: "流程",
      navPrivacy: "隐私",
      navScreens: "截图",
      languageLabel: "语言",
      languageAuto: "自动",
      install: "安装",
      heroTitle: "先收好，再找到。",
      heroBody: "右键保存文本、链接或图片。Side Stash 会把它们留在本地，方便搜索和复制。",
      primaryActions: "主要操作",
      addToChrome: "添加到 Chrome",
      seeScreens: "查看截图",
      heroImageAlt: "生成的产品示意图，展示 Side Stash 位于浏览器页面旁边",
      workflowTitle: "一个不打扰你的轻量收集流程。",
      workflowBody: "Side Stash 适合保存阅读、研究或整理参考资料时那些不想丢掉的小片段。",
      stepCaptureLabel: "捕获",
      stepCaptureTitle: "在任何页面右键保存。",
      stepCaptureBody: "保存选中文本、链接或图片，不用离开当前标签页。",
      stepReviewLabel: "查看",
      stepReviewTitle: "打开清爽的侧边栏。",
      stepReviewBody: "保存内容按类型分组，并保留来源信息和易读预览。",
      stepReuseLabel: "复用",
      stepReuseTitle: "搜索、选择、复制。",
      stepReuseBody: "筛选收藏内容，复制单个条目，或一次处理多个条目。",
      privacyTitle: "默认本地保存。",
      privacyBody: "你保存的片段存放在设备上的 Chrome 存储中。无需账号，没有后端，也没有分析管道。",
      privacyDetails: "隐私详情",
      privacyItemStorage: "使用 <code>chrome.storage.local</code> 存储数据",
      privacyItemMenus: "使用右键菜单和侧边栏 API",
      privacyItemServer: "不会把保存内容发送到服务器",
      screensTitle: "围绕真实浏览习惯设计。",
      screensBody: "界面专注于几个关键状态：捕获、搜索、筛选和批量操作。",
      searchImageAlt: "生成的 Side Stash 示意图，展示在保存片段中搜索",
      searchCaption: "搜索保存的内容、标题、来源和 URL。",
      filtersImageAlt: "生成的 Side Stash 示意图，展示侧边栏中的类型筛选",
      filtersCaption: "不用离开侧边栏，就能筛选文本、链接和图片。",
      bulkImageAlt: "生成的 Side Stash 示意图，展示已选择片段和批量操作",
      bulkCaption: "选择多个条目，然后一起复制或删除。",
      installTitle: "从 Chrome Web Store 安装。",
      installBody: "把 Side Stash 添加到 Chrome，可以按需固定图标，然后从右键菜单开始保存片段。",
      sourceOnGitHub: "GitHub 源码"
    },
    "zh-TW": {
      htmlLang: "zh-TW",
      pageTitle: "Side Stash - 把網頁片段收進側邊欄",
      metaDescription: "Side Stash 是一款輕量瀏覽器擴充功能，可把文字、連結和圖片儲存到本機側邊欄。",
      ogDescription: "瀏覽時儲存有用片段。在一個專注的側邊欄裡檢視、篩選、複製和刪除。",
      navLabel: "主導覽",
      navWorkflow: "流程",
      navPrivacy: "隱私",
      navScreens: "截圖",
      languageLabel: "語言",
      languageAuto: "自動",
      install: "安裝",
      heroTitle: "先收好，再找到。",
      heroBody: "右鍵儲存文字、連結或圖片。Side Stash 會把它們留在本機，方便搜尋和複製。",
      primaryActions: "主要操作",
      addToChrome: "加到 Chrome",
      seeScreens: "查看截圖",
      heroImageAlt: "生成的產品示意圖，展示 Side Stash 位於瀏覽器頁面旁邊",
      workflowTitle: "一個不打擾你的輕量收集流程。",
      workflowBody: "Side Stash 適合儲存閱讀、研究或整理參考資料時那些不想遺失的小片段。",
      stepCaptureLabel: "擷取",
      stepCaptureTitle: "在任何頁面右鍵儲存。",
      stepCaptureBody: "儲存選取文字、連結或圖片，不用離開目前分頁。",
      stepReviewLabel: "檢視",
      stepReviewTitle: "打開清爽的側邊欄。",
      stepReviewBody: "儲存內容按類型分組，並保留來源資訊和易讀預覽。",
      stepReuseLabel: "重用",
      stepReuseTitle: "搜尋、選取、複製。",
      stepReuseBody: "篩選收藏內容，複製單一項目，或一次處理多個項目。",
      privacyTitle: "預設本機儲存。",
      privacyBody: "你儲存的片段存放在裝置上的 Chrome 儲存空間中。無需帳號，沒有後端，也沒有分析管道。",
      privacyDetails: "隱私詳情",
      privacyItemStorage: "使用 <code>chrome.storage.local</code> 儲存資料",
      privacyItemMenus: "使用右鍵選單和側邊欄 API",
      privacyItemServer: "不會把儲存內容傳送到伺服器",
      screensTitle: "圍繞真實瀏覽習慣設計。",
      screensBody: "介面專注於幾個關鍵狀態：擷取、搜尋、篩選和批次操作。",
      searchImageAlt: "生成的 Side Stash 示意圖，展示在儲存片段中搜尋",
      searchCaption: "搜尋儲存的內容、標題、來源和 URL。",
      filtersImageAlt: "生成的 Side Stash 示意圖，展示側邊欄中的類型篩選",
      filtersCaption: "不用離開側邊欄，就能篩選文字、連結和圖片。",
      bulkImageAlt: "生成的 Side Stash 示意圖，展示已選取片段和批次操作",
      bulkCaption: "選取多個項目，然後一起複製或刪除。",
      installTitle: "從 Chrome Web Store 安裝。",
      installBody: "把 Side Stash 加到 Chrome，可以按需固定圖示，然後從右鍵選單開始儲存片段。",
      sourceOnGitHub: "GitHub 原始碼"
    },
    ja: {
      htmlLang: "ja",
      pageTitle: "Side Stash - スニペットをサイドパネルに保存",
      metaDescription: "Side Stash は、テキスト、リンク、画像をローカルのサイドパネルに保存できる軽量なブラウザ拡張機能です。",
      ogDescription: "閲覧中に役立つスニペットを保存。ひとつのサイドパネルで確認、絞り込み、コピー、削除できます。",
      navLabel: "メインナビゲーション",
      navWorkflow: "流れ",
      navPrivacy: "プライバシー",
      navScreens: "画面",
      languageLabel: "言語",
      languageAuto: "自動",
      install: "インストール",
      heroTitle: "保存して、すぐ見つける。",
      heroBody: "テキスト、リンク、画像を右クリックで保存。Side Stash はローカルに保持し、検索とコピーをすぐにできます。",
      primaryActions: "主な操作",
      addToChrome: "Chrome に追加",
      seeScreens: "画面を見る",
      heroImageAlt: "ブラウザページの横に Side Stash を表示した生成プロダクトモックアップ",
      workflowTitle: "作業を邪魔しない小さな保存ループ。",
      workflowBody: "Side Stash は、読書、調査、参考資料集めの途中で失いたくない小さな情報を保存するためのツールです。",
      stepCaptureLabel: "保存",
      stepCaptureTitle: "どのページでも右クリック。",
      stepCaptureBody: "選択テキスト、リンク、画像を現在のタブから離れずに保存できます。",
      stepReviewLabel: "確認",
      stepReviewTitle: "すっきりしたサイドパネルを開く。",
      stepReviewBody: "保存した項目は種類ごとにまとまり、出典と読みやすいプレビューが残ります。",
      stepReuseLabel: "再利用",
      stepReuseTitle: "検索、選択、コピー。",
      stepReuseBody: "保存内容を絞り込み、単体でコピーしたり、複数項目をまとめて扱えます。",
      privacyTitle: "ローカル前提の設計。",
      privacyBody: "保存したスニペットはデバイス上の Chrome ストレージに保存されます。アカウント、バックエンド、分析パイプラインはありません。",
      privacyDetails: "プライバシー詳細",
      privacyItemStorage: "<code>chrome.storage.local</code> にデータを保存",
      privacyItemMenus: "コンテキストメニューとサイドパネル API を使用",
      privacyItemServer: "保存内容をサーバーへ送信しません",
      screensTitle: "実際のブラウジング習慣に合わせた設計。",
      screensBody: "インターフェイスは、保存、検索、絞り込み、一括操作という重要な状態に集中しています。",
      searchImageAlt: "保存したスニペットを検索する Side Stash の生成モックアップ",
      searchCaption: "保存した内容、タイトル、ソース、URL を検索できます。",
      filtersImageAlt: "サイドパネルで種類別フィルターを表示する Side Stash の生成モックアップ",
      filtersCaption: "パネルから離れずに、テキスト、リンク、画像を絞り込めます。",
      bulkImageAlt: "選択済みスニペットと一括操作を表示する Side Stash の生成モックアップ",
      bulkCaption: "複数の項目を選択して、まとめてコピーまたは削除できます。",
      installTitle: "Chrome Web Store からインストール。",
      installBody: "Side Stash を Chrome に追加し、必要ならピン留めして、右クリックメニューからスニペット保存を始められます。",
      sourceOnGitHub: "GitHub のソース"
    },
    ko: {
      htmlLang: "ko",
      pageTitle: "Side Stash - 스니펫을 사이드 패널에 저장",
      metaDescription: "Side Stash는 텍스트, 링크, 이미지를 로컬 사이드 패널에 저장하는 가벼운 브라우저 확장 프로그램입니다.",
      ogDescription: "탐색 중 유용한 스니펫을 저장하세요. 하나의 사이드 패널에서 확인, 필터링, 복사, 삭제할 수 있습니다.",
      navLabel: "기본 탐색",
      navWorkflow: "흐름",
      navPrivacy: "개인정보",
      navScreens: "화면",
      languageLabel: "언어",
      languageAuto: "자동",
      install: "설치",
      heroTitle: "저장하고, 바로 찾기.",
      heroBody: "텍스트, 링크, 이미지를 우클릭으로 저장하세요. Side Stash는 로컬에 보관하고 검색과 복사를 쉽게 해줍니다.",
      primaryActions: "주요 작업",
      addToChrome: "Chrome에 추가",
      seeScreens: "화면 보기",
      heroImageAlt: "브라우저 페이지 옆에 Side Stash가 있는 생성 제품 목업",
      workflowTitle: "흐름을 방해하지 않는 작은 수집 루프.",
      workflowBody: "Side Stash는 읽기, 조사, 참고 자료 수집 중 잃고 싶지 않은 작은 정보를 저장하기 위해 만들어졌습니다.",
      stepCaptureLabel: "저장",
      stepCaptureTitle: "어느 페이지에서나 우클릭.",
      stepCaptureBody: "현재 탭을 벗어나지 않고 선택한 텍스트, 링크, 이미지를 저장합니다.",
      stepReviewLabel: "확인",
      stepReviewTitle: "깔끔한 사이드 패널 열기.",
      stepReviewBody: "저장한 항목은 유형별로 묶이고 출처 정보와 읽기 쉬운 미리보기가 유지됩니다.",
      stepReuseLabel: "재사용",
      stepReuseTitle: "검색, 선택, 복사.",
      stepReuseBody: "저장한 항목을 필터링하고 하나만 복사하거나 여러 항목을 한 번에 처리할 수 있습니다.",
      privacyTitle: "로컬 우선 설계.",
      privacyBody: "저장한 스니펫은 기기의 Chrome 저장소에 남습니다. 계정, 백엔드, 분석 파이프라인이 없습니다.",
      privacyDetails: "개인정보 세부 정보",
      privacyItemStorage: "<code>chrome.storage.local</code>에 데이터 저장",
      privacyItemMenus: "컨텍스트 메뉴와 사이드 패널 API 사용",
      privacyItemServer: "저장한 내용을 서버로 보내지 않음",
      screensTitle: "실제 브라우징 습관에 맞춘 설계.",
      screensBody: "인터페이스는 저장, 검색, 필터링, 일괄 작업이라는 중요한 상태에 집중합니다.",
      searchImageAlt: "저장된 스니펫 검색을 보여주는 Side Stash 생성 목업",
      searchCaption: "저장한 내용, 제목, 출처, URL을 검색합니다.",
      filtersImageAlt: "사이드 패널의 유형 필터를 보여주는 Side Stash 생성 목업",
      filtersCaption: "패널을 떠나지 않고 텍스트, 링크, 이미지를 필터링합니다.",
      bulkImageAlt: "선택된 스니펫과 일괄 작업을 보여주는 Side Stash 생성 목업",
      bulkCaption: "여러 항목을 선택한 뒤 함께 복사하거나 삭제합니다.",
      installTitle: "Chrome Web Store에서 설치.",
      installBody: "Side Stash를 Chrome에 추가하고 필요하면 고정한 뒤 우클릭 메뉴에서 스니펫 저장을 시작하세요.",
      sourceOnGitHub: "GitHub 소스"
    },
    de: {
      htmlLang: "de",
      pageTitle: "Side Stash - Snippets in einem fokussierten Seitenpanel speichern",
      metaDescription: "Side Stash ist eine leichte Browser-Erweiterung zum lokalen Speichern von Texten, Links und Bildern in einem Seitenpanel.",
      ogDescription: "Speichere nützliche Snippets beim Browsen. Prüfe, filtere, kopiere und lösche sie in einem fokussierten Seitenpanel.",
      navLabel: "Hauptnavigation",
      navWorkflow: "Ablauf",
      navPrivacy: "Datenschutz",
      navScreens: "Ansichten",
      languageLabel: "Sprache",
      languageAuto: "Auto",
      install: "Installieren",
      heroTitle: "Ablegen. Wiederfinden.",
      heroBody: "Speichere Text, Links oder Bilder per Rechtsklick. Side Stash hält alles lokal, durchsuchbar und kopierbereit.",
      primaryActions: "Primäre Aktionen",
      addToChrome: "Zu Chrome hinzufügen",
      seeScreens: "Ansichten ansehen",
      heroImageAlt: "Generiertes Produkt-Mockup mit Side Stash neben einer Browserseite",
      workflowTitle: "Ein kleiner Sammelablauf, der nicht stört.",
      workflowBody: "Side Stash ist für kleine Dinge gebaut, die du beim Lesen, Recherchieren oder Sammeln von Referenzen nicht verlieren willst.",
      stepCaptureLabel: "Erfassen",
      stepCaptureTitle: "Rechtsklick auf jeder Seite.",
      stepCaptureBody: "Speichere markierten Text, einen Link oder ein Bild, ohne den aktuellen Tab zu verlassen.",
      stepReviewLabel: "Prüfen",
      stepReviewTitle: "Ein klares Seitenpanel öffnen.",
      stepReviewBody: "Gespeicherte Elemente bleiben nach Typ gruppiert, mit Quelle und gut lesbarer Vorschau.",
      stepReuseLabel: "Nutzen",
      stepReuseTitle: "Suchen, auswählen, kopieren.",
      stepReuseBody: "Filtere deinen Stash, kopiere ein einzelnes Element oder mehrere Elemente auf einmal.",
      privacyTitle: "Lokal gedacht.",
      privacyBody: "Deine gespeicherten Snippets liegen im Chrome-Speicher auf deinem Gerät. Kein Konto, kein Backend, keine Analytics-Pipeline.",
      privacyDetails: "Datenschutzdetails",
      privacyItemStorage: "Speichert Daten mit <code>chrome.storage.local</code>",
      privacyItemMenus: "Nutzt Kontextmenüs und die Seitenpanel-API",
      privacyItemServer: "Sendet gespeicherte Inhalte nicht an einen Server",
      screensTitle: "Für echte Browsergewohnheiten gebaut.",
      screensBody: "Die Oberfläche konzentriert sich auf die wenigen Zustände, die zählen: Erfassen, Suchen, Filtern und Sammelaktionen.",
      searchImageAlt: "Generiertes Side Stash Mockup mit Suche über gespeicherte Snippets",
      searchCaption: "Suche gespeicherte Inhalte, Titel, Quellen und URLs.",
      filtersImageAlt: "Generiertes Side Stash Mockup mit Typfiltern im Seitenpanel",
      filtersCaption: "Filtere Text, Links und Bilder, ohne das Panel zu verlassen.",
      bulkImageAlt: "Generiertes Side Stash Mockup mit ausgewählten Snippets und Sammelaktionen",
      bulkCaption: "Wähle mehrere Elemente aus und kopiere oder lösche sie gemeinsam.",
      installTitle: "Aus dem Chrome Web Store installieren.",
      installBody: "Füge Side Stash zu Chrome hinzu, pinne es bei Bedarf an und speichere Snippets über das Rechtsklick-Menü.",
      sourceOnGitHub: "Quellcode auf GitHub"
    },
    es: {
      htmlLang: "es",
      pageTitle: "Side Stash - Guarda fragmentos en un panel lateral",
      metaDescription: "Side Stash es una extensión ligera para guardar texto, enlaces e imágenes en un panel lateral local.",
      ogDescription: "Guarda fragmentos útiles mientras navegas. Revísalos, filtra, copia y elimina todo desde un panel lateral enfocado.",
      navLabel: "Navegación principal",
      navWorkflow: "Flujo",
      navPrivacy: "Privacidad",
      navScreens: "Pantallas",
      languageLabel: "Idioma",
      languageAuto: "Auto",
      install: "Instalar",
      heroTitle: "Guarda. Encuentra.",
      heroBody: "Haz clic derecho en texto, enlaces o imágenes. Side Stash los mantiene locales, buscables y listos para copiar.",
      primaryActions: "Acciones principales",
      addToChrome: "Añadir a Chrome",
      seeScreens: "Ver pantallas",
      heroImageAlt: "Mockup generado del producto con Side Stash junto a una página del navegador",
      workflowTitle: "Un pequeño flujo de captura que no molesta.",
      workflowBody: "Side Stash está hecho para esas pequeñas cosas que no quieres perder mientras lees, investigas o reúnes referencias.",
      stepCaptureLabel: "Captura",
      stepCaptureTitle: "Clic derecho desde cualquier página.",
      stepCaptureBody: "Guarda texto seleccionado, un enlace o una imagen sin salir de la pestaña actual.",
      stepReviewLabel: "Revisa",
      stepReviewTitle: "Abre un panel lateral limpio.",
      stepReviewBody: "Los elementos guardados quedan agrupados por tipo, con contexto de origen y vistas previas legibles.",
      stepReuseLabel: "Reutiliza",
      stepReuseTitle: "Busca, selecciona y copia.",
      stepReuseBody: "Filtra tu colección, copia un elemento o trabaja con varios elementos a la vez.",
      privacyTitle: "Local por diseño.",
      privacyBody: "Tus fragmentos guardados viven en el almacenamiento de Chrome en tu dispositivo. No hay cuenta, backend ni analítica.",
      privacyDetails: "Detalles de privacidad",
      privacyItemStorage: "Guarda datos con <code>chrome.storage.local</code>",
      privacyItemMenus: "Usa menús contextuales y la API del panel lateral",
      privacyItemServer: "No envía contenido guardado a un servidor",
      screensTitle: "Pensado para hábitos reales de navegación.",
      screensBody: "La interfaz se enfoca en los estados que importan: capturar, buscar, filtrar y acciones masivas.",
      searchImageAlt: "Mockup generado de Side Stash mostrando búsqueda en fragmentos guardados",
      searchCaption: "Busca contenido guardado, títulos, fuentes y URL.",
      filtersImageAlt: "Mockup generado de Side Stash mostrando filtros por tipo en el panel lateral",
      filtersCaption: "Filtra texto, enlaces e imágenes sin salir del panel.",
      bulkImageAlt: "Mockup generado de Side Stash mostrando fragmentos seleccionados y acciones masivas",
      bulkCaption: "Selecciona varios elementos y cópialos o elimínalos juntos.",
      installTitle: "Instala desde Chrome Web Store.",
      installBody: "Añade Side Stash a Chrome, fíjalo si quieres y empieza a guardar fragmentos desde el menú contextual.",
      sourceOnGitHub: "Código en GitHub"
    },
    fr: {
      htmlLang: "fr",
      pageTitle: "Side Stash - Enregistrez des extraits dans un panneau latéral",
      metaDescription: "Side Stash est une extension légère pour enregistrer du texte, des liens et des images dans un panneau latéral local.",
      ogDescription: "Enregistrez des extraits utiles pendant votre navigation. Consultez, filtrez, copiez et supprimez-les dans un panneau latéral dédié.",
      navLabel: "Navigation principale",
      navWorkflow: "Flux",
      navPrivacy: "Confidentialité",
      navScreens: "Écrans",
      languageLabel: "Langue",
      languageAuto: "Auto",
      install: "Installer",
      heroTitle: "Gardez. Retrouvez.",
      heroBody: "Cliquez droit sur du texte, des liens ou des images. Side Stash les garde en local, faciles à rechercher et à copier.",
      primaryActions: "Actions principales",
      addToChrome: "Ajouter à Chrome",
      seeScreens: "Voir les écrans",
      heroImageAlt: "Mockup produit généré montrant Side Stash à côté d'une page de navigateur",
      workflowTitle: "Une petite boucle de capture qui reste discrète.",
      workflowBody: "Side Stash est fait pour les petites choses que vous ne voulez pas perdre en lisant, en cherchant ou en collectant des références.",
      stepCaptureLabel: "Capturer",
      stepCaptureTitle: "Clic droit depuis n'importe quelle page.",
      stepCaptureBody: "Enregistrez du texte sélectionné, un lien ou une image sans quitter l'onglet actif.",
      stepReviewLabel: "Consulter",
      stepReviewTitle: "Ouvrez un panneau latéral clair.",
      stepReviewBody: "Les éléments restent groupés par type, avec leur source et des aperçus lisibles.",
      stepReuseLabel: "Réutiliser",
      stepReuseTitle: "Rechercher, sélectionner, copier.",
      stepReuseBody: "Filtrez votre collection, copiez un élément ou traitez plusieurs éléments à la fois.",
      privacyTitle: "Local par conception.",
      privacyBody: "Vos extraits enregistrés restent dans le stockage Chrome de votre appareil. Pas de compte, pas de backend, pas d'analyse.",
      privacyDetails: "Détails de confidentialité",
      privacyItemStorage: "Stocke les données avec <code>chrome.storage.local</code>",
      privacyItemMenus: "Utilise les menus contextuels et l'API du panneau latéral",
      privacyItemServer: "N'envoie pas le contenu enregistré à un serveur",
      screensTitle: "Conçu pour de vraies habitudes de navigation.",
      screensBody: "L'interface se concentre sur les états utiles : capturer, rechercher, filtrer et actions groupées.",
      searchImageAlt: "Mockup généré de Side Stash montrant la recherche dans les extraits enregistrés",
      searchCaption: "Recherchez le contenu, les titres, les sources et les URL enregistrés.",
      filtersImageAlt: "Mockup généré de Side Stash montrant les filtres par type dans le panneau latéral",
      filtersCaption: "Filtrez texte, liens et images sans quitter le panneau.",
      bulkImageAlt: "Mockup généré de Side Stash montrant des extraits sélectionnés et des actions groupées",
      bulkCaption: "Sélectionnez plusieurs éléments, puis copiez-les ou supprimez-les ensemble.",
      installTitle: "Installez depuis le Chrome Web Store.",
      installBody: "Ajoutez Side Stash à Chrome, épinglez-le si vous voulez, puis commencez à enregistrer des extraits avec le menu contextuel.",
      sourceOnGitHub: "Source sur GitHub"
    },
    "pt-BR": {
      htmlLang: "pt-BR",
      pageTitle: "Side Stash - Salve trechos em um painel lateral",
      metaDescription: "Side Stash é uma extensão leve para salvar textos, links e imagens em um painel lateral local.",
      ogDescription: "Salve trechos úteis enquanto navega. Revise, filtre, copie e apague tudo em um painel lateral focado.",
      navLabel: "Navegação principal",
      navWorkflow: "Fluxo",
      navPrivacy: "Privacidade",
      navScreens: "Telas",
      languageLabel: "Idioma",
      languageAuto: "Auto",
      install: "Instalar",
      heroTitle: "Guarde. Encontre.",
      heroBody: "Clique com o botão direito em textos, links ou imagens. Side Stash mantém tudo local, pesquisável e pronto para copiar.",
      primaryActions: "Ações principais",
      addToChrome: "Adicionar ao Chrome",
      seeScreens: "Ver telas",
      heroImageAlt: "Mockup gerado do produto mostrando o Side Stash ao lado de uma página do navegador",
      workflowTitle: "Um pequeno fluxo de captura que não atrapalha.",
      workflowBody: "Side Stash foi feito para as pequenas coisas que você não quer perder enquanto lê, pesquisa ou reúne referências.",
      stepCaptureLabel: "Capturar",
      stepCaptureTitle: "Clique com o botão direito em qualquer página.",
      stepCaptureBody: "Salve texto selecionado, um link ou uma imagem sem sair da aba atual.",
      stepReviewLabel: "Revisar",
      stepReviewTitle: "Abra um painel lateral limpo.",
      stepReviewBody: "Os itens salvos ficam agrupados por tipo, com contexto de origem e prévias legíveis.",
      stepReuseLabel: "Reusar",
      stepReuseTitle: "Pesquise, selecione e copie.",
      stepReuseBody: "Filtre seu stash, copie um item ou trabalhe com vários itens de uma vez.",
      privacyTitle: "Local por design.",
      privacyBody: "Seus trechos salvos ficam no armazenamento do Chrome no seu dispositivo. Sem conta, sem backend e sem analytics.",
      privacyDetails: "Detalhes de privacidade",
      privacyItemStorage: "Armazena dados com <code>chrome.storage.local</code>",
      privacyItemMenus: "Usa menus de contexto e a API do painel lateral",
      privacyItemServer: "Não envia conteúdo salvo para um servidor",
      screensTitle: "Criado para hábitos reais de navegação.",
      screensBody: "A interface foca nos estados que importam: captura, busca, filtros e ações em massa.",
      searchImageAlt: "Mockup gerado do Side Stash mostrando busca em trechos salvos",
      searchCaption: "Pesquise conteúdo salvo, títulos, origens e URLs.",
      filtersImageAlt: "Mockup gerado do Side Stash mostrando filtros por tipo no painel lateral",
      filtersCaption: "Filtre textos, links e imagens sem sair do painel.",
      bulkImageAlt: "Mockup gerado do Side Stash mostrando trechos selecionados e ações em massa",
      bulkCaption: "Selecione vários itens e copie ou apague tudo junto.",
      installTitle: "Instale pela Chrome Web Store.",
      installBody: "Adicione Side Stash ao Chrome, fixe se quiser e comece a salvar trechos pelo menu de clique direito.",
      sourceOnGitHub: "Código no GitHub"
    }
  };

  function normalizeLanguage(language) {
    return String(language || "").trim().replace("_", "-");
  }

  function matchSupportedLanguage(language) {
    const normalized = normalizeLanguage(language);
    const lower = normalized.toLowerCase();

    if (!lower) return null;
    if (lower === "pt-br" || lower.startsWith("pt-br-")) return "pt-BR";
    if (lower === "zh-tw" || lower === "zh-hk" || lower === "zh-mo" || lower.includes("hant")) return "zh-TW";
    if (lower === "zh-cn" || lower === "zh-sg" || lower.includes("hans")) return "zh-CN";
    if (lower === "zh") return "zh-CN";

    const exact = SUPPORTED_LANGUAGES.find((code) => code.toLowerCase() === lower);
    if (exact) return exact;

    const base = lower.split("-")[0];
    const baseMatch = SUPPORTED_LANGUAGES.find((code) => code.toLowerCase().split("-")[0] === base);
    return baseMatch || null;
  }

  function getBrowserLanguage() {
    const languages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const language of languages) {
      const match = matchSupportedLanguage(language);
      if (match) return match;
    }
    return "en";
  }

  function getStoredMode() {
    const stored = localStorage.getItem(STORE_KEY);
    return stored === "auto" || SUPPORTED_LANGUAGES.includes(stored) ? stored : "auto";
  }

  function setMeta(name, content) {
    const element = document.querySelector(`meta[name="${name}"]`);
    if (element) element.setAttribute("content", content);
  }

  function setProperty(property, content) {
    const element = document.querySelector(`meta[property="${property}"]`);
    if (element) element.setAttribute("content", content);
  }

  function applyAttributes(element, dictionary) {
    const spec = element.getAttribute("data-i18n-attr");
    if (!spec) return;

    for (const pair of spec.split(",")) {
      const [attribute, key] = pair.split(":").map((part) => part && part.trim());
      if (attribute && key && dictionary[key]) element.setAttribute(attribute, dictionary[key]);
    }
  }

  function applyLanguage(mode) {
    const selectedMode = mode === "auto" || SUPPORTED_LANGUAGES.includes(mode) ? mode : "auto";
    const language = selectedMode === "auto" ? getBrowserLanguage() : selectedMode;
    const dictionary = translations[language] || translations.en;

    document.documentElement.lang = dictionary.htmlLang || language;
    document.documentElement.dataset.languageMode = selectedMode;
    document.documentElement.dataset.language = language;
    document.title = dictionary.pageTitle;
    setMeta("description", dictionary.metaDescription);
    setProperty("og:description", dictionary.ogDescription);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (key && dictionary[key]) element.textContent = dictionary[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.getAttribute("data-i18n-html");
      if (key && dictionary[key]) element.innerHTML = dictionary[key];
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => applyAttributes(element, dictionary));

    const select = document.getElementById("language-select");
    if (select) {
      select.value = selectedMode;
      select.setAttribute("aria-label", dictionary.languageLabel);
    }
  }

  function initLanguageSwitcher() {
    const select = document.getElementById("language-select");
    const mode = getStoredMode();
    applyLanguage(mode);

    if (!select) return;
    select.addEventListener("change", () => {
      const nextMode = select.value;
      localStorage.setItem(STORE_KEY, nextMode);
      applyLanguage(nextMode);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageSwitcher, { once: true });
  } else {
    initLanguageSwitcher();
  }
})();
