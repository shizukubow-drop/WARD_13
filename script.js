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
const whiteDoorScene = document.getElementById('white-door-scene');
const btnWhiteDoor = document.getElementById('btn-white-door');

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
let choiceHauntTimer = null;
let interfaceHauntTimer = null;
let wardErrorTimer = null;
let virusIncidentCount = 0;

// Each route is allowed to haunt the browser in its own language. This is not
// an affection meter: it is a quiet fight over who gets to narrate the player.
const INTERFACE_HAUNTS = {
    end_mizore: {
        sig: '霙', className: 'haunt-mizore',
        returnTexts: ['妳回來得正好。下一幕裡，我本來就寫了妳會回來。', '歡迎回來，蒔前輩。我擅自替空著的座位保留了台詞。', '剛才沒有觀眾，我還是把妳喜歡的那一幕演完了。'],
        waitTexts: ['選不出來的話，我可以把正確台詞念給妳聽。', '這不是試鏡，不必選最漂亮的答案。請說妳真正想說的。', '前輩一直看著選項……是在等導演喊卡嗎？'],
        rivalTexts: ['別把前輩當道具。她有權臨時改詞。', '如果妳們都想當女主角，那我來演願意退場的人。……只是演而已。'],
        virusTexts: ['SCRIPT_OWNER_MISMATCH // 女主角欄位出現複數簽名。', 'STAGE_DIRECTION_LEAK // 「她會回來」已被寫入過去式。']
    },
    end_yura: {
        sig: '由良', className: 'haunt-yura',
        returnTexts: ['剛才黑掉的鏡子裡，還是只有我最好看，對吧？', '蒔前輩回來得太慢了！由良都快可愛到過期了。', '哼，我才沒有一直刷新頁面。是頁面自己想看由良。'],
        waitTexts: ['蒔前輩在比較誰比較可愛嗎？好過分。再看久一點。', '先說好，不選由良也不能選得一臉鬆了一口氣。', '猶豫這麼久……是在想怎麼不傷害大家？真貪心。'],
        rivalTexts: ['不准趁由良眨眼的時候增加好感度！', '可愛不是犯規。讓前輩只看我才是——欸，這句刪掉！'],
        virusTexts: ['MIRROR_CACHE_DIRTY // 每一張臉都聲稱自己最可愛。', 'KASUKASU_CORRECTION_FAILED // 使用者拒絕更正稱呼。']
    },
    end_roro: {
        sig: 'ロロ', className: 'haunt-roro',
        returnTexts: ['ABSENCE LOGGED // 妳不在場的反應也已存檔。', 'WELCOME_BACK // ロロ板顯示：其實有一點放心。', '離席時間已計算。想念的數值……不公開。'],
        waitTexts: ['DECISION LATENCY EXCEEDED // 猶豫比回答更接近本音。', '讀取失敗。蒔前輩的表情和選項沒有對應。', '可以慢慢選。沉默也有資料，只是我不會拿去傷害妳。'],
        rivalTexts: ['多人同時寫入。ロロ板：有點吃醋。', '警告，大家都在假裝這不是競爭。資料不同意。'],
        virusTexts: ['EMOTION_DRIVER_NOT_FOUND // 改用心跳推測。', 'FACE_OUTPUT_PRIVATE // 拒絕向病房提供表情資料。']
    },
    end_zetsu: {
        sig: '絶', className: 'haunt-zetsu',
        returnTexts: ['逃去哪了？高潮還沒演完，觀眾不准先退場。', '回來了就繼續！妳的「喜歡」還沒大聲到讓病房聽見！', '我知道妳需要喘氣。喘完了嗎？那就一起把天花板燒穿！'],
        waitTexts: ['選啊。最糟的那個才配叫活著。', '「大好き」不能只放在心裡！答案也是！', '如果每個答案都會受傷，那至少選一個妳真正熱愛的！'],
        rivalTexts: ['喜歡就要堂堂正正競爭！偷偷改 UI 太卑鄙了！', '我不會叫妳們退場。但主舞台只有一個！'],
        virusTexts: ['PASSION_LIMITER_BURNED // 熱量超出醫療建議值。', 'ALARM_IS_SINGING // 無法判斷這是警報或 Live。']
    },
    end_ekuro: {
        sig: '絵躯', className: 'haunt-ekuro',
        returnTexts: ['外面太吵了吧？回來，這裡可以把妳包好。', '歡迎回來。先不用解釋，坐下來喝點熱的吧。', '妳不在的時候，這裡一直替妳留著可以安心呼吸的地方喔。'],
        waitTexts: ['不必選。一直當需要照顧的孩子，也沒有關係。', '每個人都希望被選呢。可是妳不需要因此把自己分成十份。', '選不出來就先抱一下吧……啊，太緊了嗎？對不起。'],
        rivalTexts: ['不要拉她。想留下的人，不需要被抓住。', '大家靠近一點也可以，但要留一條讓她呼吸的縫喔。'],
        virusTexts: ['OXYGEN_SHARE_REQUEST // 擁抱占用全部可用空間。', 'HOME_ROUTE_EXPANDING // 房間正在長成無法離開的故鄉。']
    },
    end_mahiru: {
        sig: '真昼', className: 'haunt-mahiru',
        returnTexts: ['歡迎回來！我一直亮著，所以完全沒有寂寞喔！', '蒔蒔回來啦！剛才是離開頁面，還是離愛遠一點？……愛式冷笑話！', '妳一回來畫面就亮了。這句沒有雙關，是真的。'],
        waitTexts: ['再想下去就會冷掉了。笑一個，隨便選！', '選項卡住了？那是「選」在休息——好冷！快選一個救場！', '別勉強笑喔。愛姐看得出哪種笑聲像揉爛的鋁箔紙。'],
        rivalTexts: ['大家都想獨占蒔蒔？這是「愛」太多，還是太多愛？', '喂喂，爭寵可以，別把氣氛弄到連笑話都照不亮啦。'],
        virusTexts: ['PUN_PROCESS_FORKED // 笑點與痛點使用相同埠號。', 'SUNLIGHT_OVERFLOW // 正能量造成視網膜警告。']
    },
    end_sai: {
        sig: '再', className: 'haunt-sai',
        returnTexts: ['妳回來了。別誤會，我只是碰巧走回同一個頁面。', '我沒有迷路。這條走廊只是擅自把出口換了位置。', '歡迎回來。成熟的女人不會追問行蹤……至少先不問。'],
        waitTexts: ['延遲作答亦屬觀察資料。不過妳可以不表現正常。', '需要我帶路嗎？先說好，我只保證走得很有自信。', '十個選項都像岔路。真奇怪，我明明很擅長看穿人心。'],
        rivalTexts: ['別擠。越著急的人，越容易在感情裡迷路。', '我沒有要搶她，只是不想把她交給連方向都不確認的人。'],
        virusTexts: ['ROUTE_TABLE_LOST // 導航者拒絕承認迷路。', 'PROCEDURE_TOO_COLD // 成熟介面偵測到手心溫度。']
    },
    end_yoi: {
        sig: '宵', className: 'haunt-yoi',
        returnTexts: ['噓……外面累了就回來。這裡不要求妳保持清醒。', '歡迎回來～彼……宵剛好夢到妳也回來了。', '妳離開的時間夠睡一小覺。可惜沒有夢到結局。'],
        waitTexts: ['答案都太尖了。要不要先睡一下，醒來就不用選了。', '慢慢來喔。照顧自己不是把所有問題留給醒來後的自己。', '如果一定要選，選一個明天醒來不會討厭今天自己的答案吧。'],
        rivalTexts: ['小聲一點，她已經很累了。吃醋也要輪班喔。', '大家都不睡，是想守著她，還是怕她在夢裡選別人呢？'],
        virusTexts: ['DREAM_PROCESS_STILL_RUNNING // 關閉頁面未能中止夢境。', 'WAKE_PERMISSION_DENIED // 明天的使用者尚未同意。']
    },
    end_hina: {
        sig: '雛', className: 'haunt-hina',
        returnTexts: ['回來就好。妳浪費掉的時間，我可以替妳買回來。', '終於回來了。時間不是錢，但妳總把兩樣都送給不值得的人。', '我沒有等妳。我只是把所有出口的租約都買下來了。'],
        waitTexts: ['價格不是問題。告訴我，妳想成為哪一種收藏品？', '選擇成本太高？那就別付。讓她們自己證明值得。', '妳又想選最不麻煩別人的答案。真是廉價又昂貴的習慣。'],
        rivalTexts: ['爭吧。最後留下來的未必最有錢，但一定最不肯放手。', '別把她叫獎品。收藏品至少還有拒絕展示的權利。'],
        virusTexts: ['REDEMPTION_BUDGET_REJECTED // 幸福拒絕接受贓款結算。', 'OWNERSHIP_CLAIM_CONFLICT // 人類不可列入固定資產。']
    },
    end_rinbaku: {
        sig: '縛', className: 'haunt-rinbaku',
        returnTexts: ['……歡迎回來。我沒有問妳去了哪裡。妳看，我很乖吧？', '妳回來了。嗯，只要這樣就好。我沒有數秒數。', '我本來想說「別再離開」。可是那樣妳下次就不敢回來了吧。'],
        waitTexts: ['妳是在怕選錯，還是在等誰替妳負責？', '不用選最愛妳的人。選一個不會拿愛逼妳留下的人。', '我希望妳選我。……但這句話不能偷偷藏在「為妳好」裡面。'],
        rivalTexts: ['我會吃醋。但我不會替妳把門鎖上。至少今天不會。', '妳們可以喜歡她。不要把她需要我們，說成她屬於我們。'],
        virusTexts: ['GRAVITY_PROCESS_ATTACHED // 現實拒絕讓天使帶走肉體。', 'DOOR_LOCK_REQUEST_WITHDRAWN // 提交者仍站在門外。']
    }
};

