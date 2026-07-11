// ============================================================
// WARD_13 — Game Engine
// ============================================================

// --- Game State ---
let gameState = {
    currentNode: 'start',
    history: [],      // { phase, text } for LOG feature
    scores: {},
    pendingEcho: '',
    atEnding: false
};

// --- DOM Elements ---
const gameContainer = document.getElementById('game-container');
const titleScreen = document.getElementById('title-screen');
const warningScreen = document.getElementById('warning-screen');
const phoneScreen = document.getElementById('phone-screen');
const gameplayScreen = document.getElementById('gameplay-screen');
const settingsScreen = document.getElementById('settings-screen');
const galleryScreen = document.getElementById('gallery-screen');
const charsScreen = document.getElementById('chars-screen');
const textContainer = document.getElementById('text-container');
const currentTextEl = document.getElementById('current-text');
const historyLogEl = document.getElementById('history-log');
const choicesContainer = document.getElementById('choices-container');
const phaseIndicator = document.getElementById('phase-indicator');
const caret = document.getElementById('caret');
const logOverlay = document.getElementById('log-overlay');
const logContent = document.getElementById('log-content');
const bugFloodContainer = document.getElementById('bug-flood-container');

// --- Buttons ---
const btnEnter = document.getElementById('btn-enter');
const btnOpenArchive = document.getElementById('btn-open-archive');
const btnSkipChat = document.getElementById('btn-skip-chat');
const btnStart = document.getElementById('btn-start');
const btnLoad = document.getElementById('btn-load');
const btnSettings = document.getElementById('btn-settings');
const btnBackSettings = document.getElementById('btn-back-settings');
const btnGallery = document.getElementById('btn-gallery');
const btnBackGallery = document.getElementById('btn-back-gallery');
const btnChars = document.getElementById('btn-chars');
const btnBackChars = document.getElementById('btn-back-chars');
const btnAuto = document.getElementById('btn-auto');
const btnLog = document.getElementById('btn-log');
const btnMenu = document.getElementById('btn-menu');
const btnGameSettings = document.getElementById('btn-game-settings');
const btnCloseLog = document.getElementById('btn-close-log');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnClearSave = document.getElementById('btn-clear-save');
const btnSave = document.getElementById('btn-save');
const btnSaveSettings = document.getElementById('btn-save-settings');
const btnLoadSlot = document.getElementById('btn-load-slot');
const btnDeleteSlot = document.getElementById('btn-delete-slot');
const saveSlotGrid = document.getElementById('save-slot-grid');
const saveSlotInfo = document.getElementById('save-slot-info');
const quickSaveOverlay = document.getElementById('quick-save-overlay');
const quickSaveGrid = document.getElementById('quick-save-grid');
const btnCloseQuickSave = document.getElementById('btn-close-quick-save');

// --- Sliders ---
const brightnessSlider = document.getElementById('brightness-slider');
const typespeedSlider = document.getElementById('typespeed-slider');
const autospeedSlider = document.getElementById('autospeed-slider');

// --- Typewriter & Auto Play ---
let typingInterval;
let isTyping = false;
let typeSpeed = 30;
let autoPlay = false;
let autoPlayInterval;
let autoPlayDelay = 2000; // ms
let activeSaveSlot = parseInt(localStorage.getItem('ward13_active_slot') || '1', 10);
const SAVE_SLOT_COUNT = 6;
let currentRenderedText = '';
let choiceRevealPending = false;
let settingsReturnScreen = titleScreen;
let archiveReaderId = '';
let archiveVisitCount = 0;
let phoneMessageIndex = 0;

// --- Audio (Placeholder, no music) ---
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

// --- Ending definitions ---
const ENDINGS = {
    end_mizore: {
        id: 'end_mizore',
        startNode: 'end_mizore',
        cardId: 'card-mizore',
        finalNode: 'end_mizore_5'
    },
    end_yura: {
        id: 'end_yura',
        startNode: 'end_yura',
        cardId: 'card-yura',
        finalNode: 'end_yura_7'
    },
    end_roro: {
        id: 'end_roro',
        startNode: 'end_roro',
        cardId: 'card-roro',
        finalNode: 'end_roro_6'
    },
    end_zetsu: {
        id: 'end_zetsu',
        startNode: 'end_zetsu',
        cardId: 'card-zetsu',
        finalNode: 'end_zetsu_6'
    },
    end_ekuro: {
        id: 'end_ekuro',
        startNode: 'end_ekuro',
        cardId: 'card-ekuro',
        finalNode: 'end_ekuro_6'
    },
    end_mahiru: {
        id: 'end_mahiru',
        startNode: 'end_mahiru',
        cardId: 'card-mahiru',
        finalNode: 'end_mahiru_6'
    },
    end_sai: {
        id: 'end_sai',
        startNode: 'end_sai',
        cardId: 'card-sai',
        finalNode: 'end_sai_6'
    },
    end_yoi: {
        id: 'end_yoi',
        startNode: 'end_yoi',
        cardId: 'card-yoi',
        finalNode: 'end_yoi_6'
    },
    end_hina: {
        id: 'end_hina',
        startNode: 'end_hina',
        cardId: 'card-hina',
        finalNode: 'end_hina_6'
    },
    end_rinbaku: {
        id: 'end_rinbaku',
        startNode: 'end_rinbaku',
        cardId: 'card-rinbaku',
        finalNode: 'end_rinbaku_8'
    },
    end_rinbaku_true: {
        id: 'end_rinbaku_true',
        startNode: 'end_rinbaku_true',
        cardId: 'card-rinbaku-true',
        finalNode: 'end_rinbaku_true_8',
        requires: 'all_bad'
    }
};

const REQUIRED_BAD_ENDINGS = [
    'end_mizore',
    'end_yura',
    'end_roro',
    'end_zetsu',
    'end_ekuro',
    'end_mahiru',
    'end_sai',
    'end_yoi',
    'end_hina',
    'end_rinbaku'
];

// The web edition is designed for a short viral play cycle. Requiring every
// route would turn the shared opening into ten nearly identical replays.
const DAWN_FRAGMENT_THRESHOLD = 3;

const SCORE_KEYS = [...REQUIRED_BAD_ENDINGS];

const CHARACTER_UNLOCKS = {
    maki: 'end_rinbaku_true',
    mizore: 'end_mizore',
    yura: 'end_yura',
    roro: 'end_roro',
    zetsu: 'end_zetsu',
    ekuro: 'end_ekuro',
    mahiru: 'end_mahiru',
    sai: 'end_sai',
    yoi: 'end_yoi',
    hina: 'end_hina',
    rinbaku: 'end_rinbaku'
};

