const story = {
    // --- Shared route: Ward entry ---
    "white_door": {
        "text": "第十三社辦的十份結局紀錄都已經被翻開。\n\n黑色的走廊盡頭，出現了一段白色階梯。\n\n階梯盡頭只有一扇門。\n門外有人說，妳已經康復了。\n\n<span class='case-note'>SYSTEM: TEN ENDING FRAGMENTS CONFIRMED // WHITE DOOR OPENED</span>",
        "phase": "phase-4",
        "next": "end_rinbaku"
    },
    "start": {
        "text": "逢魔之時，夕陽正燃燒著。\n\n我喜歡這個時間。東西還看得清，卻已經不必看得太清。\n\n頂樓的門比記憶裡重。我用肩膀推開，袖口擦過門牌，沾到一點白粉。十三。\n社辦明明在樓下。\n\n手機裡最後一則訊息要我來這裡。我再看一次，螢幕映出自己的臉，沒有訊息。\n\n大概是我記錯了。\n\n裡面有人替我留著門。",
        "phase": "phase-1",
        "next": "p1_2"
    },
    "p1_2": {
        "text": "空木霙背對著我，手裡捧著一本翻舊的劇本。\n\n風掀起她白洋裝的裙襬。她用手壓住，忘了壓頭髮，於是幾根茶褐色的髮絲黏在嘴角。她皺了皺鼻子，把它們撥開。\n\n我忽然很想笑。原來她也有忙不過來的時候。\n\n「……蒔前輩？」\n\n她轉過來。我抬手打招呼，指甲縫裡的白粉使我又把手藏回袖子。\n洋裝的蕾絲其實有些發黃。剛才怎麼會覺得那麼白？\n\n霙把劇本轉向我。角色名那一格空著。\n\n「今天的我是誰？」\n\n她的筆尖停在紙上，沒有替我填答案。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "「先當妳自己。今天不用演給我看。」",
                "next": "p1_3",
                "effects": {
                    "end_mizore": 3
                },
                "memory": {
                    "casting": "self"
                },
                "echo": "霙把筆蓋扣上。那一小聲喀，比回答更讓我緊張。"
            },
            {
                "text": "「當那個最後會留下來的人。」",
                "next": "p1_3",
                "effects": {
                    "end_rinbaku": 3,
                    "end_ekuro": 1
                },
                "memory": {
                    "casting": "stay"
                },
                "echo": "她還沒答應，我已經在心裡替她點頭。"
            },
            {
                "text": "「服裝還缺什麼？我可以付。」",
                "next": "p1_3",
                "effects": {
                    "end_hina": 3,
                    "end_mizore": 1
                },
                "memory": {
                    "casting": "pay"
                },
                "echo": "我把卡夾摸出來，才想起她問的不是價錢。"
            }
        ]
    },
    "p1_3": {
        "text": "霙翻過一頁。裡面夾著一片透明的薄殼。\n\n「剛才撿到的。」\n\n我問她，蟬留下這個以後去哪裡。\n\n「前輩覺得呢？」\n\n真是有禪意的問題。我想說個冷笑話，又怕她真的笑了，我便不知道接下來還能說什麼。\n\n薄殼在風裡輕輕發抖。\n它沒有翅膀，影子卻有。\n\n霙把書合起來。那個影子仍留在紙外。",
        "phase": "phase-1",
        "next": "p1_4"
    },
    "p1_4": {
        "text": "「手怎麼了？」\n\n霙朝我的袖口伸手。\n我先聞到繡球花，再聞到牆壁受潮的味道。兩種氣味貼在一起，像同一個詞印了兩遍。\n\n她的指尖停在離我很近的地方。\n\n我想握住她。也想把手洗乾淨再來。最好還能把今天以前的事情一起洗掉，免得她碰到。\n\n「……可以嗎？」她問。\n\n問句落下來以後，風竟然沒有替我回答。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "伸出手，但只讓她碰到指尖。",
                "next": "p1_5",
                "effects": {
                    "end_mizore": 3,
                    "end_ekuro": 1
                },
                "memory": {
                    "touch": "fingertips"
                },
                "echo": "只有一小塊皮膚碰到她。我沒有因此變乾淨，也沒有把她弄髒。"
            },
            {
                "text": "「等一下。先陪我站一會兒。」",
                "next": "p1_5",
                "effects": {
                    "end_rinbaku": 2,
                    "end_roro": 1
                },
                "memory": {
                    "touch": "wait"
                },
                "echo": "她把手放下。我等著她生氣，她卻只是挪開腳邊的書包。"
            },
            {
                "text": "把袖口拉低。「沒事，不用看。」",
                "next": "p1_5",
                "effects": {
                    "end_sai": 3,
                    "end_yura": 1
                },
                "memory": {
                    "touch": "hide"
                },
                "echo": "布料蓋住了手。她只看見我笑了一下。"
            }
        ]
    },
    "p1_5": {
        "text": "啪。\n\n日光燈亮起來。我站在走廊盡頭，指甲縫裡卡著牆皮。\n\n鄰縛站在身旁。煙粉棕的頭髮貼著額角，手裡拿著一條沾濕的手帕。她把手帕折了兩次，折成我小時候喜歡的大小。\n\n「小蒔，先鬆開手。」\n\n我不知道她指的是牆，還是她的手腕。\n\n「妳剛才一直沒有回答我。」\n\n遠處的門響了一聲。我往後縮，她便往前半步。\n霙呢？頂樓呢？\n\n縛伸過來的手有溫度。我一時不知道這能證明什麼。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "「先放開我。我想自己擦。」",
                "next": "p1_6",
                "effects": {
                    "end_yura": 2,
                    "end_sai": 1
                },
                "memory": {
                    "corridor": "space"
                },
                "echo": ""
            },
            {
                "text": "問她：「剛才我說了什麼？不要替我解釋。」",
                "next": "p1_verify",
                "effects": {
                    "end_roro": 3
                },
                "memory": {
                    "corridor": "verify"
                },
                "echo": ""
            },
            {
                "text": "甩開她的手，退到門邊。",
                "next": "p1_recoil",
                "effects": {
                    "end_zetsu": 3,
                    "end_rinbaku": 1
                },
                "memory": {
                    "corridor": "recoil"
                },
                "echo": ""
            }
        ]
    },

    "p1_6": {
        "text": "縛沒有立刻鬆手。\n\n她先看了看我的指甲，又看那塊受潮的牆。等她終於把手帕交給我，我已經把「拜託」在嘴裡咬過好幾遍。\n\n「那我站這裡。」她說。\n\n我擦著手。粉末沒有變成白色的水，反而結成一小塊灰泥。\n\n我想請她再退一步。\n她站得那麼擔心，我就沒說。\n\n至少手帕現在在我手裡。",
        "phase": "phase-1",
        "next": "p2_1"
    },

    // --- Phase 2 ---
    "p2_1": {
        "text": "走廊的窗戶映出兩個人。\n\n我往前走，縛慢半步跟上。玻璃裡的她卻先走了。\n\n「要我陪妳嗎？」\n\n她說得很輕。我腦子裡的字幕已經搶先排好：\n<span class='red-text'>妳一個人又會壞掉。</span>\n\n我回頭看她的嘴。那句話已經說完，沒有辦法重播。",
        "phase": "phase-2",
        "choices": [
            {
                "text": "「陪到轉角就好。」",
                "next": "p2_2",
                "effects": {
                    "end_rinbaku": 3
                },
                "memory": {
                    "company": "corner"
                },
                "echo": "她答應了。我開始留意每一個轉角。"
            },
            {
                "text": "「不用，但手帕先借我。」",
                "next": "p2_2",
                "effects": {
                    "end_yura": 2,
                    "end_ekuro": 1
                },
                "memory": {
                    "company": "cloth"
                },
                "echo": "借來的東西暫時留在我身上，人卻可以走開。"
            },
            {
                "text": "在手機記下她的原話，再往前走。",
                "next": "p2_2",
                "effects": {
                    "end_roro": 3
                },
                "memory": {
                    "company": "quote"
                },
                "echo": "我把句號留在「嗎」後面。沒有替她加下一句。"
            }
        ],
        "recalls": [
            {
                "key": "corridor",
                "lines": {
                    "space": "她沒有再拿走手帕。我把它攥在手裡，想著剛才有一件很小的事，確實照我說的發生了。",
                    "verify": "手帕標籤上的劃痕還在。她剛才承認有一句沒聽清。我想把那個「不知道」也留下來。",
                    "recoil": "手背碰到袖口就痛。縛看見我縮手，這次先問：「我可以靠近嗎？」我沒有立刻回答。"
                }
            }
        ]
    },
    "p2_2": {
        "text": "鏡見由良在轉角補唇蜜。她看到我，先抿掉一點畫出界的顏色，才把鏡子舉起來。\n\n「蒔前輩最近都不來看由良。」\n\n她靠得很近。蜜桃的氣味碰到耳機外殼，變成一層黏住的亮光。\n\n鏡中有我們的臉。由良的蝴蝶結歪了；我的嘴角則有另一個人的弧度。\n\n<span class='red-text'>養妳有什麼用。</span>\n\n由良還在整理頭髮。\n\n<span class='red-text'>看著我。不要擺那張臉。</span>\n\n那張嘴也曾經笑過。不是這樣笑的。我記得另一種聲音，卻偏偏長在同一張臉上。\n\n「前輩？」\n\n由良把鏡子放低一點。我還沒伸手，玻璃上的裂痕已經先到了。",
        "phase": "phase-2",
        "choices": [
            {
                "text": "把鏡面輕輕扣在桌上。",
                "next": "p2_mirror_cover",
                "effects": {
                    "end_yura": 3,
                    "end_sai": 1
                },
                "memory": {
                    "mirror": "cover"
                },
                "echo": ""
            },
            {
                "text": "問由良：「妳剛才那句，再說一次。」",
                "next": "p2_mirror_repeat",
                "effects": {
                    "end_roro": 3,
                    "end_yura": 1
                },
                "memory": {
                    "mirror": "repeat"
                },
                "echo": ""
            },
            {
                "text": "先笑給她看，等那些聲音停下來。",
                "next": "p2_mirror_smile",
                "effects": {
                    "end_mahiru": 4
                },
                "memory": {
                    "mirror": "smile"
                },
                "echo": ""
            }
        ]
    },
    "p2_3": {
        "text": "天道真晝替我留了一張椅子。\n\n「今天很熱吧？這裡有風。」\n\n她把電風扇轉過來。善意先到，噪音隨後把它蓋住。我聽見鋁箔被揉緊，銀湯匙刮過不鏽鋼碗，自己的牙齒在聲音裡發酸。\n\n「還好嗎？」\n\n我點頭，卻把耳機壓得更緊。\n\n四隈ロロ坐在旁邊，板子上只有一行心跳數字。她看了數字，又看我，遲遲沒有寫下評語。\n\n真晝等著回答。ロロ也是。\n兩種等待夾著我，像耳機左右兩邊都在漏音。",
        "phase": "phase-2",
        "choices": [
            {
                "text": "請真晝先把風扇關掉，不必離開。",
                "next": "p2_4",
                "effects": {
                    "end_sai": 3,
                    "end_rinbaku": 1
                },
                "memory": {
                    "sound": "lower"
                },
                "echo": "她關掉風扇。頭裡的聲音還在，至少我知道哪一部分不是它。"
            },
            {
                "text": "請ロロ只記數字，暫時不要替我命名。",
                "next": "p2_4",
                "effects": {
                    "end_roro": 3
                },
                "memory": {
                    "sound": "numbers"
                },
                "echo": "她留下空白的欄位。我看著那一格，覺得它比數字更醒目。"
            },
            {
                "text": "跟著真晝笑。讓她相信自己幫上了忙。",
                "next": "p2_4",
                "effects": {
                    "end_mahiru": 4
                },
                "memory": {
                    "sound": "perform"
                },
                "echo": "真晝鬆了口氣。我的笑聲卻忘記在哪裡停。"
            }
        ]
    },
    "p2_4": {
        "text": "走出社辦時，我幾乎撞上湊宵。\n\n她沒有問我怎麼了，先把靠牆的位置讓出來。我坐下，才發現自己一直把膝蓋繃得很緊。\n\n「累了就休息一下。」\n\n她的外套有乾淨枕套的味道。那句話沒有接著問我今天完成了什麼，我竟不知道該把手放在哪裡。\n\n宵的髮絲間垂著一根透明的線。一滴紫色緩緩落下。\n滴答。\n\n我想問她，休息到什麼時候才會開始欠人情。\n\n「醒來再說。」她說。\n\n她怎麼知道我想問什麼？",
        "phase": "phase-2",
        "choices": [
            {
                "text": "「等我能說話了，再問一次，好嗎？」",
                "next": "p3_1",
                "effects": {
                    "end_yoi": 3,
                    "end_roro": 1
                },
                "memory": {
                    "rest": "later"
                },
                "echo": "宵把話停在這裡。我把這個停頓當成一張可以延期的單子。"
            },
            {
                "text": "請她陪著，醒來時告訴我過了多久。",
                "next": "p3_1",
                "effects": {
                    "end_ekuro": 3,
                    "end_rinbaku": 1
                },
                "memory": {
                    "rest": "witness"
                },
                "echo": "她答應看著時鐘。我第一次覺得，秒針也能替人守門。"
            },
            {
                "text": "閉上眼，不再追問下一次醒來的事。",
                "next": "p3_1",
                "effects": {
                    "end_yoi": 4
                },
                "memory": {
                    "rest": "noquestion"
                },
                "echo": "我沒有說永遠。只是把下一個問題放得很遠。"
            }
        ]
    },

    // --- Phase 3 ---
    "p3_1": {
        "text": "滴答。\n\n落下來的卻是一聲掌聲。\n\n我不睏。一點都不睏。方才裝不下我的椅子，忽然小得像玩具。腦子裡那些開著的聲音一起亮起來，每一個都說自己終於找到答案。\n\n赤羽絶站在桌子上，伸手要拉我。\n\n「這次輪到妳了。」\n\n她掌心有薄繭。紅光一閃，那道紋路又像焦掉的電線。\n\n桌子。舞台。桌子。\n\n只差一個稱呼，我就可以從丟臉的人變成有人等待的人。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "握住絶，跟她站到光裡。",
                "next": "p3_2",
                "effects": {
                    "end_zetsu": 4,
                    "end_mahiru": 1
                },
                "memory": {
                    "stage": "join"
                },
                "echo": "腳下的高度變了。她叫它舞台，我也跟著叫。"
            },
            {
                "text": "留在桌邊，請ロロ拍下完整的房間。",
                "next": "p3_2",
                "effects": {
                    "end_roro": 3
                },
                "memory": {
                    "stage": "wide"
                },
                "echo": "她把鏡頭拉遠。那張桌子第一次露出了四隻腳。"
            },
            {
                "text": "舉起卡夾，問這場演出還缺多少。",
                "next": "p3_2",
                "effects": {
                    "end_hina": 4
                },
                "memory": {
                    "stage": "sponsor"
                },
                "echo": "卡片沒有變大。我的手卻開始覺得拿不住。"
            }
        ],
        "recalls": [
            {
                "key": "rest",
                "lines": {
                    "later": "我記得還有一個問題留給醒來以後。現在卻找不到醒來的那一道界線。",
                    "witness": "宵說過會替我看時間。我朝角落找她，時鐘的玻璃裡只有絶在招手。",
                    "noquestion": "我沒問下一次醒來。現在所有鐘聲都像在回答一個沒有問出的問題。"
                }
            }
        ]
    },
    "p3_2": {
        "text": "黑色碎片在空中慢慢落下。\n\n我以為是票根，伸手接住，才摸到垃圾袋剪開的邊。它黏在汗濕的掌心，不肯變回昂貴的東西。\n\n掌聲還在。\nロロ的紅點也還在。\n\n有一瞬間，我分不清哪一個比較像陪伴。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "把掌聲當成回答，繼續說下去。",
                "next": "p3_hina",
                "effects": {
                    "end_mahiru": 3,
                    "end_zetsu": 2
                },
                "memory": {
                    "applause": "continue"
                },
                "echo": "沒有人打斷我。我把這件事誤認成他們都聽懂了。"
            },
            {
                "text": "看著紅點，想記住自己站的位置。",
                "next": "p3_hina",
                "effects": {
                    "end_roro": 3
                },
                "memory": {
                    "applause": "record"
                },
                "echo": "紅點沒有回答，但也沒有移開。"
            },
            {
                "text": "在人群裡找一張只看著我的臉。",
                "next": "p3_hina",
                "effects": {
                    "end_mizore": 3,
                    "end_hina": 1
                },
                "memory": {
                    "applause": "one"
                },
                "echo": "我找得太用力，其他人的臉都開始褪色。"
            }
        ],
        "recalls": [
            {
                "key": "stage",
                "lines": {
                    "join": "絶握著我的手。只要我想往下看，她就把那隻手舉高，像謝幕。",
                    "wide": "鏡頭裡的我站在桌邊，沒有站在頂端。字幕仍然打上「舞台中央」。我看見了，還沒來得及說。",
                    "sponsor": "我一直舉著卡夾。有人拿走它，我下意識鬆了手，彷彿交出去就能完成表演。"
                }
            }
        ]
    },
    "p3_hina": {
        "text": "姬海棠雛替我撿起卡夾。\n\n她穿著黑色晚禮服，指尖沒有碰髒地面。周圍的人還在看表演，她已經在看出口。\n\n「妳不用在這裡證明自己。」\n\n我看向她。這句話我等得太久，幾乎漏聽了後面那半句。\n\n「以後由我替妳安排。」\n\n她把一張紙攤在卡夾下面。收件人是我，聯絡人卻是她。\n\n「妳想留下的東西，都可以帶走。」\n\n我用手按住紙角。很想相信她，也很想看背面。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "把紙翻過來，讀完附註。",
                "next": "p3_contract_read",
                "effects": {
                    "end_hina": 2,
                    "end_roro": 1
                },
                "memory": {
                    "contract": "read"
                },
                "echo": ""
            },
            {
                "text": "先拿回卡夾，再回答她。",
                "next": "p3_contract_keep",
                "effects": {
                    "end_hina": 3,
                    "end_yura": 1
                },
                "memory": {
                    "contract": "keep"
                },
                "echo": ""
            },
            {
                "text": "請她替我處理。我現在看不下去。",
                "next": "p3_contract_delegate",
                "effects": {
                    "end_hina": 4,
                    "end_ekuro": 1
                },
                "memory": {
                    "contract": "delegate"
                },
                "echo": ""
            }
        ]
    },
    "p3_3": {
        "text": "ロロ的板子忽然轉向我。\n\n<span class='red-text'>[蒔前輩，妳尿褲子了。]</span>\n\n那一行字比其他字大。\n\n我先看見字，才感覺到濕掉的布料。掌聲停了。或者一直只有我在聽。\n\n剛才有那麼多句話，沒有一句留下來。\n這一句卻有時間、有畫面，還能重播。\n\nロロ低下板子。\n\n「要不要——」\n\n我不敢等她說完。也許是外套，也許是再看一次。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "「外套。先給我外套。」",
                "next": "p3_4",
                "effects": {
                    "end_ekuro": 3,
                    "end_yoi": 1
                },
                "memory": {
                    "exposure": "coat"
                },
                "echo": "外套蓋到腿上。畫面還沒停止，至少我不用再看著自己的膝蓋。"
            },
            {
                "text": "請她保留紀錄，但先把畫面轉過去。",
                "next": "p3_4",
                "effects": {
                    "end_roro": 3
                },
                "memory": {
                    "exposure": "private"
                },
                "echo": "紅點朝向牆。我第一次看見機器的背面，沒有表情。"
            },
            {
                "text": "把笑話說完，裝作表演本來就包括這一段。",
                "next": "p3_4",
                "effects": {
                    "end_mahiru": 3,
                    "end_zetsu": 1
                },
                "memory": {
                    "exposure": "joke"
                },
                "echo": "我等著有人笑。沒有人笑，我就再說一遍。"
            }
        ]
    },
    "p3_4": {
        "text": "走廊廣播叫了一次我的名字。\n\n接著又叫了一次，換成編號。\n\n我想站起來，腿卻沒有收到同一個通知。遠處有人搬椅子，像在替下一場活動清場。\n\n「先到安靜一點的地方。」\n\n那句話沒有說是誰決定的。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "請ロロ把我剛才的要求也寫進去。",
                "next": "p4_1",
                "effects": {
                    "end_roro": 3,
                    "end_sai": 1
                },
                "memory": {
                    "transition": "include"
                },
                "echo": "她在表格下面另開一行。上面沒有預印的選項。"
            },
            {
                "text": "問絶：「如果不繼續唱，妳還在嗎？」",
                "next": "p4_1",
                "effects": {
                    "end_zetsu": 3,
                    "end_mizore": 1
                },
                "memory": {
                    "transition": "stay"
                },
                "echo": "絶張了嘴，這一次沒有警報替她回答。"
            },
            {
                "text": "不再解釋，只求有人陪我走完走廊。",
                "next": "p4_1",
                "effects": {
                    "end_yoi": 3,
                    "end_ekuro": 2
                },
                "memory": {
                    "transition": "walk"
                },
                "echo": "有人放慢腳步。我仍不知道那是等我，還是不讓我落單。"
            }
        ],
        "recalls": [
            {
                "key": "exposure",
                "lines": {
                    "coat": "外套有一顆鬆掉的鈕扣。我一直捏著它，沒有去看那些人的臉。",
                    "private": "畫面已經轉開。我還記得自己提出過這個要求，怕醒來之後只剩下「沒有反應」四個字。",
                    "joke": "我嘴裡還留著笑話的結尾。沒有說完，它就像一件尚未交出的作業。"
                }
            }
        ]
    },

    // --- Phase 4 ---
    "p4_1": {
        "text": "再次醒來時，我被綿瀬絵躯抱著。\n\n米黃色的布料貼著臉，有洗衣精和曬過太陽的味道。她一下一下拍我的背。我數到第四下，才發現自己的手抽不出來。\n\n「醒了？再躺一下。」\n\n我小時候也喜歡有人陪著等天亮。那時只要握手，不必先交出一份表現良好的證明。\n\n絵躯把被角掖進我身側。\n\n我想被照顧。\n也想翻身。\n\n這兩件事擠在嘴裡，竟像互相矛盾。",
        "phase": "phase-4",
        "choices": [
            {
                "text": "「抱著也可以，但這邊放鬆一點。」",
                "next": "p4_2",
                "effects": {
                    "end_ekuro": 3,
                    "end_yura": 1
                },
                "memory": {
                    "care": "loosen"
                },
                "echo": "絵躯鬆開一角。空氣進來時，我才知道剛才有多熱。"
            },
            {
                "text": "請她替我回答。我想先歇一會兒。",
                "next": "p4_2",
                "effects": {
                    "end_ekuro": 4,
                    "end_yoi": 1
                },
                "memory": {
                    "care": "speak"
                },
                "echo": "她點頭，像終於收到一個自己熟悉的請求。"
            },
            {
                "text": "把目光移向鐘面，記住這次醒來。",
                "next": "p4_2",
                "effects": {
                    "end_sai": 3,
                    "end_roro": 1
                },
                "memory": {
                    "care": "clock"
                },
                "echo": "秒針走過一格。我在心裡跟著走了一格。"
            }
        ],
        "recalls": [
            {
                "key": "touch",
                "lines": {
                    "fingertips": "指尖還記得頂樓那一下輕觸。和現在不同。原來靠近也有很多種距離。",
                    "wait": "我記得自己說過「等一下」。霙當時把手放下了。那個停頓並沒有把她從世界上刪掉。",
                    "hide": "袖口還蓋著手。我把它藏了那麼久，現在竟也要先找一找自己的手在哪裡。"
                }
            }
        ]
    },
    "p4_2": {
        "text": "氷堂再推著一張窄床過來。\n\n她深藍色的袖口很平整。名牌反著，沒有人提醒她。\n\n「我們先把需要處理的地方確認一下。」\n\n她給我看一張紙。上面有「同意」，有「理解」，有一個已經打好的勾。\n\n我還沒看完，她便把紙往下翻。\n\n「等等。」\n\n我的聲音很小。再停住，耐心地等。那種耐心讓我想趕快說一個值得她等的答案。\n\n桌上的玻璃罐裡泡著幾個字：拒絕、記得、我。\n也可能只是標籤透過玻璃的倒影。\n\n「這一格還沒填。」她說。",
        "phase": "phase-4",
        "choices": [
            {
                "text": "「我還沒看懂。把這句也寫上去。」",
                "next": "p4_statement",
                "effects": {
                    "end_roro": 2,
                    "end_yura": 2
                },
                "memory": {
                    "procedure": "statement"
                },
                "echo": ""
            },
            {
                "text": "請縛進來，但讓我自己回答。",
                "next": "p4_witness",
                "effects": {
                    "end_rinbaku": 3
                },
                "memory": {
                    "procedure": "witness"
                },
                "echo": ""
            },
            {
                "text": "指著已打勾的地方：「照上面的做吧。」",
                "next": "p4_form",
                "effects": {
                    "end_sai": 4
                },
                "memory": {
                    "procedure": "form"
                },
                "echo": ""
            }
        ]
    },
    "p4_3": {
        "text": "門關上以後，我還聽得見縛。\n\n她隔著門叫我的名字，一次又一次。\n\n我張嘴，先試了試聲音還在不在。沒有字，只是一點氣。\n\n走廊的燈很白。玻璃罐也很白。\n頂樓的夕陽不知被誰收進抽屜，露出底下從來沒有乾透的灰。\n\n門外問：「接下來交給誰？」\n\n我以為它會問我想去哪裡。",
        "phase": "phase-4",
        "choices": [
            {
                "text": "「請縛等我。我還不能說自己好了。」",
                "next": "diagnosis",
                "effects": {
                    "end_rinbaku": 4
                },
                "memory": {
                    "handover": "wait"
                },
                "echo": "那個「還」字使門外安靜了一會兒。"
            },
            {
                "text": "請她們把今天的紀錄留給我。",
                "next": "diagnosis",
                "effects": {
                    "end_roro": 2,
                    "end_sai": 2
                },
                "memory": {
                    "handover": "copy"
                },
                "echo": "紙從門縫遞進來，最下方仍有一格空著。"
            },
            {
                "text": "問雛，她答應的房間現在能不能去。",
                "next": "diagnosis",
                "effects": {
                    "end_hina": 4
                },
                "memory": {
                    "handover": "room"
                },
                "echo": "有人回答可以，快得像一直等著我問。"
            },
            {
                "text": "呼喚霙，請她先別翻到最後一頁。",
                "next": "diagnosis",
                "effects": {
                    "end_mizore": 4
                },
                "memory": {
                    "handover": "page"
                },
                "echo": "紙頁停在半空。我不知道是她聽見了，還是我還沒鬆手。"
            }
        ]
    },
    "diagnosis": {
        "text": "點名簿翻到我這一頁。\n\n有些回答被抄下來。有些只剩一個勾。還有幾句被挪到別人的名字底下，像我曾經請她代答一切。\n\n我想指出不是這樣的。\n\n紅筆已經圈起一個名字。\n\n<span class='case-note'>歸檔完成。原始回答另存。</span>\n\n紙背透出我剛才留下的筆跡。",
        "phase": "phase-4",
        "adjudicate": true
    },

    // --- Endings ---
    "end_mizore": {
        "text": "🩸 空木霙路線：【Solipsism / 唯我論的玩偶屋】\n\n鎌倉的洋房裡沒有消毒水。\n沒有日光燈。\n沒有縛哭到變形的臉。\n\n只有霙。\n\n她原本乾淨的白洋裝先從裙襬滲出黑色，蕾絲一層層增生，最後變成過時的維多利亞洋裝；左臉也像陶瓷娃娃一樣裂開，裂縫裡沒有血，只有黑色空洞。她每天問我：「蒔前輩，今天的我是誰？」\n\n我替她回答。\n我替她眨眼。\n我替她呼吸。\n我替她把那顆不會動的頭轉向我。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "替她填好最後一頁，讓她永遠不必為難。",
                "next": "end_mizore_choice_a",
                "memory": {
                    "role": "a"
                },
                "echo": ""
            },
            {
                "text": "留下一行空白，等她自己回答。",
                "next": "end_mizore_choice_b",
                "memory": {
                    "role": "b"
                },
                "echo": ""
            }
        ],
        "recalls": [
            {
                "key": "casting",
                "lines": {
                    "self": "我曾經說，今天不用演給我看。現在她真的不動了，我卻一直想替她接下一句。那一頁空白，比任何台詞都難以忍受。",
                    "stay": "她確實留下來了。窗外的光換過幾次，她仍坐在同一把椅子上。我開始不敢問，留下來的人還能不能改變主意。",
                    "pay": "衣櫃裡掛滿我付過錢的洋裝。每一件都合身，沒有一件回答過她想穿什麼。"
                }
            }
        ]
    },
    "end_mizore_2": {
        "text": "她的身體越來越輕。\n輕得像枕頭，像空氣，像我抱太久之後留下的凹陷。\n\n我知道那不是愛。\n但我需要它像愛一樣存在。\n\n霙用我的聲音說：「沒關係喔，蒔前輩。這裡只有我們，不需要任何審查。」\n\n她的嘴角沾著我的口水。\n我說那是聖水。",
        "phase": "phase-1",
        "next": "end_mizore_3"
    },
    "end_mizore_3": {
        "text": "白色。藍色。蕾絲。蝴蝶結。\n\n我替霙換好戲服，把裙角撫平。她問今天還有什麼要做，我說沒有，陪我就好。\n\n她真的留下來了。\n\n窗外傳來一聲車響。我忽然想問她會不會也想出去，又怕她說會，只好先問她冷不冷。\n\n霙用我的語氣說，不冷。\n\n我把窗簾拉好。",
        "phase": "phase-1",
        "next": "end_mizore_4"
    },
    "end_mizore_4": {
        "text": "社辦外有人叫我。\n\n「小蒔。」\n\n我把霙抱得更緊。\n她的臉埋進我的胸口，沒有溫度，也沒有重量。\n\n「不要理她。」霙說。\n「縛前輩是現實。現實會把我們拆開。」\n\n我點頭。\n我用力點頭。\n脖子發出乾燥的聲音，像蟬殼碎裂。",
        "phase": "phase-1",
        "next": "end_mizore_5"
    },
    "end_mizore_5": {
        "text": "<span class='ending-divider'>護理站的印表機吐出最後一張紙。墨水還濕，名字已經乾了。</span>\n\n【病人 No.0】\n\n個案抱持枕頭並長時間自語，以腹語方式替枕頭回應。語言功能退化，拒絕與現實人物進行穩定互動。\n\n個案稱該枕頭為「空木霙」。\n個案稱自己已獲得永恆幸福。\n\n床單潮濕。枕套需每日更換。\n\n【BAD END - The Dollmaker】",
        "phase": "phase-1",
        "next": null,
        "recalls": [
            {
                "key": "role",
                "lines": {
                    "a": "劇本最後一頁寫得很滿。沒有一行需要等待回覆。",
                    "b": "劇本有一行沒有填。翻頁時，我總會避開那一小塊空白。"
                }
            }
        ]
    },

    "end_yura": {
        "text": "🪞 鏡見由良路線：【Narcissism / 破碎鏡像】\n\n由良的臉變成鏡子。\n\n她改短的制服沿著縫線翻出黑粉布料，變成綴滿小鏡片的地雷系短外套，玻璃蝴蝶結垂在髮側，笑起來時每一片碎面都映出不同的我：乖女兒、廢物、受害者、騙子、怪物。\n\n「蒔前輩，看著我。」\n\n腦內字幕改寫成：\n<span class='red-text'>看著妳自己有多噁心。</span>",
        "phase": "phase-2",
        "choices": [
            {
                "text": "揮開眼前的鏡面，讓那張臉離我遠一點。",
                "next": "end_yura_choice_a",
                "memory": {
                    "mirrorRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "用手帕包住鏡面，先不看。",
                "next": "end_yura_choice_b",
                "memory": {
                    "mirrorRoute": "b"
                },
                "echo": ""
            }
        ],
        "recalls": [
            {
                "key": "mirror",
                "lines": {
                    "cover": "我記得把鏡子扣下時，由良曾經安靜了一會兒。原來反光消失，聲音也不一定跟著消失。",
                    "repeat": "上次我請她再說一遍，她說的是想見我。這一次，我把那句話留在舌尖，試著不讓字幕先替她開口。",
                    "smile": "我的嘴角還記得先笑起來的方法。由良的鏡片亮了一下，像有人驗收完一件修好的東西。"
                }
            }
        ]
    },
    "end_yura_2": {
        "text": "由良的聲音從低處傳來。\n\n「蒔前輩，妳在怕誰？」\n\n我想指向鏡子，手卻停在自己面前。\n\n她沒有笑。我寧可她笑，至少我知道那個聲音該放在哪張臉上。",
        "phase": "phase-2",
        "next": "end_yura_3",
        "recalls": [
            {
                "key": "mirrorRoute",
                "lines": {
                    "a": "地上有碎片。我小心避開，卻仍在每一塊裡看見完整的眼睛。",
                    "b": "手帕下面沒有動靜。我知道鏡子還是完整的，所以那聲裂響只能從別處來。"
                }
            }
        ]
    },
    "end_yura_3": {
        "text": "「妳看，我們很像。」\n\n我已經不確定由良有沒有說話。\n\n那張臉曾經對我笑過，也曾經等著我低頭。現在它長在我身上，連我生氣的樣子都能被拿來作證。\n\n我練習把嘴角放平。練習不用那種語氣說話。練習一個不像他的表情。\n\n由良在旁邊等，像一面很有耐心的鏡子。",
        "phase": "phase-2",
        "next": "end_yura_4"
    },
    "end_yura_4": {
        "text": "我說，我和那個人不一樣。\n\n聲音太用力，我立刻停住。剛才那一下是不是也很像？\n\n我再說一次，這次小聲。\n\n由良湊近，要我把話說清楚。\n\n我不知道還剩下哪一種音量，可以讓我說完，又不被聽成他。",
        "phase": "phase-2",
        "next": "end_yura_5"
    },
    "end_yura_5": {
        "text": "後來我開始檢查每一句話。\n\n這個字太兇。那個字太軟。笑的時候露出牙齒，不笑又像在生氣。\n\n由良替我數。她說前輩今天進步了，只有三次不像自己。\n\n我問她，自己是什麼樣子。\n\n她把鏡子遞過來。",
        "phase": "phase-2",
        "next": "end_yura_6"
    },
    "end_yura_6": {
        "text": "房間裡的鏡子被收走了。\n\n我本來應該鬆一口氣，卻開始看窗戶、湯匙、熄掉的螢幕。\n\n由良沒有離開。她坐在每一個會反光的地方，等我確認。\n\n「這次像不像？」我問。\n\n她沒有說像誰。",
        "phase": "phase-2",
        "next": "end_yura_7"
    },
    "end_yura_7": {
        "text": "<span class='ending-divider'>反光的東西被逐一收走，清點的人沒有看向窗戶。</span>\n\n【病人 No.0／摘錄】\n\n個案反覆要求確認自己的言行，對外貌相似與他人評價持續不安。\n\n處置欄：移除鏡面物品。\n後續觀察欄尚未填寫。\n\n我看著那一格。由良的臉在白紙上慢慢浮出來。\n\n【BAD END - The Queen of Ward】",
        "phase": "phase-2",
        "next": null,
        "recalls": [
            {
                "key": "mirrorRoute",
                "lines": {
                    "a": "證物袋裡的碎鏡被編了號。我的手先得到處理，剛才聽見的話沒有欄位可填。",
                    "b": "鏡面完整，外面包著一條手帕。清點表仍沿用「破損」那一欄，我指了兩次，才有人加上問號。"
                }
            }
        ]
    },

    "end_roro": {
        "text": "📟 四隈ロロ路線：【Cybernetics / 情感格式化】\n\nロロ把螢幕轉向我。\n\n她的灰黑長髮先映出一層靜電雪花，五官被玻璃從內側抹平，頭部最後變成一台厚重 CRT，玻璃內側黏著細小灰塵，裙子的格紋像錯位 QR Code，指尖垂著各種接頭。她沒有瞳孔，只有錄影中的紅點。\n\n<span class='case-note'>LOAD MEMORY? Y/N // FORCED</span>\n\n橘色飲料。三坪房間。燒過紙的煙味。廉價床架吱吱作響。\n\n我沒有回到那裡。\n我只是讀取了那裡。\n\n這是資料。\n不是我。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "讓ロロ替我整理成沒有情緒的紀錄。",
                "next": "end_roro_choice_a",
                "memory": {
                    "recordRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "請她把「我不知道怎麼說」也留下來。",
                "next": "end_roro_choice_b",
                "memory": {
                    "recordRoute": "b"
                },
                "echo": ""
            }
        ],
        "recalls": [
            {
                "key": "stage",
                "lines": {
                    "wide": "螢幕角落還留著我請她拍下的全景。桌子有四隻腳，門也一直在。現在播放的片段卻只剩我的臉。",
                    "join": "播放列裡有我握住絶的那一格。ロロ停在那裡，問這是否代表之後的一切都是我願意的。我找不到能回答整段影片的一個字。",
                    "sponsor": "卡夾出現在畫面邊緣。鏡頭把手指裁掉以後，看起來像卡片自己走向了她們。"
                }
            }
        ]
    },
    "end_roro_2": {
        "text": "身體被留在遠處。\n\n我退到天花板角落，退到錄音檔裡，退到紅燈亮起的那一點。\n\n<span class='case-note'>REC // REC // REC</span>\n\n我聽見塑膠摩擦、拉鍊、床板、自己的聲音。\n那聲音不像求救，也不像同意。\n那只是系統為了活下去，自動播放的偽裝音效。\n\n我不在那裡。\n我必須不在那裡。",
        "phase": "phase-3",
        "next": "end_roro_3"
    },
    "end_roro_3": {
        "text": "如果我承認那是我的身體，主機板會燒毀。\n\n所以我把皮膚命名為外殼。\n把疼痛命名為訊號。\n把恐懼命名為雜訊。\n把那段時間壓縮成一個不能打開的檔案。\n\nロロ板顯示：\n<span class='case-note'>EMOTION DRIVER NOT FOUND // SURVIVAL MODE ACTIVE</span>",
        "phase": "phase-3",
        "next": "end_roro_4"
    },
    "end_roro_4": {
        "text": "後來，家也變成伺服器。\n\n「手機拿來。」\n\n我還沒解鎖，手腕先被抓住。身體跌到地上，螢幕卻被他們舉得很高。訊息、照片、證據，一頁一頁被翻閱；每一次滑動，都把我的皮膚改名成家裡的麻煩。\n\n我看見父母的嘴一張一合，輸出錯誤代碼。\n\n<span class='red-text'>妳怎麼這麼笨。\n為什麼不反抗。\n為什麼不早點說。\n現在大家都要替妳收拾。\n不要把自己講得像受害者，好像我們才是壞人。</span>\n\n過了一會兒，聲音忽然放輕。\n\n「我們也是擔心妳。」\n\n我按下靜音。\n世界安靜了。\n我也安靜了。",
        "phase": "phase-3",
        "next": "end_roro_5"
    },
    "end_roro_5": {
        "text": "成為機器以後，日子變得很容易。\n\n準時吃藥。\n準時排泄。\n準時回答：「我沒事。」\n\n每次有人問我感覺如何，ロロ都替我顯示最合適的表情。\n\n( >_< )\n( ^_^ )\n( ERROR )\n\n我把眼淚格式化了。\n空出很多容量。",
        "phase": "phase-3",
        "next": "end_roro_6"
    },
    "end_roro_6": {
        "text": "<span class='ending-divider'>螢幕熄滅後，紀錄仍在黑色玻璃底下自行捲動。</span>\n\n【病人 No.0】\n\n個案情緒反應顯著平板化，能完成基本生活指令。創傷敘述呈高度第三人稱化，主訴「那些不是我，只是資料」。\n\n社會功能表面恢復。\n內在感受無法確認。\n\n【BAD END - The Recorder】",
        "phase": "phase-3",
        "next": null,
        "recalls": [
            {
                "key": "recordRoute",
                "lines": {
                    "a": "匯出檔案沒有停頓。每一句都像有人確定地說過。",
                    "b": "附件裡保留了一句「我不知道怎麼說」。它不符合表格，卻沒有被刪掉。"
                }
            }
        ]
    },

    "end_zetsu": {
        "text": "🔥 赤羽絶路線：【Destruction / 焦土作戰】\n\n火災警報器唱起歌。\n\n絶站在紅色旋轉燈裡，對我伸出手。她的紅色舞台服沿著袖口自行收緊，束帶交叉纏住手臂，變成鮮紅拘束衣；拖在地面的袖口像燒焦的旗，喉嚨裡嵌著擴音器，胸腔閃著消防警示燈。\n\n「秋葉蒔，拔劍吧！」\n\n我低頭看著那個不存在的武器。\n它終於不再是羞恥。\n它是聖劍。\n是用恐懼鍛造、用辱罵磨利的正義。",
        "phase": "phase-3",
        "choices": [
            {
                "text": "對著擴音器喊我的名字。",
                "next": "end_zetsu_choice_a",
                "memory": {
                    "alarmRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "把擴音器朝向門外，喊「這裡有人」。",
                "next": "end_zetsu_choice_b",
                "memory": {
                    "alarmRoute": "b"
                },
                "echo": ""
            }
        ]
    },
    "end_zetsu_2": {
        "text": "紅色的光突然變近。\n\n我以為自己朝出口走，回過神時，器材已經倒在地上。有人叫我放手，我找不到那句話的方向。\n\n絶仍在唱。聲音把一切都推成同一個節拍。\n\n「這樣就能出去嗎？」我問。\n\n她把我的問題唱得很大聲，卻沒有回答。\n\n走廊盡頭升起煙。",
        "phase": "phase-3",
        "next": "end_zetsu_3"
    },
    "end_zetsu_3": {
        "text": "我以為自己終於能保護誰。\n\n可是縛站在走廊另一端，要我停下。絶伸出的手還在前面，兩個方向都像有人需要我。\n\n我回頭找公主。\n\n沒有王座，沒有謝幕。有人咳嗽，有人蹲下來找掉在地上的眼鏡。\n\n我忽然想不起來，是誰答應過打倒惡龍就能得到出口。",
        "phase": "phase-3",
        "next": "end_zetsu_4"
    },
    "end_zetsu_4": {
        "text": "後腦一陣劇痛。\n\n地板貼上我的臉。\n火災灑水器啟動，黑色髒水落在身上，像一場失敗的祝福。\n\n絶仍在笑。\n她在火光裡比任何人都自由。\n\n「還沒結束，小蒔。革命永遠不會結束。」",
        "phase": "phase-3",
        "next": "end_zetsu_5"
    },
    "end_zetsu_5": {
        "text": "五點式約束很緊。\n緊得像掌聲。\n\n我盯著天花板上的監視器紅點。\n那是觀眾席最後一支螢光棒。\n\n我哼著走調的歌。\n喉嚨很痛。\n但英雄不可以停。",
        "phase": "phase-3",
        "next": "end_zetsu_6"
    },
    "end_zetsu_6": {
        "text": "<span class='ending-divider'>警報停止了。紅色卻留在每一個閉上的眼皮內側。</span>\n\n【病人 No.0】\n\n個案因縱火、破壞公物與攻擊醫護轉入高度戒護精神醫療區。仍呈極度亢奮與被害式英雄妄想。\n\n個案稱禁閉室為「休息室」。\n\n【BAD END - The Martyr】",
        "phase": "phase-3",
        "next": null,
        "recalls": [
            {
                "key": "alarmRoute",
                "lines": {
                    "a": "錄音裡可以辨認出我的名字，其他聲音全被歸為警報。",
                    "b": "紀錄只寫「持續叫喊」。隔壁的人在背面補了一句：她好像說，這裡有人。"
                }
            }
        ]
    },

    "end_ekuro": {
        "text": "🤱 綿瀬絵躯路線：【Regression / 羊水窒息】\n\n成人的空氣太苦了。\n\n絵躯張開雙臂。\n她不是人，是米黃色軟墊牆堆成的山，是溫暖的束縛衣，是把所有責任揉爛後塞回子宮的巨大善意。氧氣面罩垂在她胸前，像一枚會呼吸的乳牙。\n\n「小蒔，累了吧？」\n\n我點頭。\n我不要長大了。",
        "phase": "phase-4",
        "choices": [
            {
                "text": "把剩下的話也交給絵躯說。",
                "next": "end_ekuro_choice_a",
                "memory": {
                    "careRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "請她抱著我，但不要替我點頭。",
                "next": "end_ekuro_choice_b",
                "memory": {
                    "careRoute": "b"
                },
                "echo": ""
            }
        ],
        "recalls": [
            {
                "key": "touch",
                "lines": {
                    "fingertips": "我記得自己曾經只伸出指尖。絵躯卻把整個人抱了過去；我想找回那一道小小的距離，又捨不得她身上的暖。",
                    "wait": "「先陪我站一會兒。」這句話我說過。絵躯真的陪著我，只是她替「一會兒」收起了所有時鐘。",
                    "hide": "她沒有掀我的袖子。我鬆了一口氣，才發現她正在替我把每一個開口都縫好。"
                }
            }
        ]
    },
    "end_ekuro_2": {
        "text": "面罩貼著口鼻。聲音隔了一層薄薄的塑膠，變得很遠。\n\n絵躯把被角重新壓好。\n\n「現在什麼都不用管。」\n\n我想相信她。桌上的紙、未回的訊息、別人的失望，暫時都不在這層布料裡。\n\n連我想翻身的那一句，也被留在外面。",
        "phase": "phase-4",
        "next": "end_ekuro_3"
    },
    "end_ekuro_3": {
        "text": "我的幻肢不見了。\n\n太好了。\n嬰兒不需要武器。\n嬰兒不需要證明自己不是受害者。\n嬰兒只需要哭，然後被抱起來。\n\n我張開嘴，發出沒有語意的聲音。\n絵躯笑著說：「好乖。」\n\n我終於不用當秋葉蒔。",
        "phase": "phase-4",
        "next": "end_ekuro_4"
    },
    "end_ekuro_4": {
        "text": "語言先退化。\n再來是羞恥。\n再來是時間。\n\n尿布的觸感很悶，很熱，很安心。\n\n我縮在軟墊房角落吸吮拇指，聽見外面有人嘆氣。\n\n那不是我的事。\n外面是出生以後的人才要負責的世界。",
        "phase": "phase-4",
        "next": "end_ekuro_5"
    },
    "end_ekuro_5": {
        "text": "絵躯每天來看我。\n或者那只是保健室老師。\n或者只是棉被。\n\n沒關係。\n名字很難。\n人也很難。\n\n我只記得溫暖和窒息。\n兩者沒有差別。",
        "phase": "phase-4",
        "next": "end_ekuro_6"
    },
    "end_ekuro_6": {
        "text": "<span class='ending-divider'>搖籃曲唱到沒有歌詞的地方，值班人員接手填完了表格。</span>\n\n【病人 No.0】\n\n個案語言功能退化，呈高度依賴與退行行為。需協助進食與排泄。對「成長」「責任」「出院」等詞彙出現恐慌反應。\n\n個案似乎感到平靜。\n\n【BAD END - Eternal Infant】",
        "phase": "phase-4",
        "next": null,
        "recalls": [
            {
                "key": "careRoute",
                "lines": {
                    "a": "問答欄填得很齊，回答者只簽了一個名字。",
                    "b": "有一個問題後面留下了搖頭的記號。後來的人不知道它在拒絕哪一句。"
                }
            }
        ]
    },

    "end_mahiru": {
        "text": "🔦 天道真晝路線：【Mania / 過曝的太陽】\n\n真晝把燈打開。\n\n不是一盞。\n是全部。\n\n她原本會反光的金髮被強光一寸寸漂白，髮尾像曝光錯誤般不斷拉長；最後整個人白得像沖洗失敗的照片，霓虹白長髮沒有陰影，眼睛是兩盞手術無影燈。\n\n「蒔蒔，笑一個嘛！」\n\n白光從我的眼窩灌進腦子，把陰影、睡意、羞恥、哀傷全部燒成灰。\n\n好亮。\n好快樂。\n快樂得像皮膚正在融化。",
        "phase": "phase-2",
        "choices": [
            {
                "text": "告訴真晝，我還可以再陪她笑一會兒。",
                "next": "end_mahiru_choice_a",
                "memory": {
                    "lightRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "請她把一盞燈關掉，別急著安慰。",
                "next": "end_mahiru_choice_b",
                "memory": {
                    "lightRoute": "b"
                },
                "echo": ""
            }
        ]
    },
    "end_mahiru_2": {
        "text": "我開始說話。\n停不下來。\n\n冷笑話。投資計畫。創作計畫。復仇計畫。今天開始我要改變世界的計畫。\n\n真晝一直笑。\n她越笑，我越亮。\n\n我三天沒有睡。\n睡眠是陰影的陰謀。",
        "phase": "phase-2",
        "next": "end_mahiru_3"
    },
    "end_mahiru_3": {
        "text": "耳機被我摘掉。\n\n吵才是活著。\n刺眼才是活著。\n胃痛才是活著。\n手抖才是活著。\n\n我對著不存在的觀眾比出勝利手勢。\n\nロロ板顯示：\n<span class='case-note'>SLEEP: 0H // FOOD: 0 // JUDGMENT: CRITICAL</span>\n\n我說：「我好得不能再好！」",
        "phase": "phase-2",
        "next": "end_mahiru_4"
    },
    "end_mahiru_4": {
        "text": "第四天，光開始有味道。\n\n燒焦的塑膠味。\n眼球烤熟的味。\n嘴唇裂開後鐵鏽的味。\n\n真晝還在笑。\n可是她的臉太亮了，我看不見五官。\n\n太陽沒有惡意。\n太陽只是照著。\n直到所有東西都脫水。",
        "phase": "phase-2",
        "next": "end_mahiru_5"
    },
    "end_mahiru_5": {
        "text": "我倒下時還在笑。\n\n嘴角僵住，像被釘在臉上的貼紙。\n\n有人叫我的名字。\n我聽不見。\n\n耳朵裡只有巨大的、明亮的靜電聲。",
        "phase": "phase-2",
        "next": "end_mahiru_6"
    },
    "end_mahiru_6": {
        "text": "<span class='ending-divider'>日光燈一盞接一盞熄滅，餘像替它們繼續照明。</span>\n\n【病人 No.0】\n\n個案因長時間失眠、拒食與躁性亢奮導致衰竭。感官過載後呈遲鈍反應，瞳孔對光反射遲緩。\n\n個案仍反覆喃喃：「我很好。」\n\n【BAD END - Burnout Sun】",
        "phase": "phase-2",
        "next": null,
        "recalls": [
            {
                "key": "lightRoute",
                "lines": {
                    "a": "活動紀錄寫著「互動良好」。照片裡，我一直張著嘴。",
                    "b": "牆上有一盞燈被關掉過。後來又亮了；我仍記得那一小塊曾經暗下來的地方。"
                }
            }
        ]
    },

    "end_sai": {
        "text": "👠 氷堂再路線：【Lobotomy / 冰冷標本】\n\n再說我迷路了。\n\n我說沒有。\n\n她穿著深藍刷手服，剪裁像夜色晚禮服，十根指尖細長得像藏在皮膚裡的手術刀。她微笑，把我推上保健室冰冷的檢查床。\n\n「再一次。」\n\n她的名字就是這個意思。\n再一次忘記。\n再一次重置。\n再一次把太吵的我切得安靜一點。",
        "phase": "phase-4",
        "choices": [
            {
                "text": "簽在已經勾好的格子下面。",
                "next": "end_sai_choice_a",
                "memory": {
                    "formRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "把我沒有說過的那句圈起來。",
                "next": "end_sai_choice_b",
                "memory": {
                    "formRoute": "b"
                },
                "echo": ""
            }
        ]
    },
    "end_sai_2": {
        "text": "電極貼上太陽穴。\n\n恐懼先變成白光。\n白光再變成空白。\n\n我覺得自己被放進福馬林罐子裡。\n液體很冷，但很乾淨。\n\n乾淨真好。\n乾淨代表沒有記憶會腐爛。",
        "phase": "phase-4",
        "next": "end_sai_3"
    },
    "end_sai_3": {
        "text": "特別輔導結束後，我變得優雅。\n\n我不再尖叫。\n不再抓牆。\n不再對枕頭說話。\n\n老師說我終於懂事了。\n\n穩定的意思是，疼痛被固定在一個不會干擾別人的地方。",
        "phase": "phase-4",
        "next": "end_sai_4"
    },
    "end_sai_4": {
        "text": "我坐在窗邊。\n陽光照在臉上，我不眨眼。\n\n有人問我記不記得縛。\n\n縛？\n\n那個詞很粉紅。\n但沒有意義。",
        "phase": "phase-4",
        "next": "end_sai_5"
    },
    "end_sai_5": {
        "text": "再經過時，我會微笑。\n\n她很滿意。\n我也很滿意。\n\n或者我只是看起來很滿意。\n\n標本不需要區分。",
        "phase": "phase-4",
        "next": "end_sai_6"
    },
    "end_sai_6": {
        "text": "<span class='ending-divider'>門打開時，再把兩張不同的表格疊在一起。</span>\n\n【病人 No.0／處置摘要】\n\n外在反應平穩。流程完成。\n\n我的那張寫著：有些事記不清，有些仍然害怕。\n\n摘要最後一行印著「成功」。\n它沒有引用我的那張。\n\n【NORMAL END - The Specimen】",
        "phase": "phase-4",
        "next": null,
        "recalls": [
            {
                "key": "formRoute",
                "lines": {
                    "a": "原件有我的簽名。問到當時說了什麼，我卻只能想起墨水的顏色。",
                    "b": "原件旁留著一個歪掉的圈。摘要沒有收錄它，影本上還看得見。"
                }
            }
        ]
    },

    "end_yoi": {
        "text": "💉 湊宵路線：【Euthanasia / 甜蜜死亡】\n\n宵把窗簾拉上，黃昏留在布料裡，慢慢變成紫色。\n\n她的髮絲垂到床沿，透明的管線一滴一滴地響。下半身和床單沒有明確的邊界。我不去看，只望著枕邊還能坐下一個人的位置。\n\n「醒著很累吧？」\n\n我點頭。\n\n我想要的是不用證明自己值得休息的一天。可她把日曆也一起收走了。\n\n房間開始分不清今天和明天。",
        "phase": "phase-4",
        "choices": [
            {
                "text": "請宵不要再問我明天的事。",
                "next": "end_yoi_choice_a",
                "memory": {
                    "sleepRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "請她把鐘放在醒來看得見的地方。",
                "next": "end_yoi_choice_b",
                "memory": {
                    "sleepRoute": "b"
                },
                "echo": ""
            }
        ]
    },
    "end_yoi_2": {
        "text": "紫色液體流進血管。\n\n耳鳴遠了。\n父母的聲音遠了。\n那個夜晚遠了。\n我也遠了。\n\n幻肢開始融化。\n\n它變成一灘紫色死水，順著床單往下流。\n\n原來保護自己也這麼重。",
        "phase": "phase-4",
        "next": "end_yoi_3"
    },
    "end_yoi_3": {
        "text": "宵張開懷抱。\n\n那不是懷抱，是沼澤。\n是加了糖的死亡。\n是終於不用再解釋任何事的沉默。\n\n撲通。\n\n撲通。\n\n撲通…………",
        "phase": "phase-4",
        "next": "end_yoi_4"
    },
    "end_yoi_4": {
        "text": "有人在很遠的地方喊我。\n\n我以為只閉了一下眼睛。\n\n那個人卻換了一次位置，換了一件衣服，連說話的聲音都啞了。\n\n我想說，等一下，我在這裡。\n\n紫色的水沒有替我把話送出去。",
        "phase": "phase-4",
        "next": "end_yoi_5"
    },
    "end_yoi_5": {
        "text": "維生儀器規律地響。\n\n嗶。\n嗶。\n嗶。\n\n那是搖籃曲。\n\n我在夢裡睡在宵的膝上。\n現實替我呼吸。",
        "phase": "phase-4",
        "next": "end_yoi_6"
    },
    "end_yoi_6": {
        "text": "<span class='ending-divider'>點滴落下時，床邊的人又看了一次鐘。</span>\n\n【病人 No.0／交班摘錄】\n\n急救後仍未恢復可確認的回應。持續照護。\n\n探視者說，個案以前只是一直說很累。\n\n那句話被寫在頁尾。新一班的人翻頁時，手指壓住了它。\n\n【BAD END - Sleeping Beauty】",
        "phase": "phase-4",
        "next": null,
        "recalls": [
            {
                "key": "sleepRoute",
                "lines": {
                    "a": "床邊沒有排好的明日日程。值班的人重新寫了一份，沒有人能替我簽收。",
                    "b": "枕邊的鐘一直走著。有人替它換了電池，沒有替我回答明天的問題。"
                }
            }
        ]
    },

    "end_hina": {
        "text": "🦋 姬海棠雛路線：【Ownership / 金絲雀】\n\n「開個價吧。」\n\n雛坐在絲絨椅上，像資本主義穿上晚禮服。\n\n「連同這孩子的壞掉與絕望，我全都要了。」\n\n父母收下支票。\n醫院放行。\n沒有人問我想不想走。\n\n我被買下來了。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "把聯絡事宜都交給雛。",
                "next": "end_hina_choice_a",
                "memory": {
                    "ownershipRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "請她給我一份同樣的文件。",
                "next": "end_hina_choice_b",
                "memory": {
                    "ownershipRoute": "b"
                },
                "echo": ""
            }
        ],
        "recalls": [
            {
                "key": "contract",
                "lines": {
                    "read": "我讀過背面的附註。此刻那幾行字仍然認得我，房間裡的人卻像第一次聽見我想說話。",
                    "keep": "卡夾還在我的口袋裡。我用指腹摸著邊角，確認至少有一件東西沒有因為她伸手，就換了主人。",
                    "delegate": "我說過現在看不下去。她替我處理到今天，連「現在」結束的時間，也一起接管了。"
                }
            }
        ]
    },
    "end_hina_2": {
        "text": "豪宅裡沒有消毒水。\n只有昂貴香氛和太乾淨的地毯。\n\n雛不要求我康復。\n她欣賞我的壞掉。\n\n「小蒔看見什麼了？」\n\n我指向角落的空氣。\n「那裡。有一個很髒的東西。我的武器。」\n\n如果是縛，她會哭。\n如果是老師，他們會寫進聯絡簿。\n\n雛只是微笑。",
        "phase": "phase-1",
        "next": "end_hina_3"
    },
    "end_hina_3": {
        "text": "「我看得到喔。」\n\n她對著空氣伸手，像撫摸一件拍賣會上得標的古董。\n\n我的大腦當機。\n\n她不是相信我。\n她是在配合我。\n她用金錢與演技，把我的說法變成她的收藏品。\n\n被接納的感覺很甜。\n甜得像麻醉。",
        "phase": "phase-1",
        "next": "end_hina_4"
    },
    "end_hina_4": {
        "text": "「從今天開始，妳不需要思考。」\n\n她替我戴上鑲鑽項圈。\n\n「不需要負責。不需要贖罪。只要在籠子裡，為了我一個人美麗地崩壞就好。」\n\n我想哭。\n我也想笑。\n\n寵物是不會有煩惱的。",
        "phase": "phase-1",
        "next": "end_hina_5"
    },
    "end_hina_5": {
        "text": "在港區頂樓，瘋狂是一種特權。\n\n我依然對空氣說話。\n依然陷入解離。\n依然在夜裡確認不存在的武器。\n\n但每次我發作，雛只會端著酒杯欣賞。\n\n我的病徵終於有了市場價值。",
        "phase": "phase-1",
        "next": "end_hina_6"
    },
    "end_hina_6": {
        "text": "<span class='ending-divider'>帳款結清的提示音響起，病房便禮貌地把門改稱為籠門。</span>\n\n【病人 No.0】\n\n個案已由第三方支付所有費用並辦理自動出院。後續追蹤困難。\n\n社會功能障礙在極端封閉且高資源環境下暫時失效。\n\n個案無需被治癒，因其症狀已成為可展示資產。\n\n【DARK END - The Canary】",
        "phase": "phase-1",
        "next": null,
        "recalls": [
            {
                "key": "ownershipRoute",
                "lines": {
                    "a": "所有聯絡都經過同一個人。我不知道還有誰試著找過我。",
                    "b": "影本仍在我手裡。它不能開門，卻讓我知道門並不是沒有條件。"
                }
            }
        ]
    },

    "end_rinbaku": {
        "text": "🎀 鄰縛 BE 路線：【Reality? / 疼痛的黃昏】\n\n我康復了。\n\n縛坐在病床邊削蘋果，刀工完美得像她從來沒有哭過。她仍是那套粉色護理服，腰側垂著針線盒，黑色荊棘影子安靜地纏住椅腳。\n\n「小蒔，伯母送了水果籃喔。」\n\n我看著兔子蘋果。\n它紅得像被削掉皮的肉。",
        "phase": "phase-1",
        "next": "end_rinbaku_2"
    },
    "end_rinbaku_2": {
        "text": "我差點變得不像我。\n\n縛把蘋果切成小塊，每一塊都方便入口。我看著她熟悉的手勢，想起一些不用說謝謝也會被照顧的時候。\n\n那些記憶還在。\n後來發生的事也還在。\n\n「這次回去，大家會好好相處的。」她說。\n\n我看見自己點頭，晚了一點才聽懂她說的「回去」。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "問她：「我可以先不回去嗎？」",
                "next": "end_rinbaku_request",
                "memory": {
                    "homecoming": "ask"
                },
                "echo": ""
            },
            {
                "text": "把問題留到明天，先接過蘋果。",
                "next": "end_rinbaku_silence",
                "memory": {
                    "homecoming": "later"
                },
                "echo": ""
            }
        ]
    },
    "end_rinbaku_3": {
        "text": "「她也道歉了。」縛說。\n\n我問，跟誰。\n\n縛看向水果籃。卡片上寫著謝謝照顧，落款的筆跡很漂亮。\n\n「大家都很擔心妳。」\n\n我又問了一次，跟誰道歉。\n\n縛把蘋果往我這邊推近一點。她不是沒聽見，只是以為那不是現在最重要的問題。\n\n甜味留在嘴裡。我忽然嚥不下去。",
        "phase": "phase-1",
        "next": "end_rinbaku_4"
    },
    "end_rinbaku_4": {
        "text": "『坐好。看著我。今天不講清楚，誰都不准睡。』\n『考成這樣，妳到底有沒有腦？』\n『供妳吃、供妳住、花錢讓妳讀書，結果妳拿什麼回來？』\n『妳每次失敗就找理由。補習班不適合、身體不舒服、心情不好——全世界只有妳最委屈。』\n『妹妹們為什麼不用人盯？因為她們看過妳變成什麼樣子。』\n『不要擺那張臉。我罵妳是為妳好。外面的人誰會花三個小時教妳？』\n\n一個小時。兩個小時。時鐘走到連哭都像頂嘴。\n\n最後，聲音忽然恢復平靜。\n\n『零用錢還夠不夠？』\n『剛才我情緒不好，那些話不要放在心上。』\n『所以妳就體諒一下爸爸。媽媽夾在中間也很累。妳乖，去道歉。』\n\n蘋果泥卡在喉嚨。\n\n我吞不下去。\n也吐不乾淨。",
        "phase": "phase-1",
        "next": "end_rinbaku_4b"
    },
    "end_rinbaku_4b": {
        "text": "最殘忍的是，我記得他愛過我。\n\n小時候，我坐在他腿上玩賽車遊戲。他握方向，我負責在車子飛起來時按下按鍵。每次成功落地，他都笑得像我們真的一起贏過世界。\n\n我也記得自己怕黑，不敢睡。母親隔著棉被把手伸過來，讓我握住。那時候不必考第一名，不必證明有用，不必解釋夢想能不能賺錢。我只要是他們的孩子，就有人願意陪我等到天亮。\n\n那些溫柔不是假的。\n\n所以後來的辱罵也無法被我乾淨地歸類成恨。大腦總會替他們辯護：是不是我先讓他們失望？是不是只要再成功一點，那個會陪我玩、會牽著我睡覺的家就會回來？\n\n愛沒有消失。\n它只是從「妳存在就可以」變成「妳有用才可以」。\n\n我不是從未被愛。\n我是被曾經愛我的人，親手改造成一支必須上漲的股票。",
        "phase": "phase-1",
        "next": "end_rinbaku_5"
    },
    "end_rinbaku_5": {
        "text": "「小蒔？」\n\n縛摸著我的背。\n她很溫柔。\n溫柔到讓我找不到可以恨她的地方。\n\n這才是最可怕的。\n\n我嘔吐了。\n蘋果泥落在床單上，看起來像蟬的碎片。",
        "phase": "phase-1",
        "next": "end_rinbaku_6"
    },
    "end_rinbaku_6": {
        "text": "我康復了嗎？\n\n如果康復的意思是回到家，回到那些聲音裡，回到大家都說「過去了」的地方。\n\n那我康復了。\n\n真好。\n\n真噁心。",
        "phase": "phase-1",
        "next": "end_rinbaku_7"
    },
    "end_rinbaku_7": {
        "text": "縛替我擦嘴。\n\n「沒關係，小蒔。慢慢來。」\n\n她的手很暖。\n像枷鎖被加熱到適合皮膚的溫度。\n\n我握住她。\n不然我還能握住什麼呢？",
        "phase": "phase-1",
        "next": "end_rinbaku_8"
    },
    "end_rinbaku_8": {
        "text": "<span class='ending-divider'>兔子蘋果氧化成褐色，出院章仍然鮮紅得像剛蓋上去。</span>\n\n【病人 No.0／出院摘要】\n\n日常功能恢復。轉介家庭支持。\n\n我把那張紙翻到背面，想找自己的回答。背面只有水果籃壓出的淺淺水痕。\n\n縛問我冷不冷。\n\n我很想握她的手。也很想把門往別的方向推開。\n\n【TRUE END - The Good Mother】",
        "phase": "phase-1",
        "next": null,
        "recalls": [
            {
                "key": "homecoming",
                "lines": {
                    "ask": "談話紀錄寫著「尚無其他安排」。沒有寫下我先說的那一句。",
                    "later": "談話紀錄寫著「未表異議」。我把明天留了下來，紙上卻沒有明天的位置。"
                }
            }
        ]
    },

    "end_rinbaku_cage": {
        "text": "🎀 鄰縛 BE 路線：【Reality? / 沒有門的黃昏】\n\n我醒來時，縛正在替我梳頭。\n\n窗戶很亮，窗把卻被拆掉了。\n\n「小蒔已經不用回那個家了。」她笑得像終於完成一件拖了很多年的作業。",
        "phase": "phase-1",
        "choices": [
            {
                "text": "請縛留下來，今晚先別走。",
                "next": "end_rinbaku_cage_choice_a",
                "memory": {
                    "doorRoute": "a"
                },
                "echo": ""
            },
            {
                "text": "問她明天能不能把門打開。",
                "next": "end_rinbaku_cage_choice_b",
                "memory": {
                    "doorRoute": "b"
                },
                "echo": ""
            }
        ],
        "recalls": [
            {
                "key": "corridor",
                "lines": {
                    "space": "那塊手帕洗乾淨了，疊在床頭。她記得交還給我，卻沒有發現我一直看著門。",
                    "verify": "我問過她不要替我解釋。現在她只說我需要休息，說得很慢，像在練習一句不能說錯的回答。",
                    "recoil": "她梳到我的耳邊時停了一下，等我沒有躲開才繼續。我很想謝謝她。也想問，為什麼窗把不見了。"
                }
            }
        ]
    },
    "end_rinbaku_cage_2": {
        "text": "手機、鞋子、身分證都不見了。\n\n門外傳來三次上鎖聲。縛把兔子蘋果送到我嘴邊。\n\n「外面的人只會再弄痛妳。妹妹會保護姊姊的。」",
        "phase": "phase-1", "next": "end_rinbaku_cage_3"
    },
    "end_rinbaku_cage_3": {
        "text": "她知道我每一種藥的時間，知道我怕黑，知道怎麼抱才不會留下掙扎的空隙。\n\n我說這不是愛。\n\n縛把我的手貼在自己臉上，哭著問：「那為什麼小蒔只有在不能離開我的時候，才不會受傷？」",
        "phase": "phase-1", "next": "end_rinbaku_cage_4"
    },
    "end_rinbaku_cage_4": {
        "text": "日曆沒有日期。窗外永遠是放學前的黃昏。\n\n縛每天替我換衣服、餵飯、擦掉門板上的抓痕。\n\n她從不打我。從不罵我。\n\n所以沒有人能證明這裡是一座牢房。",
        "phase": "phase-1", "next": "end_rinbaku_cage_5"
    },
    "end_rinbaku_cage_5": {
        "text": "<span class='ending-divider'>粉色窗簾垂下來，把世界縫成只容得下兩個人的尺寸。</span>\n\n縛從背後抱住我。\n\n「沒關係，小蒔。妳不需要康復。」\n\n「只要永遠需要我就好了。」\n\n【BAD END - The Loving Cage】",
        "phase": "phase-1",
        "next": null,
        "recalls": [
            {
                "key": "doorRoute",
                "lines": {
                    "a": "她在日曆上畫了一個圈，沒有填日期。我的「今晚」被留在圈裡。",
                    "b": "門上有一道很小的鉛筆線，是我問過明天之後留下的。它每天都還在。"
                }
            }
        ]
    },
    "p1_verify": {
        "text": "「妳說，先陪妳站一會兒。」\n\n縛回答得很快。\n\n我記得自己對霙說過另一句話。或者就是這句？\n\n「還有呢？」\n「我不知道。我只聽清這一句。」\n\n我盯著她。她沒有繼續補完。\n\n那段空白使我害怕，也讓我稍微能呼吸。我用指甲在手帕的標籤上劃了一道，想把這個地方記住。\n\n牆裡傳來翻頁聲。",
        "phase": "phase-1",
        "next": "p2_1"
    },
    "p1_recoil": {
        "text": "我甩開她。手背撞到門把，疼痛比聲音晚到。\n\n縛抬起的手停在半空，沒有再抓過來。\n\n「我沒有要——」\n\n後面的字被燈管吞掉了。我只聽見自己說「不要」，一次比一次小聲。\n\n有人從走廊另一端探頭。縛先對那人搖頭，再把手帕放在窗臺。\n\n我沒有道歉。也沒有走遠。\n門把抵在背上，冷得像另一隻手。",
        "phase": "phase-1",
        "next": "p2_1"
    },
    "p2_mirror_cover": {
        "text": "鏡背有一張褪色的貼紙。\n\n我一直以為它只有會照出我的那一面。\n\n由良的手還搭在鏡框上。她看了看我，慢慢鬆開。\n「今天不照也可以啦。」\n\n聲音沒有停。它從玻璃底下移到了耳機裡。\n但由良的嘴沒有動。這一次我看清楚了。",
        "phase": "phase-2",
        "next": "p2_3"
    },
    "p2_mirror_repeat": {
        "text": "「我說，前輩最近都不來找我。」\n\n由良第二次說得不太自然，像台詞被要求重念以後，忽然聽見了自己的語氣。\n\n沒有「廢物」。沒有「有什麼用」。\n\n我想鬆一口氣，那些字卻沒有因此離開。它們只是失去了眼前這張嘴，還在找別的地方住。\n\n我把她的第二次回答記下來，沒有刪掉第一次聽到的。",
        "phase": "phase-2",
        "next": "p2_3"
    },
    "p2_mirror_smile": {
        "text": "我把嘴角往上提。\n\n由良安心了。她說，對嘛，這樣比較像蒔前輩。\n\n我不知道她認識的是哪一個我，只好維持那個角度。\n\n鏡子裡其他的嘴陸續閉上。\n原來它們不必得到回答。只要我的臉看起來回答過就好了。",
        "phase": "phase-2",
        "next": "p2_3"
    },
    "p3_contract_read": {
        "text": "背面沒有更小的字。\n\n只有一行手寫補註：「來訪須經聯絡人同意。」\n\n我問她，如果我想見的人不是她呢。\n\n雛把筆轉了一圈。\n「所以我才要替妳挑可靠的人。」\n\n她回答了另一個問題。紙很薄，我能從背面看見自己的名字。",
        "phase": "phase-3",
        "next": "p3_3"
    },
    "p3_contract_keep": {
        "text": "卡夾回到掌心時，我竟有一點不好意思。\n\n雛沒有阻止，只替我把扣子扣好。\n「當然是妳的。」\n\n她說得太自然，我差點為剛才的遲疑道歉。\n\n那張紙還留在桌上。我的名字沒有跟著卡夾回來。",
        "phase": "phase-3",
        "next": "p3_3"
    },
    "p3_contract_delegate": {
        "text": "雛把紙收好，動作很快。\n\n周圍終於沒有人問我要怎麼辦。我肩膀鬆下來，幾乎想靠著她睡一會兒。\n\n「好，交給我。」\n\n她把卡夾也一起收進包裡。\n我看見了。只是說「等一下」需要的力氣，比點頭多得多。",
        "phase": "phase-3",
        "next": "p3_3"
    },
    "p4_statement": {
        "text": "再把筆停在那個勾旁邊。\n\n「尚未理解。」她念。\n\n我說，是我還沒看懂，不是我什麼都不懂。\n\n她抬頭看了我一眼，另寫一行，把引號也加上。\n那一行字歪出了格子。\n\n我看了很久。字還在，我卻已經累得不知道下一句要說什麼。",
        "phase": "phase-4",
        "next": "p4_3"
    },
    "p4_witness": {
        "text": "縛進來時先看了再，再看我。\n\n「小蒔她平常——」\n\n我抓住她的袖角。\n\n她停下來。我也停下來。房裡第一次有一段誰都沒替我填完的空白。\n\n我想說，我不是不需要妳。\n最後只說出：「讓我說。」\n\n縛點頭，把椅子往我看得見的地方挪。",
        "phase": "phase-4",
        "next": "p4_3"
    },
    "p4_form": {
        "text": "再沿著那個勾，補了一筆。\n\n我以為重描過就會更清楚。墨水卻暈開，把旁邊的字吃掉了一點。\n\n她開始念流程。我聽見自己的名字，於是每一聲停頓都點頭。\n\n到最後我只記得自己配合得很好。\n這件事讓她放心，也讓我暫時不用再想。",
        "phase": "phase-4",
        "next": "p4_3"
    },
    "end_mizore_choice_a": {
        "text": "霙照著念，連停頓都和我想的一樣。\n\n我鬆了口氣，才發現自己一直替她憋著那口氣。\n\n最後一頁翻完了。明天還可以從第一頁開始。",
        "phase": "phase-1",
        "next": "end_mizore_2"
    },
    "end_mizore_choice_b": {
        "text": "霙看著空白，沒有說話。\n\n我等了一會兒，忍不住在旁邊寫下「妳可以拒絕」。\n\n她還沒回答，我又想替她補上理由。筆尖停在紙上，留下一個很重的點。",
        "phase": "phase-1",
        "next": "end_mizore_2"
    },
    "end_yura_choice_a": {
        "text": "鏡子落地。由良的叫聲和玻璃聲分不開。\n\n我退了半步，才看見自己手上的紅。那些嘴沒有跟著碎掉，它們開始從地面說話。",
        "phase": "phase-2",
        "next": "end_yura_2"
    },
    "end_yura_choice_b": {
        "text": "手帕剛好不夠大，鏡框露出一角。\n\n由良問我是不是不想看她。我搖頭，卻不知道該怎麼解釋，我怕的那張臉也長在我身上。",
        "phase": "phase-2",
        "next": "end_yura_2"
    },
    "end_roro_choice_a": {
        "text": "ロロ刪去停頓，調整句序。\n\n整理過的我說話清楚，前後一致。只有我看不懂她是怎麼做到的。",
        "phase": "phase-3",
        "next": "end_roro_2"
    },
    "end_roro_choice_b": {
        "text": "她把那句話放進引號，沒有換成代碼。\n\n我問會不會顯得很沒用。ロロ把游標停在句號後面，沒有刪除。",
        "phase": "phase-3",
        "next": "end_roro_2"
    },
    "end_zetsu_choice_a": {
        "text": "名字經過擴音器，分裂成好多個名字。\n\n絶替我鼓掌。我越喊越大聲，想從裡面找回最先喊的那一個。",
        "phase": "phase-3",
        "next": "end_zetsu_2"
    },
    "end_zetsu_choice_b": {
        "text": "門外有腳步停了一下。\n\n我想再喊清楚，警報卻蓋過後半句。有人聽見了聲音，我不知道有沒有人聽見話。",
        "phase": "phase-3",
        "next": "end_zetsu_2"
    },
    "end_ekuro_choice_a": {
        "text": "有人問我冷不冷，絵躯先回答了。\n\n她答得很熟練。我只要等那個答案落下來，再試著覺得自己果然就是那樣。",
        "phase": "phase-4",
        "next": "end_ekuro_2"
    },
    "end_ekuro_choice_b": {
        "text": "絵躯看著我，笑容慢了一點。\n\n下一個問題來時，她的下巴仍然先動。我捏住被角，她才停住，等我很小地搖了一次頭。",
        "phase": "phase-4",
        "next": "end_ekuro_2"
    },
    "end_mahiru_choice_a": {
        "text": "她靠過來，我又找到一個新的笑話。\n\n只要話題還能繼續，今天就還不算失敗。窗外已經黑了，我沒有提醒她。",
        "phase": "phase-2",
        "next": "end_mahiru_2"
    },
    "end_mahiru_choice_b": {
        "text": "真晝關掉一盞燈，忽然不知道該說什麼。\n\n剩下的光仍然刺眼。可我看見她眼下也有影子，不必一直盯著她的笑。",
        "phase": "phase-2",
        "next": "end_mahiru_2"
    },
    "end_sai_choice_a": {
        "text": "我的字比印刷體小很多。\n\n再把紙收走，說這樣就好。我盯著手指上沾到的墨，想知道剛才同意的究竟是哪一行。",
        "phase": "phase-4",
        "next": "end_sai_2"
    },
    "end_sai_choice_b": {
        "text": "圓圈畫得不圓。再問我要改成什麼，我一時想不出完整的句子。\n\n她等著。我先在旁邊寫下：不是這句。",
        "phase": "phase-4",
        "next": "end_sai_2"
    },
    "end_yoi_choice_a": {
        "text": "宵把明天的問題一起收進抽屜。\n\n房裡安靜下來。我沒有變得不害怕，只是暫時沒有任何事要求回答。",
        "phase": "phase-4",
        "next": "end_yoi_2"
    },
    "end_yoi_choice_b": {
        "text": "她把鐘放到枕邊。\n\n我問聲音能不能小一點，她墊了一塊布。秒針仍然走，我閉著眼也知道它沒有停。",
        "phase": "phase-4",
        "next": "end_yoi_2"
    },
    "end_hina_choice_a": {
        "text": "雛把我的電話調成靜音。\n\n「妳終於可以不必擔心。」\n\n通知一個個消失，我的肩膀也一點點鬆下來。那是我最難否認的部分。",
        "phase": "phase-1",
        "next": "end_hina_2"
    },
    "end_hina_choice_b": {
        "text": "雛多印了一份，笑著說當然可以。\n\n她把正本鎖進抽屜。我把影本折好放在身上，還不知道它能替我打開哪一扇門。",
        "phase": "phase-1",
        "next": "end_hina_2"
    },
    "end_rinbaku_cage_choice_a": {
        "text": "縛立刻坐回床邊。\n\n我只是說今晚。她把椅子往裡挪時，我沒有再把這兩個字說一遍。",
        "phase": "phase-1",
        "next": "end_rinbaku_cage_2"
    },
    "end_rinbaku_cage_choice_b": {
        "text": "縛把梳子放下，說等我好一點。\n\n我問那是什麼時候。她替我理好衣領，沒有看時鐘。",
        "phase": "phase-1",
        "next": "end_rinbaku_cage_2"
    },
    "end_rinbaku_request": {
        "text": "縛握著盤子的手緊了一下。\n\n「那妳想去哪裡？」\n\n我一時說不出地址。\n\n她把沉默等成了答案，輕輕說，先回去再慢慢想。\n\n我只是沒有地址。那句不想回去，還沒有收回。",
        "phase": "phase-1",
        "next": "end_rinbaku_3"
    },
    "end_rinbaku_silence": {
        "text": "蘋果很脆。\n\n我咬了一小口，縛便鬆了口氣，彷彿我剛才同意的不只是一塊水果。\n\n明天再問。我對自己說。\n\n她把盤子放下，開始收拾回家的東西。",
        "phase": "phase-1",
        "next": "end_rinbaku_3"
    }
};