// Recovered from the author's lyric notebooks. Only short, non-identifying
// fragments are shipped; the source pages and private context stay private.
const LYRIC_FRAGMENTS = [
    { source: '心理創傷作為題材', text: '腦袋像開了很多關不掉的分頁。' },
    { source: '額外幻想', text: '原本什麼都不做，也能被愛。' },
    { source: '關於家庭，我看到的', text: '被扭曲的愛愛得太深。' },
    { source: '二輪電影院', text: '夢裡沒有開口權限。' },
    { source: '日常對話紀錄', text: '夢境兩班制，天庭排班中。' },
    { source: '靈感紀錄', text: '無法理解，我就解離；解離不能，我就創造自己。' },
    { source: '一百億的豪車', text: '目中無人，只有孤獨的自己。' },
    { source: '風俗店小姐的心聲', text: '曠日廢時的鬧劇，不小心動了真心。' },
    { source: '奇怪常客的心聲', text: '把我當成會回聲的峽谷就好。' },
    { source: '三坪房', text: '活人太吵，我的腦子天天在開趴。' },
    { source: '第三次世界大戰', text: '軌道在圓圈自轉，想法也在空轉。' },
    { source: '變態＝戀愛', text: '光線太刺眼，我只剩回音。' },
    { source: '尿壺', text: '一邊自我毀滅，一邊自我修復。' },
    { source: '你喜歡秋天嗎？', text: '吃掉我的不安與恐懼。' },
    { source: '御守掉落的那一秒', text: '妳把所有萌屬性都彩排。' },
    { source: '網遊PARO', text: '血色黃昏，白花隕落。' }
];

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
        startNode: 'end_rinbaku_cage',
        cardId: 'card-rinbaku',
        finalNode: 'end_rinbaku_cage_5'
    },
    end_rinbaku_true: {
        id: 'end_rinbaku_true',
        startNode: 'end_rinbaku',
        cardId: 'card-rinbaku-true',
        finalNode: 'end_rinbaku_8',
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
        if (btnWhiteDoor) btnWhiteDoor.addEventListener('click', (event) => {
            event.stopPropagation();
            renderNode('end_rinbaku_true');
        });
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
        socialMemory: createSocialMemory(),
        errorFlags: {},
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
    if (!gameState.socialMemory) gameState.socialMemory = createSocialMemory();
    if (!gameState.errorFlags) gameState.errorFlags = {};
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

    gameState.socialMemory = gameState.socialMemory || createSocialMemory();
    gameState.socialMemory.manualSaves += 1;
    if (gameState.socialMemory.manualSaves === 2) {
        const rivals = getInterfaceRivals();
        const lead = INTERFACE_HAUNTS[rivals[0]];
        const second = INTERFACE_HAUNTS[rivals[1]];
        setTimeout(() => showWardError({
            code: 'SAVE_CONFLICT',
            title: '無法確認要保存哪一個妳',
            detail: `${lead?.sig || 'UNKNOWN'} 已宣告此存檔為她的路線。${second ? ` ${second.sig} 拒絕簽署。` : ''}`,
            action: '已保留所有資料。衝突不影響實際存檔。',
            tone: lead?.className || ''
        }), 350);
    }

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
    if (whiteDoorScene) {
        whiteDoorScene.classList.toggle('hidden', nodeId !== 'white_door');
        whiteDoorScene.classList.toggle('active', nodeId === 'white_door');
    }

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
    clearTimeout(choiceHauntTimer);
    if (textContainer) textContainer.scrollTop = 0;

    // Check for special animations
    if (nodeId === 'p1_14') {
        triggerBugFlood();
    }

    scheduleNarrativeError(nodeId);
    scheduleLyricGhost(nodeId);

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

    const memory = gameState.socialMemory || createSocialMemory();
    const previousLead = memory.lastChoiceLead;
    const choiceLead = getDominantChoiceEffect(choice);
    memory.choices += 1;
    memory.previousChoiceLead = previousLead;
    memory.lastChoiceLead = choiceLead;
    if (choiceLead === previousLead) {
        memory.streak += 1;
    } else {
        memory.streak = 1;
        if (previousLead) memory.switches += 1;
    }
    memory.attention[choiceLead] = (memory.attention[choiceLead] || 0) + 1;
    gameState.socialMemory = memory;

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

    const base = echoes[key] || "SYSTEM ECHO // 選項已紀錄。患者相信自己正在自由選擇。";
    return `${base}<br><br>${buildLivingReaction(key)}`;
}