const CHARACTER_DOSSIERS = {
    maki: {
        status: '被驗者 / ACTIVE',
        phase: 'No.0 // 主診斷對象',
        appearance: '枯葉紅濾鏡中的瘦弱病人。指甲縫常殘留壁癌粉末，口袋裡有黑卡、藥盒與抗噪耳機。',
        personality: '以冷笑話、消費、創作與病徵命名維持自我邊界。她不是想傷害誰，只是不知道怎麼不被痛苦吞掉。',
        notes: '所有路線的發病中心。她的選擇不是自由意志，而是不同防衛機制的自動書寫。'
    },
    mizore: {
        status: '妄想體 / CONSTRUCT',
        phase: 'Phase 1 // The Golden Delusion',
        appearance: '表層：茶褐長髮、藍眼睛與乾淨白洋裝，帶繡球花、曬過床單和雨後石階的淡香。污染後：白裙逐寸染成黑白維多利亞洋裝，左臉化為開裂陶瓷，肘膝浮出球體關節。',
        personality: '溫柔、乾淨、永遠配合劇本。她沒有拒絕能力，因此成為最安全也最危險的女主角。',
        notes: '對應重度解離與幻想伴侶。她保存蒔的美感與敘事能力，但也能把蒔永遠鎖進玩偶屋。'
    },
    yura: {
        status: '妄想體 / MIRROR',
        phase: 'Phase 2 // The Red Anxiety',
        appearance: '表層：蜜糖色短髮、玫紅眼睛、改短制服與碎亮片蝴蝶結，身上有蜜桃唇膏和烤甜麵包的香氣。污染後：制服增生為黑粉短外套，飾品變成玻璃與眼球，臉裂成替蒔做表情的化妝鏡。',
        personality: '甜美但刻薄。她說的是惡作劇，蒔聽見的是父母、網路、社會與自我厭惡的混聲。',
        notes: '對應自戀性暴怒與自我審判。她讓攻擊看起來像防衛，讓自傷看起來像奪回權力。'
    },
    roro: {
        status: '妄想體 / RECORDER',
        phase: 'Phase 3 // Dissociation Log',
        appearance: '表層：灰黑長髮、安靜的深色眼睛、定位碼般整齊的格紋裙與手寫板，靠近時有乾淨紙張、洗髮精和電子零件微熱的味道。污染後：頭部變成厚重 CRT，指尖垂下 USB、VGA 與斷裂接頭。',
        personality: '無情、精準、非人。她不阻止災難，只把災難轉成可儲存的資料。',
        notes: '對應創傷當下的徹底抽離。身體留在現場，意識退成錄音機：不是我，只是資料。'
    },
    zetsu: {
        status: '妄想體 / ALARM',
        phase: 'Phase 3 // Chaotic Mania',
        appearance: '表層：黑色高馬尾、紅色舞台服、清亮紅眼與練習留下薄繭的溫暖手掌，髮梢有舞台煙霧和柑橘洗髮精的味道。污染後：舞台袖帶纏成鮮紅拘束衣，雙手焦黑，喉嚨長出擴音器。',
        personality: '煽動、熱烈、正義成癮。她把羞恥點燃成革命，把自毀翻譯成英雄敘事。',
        notes: '對應毀滅衝動與躁性爆發。她讓蒔第一次感到爽快，也讓蒔最接近真正傷害他人。'
    },
    ekuro: {
        status: '妄想體 / PADDED CELL',
        phase: 'Phase 4 // Regression',
        appearance: '表層：麥穗般的金色長髮、濕潤綠眼與米黃色針織衫，帶奶油、蘋果和洗衣精的居家香味。污染後：身形被柔軟棉墊般的輪廓放大，手臂異常延長，胸前垂下氧氣面罩，甜香逐漸腐敗。',
        personality: '慈愛到令人窒息。她不責備蒔，只剝奪蒔站起來的必要。',
        notes: '對應退行。不是想死，而是想回到還沒出生以前，回到不需要負責的羊水裡。'
    },
    mahiru: {
        status: '妄想體 / OVEREXPOSURE',
        phase: 'Phase 2 // Sensory Overload',
        appearance: '表層：蜂蜜色肌膚、會反光的金髮、螢光髮圈與毫不節省的笑容，聞起來像柑橘汽水、防曬乳和剛運動完的暖意。污染後：金髮被過曝白光燒成霓虹白並不自然地拉長，眼睛變成無影燈。',
        personality: '過度明亮、過度樂觀、過度接近。她的善意像噪音，照亮所有想藏起來的地方。',
        notes: '對應感官過載與強制樂觀。她讓蒔覺得「我很好」，直到身體被光燒乾。'
    },
    sai: {
        status: '妄想體 / PROCEDURE',
        phase: 'Phase 4 // Cold Abyss',
        appearance: '表層：落在鎖骨的深藍長髮、灰藍眼睛與剪裁如晚禮服的深藍制服，帶消毒酒精和冷冽香水。污染後：制服顯出刷手服結構，細長指尖化為藏在皮膚裡的手術刀，手中多出福馬林罐。',
        personality: '冷靜、優雅、非情緒化。她不處罰蒔，她只把蒔修成安靜。',
        notes: '對應治療、重置、認知切除。她代表那種看似成功，實則把痛覺與自我一起削薄的平靜。'
    },
    yoi: {
        status: '妄想體 / IV DRIP',
        phase: 'Phase 2-4 // Sedation',
        appearance: '表層：淡紫長髮、半睜睡眼與寬大針織外套，懷抱有乾淨枕套、甜牛奶和晚安前的柔香。污染後：雙腿被床單吞沒，髮絲間垂下透明輸液管，紫色液體把擁抱變成甜味沼澤。',
        personality: '溫柔、睏倦、誘惑。她從不命令蒔死，只邀請蒔不要再醒。',
        notes: '對應慢性自殺與藥物依賴。她是最安靜的壞結局，也是最像休息的深淵。'
    },
    hina: {
        status: '外部介入 / OWNER',
        phase: 'Special // Capitalized Sin',
        appearance: '表層：一絲不亂的烏黑長髮、黑色晚禮服、珍珠耳墜與高級香水，靠近時還有紅酒與新鈔拆封的乾燥氣味。污染後：她本人的美貌幾乎不變，變形的是周圍——紅酒杯、鑲鑽項圈、高樓夜景與金色鳥籠依次出現。',
        personality: '優雅、危險、收藏家式的溫柔。她不否定蒔的瘋狂，她替瘋狂標價。',
        notes: '對應金錢焦慮與所有權。她不是救贖，而是「只要有錢，連妄想都能被包養」。'
    },
    rinbaku: {
        status: '妄想體 / DOORKEEPER',
        phase: 'Unknown // The Gravity',
        appearance: '表層：煙粉棕及肩髮、灰紫眼睛、粉色制服與腰側針線盒，帶皂香、曬乾衣物和淡淡藥草味；抓住蒔時掌心是真人的溫熱。污染後：她沒有華麗變形，只有影子長成黑色荊棘；額角傷口與瘀青會固執地延續到下一幕。',
        personality: '溫柔、執著、擅長扮演青梅竹馬。無論被推開、辱罵或毆打，她都會在下一個場景再次出現。',
        notes: '病歷將她暫列為「上鎖病房門的擬人化」。來源不明。接觸時可測得體溫；此項紀錄被患者判定為系統錯誤。'
    }
};

// What Mai believes she is reading before the archive contaminates itself.
// These records are deliberately ordinary: she is at school, and the reader
// has no authority to diagnose her friends before she does.
const SCHOOL_DOSSIERS = {
    maki: {
        status: '學生 / 在籍',
        phase: 'No.0 // 同好會製作人',
        appearance: '纖瘦、短髮，習慣戴著抗噪耳機。制服口袋塞滿票根、黑卡與寫到一半的企劃紙。',
        personality: '嘴硬、敏銳、擅長用冷笑話收拾尷尬。把每個人的舞台記得比自己的作息更清楚。',
        notes: '最近常在放學後留得太晚。本人堅稱只是社團工作。'
    },
    mizore: {
        status: '學生 / 戲劇組', phase: 'No.1 // 表演科',
        appearance: '茶褐長髮、藍眼睛與乾淨白洋裝；靠近時像繡球花、曬過的床單和雨後石階。',
        personality: '端莊、細膩，總能接住別人的台詞。對蒔的注視比對舞台燈更敏感。',
        notes: '替蒔保留靠窗的位置。沒有人記得她何時開始這麼做。'
    },
    yura: {
        status: '學生 / 宣傳組', phase: 'No.2 // 一年級',
        appearance: '蜜糖色短髮、玫紅眼睛、改短制服與碎亮片蝴蝶結，帶蜜桃唇膏與烤麵包香。',
        personality: '愛漂亮、好勝、惡作劇成癮；生氣也像撒嬌，直到玩笑真的打中痛處。',
        notes: '在蒔的譜架貼了十七張貼紙。位置圖由ロロ保管。'
    },
    roro: {
        status: '學生 / 紀錄組', phase: 'No.3 // 資訊科',
        appearance: '灰黑長髮、深色眼睛與整齊格紋裙，身上有紙張、洗髮精和電子零件微熱的氣味。',
        personality: '寡言、精準，習慣先記錄再反應。手寫板上的表情比本人豐富。',
        notes: '群組人數與帳號數不一致時，只有她沒有覺得奇怪。'
    },
    zetsu: {
        status: '學生 / 舞台組', phase: 'No.4 // 二年級',
        appearance: '黑色高馬尾、紅色舞台服、清亮紅眼；掌心溫暖，髮梢有舞台煙霧與柑橘洗髮精。',
        personality: '熱烈、正直、音量永遠比場合大一格。相信喜歡就該震動整棟校舍。',
        notes: '紫色便當並非化學事故。本人拒絕撤回此說法。'
    },
    ekuro: {
        status: '學生 / 生活組', phase: 'No.5 // 交換生',
        appearance: '麥穗般金色長髮、綠眼與米黃針織衫，帶奶油、蘋果和洗衣精的居家香味。',
        personality: '寬厚、慢條斯理，擁抱時會先問冷不冷。溫柔得讓人忘記該回家。',
        notes: '保健室的枕套總在她值日時換洗。'
    },
    mahiru: {
        status: '學生 / 活動組', phase: 'No.6 // 二年級',
        appearance: '蜂蜜色肌膚、反光金髮與螢光髮圈，聞起來像柑橘汽水、防曬乳和運動後的暖意。',
        personality: '開朗、健談、冷笑話不計成本。最擅長把沉默說成大家一起休息。',
        notes: '她拍的合照裡，窗邊偶爾會多出一個沒有入社的人。'
    },
    sai: {
        status: '學生 / 服裝組', phase: 'No.7 // 三年級',
        appearance: '深藍長髮、灰藍眼睛與剪裁如晚禮服的制服，帶消毒酒精和冷冽香水。',
        personality: '成熟、從容、方向感不佳。替人整理衣領時不允許對方躲開。',
        notes: '曾在同一層樓迷路四十分鐘。成熟的人只是選了較長的路。'
    },
    yoi: {
        status: '學生 / 作曲組', phase: 'No.8 // 三年級',
        appearance: '淡紫長髮、半睜睡眼與寬大針織外套，懷裡有枕套、甜牛奶和晚安前的柔香。',
        personality: '慵懶、體貼，常把休息說成最重要的排練。借出半個枕頭後會把另一半也推過來。',
        notes: '沒有人見過她趕早八，點名簿卻從未缺席。'
    },
    hina: {
        status: '學生 / 校外顧問', phase: 'No.9 // 贊助代表',
        appearance: '烏黑長髮、黑色洋裝、珍珠耳墜與高級香水，還有紅酒和新鈔拆封般的乾燥氣味。',
        personality: '優雅、果斷，把照顧說得像收購。她認為門不肯開時，買下建築比較有效率。',
        notes: '校方查無她的學籍，卻每學期都收到她署名的器材。'
    },
    rinbaku: {
        status: '學生 / 臨時社員', phase: 'No.10 // 轉入日期不明',
        appearance: '煙粉棕及肩髮、灰紫眼睛、粉色制服與腰側針線盒，帶皂香、曬乾衣物和藥草味。',
        personality: '溫柔、固執，似乎早已熟悉蒔的每一種壞脾氣。被推開後仍會站在能看見她的位置。',
        notes: '她說自己和蒔一起長大。群組沒有加入紀錄，班級座位表卻有被橡皮擦掉的凹痕。'
    }
};

function isArchivePolluted() {
    return localStorage.getItem('ward13_polluted') === '1' || Object.keys(getUnlockedEndings()).length > 0;
}

function installArchiveMotifs() {
    if (!story?.start || story.start.text.includes('三坪。我走了七分鐘')) return;

    story.start.text = story.start.text
        .replace('PATIENT No.0 // AKIBA MAI // OBSERVATION CONTINUES', 'STUDENT No.0 // AKIBA MAI // CLUB ATTENDANCE CONTINUES')
        + '\n\n校內地圖說這間社辦只有三坪。我走了七分鐘，還沒走到另一面牆。';

    story.p1_3.text = story.p1_3.text.replace(
        '\n\n霙微笑著靠近我。',
        "\n\n走廊告示牌一閃而過：<a class='archive-link' href='./404.html'>缺席學生資料 // 404</a>。我再看時，那裡只剩一張褪色的校慶海報。\n\n霙微笑著靠近我。"
    );

    story.p2_1.text = story.p2_1.text.replace(
        '\n\n腦內字幕自動校正：',
        "\n\n她身後的樓梯扶手少了一枚生鏽卡扣。我攤開掌心，那枚卡扣不知何時躺在那裡，像我曾拆掉逃生門，又忘記自己為什麼需要逃。\n\n<span class='glitch-text anomaly-trigger' data-anomaly='attendance' role='button' tabindex='0'>腦內字幕自動校正：</span>"
    );

    story.p3_1.text = "<span class='glitch-text anomaly-trigger' data-anomaly='subtitle' role='button' tabindex='0'>字幕軌道：只有我聽得見</span>\n\n" + story.p3_1.text;

    story.p2_2.text = story.p2_2.text
        .replace(
            '我們花那麼多錢栽培妳，養出一個只會找藉口的失敗品。',
            '我們花那麼多錢栽培妳，養出一個只會找藉口的失敗品。\n妳的賠償可以借家裡周轉，妳的人卻不能留在家裡白吃。\n手機拿來。聊天紀錄拿來。連受傷都不准有自己的版本。'
        )
        .replace(
            '其中一張嘴曾經陪我玩遊戲，另一張曾在我怕黑時讓我握著手睡。',
            '其中一張嘴曾經陪我玩賽車遊戲，讓我坐在膝上握方向盤；另一張曾在我怕黑時讓我握著手睡。'
        );

    story.p4_3.text = story.p4_3.text.replace(
        '\n\n門縫裡沒有白光。',
        '\n\n門外傳來一首走調的童謠。地下室的人說只要憋住呼吸，神就會替大家實現願望。我想許願回到十五歲，又怕十五歲的我仍然住在這裡。\n\n門縫裡沒有白光。'
    );
}

// ============================================================
// INITIALIZATION
// ============================================================