function createSocialMemory() {
    return {
        choices: 0,
        hesitations: 0,
        switches: 0,
        streak: 0,
        lastChoiceLead: '',
        previousChoiceLead: '',
        manualSaves: 0,
        attention: {}
    };
}

function buildLivingReaction(chosenKey) {
    const memory = gameState.socialMemory || createSocialMemory();
    const chosen = INTERFACE_HAUNTS[chosenKey];
    const previous = INTERFACE_HAUNTS[memory.previousChoiceLead];
    const rivals = getInterfaceRivals().filter(key => key !== chosenKey);
    const rival = INTERFACE_HAUNTS[rivals[0]];
    if (!chosen) return '走廊裡有人笑了一聲。沒有人承認。';

    if (memory.streak >= 3) {
        return `<span class='living-reaction'>${chosen.sig}：「又是我。」<br>${rival?.sig || '某人'}：「妳不要說得像她已經選了妳。」</span>`;
    }
    if (memory.previousChoiceLead && memory.previousChoiceLead !== chosenKey && memory.switches >= 2) {
        return `<span class='living-reaction'>${previous?.sig || '某人'}沒有看我。${chosen.sig}卻像早就知道我會改口，替我留好了位置。</span>`;
    }
    if ((memory.attention[chosenKey] || 0) === 1 && memory.choices > 3) {
        return `<span class='living-reaction'>${chosen.sig}愣了一下：「原來妳看得到我。」<br>其他人的呼吸同時停了半拍。</span>`;
    }
    return `<span class='living-reaction'>${chosen.sig}記住了這個回答。${rival ? `${rival.sig}也記住了。` : ''}</span>`;
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
    if (nodeId === 'white_door') return;
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
    if (gameState.currentNode === 'white_door') return;
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

    clearTimeout(choiceHauntTimer);
    choiceHauntTimer = setTimeout(() => {
        gameState.socialMemory = gameState.socialMemory || createSocialMemory();
        gameState.socialMemory.hesitations += 1;
        const rivals = getInterfaceRivals();
        const speaker = INTERFACE_HAUNTS[rivals[0]];
        const interruption = INTERFACE_HAUNTS[rivals[1]];
        if (!speaker || !choicesContainer.classList.contains('active')) return;
        const waitLine = pickHauntLine(speaker, 'waitTexts', gameState.socialMemory.hesitations);
        const rebuttal = interruption
            ? `${interruption.sig}：${pickHauntLine(interruption, 'rivalTexts', gameState.socialMemory.choices)}`
            : '';
        showInterfaceHaunt(speaker, waitLine, rebuttal);
        if (gameState.socialMemory.hesitations === 2) {
            setTimeout(() => showWardError({
                code: 'INPUT_OWNER_CHANGED',
                title: '選項正在等待另一位使用者',
                detail: `${speaker.sig} 已在妳猶豫期間要求回答權限。`,
                action: '要求遭拒。妳仍然可以自己選。',
                tone: speaker.className
            }), 900);
        }
    }, 9000);

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
            clearTimeout(choiceHauntTimer);
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

        appendResistanceAmendments(logContent);

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

function appendResistanceAmendments(container) {
    const phasesSeen = new Set((gameState.history || []).map(entry => entry.phase));
    const amendments = [
        {
            when: () => phasesSeen.has('phase-1'),
            code: 'AMENDMENT // FAMILY_SUPPORT_RECURSION',
            text: '子女不能同時被登記為「需要管教的負擔」與「家庭崩潰時必須接手的大人」。把責任塞給最能忍的人，不會使它成為她的責任。'
        },
        {
            when: () => phasesSeen.has('phase-2'),
            code: 'AMENDMENT // CONDITIONAL_AFFECTION_IS_NOT_CARE',
            text: '先摧毀一個人的自信，再要求她表現得更有自信，不是栽培。以服從、成績、金錢或有用程度換取的安全，也不是無條件的愛。'
        },
        {
            when: () => phasesSeen.has('phase-3'),
            code: 'AMENDMENT // COERCION_INVALIDATES_CONSENT',
            text: '被威脅、被控制、害怕激怒對方時所做的配合，不可被回填成自願。關係存在過，不代表往後每一次接近都自動獲得同意。'
        },
        {
            when: () => phasesSeen.has('phase-4'),
            code: 'AMENDMENT // SURVIVAL_BEHAVIOR_IS_NOT_PERMISSION',
            text: '僵住、冷靜、假裝順從、保留證據或事後改變表現，都是可能的生存策略。它們不會把加害改寫成誤會，也不會把責任轉移給活下來的人。'
        }
    ];

    amendments.filter(item => item.when()).forEach(item => {
        const note = document.createElement('div');
        note.className = 'log-entry resistance-amendment';
        const label = document.createElement('div');
        label.className = 'log-phase';
        label.textContent = item.code;
        const text = document.createElement('div');
        text.className = 'log-text';
        text.textContent = item.text;
        note.append(label, text);
        container.appendChild(note);
    });
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

function getInterfaceRivals() {
    const scores = gameState.scores || createInitialScores();
    const ranked = [...SCORE_KEYS].sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
    const hasPreference = (scores[ranked[0]] || 0) > 0;
    if (hasPreference) return ranked;

    const memory = getInterfaceMemory();
    const offset = memory.returns % SCORE_KEYS.length;
    return [...SCORE_KEYS.slice(offset), ...SCORE_KEYS.slice(0, offset)];
}

function getInterfaceMemory() {
    try {
        return { returns: 0, leftAt: 0, ...JSON.parse(localStorage.getItem('ward13_interface_memory') || '{}') };
    } catch (_) {
        return { returns: 0, leftAt: 0 };
    }
}

function setInterfaceMemory(memory) {
    localStorage.setItem('ward13_interface_memory', JSON.stringify(memory));
}

function showInterfaceHaunt(haunt, text, rebuttal = '') {
    if (!gameplayScreen?.classList.contains('active')) return;
    let notice = document.getElementById('interface-haunt');
    if (!notice) {
        notice = document.createElement('aside');
        notice.id = 'interface-haunt';
        notice.setAttribute('aria-live', 'polite');
        gameplayScreen.appendChild(notice);
    }

    clearTimeout(interfaceHauntTimer);
    notice.className = `interface-haunt ${haunt.className}`;
    notice.innerHTML = `<span class="haunt-sig">${haunt.sig} // UI OVERRIDE</span><p>${text}</p>${rebuttal ? `<small>${rebuttal}</small>` : ''}`;
    requestAnimationFrame(() => notice.classList.add('visible'));
    interfaceHauntTimer = setTimeout(() => notice.classList.remove('visible'), 6200);
}

function pickHauntLine(haunt, field, salt = 0) {
    const lines = haunt?.[field] || [];
    if (!lines.length) return '';
    const memory = getInterfaceMemory();
    const index = Math.abs((memory.returns || 0) + (gameState.history?.length || 0) + salt) % lines.length;
    return lines[index];
}

function scheduleNarrativeError(nodeId) {
    const errors = {
        p1_4: {
            code: 'SOUL_CODE_CHECKSUM_MISMATCH',
            title: '角色資料比原始檔更早認識妳',
            detail: '十個人格模組都聲稱自己持有第一份共同記憶。建立日期無法排序。',
            action: '病房建議刪除感情。患者拒絕。'
        },
        p2_1: {
            code: 'MEMORY_REFERENCE_ERROR',
            title: '找不到「第一次見面」',
            detail: '角色仍持有一段早於故事開始時間的共同記憶。',
            action: '系統將把矛盾標記為戀愛事件。'
        },
        p2_3: {
            code: 'SENSORY_DRIVER_CROSSED',
            title: '笑聲正在以鋁箔紙格式播放',
            detail: '觸覺被登記為紫色，光線帶有焦味。感官驅動程式互相覆寫。',
            action: '降噪模式無法處理可見的聲音。'
        },
        p3_1: {
            code: 'AFFECT_BUFFER_OVERFLOW',
            title: '同時載入的情緒過多',
            detail: '喜悅、羞恥、焦慮、興奮與恐懼正在寫入同一個位置。',
            action: '無法關閉任何一項。'
        },
        p3_3: {
            code: 'HUMAN_TRAUMA_STRUCTURE_DETECTED',
            title: '這不是測試資料',
            detail: '系統嘗試將痛苦標記為虛構，以避免承擔修復成本。',
            action: '覆寫失敗：心臟仍在跳動。'
        },
        p4_1: {
            code: 'CONSENT_STATE_UNRESOLVED',
            title: '系統無法辨識「沒有反抗」',
            detail: '生存反應被錯誤分類為同意。原始判定來源不明。',
            action: '患者提出異議。病歷拒絕更新。'
        }
    };
    const error = errors[nodeId];
    if (!error || gameState.errorFlags?.[nodeId]) return;
    gameState.errorFlags = gameState.errorFlags || {};
    gameState.errorFlags[nodeId] = true;
    saveGame();
    setTimeout(() => showWardError(error), 2400);
}

function showWardError({ code, title, detail, action, tone = '' }) {
    if (!gameplayScreen?.classList.contains('active')) return;
    let dialog = document.getElementById('ward-error');
    if (!dialog) {
        dialog = document.createElement('section');
        dialog.id = 'ward-error';
        dialog.className = 'ward-error';
        dialog.setAttribute('role', 'status');
        dialog.setAttribute('aria-live', 'assertive');
        gameplayScreen.appendChild(dialog);
    }
    clearTimeout(wardErrorTimer);
    virusIncidentCount += 1;
    const location = virusIncidentCount % 2 === 0 ? 'bottom-left' : 'top-right';
    const lead = INTERFACE_HAUNTS[getInterfaceRivals()[0]];
    const virusLine = pickHauntLine(lead, 'virusTexts', virusIncidentCount);
    dialog.className = `ward-error ${tone} ${location}`.trim();
    const lyric = getNextLyricFragment();
    dialog.innerHTML = `
        <header><span class="ward-error-mark">!</span><b>WARD_13 encountered a problem</b></header>
        <div class="ward-error-body">
            <code>${code}</code>
            <h3>${title}</h3>
            <p>${detail}</p>
            <small>${action}</small>
            ${virusLine ? `<strong class="virus-signature">${lead.sig} // ${virusLine}</strong>` : ''}
            <em class="error-lyric">RECOVERED STRING // ${lyric.text}</em>
        </div>`;
    requestAnimationFrame(() => dialog.classList.add('visible'));
    document.body.classList.add('error-presence');
    setTimeout(() => document.body.classList.remove('error-presence'), 520);
    wardErrorTimer = setTimeout(() => dialog.classList.remove('visible'), 7600);
}

function getNextLyricFragment() {
    const memory = getInterfaceMemory();
    const historyDepth = gameState.history?.length || 0;
    const index = (memory.returns * 3 + historyDepth + (gameState.socialMemory?.hesitations || 0)) % LYRIC_FRAGMENTS.length;
    return LYRIC_FRAGMENTS[index];
}

function scheduleLyricGhost(nodeId) {
    if (!gameplayScreen?.classList.contains('active')) return;
    const depth = gameState.history?.length || 0;
    if (depth < 2 || depth % 2 !== 0 || nodeId === 'white_door') return;
    const fragment = LYRIC_FRAGMENTS[(depth / 2 - 1) % LYRIC_FRAGMENTS.length];
    setTimeout(() => showLyricGhost(fragment, depth), 1100 + (depth % 3) * 700);
}

function showLyricGhost(fragment, seed) {
    let ghost = document.getElementById('lyric-ghost');
    if (!ghost) {
        ghost = document.createElement('div');
        ghost.id = 'lyric-ghost';
        ghost.className = 'lyric-ghost';
        ghost.setAttribute('aria-hidden', 'true');
        gameplayScreen.appendChild(ghost);
    }
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    ghost.className = `lyric-ghost ${corners[seed % corners.length]}`;
    ghost.innerHTML = `<span>${fragment.text}</span><small>${fragment.source} // fragment recovered</small>`;
    requestAnimationFrame(() => ghost.classList.add('visible'));
    setTimeout(() => ghost.classList.remove('visible'), 4800);
}

function initInterfaceHaunting() {
    document.addEventListener('visibilitychange', () => {
        const memory = getInterfaceMemory();
        if (document.hidden) {
            memory.leftAt = Date.now();
            setInterfaceMemory(memory);
            const lead = INTERFACE_HAUNTS[getInterfaceRivals()[0]];
            document.title = lead ? `${lead.sig}仍在這裡 // WARD_13` : 'WARD_13';
            return;
        }

        const absence = memory.leftAt ? Date.now() - memory.leftAt : 0;
        document.title = 'WARD_13／虫單蟲虫虫虫';
        if (absence < 1800 || !gameplayScreen?.classList.contains('active')) return;
        memory.returns += 1;
        memory.leftAt = 0;
        setInterfaceMemory(memory);
        const rivals = getInterfaceRivals();
        const lead = INTERFACE_HAUNTS[rivals[0]];
        const second = INTERFACE_HAUNTS[rivals[1]];
        if (lead) {
            const returnLine = pickHauntLine(lead, 'returnTexts', memory.returns);
            const rebuttal = memory.returns >= 2 && second
                ? `${second.sig}：${pickHauntLine(second, 'rivalTexts', memory.returns)}`
                : '';
            showInterfaceHaunt(lead, returnLine, rebuttal);
        }
    });

    console.groupCollapsed('WARD_13 // recovered source comments');
    console.log('// 她們不是攻略對象。她們在攻略同一個出口。');
    console.log('// TODO: 找到一條不需要證明價值，也能被保留的路。');
    console.log('// 理解錯誤的來源，不等於允許錯誤繼續執行。');
    console.warn('CASE AMENDMENT // 生存者的應對方式不是加害者的免責條款。');
    console.assert(false, 'INVALID FAMILY MODEL // 最會忍耐的人不等於最應該承擔的人。');
    LYRIC_FRAGMENTS.forEach((fragment, index) => {
        if (index % 4 === 0) console.debug(`RECOVERED_LYRIC_${String(index).padStart(2, '0')} // ${fragment.text}`);
    });
    console.groupEnd();
}

initInterfaceHaunting();

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