function init() {
    try {
        installArchiveMotifs();
        initArchiveLayer();
        // The chat archive comes first. The content warning is revealed only
        // after the reader opens (or skips) the recovered attachment.
        if (btnEnter) {
            btnEnter.addEventListener('click', () => {
                warningScreen.classList.remove('active');
                warningScreen.classList.add('hidden');
                revealTitleScreen();
            });
        }
        // Fallback: also try old ID
        const btnEnterOld = document.getElementById('btn-nter');
        if (btnEnterOld && !btnEnter) {
            btnEnterOld.addEventListener('click', () => {
                warningScreen.classList.remove('active');
                warningScreen.classList.add('hidden');
                titleScreen.classList.remove('hidden');
                setTimeout(() => titleScreen.classList.add('active'), 100);
            });
        }

        // Title buttons
        if (btnStart) btnStart.addEventListener('click', startGame);
        if (btnLoad) btnLoad.addEventListener('click', loadGame);
        if (btnOpenArchive) btnOpenArchive.addEventListener('click', showContentWarning);
        if (btnSkipChat) btnSkipChat.addEventListener('click', showContentWarning);
        if (phoneScreen) {
            phoneScreen.addEventListener('click', (event) => {
                if (event.target.closest('button')) return;
                revealNextPhoneMessage();
            });
            phoneScreen.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                revealNextPhoneMessage();
            });
        }

        // Gameplay click to advance
        if (gameplayScreen) {
            gameplayScreen.addEventListener('click', (e) => {
                const anomaly = e.target.closest('.anomaly-trigger');
                if (anomaly) {
                    e.preventDefault();
                    showInlineAnomaly(anomaly.dataset.anomaly);
                    return;
                }
                const archiveLink = e.target.closest('a.archive-link');
                if (archiveLink) {
                    saveGame();
                    sessionStorage.setItem('ward13_return_from_404', '1');
                    return;
                }
                if (e.target.closest('a')) return;
                if (e.target.tagName === 'BUTTON') return;
                if (e.target.closest('.ui-controls')) return;
                if (e.target.closest('.log-overlay')) return;

                // Clicking outside an open choice list means "not yet". It
                // closes the list without selecting or advancing the story.
                if (choicesContainer.classList.contains('active')) {
                    dismissChoices();
                    return;
                }

                if (isTyping) {
                    completeText();
                } else {
                    advanceStory();
                }
            });
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && quickSaveOverlay && !quickSaveOverlay.classList.contains('hidden')) {
                hideQuickSaveOverlay();
                return;
            }
            if (event.key === 'Escape' && choicesContainer.classList.contains('active')) {
                dismissChoices();
            }
        });

        // Control buttons
        if (btnMenu) btnMenu.addEventListener('click', showTitleScreen);
        if (btnAuto) btnAuto.addEventListener('click', toggleAuto);
        if (btnLog) btnLog.addEventListener('click', toggleLog);
        if (btnCloseLog) btnCloseLog.addEventListener('click', toggleLog);
        if (btnSave) btnSave.addEventListener('click', showQuickSaveOverlay);
        if (btnCloseQuickSave) btnCloseQuickSave.addEventListener('click', hideQuickSaveOverlay);
        if (quickSaveOverlay) quickSaveOverlay.addEventListener('click', (event) => {
            event.stopPropagation();
            if (event.target === quickSaveOverlay) hideQuickSaveOverlay();
        });

        // Settings
        if (btnSettings) btnSettings.addEventListener('click', () => {
            settingsReturnScreen = titleScreen;
            renderSaveSlots();
            showScreen(settingsScreen, titleScreen);
        });
        if (btnGameSettings) btnGameSettings.addEventListener('click', () => {
            settingsReturnScreen = gameplayScreen;
            saveGame();
            renderSaveSlots();
            showScreen(settingsScreen, gameplayScreen);
        });
        if (btnBackSettings) btnBackSettings.addEventListener('click', () => showScreen(settingsReturnScreen, settingsScreen));

        // Gallery
        if (btnGallery) btnGallery.addEventListener('click', () => {
            updateGalleryCards();
            showScreen(galleryScreen, titleScreen);
        });
        if (btnBackGallery) btnBackGallery.addEventListener('click', () => showScreen(titleScreen, galleryScreen));

        // Characters Database
        if (btnChars) btnChars.addEventListener('click', () => {
            updateCharacterCards();
            showScreen(charsScreen, titleScreen);
        });
        if (btnBackChars) btnBackChars.addEventListener('click', () => showScreen(titleScreen, charsScreen));

        // Character card expand/collapse
        document.querySelectorAll('.char-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('locked')) return;
                const wasExpanded = card.classList.contains('expanded');
                // Collapse all others
                document.querySelectorAll('.char-card.expanded').forEach(c => c.classList.remove('expanded'));
                // Toggle this one
                if (!wasExpanded) card.classList.add('expanded');
            });
        });

        // Settings sliders
        if (brightnessSlider) brightnessSlider.addEventListener('input', (e) => {
            updateBrightness(e.target.value);
            document.getElementById('brightness-val').textContent = e.target.value;
        });

        if (typespeedSlider) typespeedSlider.addEventListener('input', (e) => {
            typeSpeed = parseInt(e.target.value);
            localStorage.setItem('ward13_typespeed', typeSpeed);
            document.getElementById('typespeed-val').textContent = typeSpeed + 'ms';
        });

        if (autospeedSlider) autospeedSlider.addEventListener('input', (e) => {
            autoPlayDelay = parseFloat(e.target.value) * 1000;
            localStorage.setItem('ward13_autospeed', e.target.value);
            document.getElementById('autospeed-val').textContent = parseFloat(e.target.value).toFixed(1) + 's';
        });

        // Fullscreen button
        if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

        // Save from settings
        if (btnSaveSettings) btnSaveSettings.addEventListener('click', () => {
            manualSave();
        });
        // Normalize the hidden directory immediately so assistive technology,
        // crawlers and fast readers do not see diagnostic labels before Mai.
        updateCharacterCards();
        if (btnLoadSlot) btnLoadSlot.addEventListener('click', () => loadManualSlot(activeSaveSlot));
        if (btnDeleteSlot) btnDeleteSlot.addEventListener('click', () => deleteManualSlot(activeSaveSlot));

        // Clear save button
        if (btnClearSave) btnClearSave.addEventListener('click', clearSave);

        // Load saved settings
        loadSettings();
        renderSaveSlots();

        // Check for saved game
        if (btnLoad && !hasAnySave()) {
            btnLoad.style.display = 'none';
        }
        const returnFrom404 = sessionStorage.getItem('ward13_return_from_404') === '1';
        const returnSave = localStorage.getItem('ward13_save');
        if (returnFrom404 && returnSave) {
            sessionStorage.removeItem('ward13_return_from_404');
            phoneScreen?.classList.add('hidden');
            warningScreen?.classList.add('hidden');
            titleScreen.classList.remove('hidden');
            titleScreen.classList.add('active');
            loadState(JSON.parse(returnSave));
        } else {
            sessionStorage.removeItem('ward13_return_from_404');
            showPhonePrologue();
        }
        console.log('WARD_13 init OK — all listeners bound');
    } catch (err) {
        console.error('WARD_13 init FAILED:', err);
    }
}

// ============================================================
// SETTINGS
// ============================================================

function loadSettings() {
    const savedBrightness = localStorage.getItem('ward13_brightness');
    if (savedBrightness) {
        if (brightnessSlider) brightnessSlider.value = savedBrightness;
        updateBrightness(savedBrightness);
        const bVal = document.getElementById('brightness-val');
        if (bVal) bVal.textContent = savedBrightness;
    }

    const savedTypeSpeed = localStorage.getItem('ward13_typespeed');
    if (savedTypeSpeed) {
        typeSpeed = parseInt(savedTypeSpeed);
        if (typespeedSlider) typespeedSlider.value = typeSpeed;
        const tVal = document.getElementById('typespeed-val');
        if (tVal) tVal.textContent = typeSpeed + 'ms';
    }

    const savedAutoSpeed = localStorage.getItem('ward13_autospeed');
    if (savedAutoSpeed) {
        autoPlayDelay = parseFloat(savedAutoSpeed) * 1000;
        if (autospeedSlider) autospeedSlider.value = savedAutoSpeed;
        const aVal = document.getElementById('autospeed-val');
        if (aVal) aVal.textContent = parseFloat(savedAutoSpeed).toFixed(1) + 's';
    }
}

function updateBrightness(val) {
    const b = 0.5 + (val / 100) * 1.5;
    document.body.style.filter = `brightness(${b})`;
    localStorage.setItem('ward13_brightness', val);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
    } else {
        document.exitFullscreen().catch(() => { });
    }
}

function clearSave() {
    const confirmed = confirm('確定要刪除所有存檔與結局解鎖嗎？\n此操作無法復原。');
    if (confirmed) {
        localStorage.removeItem('ward13_save');
        localStorage.removeItem('ward13_save_slots');
        localStorage.removeItem('ward13_endings');
        localStorage.removeItem('ward13_active_slot');
        localStorage.removeItem('ward13_polluted');
        sessionStorage.removeItem('ward13_return_from_404');
        activeSaveSlot = 1;
        renderSaveSlots();
        updateGalleryCards();
        updateCharacterCards();
        if (btnLoad) btnLoad.style.display = 'none';
        alert('所有存檔已刪除。');
    }
}

function showInlineAnomaly(kind) {
    if (document.querySelector('.inline-anomaly-overlay')) return;
    const messages = {
        attendance: [
            'ATTENDANCE RECORD OVERWRITE',
            '點名人數：11 → 12 → 11',
            '系統沒有新增學生。系統只是暫時承認她坐在那裡。'
        ],
        subtitle: [
            'SUBTITLE TRACK // NOT FOR PLAYER',
            '「不要醒來」已被校正為「早安」。',
            '字幕修改者：AKIBA MAI　修改時間：尚未發生'
        ]
    };
    const lines = messages[kind] || messages.subtitle;
    const overlay = document.createElement('div');
    overlay.className = 'inline-anomaly-overlay';
    overlay.setAttribute('role', 'status');
    overlay.innerHTML = `<strong>${lines[0]}</strong><span>${lines[1]}</span><small>${lines[2]}</small>`;
    gameplayScreen.appendChild(overlay);
    window.setTimeout(() => overlay.classList.add('fading'), 2200);
    window.setTimeout(() => overlay.remove(), 3000);
}

function revealTitleScreen() {
    titleScreen.classList.remove('hidden');
    setTimeout(() => titleScreen.classList.add('active'), 100);
}

function showPhonePrologue() {
    if (!phoneScreen) {
        revealTitleScreen();
        return;
    }

    phoneScreen.classList.remove('hidden');
    setTimeout(() => phoneScreen.classList.add('active'), 50);
    const items = phoneScreen.querySelectorAll('[data-delay]');
    items.forEach(item => {
        item.classList.remove('revealed');
        item.hidden = true;
        item.setAttribute('aria-hidden', 'true');
    });
    phoneScreen.classList.remove('phone-corrupted');
    phoneMessageIndex = 0;
    if (btnOpenArchive) btnOpenArchive.disabled = true;

    // Give the reader a believable starting point, then wait for deliberate taps.
    revealNextPhoneMessage();
    revealNextPhoneMessage();
}

function revealNextPhoneMessage() {
    if (!phoneScreen || phoneScreen.classList.contains('hidden')) return;
    const items = phoneScreen.querySelectorAll('[data-delay]');
    if (phoneMessageIndex >= items.length) return;

    const item = items[phoneMessageIndex++];
    item.hidden = false;
    item.classList.add('revealed');
    item.setAttribute('aria-hidden', 'false');
    if (item.classList.contains('corrupted')) {
        phoneScreen.classList.add('phone-corrupted');
    }
    item.scrollIntoView({ block: 'end', behavior: 'smooth' });

    if (phoneMessageIndex >= items.length) {
        if (btnOpenArchive) btnOpenArchive.disabled = false;
        const hint = document.getElementById('phone-tap-hint');
        if (hint) hint.textContent = '附件已完成接收';
        document.title = '（1）未授權附件：PATIENT_00.html';
    }
}

function showContentWarning() {
    if (phoneScreen) {
        phoneScreen.classList.remove('active');
        phoneScreen.classList.add('hidden');
    }
    if (warningScreen) {
        warningScreen.classList.remove('hidden');
        setTimeout(() => warningScreen.classList.add('active'), 50);
    }
}

function initArchiveLayer() {
    archiveReaderId = localStorage.getItem('ward13_reader_id') || createArchiveReaderId();
    localStorage.setItem('ward13_reader_id', archiveReaderId);

    archiveVisitCount = parseInt(localStorage.getItem('ward13_visit_count') || '0', 10) + 1;
    localStorage.setItem('ward13_visit_count', archiveVisitCount);

    const clearance = document.getElementById('reader-clearance');
    if (clearance) {
        const unlocked = getUnlockedEndings();
        const fragments = REQUIRED_BAD_ENDINGS.filter(key => unlocked[key]).length;
        clearance.textContent = `READER No.14-${archiveReaderId} // VISIT ${String(archiveVisitCount).padStart(2, '0')} // FRAGMENTS ${Math.min(fragments, DAWN_FRAGMENT_THRESHOLD)}/${DAWN_FRAGMENT_THRESHOLD}`;
    }

    const returnMessages = [
        'WARD_13／虫單蟲虫虫虫',
        '虫單蟲虫虫虫 // 妳上次沒有讀完',
        '鄰縛：小蒔，妳還在嗎？',
        `READER 14-${archiveReaderId} // OBSERVATION CONTINUES`
    ];
    document.title = returnMessages[Math.min(archiveVisitCount - 1, returnMessages.length - 1)];

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = '（1）鄰縛：不要把我留在這裡';
        } else {
            document.title = returnMessages[Math.min(archiveVisitCount - 1, returnMessages.length - 1)];
        }
    });

    console.info(`ARCHIVE: READER 14-${archiveReaderId} REGISTERED`);
    console.info('ARCHIVE: 她不是青梅竹馬。病歷知道，但患者不知道。');
}

function createArchiveReaderId() {
    const seed = `${Date.now()}-${Math.random()}-${navigator.userAgent.length}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(16).toUpperCase().padStart(6, '0').slice(0, 6);
}

function getSaveSlots() {
    const data = localStorage.getItem('ward13_save_slots');
    if (!data) return {};
    try {
        return JSON.parse(data) || {};
    } catch {
        return {};
    }
}

function setSaveSlots(slots) {
    localStorage.setItem('ward13_save_slots', JSON.stringify(slots));
}

function getSlotLabel(slotIndex) {
    return 'SLOT ' + String(slotIndex).padStart(2, '0');
}

function getNodeLabel(nodeId) {
    const node = story[nodeId];
    if (!node) return nodeId || 'UNKNOWN';
    if (node.phase) {
        const phaseMap = {
            'phase-1': 'Phase 1',
            'phase-2': 'Phase 2',
            'phase-3': 'Phase 3',
            'phase-4': 'Phase 4'
        };
        return (phaseMap[node.phase] || node.phase) + ' // ' + nodeId;
    }
    return nodeId;
}

function formatSlotTime(timestamp) {
    if (!timestamp) return 'EMPTY';
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return 'UNKNOWN TIME';
    return date.toLocaleString('zh-TW', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function hasAnySave() {
    const slots = getSaveSlots();
    return !!localStorage.getItem('ward13_save') || Object.keys(slots).length > 0;
}

function getLatestManualSlot() {
    const slots = getSaveSlots();
    let latest = null;
    Object.entries(slots).forEach(([slot, data]) => {
        if (!data?.timestamp) return;
        if (!latest || data.timestamp > latest.timestamp) {
            latest = { slot: parseInt(slot, 10), ...data };
        }
    });
    return latest;
}

function renderSaveSlots() {
    if (!saveSlotGrid) return;
    const slots = getSaveSlots();
    saveSlotGrid.innerHTML = '';

    for (let i = 1; i <= SAVE_SLOT_COUNT; i++) {
        const data = slots[i];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'save-slot-btn';
        btn.classList.toggle('active', i === activeSaveSlot);
        btn.classList.toggle('filled', !!data);
        btn.innerHTML = `<span>${getSlotLabel(i)}</span><small>${data ? formatSlotTime(data.timestamp) : 'EMPTY'}</small>`;
        btn.addEventListener('click', () => {
            activeSaveSlot = i;
            localStorage.setItem('ward13_active_slot', String(i));
            renderSaveSlots();
            updateQuickSaveControl();
        });
        saveSlotGrid.appendChild(btn);
    }

    if (saveSlotInfo) {
        const data = slots[activeSaveSlot];
        saveSlotInfo.textContent = data
            ? `${getSlotLabel(activeSaveSlot)} // ${formatSlotTime(data.timestamp)} // ${data.nodeLabel || 'UNKNOWN'}`
            : `${getSlotLabel(activeSaveSlot)} // EMPTY`;
    }
    updateQuickSaveControl();
}

function updateQuickSaveControl() {
    if (btnSave && !btnSave.classList.contains('active')) btnSave.textContent = 'SAVE';
}

function showQuickSaveOverlay() {
    if (!quickSaveOverlay || !quickSaveGrid) return;
    const slots = getSaveSlots();
    quickSaveGrid.innerHTML = '';
    for (let i = 1; i <= SAVE_SLOT_COUNT; i++) {
        const data = slots[i];
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'save-slot-btn';
        button.classList.toggle('filled', !!data);
        button.innerHTML = `<span>${getSlotLabel(i)}</span><small>${data ? `${formatSlotTime(data.timestamp)} // ${data.nodeLabel || 'UNKNOWN'}` : 'EMPTY'}</small>`;
        button.addEventListener('click', () => {
            manualSave(i);
            hideQuickSaveOverlay();
        });
        quickSaveGrid.appendChild(button);
    }
    quickSaveOverlay.classList.remove('hidden');
    quickSaveOverlay.classList.add('active');
}

function hideQuickSaveOverlay() {
    if (!quickSaveOverlay) return;
    quickSaveOverlay.classList.add('hidden');
    quickSaveOverlay.classList.remove('active');
}

// ============================================================
// SCREEN TRANSITIONS
// ============================================================

function showScreen(show, hide) {
    hide.classList.remove('active');
    setTimeout(() => {
        hide.classList.add('hidden');
        show.classList.remove('hidden');
        show.classList.add('active');
    }, 500);
}

function showGameplay(callback) {
    titleScreen.classList.remove('active');
    setTimeout(() => {
        titleScreen.classList.add('hidden');
        gameplayScreen.classList.remove('hidden');
        gameplayScreen.classList.add('active');
        if (callback) callback();
    }, 500);
}

function showTitleScreen() {
    saveGame();
    gameplayScreen.classList.remove('active');
    // Close log if open
    logOverlay.classList.add('hidden');
    setTimeout(() => {
        gameplayScreen.classList.add('hidden');
        titleScreen.classList.remove('hidden');
        titleScreen.classList.add('active');
        if (btnLoad && localStorage.getItem('ward13_save')) {
            btnLoad.style.display = '';
        }
    }, 500);
}

// ============================================================
// GAME FLOW
// ============================================================

function startGame() {
    gameState = {
        currentNode: shouldShowWhiteDoor() ? 'white_door' : 'start',
        history: [],
        scores: createInitialScores(),
        pendingEcho: '',
        atEnding: false
    };
    showGameplay(() => {
        renderNode(gameState.currentNode);
    });
}

function loadGame() {
    const latest = getLatestManualSlot();
    if (latest?.state) {
        activeSaveSlot = latest.slot;
        localStorage.setItem('ward13_active_slot', String(activeSaveSlot));
        loadState(latest.state);
        return;
    }

    const saved = localStorage.getItem('ward13_save');
    if (saved) {
        loadState(JSON.parse(saved));
    }
}

function saveGame() {
    localStorage.setItem('ward13_save', JSON.stringify(gameState));
}

function loadState(state) {
    gameState = state;
    if (!gameState.history) gameState.history = [];
    if (!gameState.scores) gameState.scores = createInitialScores();
    if (gameState.pendingEcho === undefined) gameState.pendingEcho = '';
    if (gameState.atEnding === undefined) gameState.atEnding = false;
    renderSaveSlots();
    showGameplay(() => {
        renderNode(gameState.currentNode);
    });
}

function manualSave(slotIndex = activeSaveSlot) {
    activeSaveSlot = slotIndex;
    localStorage.setItem('ward13_active_slot', String(activeSaveSlot));
    const slots = getSaveSlots();
    slots[activeSaveSlot] = {
        timestamp: Date.now(),
        nodeLabel: getNodeLabel(gameState.currentNode),
        state: JSON.parse(JSON.stringify(gameState))
    };
    setSaveSlots(slots);
    saveGame();
    renderSaveSlots();
    if (btnLoad) btnLoad.style.display = '';

    if (btnSave) {
        const original = btnSave.textContent;
        btnSave.textContent = 'SAVED ✓';
        btnSave.classList.add('active');
        setTimeout(() => {
            btnSave.textContent = original;
            btnSave.classList.remove('active');
        }, 1500);
    }
    if (btnSaveSettings) {
        const original = btnSaveSettings.textContent;
        btnSaveSettings.textContent = 'SAVED';
        setTimeout(() => {
            btnSaveSettings.textContent = original;
        }, 1200);
    }
}

function loadManualSlot(slotIndex) {
    const slot = getSaveSlots()[slotIndex];
    if (!slot?.state) {
        alert(`${getSlotLabel(slotIndex)} 是空的。`);
        return;
    }
    loadState(slot.state);
}

function deleteManualSlot(slotIndex) {
    const slots = getSaveSlots();
    if (!slots[slotIndex]) {
        alert(`${getSlotLabel(slotIndex)} 已經是空的。`);
        return;
    }
    const confirmed = confirm(`確定刪除 ${getSlotLabel(slotIndex)} 嗎？`);
    if (!confirmed) return;
    delete slots[slotIndex];
    setSaveSlots(slots);
    renderSaveSlots();
    if (btnLoad && !hasAnySave()) btnLoad.style.display = 'none';
}

function renderNode(nodeId) {
    const node = story[nodeId];
    if (!node) {
        console.error('Node not found:', nodeId);
        return;
    }

    // Save current node
    gameState.currentNode = nodeId;
    gameState.atEnding = false;
    saveGame();

    const displayText = composeNodeText(nodeId, node);
    currentRenderedText = displayText;

    // Record to history for LOG
    gameState.history.push({
        phase: node.phase || '',
        text: displayText
    });

    // Update Visuals (Phase)
    updatePhase(node.phase);

    // Clear previous choices
    choicesContainer.innerHTML = '';
    choicesContainer.classList.add('hidden');
    choicesContainer.classList.remove('active');
    choiceRevealPending = false;
    if (textContainer) textContainer.scrollTop = 0;

    // Check for special animations
    if (nodeId === 'p1_14') {
        triggerBugFlood();
    }

    // Typewriter effect
    typeText(displayText, () => {
        finishNodePresentation(nodeId, node);
    });
}

function composeNodeText(nodeId, node) {
    const echo = gameState.pendingEcho;
    gameState.pendingEcho = '';
    const delayedConsequence = buildDelayedConsequence(nodeId);
    const prelude = [echo, delayedConsequence].filter(Boolean).join('\n\n');
    if (!prelude) return node.text;

    return `<span class='choice-echo'>${prelude}</span>\n\n${node.text}`;
}

function buildDelayedConsequence(nodeId) {
    const checkpoints = {
        p2_1: 'DELAYED ECHO // 第一節課留下的東西，直到現在才從書包底部滲出來。',
        p3_1: 'DELAYED ECHO // 昨天選過的答案先我一步抵達教室，坐在我的位子上。',
        p4_1: 'DELAYED ECHO // 處置室讀取了我一路否認的偏好，並替它換上乾淨制服。'
    };
    if (!checkpoints[nodeId] || !gameState.scores) return '';

    const dominant = SCORE_KEYS.reduce((best, key) => {
        return (gameState.scores[key] || 0) > (gameState.scores[best] || 0) ? key : best;
    }, SCORE_KEYS[0]);
    const consequences = {
        end_mizore: '霙把我的台詞本翻到下一頁；上面已經有我的筆跡，寫著我還沒說出口的求愛。',
        end_yura: '每一塊反光面都慢半拍才模仿我，像由良正在鏡後決定哪一個我比較值得留下。',
        end_roro: 'ロロ的錄影紅點沒有熄滅；我剛才刪掉的反應，被系統列為唯一可信的版本。',
        end_zetsu: '絶把走廊廣播調到最大聲，連我的心跳都被迫跟著她錯拍。',
        end_ekuro: '絵躯把袖口收得更緊，說這樣我就不會從自己身上漏出去。',
        end_mahiru: '真昼的笑聲亮得過曝，我看見自己的影子被曬死在鞋尖旁邊。',
        end_sai: '再替我整理衣領，指腹冰得像器械；她說整齊的人比較容易被判定為正常。',
        end_yoi: '宵身上的甜味黏在舌根，所有門把都忽然像枕頭一樣柔軟。',
        end_hina: '雛把帳單折成紙鶴塞進我口袋，提醒我連被拯救都有展示價格。',
        end_rinbaku: '縛站得比記憶更近；她沒問我選了什麼，只替我揉著那隻曾經推開她的手。'
    };
    return `${checkpoints[nodeId]}<br>${consequences[dominant]}`;
}

function createInitialScores() {
    return SCORE_KEYS.reduce((scores, key) => {
        scores[key] = 0;
        return scores;
    }, {});
}

function shouldShowWhiteDoor() {
    const unlocked = getUnlockedEndings();
    const fragments = REQUIRED_BAD_ENDINGS.filter(key => unlocked[key]).length;
    return fragments >= DAWN_FRAGMENT_THRESHOLD && !unlocked.end_rinbaku_true;
}

function applyChoiceEffects(choice) {
    if (!gameState.scores) gameState.scores = createInitialScores();
    if (!choice.effects) return;

    Object.entries(choice.effects).forEach(([key, value]) => {
        if (gameState.scores[key] === undefined) gameState.scores[key] = 0;
        gameState.scores[key] += value;
    });
}

function getDominantChoiceEffect(choice) {
    const effects = Object.entries(choice.effects || {});
    if (!effects.length) return '';

    return effects.reduce((selected, current) => {
        return current[1] > selected[1] ? current : selected;
    })[0];
}

function buildChoiceEcho(choice) {
    const key = getDominantChoiceEffect(choice);
    const echoes = {
        end_mizore: "SCRIPT ECHO // 霙的嘴唇沒有動。可是她替我把剛才那句話背了一遍，像乾淨的錄音帶，像從不存在的天使確認我仍有資格被愛。",
        end_yura: "MIRROR ECHO // 牆上的反光面偷偷改寫了我的表情。由良在碎片裡拍手，甜甜地說：看吧，蒔前輩其實很想把自己弄壞。",
        end_roro: "LOG ECHO // ロロ把選項存成檔案。檔名是 NOT_ME_0000。副檔名打不開，圖示卻一直滴出濕熱的雜訊。",
        end_zetsu: "ALARM ECHO // 紅色警示燈替我的回答鼓掌。絶說這不是失控，是開演前的暖場；護理站的玻璃跟著節拍發抖。",
        end_ekuro: "MATERNAL ECHO // 絵躯的影子從天花板垂下來，把剛才的句子包進棉花。句尾變軟、變悶，像在氧氣面罩內側起霧。",
        end_mahiru: "OVEREXPOSED ECHO // 真晝把那個回答照到過曝。字的邊緣冒出焦味，笑聲聽起來像鋁箔紙被揉爛。",
        end_sai: "PROCEDURE ECHO // 再在病歷角落打勾。正常化進度上升，太吵的部分將於下一次處置時切除。",
        end_yoi: "SEDATION ECHO // 宵的點滴替選項加了一層紫色濾鏡。味道聽起來很甜，甜到舌根發麻。",
        end_hina: "VIP ECHO // 走廊廣播忽然變成柔軟的女聲：真正的患者，是那些付不起錢的人。請保持美麗，請保持可展示。",
        end_rinbaku: "REALITY ECHO // 縛沒有責備我。她只是把手收緊一點，像一條溫柔到不能報警的枷鎖。"
    };

    return echoes[key] || "SYSTEM ECHO // 選項已紀錄。患者相信自己正在自由選擇。";
}

function chooseEndingByScores() {
    if (!gameState.scores) gameState.scores = createInitialScores();

    let selected = SCORE_KEYS[0];
    let selectedScore = Number.NEGATIVE_INFINITY;
    SCORE_KEYS.forEach(key => {
        const score = gameState.scores[key] || 0;
        if (score > selectedScore) {
            selected = key;
            selectedScore = score;
        }
    });

    return selected;
}

function finishNodePresentation(nodeId, node) {
    if (node.choices) {
        // Keep the final line on screen. Choices are only revealed by the
        // player's next, separate click so the scene has room to breathe.
        choiceRevealPending = true;
    } else if (node.adjudicate) {
        const endingKey = chooseEndingByScores();
        setTimeout(() => renderNode(ENDINGS[endingKey].startNode), 800);
    } else if (node.next === null) {
        unlockEnding(nodeId);
        if (!gameState.atEnding) {
            currentTextEl.innerHTML += "<br><br><span style='color: #888; font-size: 0.8em;'>(點擊返回標題)</span>";
            gameState.atEnding = true;
        }
    } else if (autoPlay) {
        autoPlayInterval = setTimeout(advanceStory, autoPlayDelay);
    }
}

function updatePhase(phase) {
    const currentFilter = document.body.style.filter;
    document.body.className = '';
    document.body.style.filter = currentFilter;

    if (phase) {
        document.body.classList.add(phase);
        if (phase === 'phase-2' || phase === 'phase-3' || phase === 'phase-4') {
            localStorage.setItem('ward13_polluted', '1');
        }
        const phaseNames = {
            'phase-1': 'Phase 1: The Golden Delusion',
            'phase-2': 'Phase 2: The Red Anxiety',
            'phase-3': 'Phase 3: Chaotic Mania',
            'phase-4': 'Phase 4: The Cold Abyss'
        };
        phaseIndicator.textContent = phaseNames[phase] || '';
    }
}

// ============================================================
// TYPEWRITER
// ============================================================

function typeText(text, callback) {
    isTyping = true;
    currentTextEl.innerHTML = '';
    caret.style.display = 'inline-block';

    const parts = text.split(/(<[^>]*>)/);
    const segments = [];
    for (const part of parts) {
        if (part.startsWith('<')) {
            segments.push({ type: 'tag', content: part });
        } else {
            for (const ch of part) {
                segments.push({ type: 'char', content: ch });
            }
        }
    }

    let cursor = 0;
    if (typingInterval) clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        if (cursor >= segments.length) {
            clearInterval(typingInterval);
            isTyping = false;
            caret.style.display = 'none';
            if (callback) callback();
            return;
        }

        // Skip tags instantly; advance one char
        while (cursor < segments.length && segments[cursor].type === 'tag') {
            cursor++;
        }
        if (cursor < segments.length && segments[cursor].type === 'char') {
            cursor++;
        }

        // Build visible HTML up to cursor
        let html = '';
        for (let i = 0; i < cursor; i++) {
            const seg = segments[i];
            if (seg.type === 'tag') {
                html += seg.content;
            } else {
                html += seg.content === '\n' ? '<br>' : seg.content;
            }
        }
        currentTextEl.innerHTML = html;

    }, typeSpeed);
}

function completeText() {
    clearInterval(typingInterval);
    isTyping = false;
    caret.style.display = 'none';

    const node = story[gameState.currentNode];
    if (!node) return;
    let formattedText = (currentRenderedText || node.text).replace(/\n/g, '<br>');
    currentTextEl.innerHTML = formattedText;

    if (node.choices) {
        choiceRevealPending = true;
    } else if (node.adjudicate) {
        finishNodePresentation(gameState.currentNode, node);
    } else if (node.next === null) {
        finishNodePresentation(gameState.currentNode, node);
    }
}

function advanceStory() {
    if (gameState.atEnding) {
        gameState.atEnding = false;
        showTitleScreen();
        return;
    }

    const node = story[gameState.currentNode];
    if (node && node.choices && choiceRevealPending) {
        choiceRevealPending = false;
        showChoices(node.choices);
        return;
    }
    if (node && node.next) {
        renderNode(node.next);
    }
}

function showChoices(choices) {
    choicesContainer.innerHTML = '';
    choicesContainer.classList.remove('hidden');
    choicesContainer.classList.add('active');

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.classList.add('choice-btn');
        btn.textContent = choice.text;
        if (choice.requires) {
            const unlocked = getUnlockedEndings();
            const available = choice.requires === 'all_bad'
                ? REQUIRED_BAD_ENDINGS.filter(key => unlocked[key]).length >= DAWN_FRAGMENT_THRESHOLD
                : choice.requires === 'dawn'
                    ? !!unlocked.end_rinbaku_true
                    : true;
            if (!available) {
                btn.textContent = 'LOCKED // ' + choice.text;
                btn.classList.add('locked');
                btn.disabled = true;
                choicesContainer.appendChild(btn);
                return;
            }
        }
        btn.onclick = () => {
            applyChoiceEffects(choice);
            gameState.pendingEcho = choice.echo || buildChoiceEcho(choice);
            choicesContainer.classList.add('hidden');
            choicesContainer.classList.remove('active');
            renderNode(choice.next);
        };
        choicesContainer.appendChild(btn);
    });
}

function toggleAuto() {
    autoPlay = !autoPlay;
    if (btnAuto) btnAuto.classList.toggle('active', autoPlay);
    if (autoPlay && !isTyping) {
        advanceStory();
    }
    if (!autoPlay) {
        clearTimeout(autoPlayInterval);
    }
}

// ============================================================
// LOG SYSTEM
// ============================================================

function toggleLog() {
    const isHidden = logOverlay.classList.contains('hidden');
    if (isHidden) {
        // Build log content
        logContent.innerHTML = '';
        const phaseLabels = {
            'phase-1': 'Phase 1',
            'phase-2': 'Phase 2',
            'phase-3': 'Phase 3',
            'phase-4': 'Phase 4'
        };

        gameState.history.forEach(entry => {
            const div = document.createElement('div');
            div.classList.add('log-entry');

            const phaseDiv = document.createElement('div');
            phaseDiv.classList.add('log-phase');
            phaseDiv.textContent = phaseLabels[entry.phase] || '';
            div.appendChild(phaseDiv);

            const textDiv = document.createElement('div');
            textDiv.classList.add('log-text');
            // Strip HTML tags for clean log display
            textDiv.textContent = entry.text.replace(/<[^>]*>/g, '');
            div.appendChild(textDiv);

            logContent.appendChild(div);
        });

        logOverlay.classList.remove('hidden');
        // Scroll to bottom
        setTimeout(() => {
            logContent.scrollTop = logContent.scrollHeight;
        }, 50);
    } else {
        logOverlay.classList.add('hidden');
    }
}

// ============================================================
// ENDING GALLERY
// ============================================================

function getUnlockedEndings() {
    const data = localStorage.getItem('ward13_endings');
    return data ? JSON.parse(data) : {};
}

function isEndingAvailable(endingKey, unlocked) {
    const ending = ENDINGS[endingKey];
    if (!ending) return false;
    if (!ending.requires) return true;
    if (ending.requires === 'all_bad') {
        return REQUIRED_BAD_ENDINGS.filter(key => unlocked[key]).length >= DAWN_FRAGMENT_THRESHOLD;
    }
    if (ending.requires === 'dawn') {
        return !!unlocked.end_rinbaku_true;
    }
    return true;
}

function unlockEnding(nodeId) {
    let endingKey = null;
    Object.keys(ENDINGS).forEach(key => {
        if (ENDINGS[key].finalNode === nodeId) endingKey = key;
    });

    if (endingKey) {
        const unlocked = getUnlockedEndings();
        unlocked[endingKey] = true;
        localStorage.setItem('ward13_endings', JSON.stringify(unlocked));
    }
}

function updateGalleryCards() {
    const unlocked = getUnlockedEndings();
    const progress = document.getElementById('ending-progress');
    if (progress) {
        const count = Object.keys(ENDINGS).filter(key => unlocked[key]).length;
        progress.textContent = `${count} / ${Object.keys(ENDINGS).length}`;
    }

    Object.keys(ENDINGS).forEach(key => {
        const card = document.getElementById(ENDINGS[key].cardId);
        if (!card) return;

        const available = isEndingAvailable(key, unlocked);
        if (unlocked[key]) {
            card.classList.add('unlocked');
            card.onclick = () => replayEnding(key);
        } else {
            card.classList.remove('unlocked');
            card.onclick = null;
        }

        card.classList.toggle('available', available && !unlocked[key]);
    });
}

function dismissChoices() {
    const node = story[gameState.currentNode];
    choicesContainer.classList.add('hidden');
    choicesContainer.classList.remove('active');
    if (node?.choices) choiceRevealPending = true;
}

function updateCharacterCards() {
    const polluted = isArchivePolluted();
    const title = document.getElementById('chars-title');
    const subtitle = document.getElementById('chars-subtitle');
    if (title) title.textContent = polluted ? '☠ SUBJECT DATABASE' : '✦ STUDENT DIRECTORY';
    if (subtitle) subtitle.innerHTML = polluted
        ? 'WARD_13 // 被驗者總覽 // CLEARANCE: <span class="blink-text">LEVEL-0</span>'
        : '台場聯合學園 // 同好會名簿 // 放學後閲覽';
    document.querySelectorAll('.char-card').forEach(card => {
        const id = card.dataset.id;
        // Character introductions are part of the opening premise, not route
        // rewards. Ending gallery entries remain progression-gated.
        const isUnlocked = true;
        const dossier = polluted ? CHARACTER_DOSSIERS[id] : SCHOOL_DOSSIERS[id];
        card.classList.toggle('locked', !isUnlocked);
        card.classList.remove('expanded');
        card.classList.toggle('diagnosed', polluted);
        const tag = card.querySelector('.char-tag');
        if (tag) {
            tag.textContent = polluted ? (id === 'maki' ? 'PATIENT' : '診斷標籤') : (id === 'maki' ? 'PLAYER' : '學生');
            tag.classList.toggle('tag-player', id === 'maki' && !polluted);
            tag.classList.toggle('tag-delusion', polluted || id !== 'maki');
        }
        if (dossier) populateCharacterCard(card, dossier);
    });
}

function populateCharacterCard(card, dossier) {
    card.querySelectorAll('.char-field').forEach(field => {
        const key = field.querySelector('.field-key')?.textContent?.replace(':', '').trim();
        const val = field.querySelector('.field-val');
        if (!key || !val) return;

        if (key === 'STATUS' && dossier.status) {
            val.textContent = dossier.status;
            val.classList.remove('placeholder');
        } else if ((key === 'PHASE' || key === 'ROLE' || key === 'RELATION') && dossier.phase) {
            val.textContent = dossier.phase;
            val.classList.remove('placeholder');
        } else if (key === 'APPEARANCE' && dossier.appearance) {
            val.textContent = dossier.appearance;
            val.classList.remove('placeholder');
        } else if (key === 'PERSONALITY' && dossier.personality) {
            val.textContent = dossier.personality;
            val.classList.remove('placeholder');
        } else if (key === 'NOTES' && dossier.notes) {
            val.textContent = dossier.notes;
            val.classList.remove('placeholder');
        }
    });
}

/*
 * ARCHIVE RECOVERY NOTES // intentionally non-operational
 *
 * THREE-SQUARE ROOM: the classroom expands on the map, never in the body.
 * WORLD WAR III: every family argument is logged as an international incident.
 * DEVIANCE=LOVE: remove the upper radical; the remaining heart still fails validation.
 * DREAM INDEX: red-thread office / missing dog / four joined beds / rusted latch.
 *
 * checksum: W13-VOID-3F-0A-HEART
 * solfege: mi - rest - do - rest - fa# - (door fails to close)
 * This sequence was generated for the fiction. It encodes no person, account,
 * identifier, date of birth, or recoverable source material.
 */

function replayEnding(endingKey) {
    const ending = ENDINGS[endingKey];
    if (!ending) return;
    const unlocked = getUnlockedEndings();
    if (!unlocked[endingKey] && !isEndingAvailable(endingKey, unlocked)) return;

    gameState = {
        currentNode: ending.startNode,
        history: [],
        scores: createInitialScores(),
        pendingEcho: '',
        atEnding: false
    };

    galleryScreen.classList.remove('active');
    setTimeout(() => {
        galleryScreen.classList.add('hidden');
        gameplayScreen.classList.remove('hidden');
        gameplayScreen.classList.add('active');
        renderNode(ending.startNode);
    }, 500);
}

// ============================================================
// BUG FLOOD ANIMATION (Phase 1, p1_14)
// ============================================================

function triggerBugFlood() {
    bugFloodContainer.innerHTML = '';
    const chars = ['虫', '單', '壳', '殳'];
    const count = 70;

    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.classList.add('bug-char');
        span.textContent = chars[Math.floor(Math.random() * chars.length)];

        // Random size
        const size = 14 + Math.random() * 30;
        span.style.fontSize = size + 'px';

        // Start from edges
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let startX, startY;
        switch (edge) {
            case 0: startX = Math.random() * 100; startY = -5; break;
            case 1: startX = 105; startY = Math.random() * 100; break;
            case 2: startX = Math.random() * 100; startY = 105; break;
            case 3: startX = -5; startY = Math.random() * 100; break;
        }
        span.style.left = startX + '%';
        span.style.top = startY + '%';

        // Move toward center with some randomness
        const targetX = 30 + Math.random() * 40; // 30-70% range
        const targetY = 30 + Math.random() * 40;
        const dx = (targetX - startX);
        const dy = (targetY - startY);

        // CSS custom properties for animation
        span.style.setProperty('--dx', dx + 'vw');
        span.style.setProperty('--dy', dy + 'vh');
        span.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
        span.style.setProperty('--bug-opacity', (0.3 + Math.random() * 0.5).toString());
        span.style.setProperty('--crawl-duration', (1.5 + Math.random() * 2) + 's');
        span.style.setProperty('--crawl-delay', (Math.random() * 1.5) + 's');

        // Random green-ish color
        const g = 80 + Math.floor(Math.random() * 120);
        const r = Math.floor(Math.random() * 50);
        const bl = Math.floor(Math.random() * 40);
        span.style.color = `rgb(${r}, ${g}, ${bl})`;

        bugFloodContainer.appendChild(span);
    }

    // Clean up after animation
    setTimeout(() => {
        bugFloodContainer.innerHTML = '';
    }, 5000);
}

// ============================================================
// START
// ============================================================

init();
