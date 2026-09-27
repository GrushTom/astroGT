---
title: "The PotPvP Directory ~ 漠海拾遗"
published: 2026-09-27
description: "PotPvP 社区资料合集，涵盖客户端、材质包、服务器、工具、游戏教程，以及 OBS 录制、Vegas 剪辑、视频扩帧与补帧。"
image: ''
tags:
  - Minecraft
  - PotPvP
  - 使用指南
  - 视频制作
category: 游戏指南
draft: false
lang: zh_CN
pinned: false
sourceLink: "https://pdir.cc.cd/"
---

> 本文整理自 [The PotPvP Directory ~ 漠海拾遗](https://pdir.cc.cd/)，于 2026 年 9 月 27 日导入。原文及图片保留自抓取内容；原文菜单中的 Part 4 和“结”未出现在本次抓取的公开正文中。

## 序
> ***“道在迩而求诸远，事在易而求之难”***

参商周转，落花如旧

十年以来，PotPvP社区所构建之瑰宝并不在少数，然因体系松散，并未得以扩大，实数遗憾。继而令资料查阅极为繁琐，既提入坑门槛，又阻社区体验

事实上，我们完全有理由相信社区的潜力，不光是我们辉煌的历史，更因独立自强的特质，而为每一PvPer塑造之能动性与创造力的天分。那些未开发的，或昙花一现之事物，唯缺一激活条件，即可重获新生。植吧 https://wiki.pvz1.com/doku.php?id=事件:328事件 同样是伟大的亚文化社区，而它从僵化中复苏继而迈向巅峰，花了十年有余。我们同样的历久弥新，同样的富于创造力和钻研性，未必便没有这样的幸运

因此，作此`pdir`之知识库的必要性已是板上钉钉，不仅仅是为资料查询提供便利，更是为那个可见的，不同往日的崭新未来

---
~~其实啊这只是两年前开的一个坑罢了~~
![259.png](https://img.grushtom.com/file/potpvp-directory/1790454384779_259.png)

---
## Update Log
2026-09-01 Edited
Current Version: 1.7.3

1. 美化

---
**Menu**

**序**

**Part 1. 外部**
1.1. 客户端
1.2. 材质包
1.3. 服务器
1.4. 工具

**Part 2. 游戏内**
2.1. 教程
2.2. 严选
2.3. 欣赏

**Part 3. 视频**
3.1. 录制
3.2. 剪辑
3.3. 扩帧
3.4. 补帧
3.5. 封面

**Part 4. Outra**
4.1. Nation
4.2. Culture
4.3. Fate
4.4. Never is enough!

**结**

---
## Part 1. Outra
### 1.1. Clients
重要性: 缺点＞优点。即使你很喜欢某个端的优势部分，但如果其缺点无法接受，还是建议换成最“不痛”的那个。至少目前没有一款能使所有人都满意的Client

[patcher]: 本指sk1er的mod [Patcher](https://sk1er.club/mods/patcher) for 1.8.9 / 1.12.2。这里把语义缩小，仅指“修复材质包读取时内存溢出问题bug”这一模块。

原文:
> Optimized Resource Pack Discovery. When using more than 50 resource packs, the screen to view them may take a while. This should now be much quicker. (Credits: Moulberry)

有patcher - 材质包秒读取
无patcher - 材质包＞300时读取逐渐缓慢，指数增长

Q: 太长不看，怎么选
A: ![260.png](https://img.grushtom.com/file/potpvp-directory/1790454544272_260.png)
建议去用lcqt，这个图我忘记在哪画的了，不改了

Q: 后门?
A: 所有端都没有后门。但你硬要觉得有那我希望它真有

---
#### 1.1.1. 维护中

这一分组保持着更新，但无一例外存在“对笔者而言极其恶劣的bug”，虽然将来有被修复之可能¿

此分组均包含patcher

- Lunar Client: https://www.lunarclient.com
  - Pros: 
Mod最充足，社交优势，hcf服务器自动适配
  - Cons: 
史山代码，材质包mcmeta文件unicode字符会导致读取失败，材质包选定后随机性加载失败，进服时的logging in速度死慢还不能disconnect

- Celestial (3rd party LC launcher): https://codeberg.org/earthsworth/celestial/releases/latest
https://t.me/qbychannel
or 798082966 qq group
  - Pros: 
LC上位，相比LC启动更快 (慢于cb)，免费饰品 & Freelook & NoClickDelay etc.
  - Cons: 
折腾起来麻烦，LC客户端内的bug它也有。另外开发者做的是启动器而非客户端，别指望他们修LC客户端bug

- CheatBreaker Net: https://cheatbreaker.net/download
  - Pros: 
优化好，免费饰品，交互丝滑，menu blur舒适
  - Cons: 
下载慢，server.dat可能被清
身份验证bug: 启动/关闭游戏加速器后session可能会掉

---
#### 1.1.2. 无维护
这一分组没有Developer维护，意味着不会更新，且存在无法弥补的缺点。但之所以放在这里，是由于其优点相比第一组里的各种史山，太耀眼，，，

- Lunar Client - Offline: THE BEST CHOICE EVER
  - LCQT v1: https://github.com/Youded-byte/lunar-client-qt
前置启动器
  - v2.17.7-2447: https://pastefy.app/s4ePMPN0
Lunar 2025暑期版本，Rewind更新前，没有材质包bug
multiver，使用LCQT 1.5.7启动
  - c888646/master: https://www.mediafire.com/file/djeuh13n3jyzao6/
Lunar 2022年5月版本，mapping更新后，较为精简
versions，使用LCQT 1.2.5启动
  -  Pro:
相比现代LC史山更少
  - Cons:
拆东墙补西墙&折腾麻烦
  - Extra
约2021年12月以后的版本都有patcher

- LCQT v2.5.0: https://codeberg.org/Candicey/2TQCL
被DMCA砸似了，有无人能给它复活的

- Tellinq CheatBreaker-2_f87fb83/master [1.7.10]: https://sakyvo.lanzouu.com/igU9y1mpiebc
  - Pros: 
合并前最新的cb2 (所有cb2都无饰品)。有patcher，优化好，极速启动
  - Cons: 
材质包bug : 无pack.png的材质包，客户端启动时不会第一时间显示，需等待约10min；游戏运行时向resourcepack文件夹中热添加pack时，也需等待10min刷新
无中文输入，中文输入法下按键盘会直接崩端

- Tellinq CheatBreaker-2_9594402/master [1.7.10]: https://www.mediafire.com/file/5ihdp395pf8h85z/
Hyperpop牢大认证版本
  - Pros: 
旧一点的cb2，优缺点大差不差
  - Cons: 
Real Time Clock不能显示秒，且显示的是中文 上午/下午 而非 AM./PM.
  - Extra:
无中文输入，但切中文不会崩端

- Tellinq CheatBreaker-2 [1.8.9]: https://sakyvo.lanzouu.com/iul8S21bzq5g
  - Pros:
有patcher，优化好，简约(对1.8而言)；自带Freelook, NoClickDelay
  - Cons:
材质包bug: 同1.7；

- MMC Client (skid cb2) [1.7.10]: https://sakyvo.lanzouu.com/iKDq60j83xmb
同1.7 cb2；喜欢purple theme就换这个

- CheatBreaker-last-legacy [1.7.10]: https://www.mediafire.com/file/w50f0wfadoh74rn/
  - Pros: 
更旧的cb2，功能跟最新cb2差不多，没有材质bug
  - Cons: 
但没patcher

- CheatBreaker-Legacy [1.7.10]: https://www.mediafire.com/file/llvn68mslbt5j5l/
同上，但还要旧

- CheatBreaker Plus [1.7.10]: https://www.mediafire.com/file/ls5y64chw639elt/
or
https://www.mediafire.com/file/4oaq1a9dmd79bcv
  - Pros:
功能跟最新cb2差不多，支持LC Alpha theme
- Cons:
无patcher，无饰品，gui界面左下角有  巨大的cbplus logo

- Protocol CheatBreaker-1.6.25 [1.7.10]: https://www.mediafire.com/file/40uzwkfeznczmj6/CheatBreaker_Protocol.7z/file
  - Pros:
优化好，极速启动，极简界面
  - Cons:
无patcher，动态模糊为old blur。protocol.rip倒闭后饰品和好友功能不再可用
  - Extra:
个人认为这个端可以作为CB 2018的全面上位

---
####  1.1.3. 收藏品
上古老端，收藏价值＞使用价值，只建议录特定视频时使用得到特定观感
以下所有客户端均无patcher

- MineHQ CheatBreaker-2017 [1.7.10]: https://sakyvo.lanzouu.com/iPAid16gm7sb
密码: 9bue
FPS很高，无动态模糊，中文会乱码

- CheatBreaker_b302ec0 [1.7.10]: https://www.mediafire.com/file/fdg3ywyi9jtcz3q/
0424 & 抗火药儿 双重认证
cb2018换上lunar alpha的背景罢了

- Arcane Client [1.7.10]: https://www.mediafire.com/file/zr47umejg38y6w9/
cb2018换皮，无敌配色好看到炸

- RookieGod CheatBreaker [1.7.10]: https://www.mediafire.com/file/efzv4jdsixkslrf/
国人魔改cb2017，有Xray，但存在各种渲染bug材质错乱

- OCMC-2.3 [1.7.10]: https://sakyvo.lanzouu.com/isdzh3owz2yb
3s极速启动
7种颜色: 青色  深红  金黄  绿色  粉色  浅红  白色

- J3Ultimate [1.7.10]: https://www.mediafire.com/file/l9756gh30gom20v/
西语神端，恐吓拉美人利器

- Zonix Client [1.7.10]: https://sakyvo.lanzouu.com/iLw2K0rsjwcj
傻逼端，又掉帧又丑

- Ninja Client [1.7.10]: https://www.mediafire.com/file/ijhko09thaqfk4g/
Zonix换皮

- Kihar Client [1.7.10]: https://www.mediafire.com/file/qo9wknq5xby6wmw/
Zonix换皮，有一个空壳staff module可以装逼

- Lunar Client Alpha [1.7.10]: https://www.mediafire.com/file/yxgdgrry2mezwj7/
cb2018换皮，仅支持Mojang账户登录故需要搭配外置登录器

- Lunar Client Alpha [1.8.9]: https://www.mediafire.com/file/6tmdc5w3bxbo1g4/
美国纪狗Bloje认证。2020年的lc 1.8，没有click delay，仅支持Mojang账户登录故需要搭配外置登录器

- Lunar Client Lite [Launcher]: https://sakyvo.lanzouj.com/iyYVX01qrwkh
密码: LCL
空壳，只有启动器，啥也启动不了

---

### 1.2. Packs
pack，和它周边的东西
在此再次提醒@我和akane问材质之前请先翻kpf

---
####  1.2.1. 一步到位

- **Jewdah**
https://www.bilibili.com/video/BV1tN411d7C9/
aio: http://www.mediafire.com/file/3mynzut9trw3mwl/pack_folder.zip/file
重装系统懒得下？三拜犹大直接开砍

- **Stimpy**
  - 2020
https://www.youtube.com/watch?v=WuXTSvVmHDk
aio: http://www.mediafire.com/file/z22rpa2yo4b0rmr/2020_pack_folder_1-27-2020.zip/file
ind: https://pastebin.com/L2cvw90s
传世经典，下材质❎ - 趁弹幕没有小学生发表睿智言论爽看Stimpy Combo ✅
  - 2022
https://www.bilibili.com/video/av115920865336722
aio: https://www.mediafire.com/file/ajebwyv4yoj3q2d/stimp+PACK+FOLDER+2022.zip/file
旧活新整

- **Kyeick**
https://www.bilibili.com/video/av248107143
aio: [DEAD, 在此批一个眼红的]
ind: https://pastebin.com/Y1TqE13q
重量级，鸡选天天读，功力日日深

---

#### 1.2.2. 知名
#####  I. AD
依旧广子

- **Sakyvo** (我还不FAME吗?)
  - 2024
https://www.123684.com/s/uCWJjv-wL6N3
  - 蓝奏云(不定期更新)
https://www.lanzn.com/b02e6bhzg
密码: pack (有的材质第一个里没有)
  - Q群2022遗留pack
https://www.mediafire.com/folder/u4rnsxc8hwbdv/
Q群2022遗留overlay
https://www.mediafire.com/folder/q88yrv5x6hdz5/

- yungsaphars
https://www.bilibili.com/video/av96756008
ind: https://pastebin.com/ZkkaiXgk
aio: http://www.mediafire.com/file/wx6xh7vu70hobrt/yung_pack_folder.zip/file
爹

- Zefew
  - THE BEST OF ZEFEWS PACK BUNDLES
https://www.bilibili.com/video/BV1oh411y7RH/
ind: https://pastebin.com/TBT05awc
  - Im the best (Pack Bundle) [Frozen]
https://www.bilibili.com/video/av23480664 (超级好看必看)
ind: https://pastebin.com/5kdMZbQX
  - 3k
https://www.bilibili.com/video/av210904764
ind: https://emt.lanzoup.com/b01d51ngf
密码: b1b1
  - 2025
https://www.bilibili.com/video/av115427917171396
ind: https://www.mediafire.com/folder/9voovnagnjkp0/Packs
or: https://emt.lanzouq.com/b0mc2gqti
密码: f9kg
我最香草的pvper——1st: Zefew

---
#####  II. Basic
“众将化身为一”

- Ssel
https://www.bilibili.com/video/av678139558
ind: https://l22333.lanzouw.com/b02oq4zda
密码: l233
经典pack合集

- woklywo
https://www.youtube.com/watch?v=4AeOGGGu7OM
ind: https://pastebin.com/bJJXQW1X
aio: https://www.mediafire.com/file/wu94k8lyl0691vp/resourcepacks.zip/file
still经典pack合集

- Nakoso
  - 2021
https://www.bilibili.com/video/av113988616591286
ind: https://pastebin.com/Jzpyb8b5
aio: https://www.mediafire.com/file/jx25splfc69ynxf/resourcepacks.zip/file
  - 2022
https://www.bilibili.com/video/av725750421
aio: https://www.mediafire.com/file/1y80tkhsq4tjcoe/resourcepacks.zip/file
same as woklywo

- PuffedUP
https://www.bilibili.com/video/av974484330
ind: https://4everluvu.lanzoui.com/b010nu7re
密码: b4g8
aio: https://www.mediafire.com/file/e7x3g3yhl2lp8r0/resourcepacks.zip/file
21年经典风格，一键回到方块人活时代

- Tye3315
  - PotPvP Pack Folder | (40+ Packs + Private Packs)
https://.wwwyoutube.com/watch?v=s9XUVxVJbVM
ind: https://pastebin.com/RneHNtXE
  - Private Pack Bundle Release | Lunar Cape Giveaway
https://.wwwyoutube.com/watch?v=0mvAN6UozCc
ind: https://pastebin.com/Wgx1WywT
  - 3k | Pack Folder Release
https://.wwwyoutube.com/watch?v=cJW1TAgkFX8
ind: https://pastefy.app/dkAYcNLM/raw
  - Pack Bundle #1 (Private Packs)
https://.wwwyoutube.com/watch?v=KL9yE0hzRaQ
ind: https://pastebin.com/SDjzzz2s
  - 5k Pack Bundle Release
https://www.youtube.com/watch?v=mga6cxsDVUQ
ind: https://pastebin.com/tpwe18yz
优质原创&量大管饱

- ByRez
  - pf
https://www.bilibili.com/video/av668719976
ind: https://www.mediafire.com/folder/0cokcllic1yzs/ByRez%27s_Pack_Folder
aio: http://www.mediafire.com/file/16sycguizhdwh0g/ByRez%2527s_Pack_Folder.rar/file
  - pb#3
https://www.bilibili.com/video/av981948918
aio: https://www.mediafire.com/file/roqfjwbij5506bl/PotPvP_Pack_Folder_Release_%255B31_packs%255D.rar/file
Gang Gang Gang，多为暗色系

- Adviser
  - 2017
https://www.youtube.com/watch?v=GviURBvtPcU
ind: https://www.mediafire.com/folder/tnubglc3a0lj2/Adviser's_Pack_Folder_Release
aio: http://www.mediafire.com/file/x66ufy7rq7o6s1n/
  - 2020
https://www.bilibili.com/video/av839715453
ind: https://www.mediafire.com/folder/r4jetefz94w7a/
Exposed之神严选

- Bhoze (aka 2017年35个最经典的材质包)
https://www.bilibili.com/video/av699982532
ind: https://pastebin.com/qrW7ZpcG
典，爱来自佳诺

- ZefewMD pb:
v1: https://www.bilibili.com/video/BV17V41187kU/
v2: https://www.bilibili.com/video/BV17N411o7cg/
v3: https://www.bilibili.com/video/BV195411A7b7/
v4: https://www.bilibili.com/video/BV1Xb4y1Z72T/
v5: https://www.bilibili.com/video/BV1jf4y1b7dp/
v6: https://www.bilibili.com/video/BV1aA411P7Gr/
v7: https://www.bilibili.com/video/BV1CS4y1f7Fe/
“黄金时代的梦”

- Elleptical FPS Pack Folder
https://www.youtube.com/watch?v=rET6Fu2cDjw
ind: https://www.mediafire.com/folder/wij0jonzv51x3/
犹大赞助商

- Lastro
  - 2k
https://www.youtube.com/watch?v=hGtxLac2mzI
ind: https://pastebin.com/w1rMEAq6
  - 2024
https://www.bilibili.com/video/av1355891991
ind: https://pastebin.com/N9ehhEML
  - Pack Bundle ft. Voice
https://www.bilibili.com/video/av113644012572315
ind: https://emt.lanzouq.com/b0mb4ppgj
密码: d1ez
还行

- Kaoliar
https://www.bilibili.com/video/av1000138494
ind: https://jack-laogewen.lanzouv.com/b01a1boeh
密码: 8wds
垃圾。

- 冰糖脆桃核武库(link见视频)
900: https://www.bilibili.com/video/av1156485686
1100: https://www.bilibili.com/video/av114204069664334
300: https://www.bilibili.com/video/av115192163735635
1000: https://www.bilibili.com/video/av115254541423165
给材质神跪了

---
##### III. HCF
“Nightmare”

- iil
  - v1
https://www.bilibili.com/video/av445206902
ind: https://wwni.lanzoum.com/b03kej6wf
密码: hutk
  - v2
https://www.bilibili.com/video/av112964652763343
ind: https://wwxt.lanzout.com/b00tathp7e
密码: www
  - v3
看视频我只看棍母官方
  - v4
https://www.bilibili.com/video/av113889899450919
ind: https://blatantcheater.lanzouu.com/b00jfgfypg
密码: 9xt9
  - v5
https://www.bilibili.com/video/av113172925190122
ind: https://wwxt.lanzout.com/b00tawzswd
密码: www
万恶之源扫码了

- oeu
https://www.bilibili.com/video/av113977073861175
  - ind pk: https://www.mediafire.com/folder/v7bi0ncdotvaf/pack_folder
  - ind overlay: https://www.mediafire.com/folder/137t4et2hvulm/overlays
cleaner滚去扫厕所

---
##### IV. OG
“一将化身为众”

- Elleptical
https://www.bilibili.com/video/av926578255
ind: https://www.mediafire.com/folder/bv3qg9u8xjviv/Pack_Folder
没开pack display

- bcz
https://www.bilibili.com/video/av804424850
aio: http://www.mediafire.com/file/wchv9c1zio20zx1/
没开pack display

----------

##### V. 荣誉提名
“The park of pack”

- [Timon] Ayear
v1: ???
v2: https://www.bilibili.com/video/av31845558
v3: https://www.bilibili.com/video/av45846298
v4: https://www.bilibili.com/video/av200009515
顶尖重金属style

- [Timon] SUPREME
v1: https://www.bilibili.com/video/av22063574
v2: https://www.bilibili.com/video/av44455478
前卫gui设计，印象深刻

- [Timon] Vast 16x
https://www.bilibili.com/video/av716845182=
超绝渐变，恢宏流光

- [暮影Au7ismZ] Au7ismZ v2
https://www.bilibili.com/video/av65372082
来自19年的原创水晶剑，不应被忘记

- [rAnbr0] "128x"es
https://www.bilibili.com/video/av273237176
优质二创

- Deproved 1ks:
  - BlatantCheater
https://www.bilibili.com/video/av113103148680144
ind: https://blatantcheater.lanzouu.com/b00jdnwy7a
密码: 3cbp
  - jxwxn8 all color ski
https://www.bilibili.com/video/av115994366381098
ind: https://wwbbs.lanzouq.com/b00odnzmcb
密码: abu5
aio: https://www.123865.com/s/A4Nojv-4dg5d
or: https://www.mediafire.com/file/k5m11g47tun5m5w/allcolorski.zip/file
致敬冲二打不过汗神冲一の疯狗Deproved

---
##### VI: 似了
视频似了或者链接似了

- YakumoRC - 八云红猫: [VID DEAD]
ind: https://pastebin.com/ZL4Vh3mc

- Stimpy Edits: [VID LOST]
https://www.mediafire.com/?sn3otzq9728ztoy&dkey=534x45mmskp

- QwQTsuki
https://www.bilibili.com/video/av983817082
[LINK DEAD]

- Mansdusty: [DEAD]
https://mega.nz/file/RD0G1Y4A#I7V6N1FQ5vg1VNXFxsuSEdQOmaDpoIg3qjRf19ydgdY

---
##### VII. 周边

- [Happychon] Eum3杂谈: https://www.bilibili.com/video/av114484450434305
翻译 by 香港3y_

- [Nlich/上海沧桑]
  - 原来有这么多经典POTPVP材质包你不知道？: https://www.bilibili.com/video/av451272715
  - 这么多材质包 你都用过吗？？？？？: https://www.bilibili.com/video/av1700124160
子增没活了

---
#### 1.2.3. CHAN

- Timon Wong: https://space.bilibili.com/15505075/
国内顶尖原创材质作者

- Kazari: https://space.bilibili.com/339244769
#CN Arissi

- BlatantCheater (AngelBeat): https://space.bilibili.com/630656685/
解决策の宝库

- 节哀 (900elo): https://space.bilibili.com/412514398
搬视频仙人

- 全民制作人:
  - iSparkton: https://www.youtube.com/@iSparkton
  - Tory: https://www.youtube.com/@Torylmao
  - BabyMarcel: https://www.youtube.com/@BabyMarcel
  - Latenci: https://www.youtube.com/@Latenci
  - Apexay: https://www.youtube.com/@Apexay
  - Dualzz: https://www.youtube.com/@RedstoneDualzz
  - Tye3315: https://www.youtube.com/@tye3315
  - Arissi: https://www.youtube.com/@Arissi
  - Metar0X: https://www.youtube.com/@Metar0X
  - Mellor: https://www.youtube.com/@MellorPvP
  - Zefew: https://www.youtube.com/@RVLZefew

---
#### 1.2.4. extra???

- Bilibili Playlist: https://space.bilibili.com/1049515077/favlist?fid=1266851177
- Youtube Playlist: https://www.youtube.com/playlist?list=PLuCj9dpMJyQuJDmrHHW02VdOzAo2FeGmI
- Ranked Bedwars (Proxy): https://docs.google.com/document/u/0/d/1xqLvAHx2E_ZsDCnpW6u8FNZu_uzIvVjAzjQwxmT6VYY/mobilebasic?pli=1

Q: 几把的我要看的不是这个，投票的材质包发展史呢？快端上来啊
A: ![261.png](https://img.grushtom.com/file/potpvp-directory/1790454549888_261.png)

---
### 1.3. Servers
“当今恐是前所未有的服务器荒漠期”

#### 1.3.1. INTL

- Minemen
as.minemen.club https://minemen.club (SG)
eu.minemen.club https://eu.minemen.club (DE)
na.minemen.club https://na.minemen.club (CA)
dc: https://discord.gg/minemenclub
日薄西山

- Kohi.lol
as.kohi.lol https://as.kohi.lol (SG)
eu.kohi.lol https://eu.kohi.lol (EU)
na.kohi.lol https://na.kohi.lol (US)
au.kohi.lol https://au.kohi.lol (AU)
dc: https://discord.gg/SpyQmssDUQ
复古服

- Kaiya (1.7 → 1.21)
eu.kaiya.rip https://eu.kaiya.rip (EU)
na.kaiya.rip https://na.kaiya.rip (NA)
dc: https://discord.gg/dBZZbrADEU
转伪高版本修了

---
#### 1.3.2. CN

- Wihar
wihar.top https://wihar.top (浙江)

- Kazer
kazer.cc https://kazer.cc (北京 → 上海)

- Jealousy
jealousy.cc https://jealousy.cc (湖北)

- Micet
micet.cc https://micet.cc (上海)

- Iceland
potpvp.cc https://potpvp.cc (湖北)

---
#### 1.3.3. AS

- Syuu
syuu.net https://syuu.net (JP)
dc: https://discord.gg/syuunet
思乐

- ArkaMC
arkamc.net https://arkamc.net (KR)

#### 1.3.4. EU

- PvPLounge
beta.pvplounge.eu https://beta.pvplounge.eu (UK) [WL]
dc: https://discord.com/invite/J4KFkuZkcw
高仿的lounge
*dc发id获取免费白名单

- Renga
renga.zip https://renga.zip (FI)
dc: https://discord.gg/JHVpzUnb8n
毛子肘赢大芬兰了，酥桃认证服务器

- PvPRivals
pvprivals.net https://pvprivals.net (DE)
dc: https://discord.gg/pvprivals
pre pvpgym, 主做uhc mode

---
#### 1.3.5. NA

- Nostalgia
nostalgia.earth https://nostalgia.earth (CA) [WL] {pre HVBC}
dc: https://discord.gg/jKpU7hfjXt
Melkiller从HVBC独走开的服，成本巨大。支持下布列塔尼二次元战神谢谢喵
*进dc说我拉的你，他包给wl的

- *~~Raze: 圈钱伪政府~~*

- Ghostly
ghostly.live https://ghostly.live (US) [拉美生态]
dc: https://www.discord.gg/ghostly
耐活王还在蒸，高延迟友好，玩法多样
*反作弊稀烂

- Astral
astralmc.cc https://astralmc.cc (US) [拉美生态]
dc: https://discord.gg/astralmc
玩法多样，最后一个比较像Lunar的服务器
*反作弊稀烂，hcf & kitmap有点圈

- Elevatemc
elevatemc.com https://elevatemc.com (CA)
dc: https://discord.gg/hctranked
主做hcf teamfight，高延迟不友好

- Velt
veltpvp.com https://veltpvp.com (US) [DEAD]
dc: https://discord.gg/h5ywm25gKu
十年老兵，在打复活赛

---
### 1.4. Tools

“非我所有，为我所用”*

#### 1.4.1. Social
这个我本该裁掉的奈何愿无一人被遗忘发力了
国内b站qq最多加个kook；国际yt dc最多加个x和tg

什么你上不了外网？那我问你你玩网几年了，小于2年你反思一下为什么会看到这个文档，大于2年？你更该反思了

- Discord: https://discordapp.com/channels/@me
- Twitter: https://x.com/home
- Telegram A: https://web.telegram.org/a
- Telegram K: https://web.telegram.org/k

---
#### 1.4.2. Websites

- Namemc: https://namemc.com/
id & 皮肤 & 服务器 查询

- 蓝奏云: https://up.woozooo.com/mydisk.php
国内盘，分享小型文件 (材质包再敢传百度夸克的试一个看看啊?)

- Mediafire: https://app.mediafire.com/folder/myfiles
国际盘，分享大型文件 (用临时邮箱注册可以无限薅)

- Wormhole: https://wormhole.app/
端到端加密&限时限量大文件分享

- workUpload: https://workupload.com/
欧公子版奶牛快传，dmca去死吧。支持阅后即焚

- dlgg: https://download.gg/
端到端加密，25gb limit

- TmpLink: https://www.tmp.link/?tmpui_page=/vx&module=filelist&view=list
不限速不限文件大小，7d内无人下载文件自动删除

- Pastebin: https://pastebin.com/
维护式长文本分享

- pastefy: https://pastefy.app/
隐私保护但不可更改长文本分享

- PWpush: https://eu.pwpush.com/
限时限量&阅后即焚文本分享

- 图床: https://img.remit.ee/
more: https://sspai.com/post/98911

- Wayback Machine: https://archive.org/
互联网档案馆

- ReURL: https://reurl.cc/main/cn
短链接生成器

- BypassVIP: https://bypass.vip/
绕过广告短链

- VirusTotal: https://www.virustotal.com/gui/home/upload
奶酪探索者

- AICU: https://www.aicu.cc/
查评论

- Comment Appeal: https://www.bilibili.com/blackboard/cmmnty-appeal.html
如题

- FileCR: https://filecr.com/us-en/
安人必备

- rutor: http://rutor.info/
丰矿的俄人网站

- ???
  - GnDown: https://www.gndown.com/
  - 423Down: https://www.423down.com/
  - YXSSP: https://www.yxssp.com/
  - GHXI: https://www.ghxi.com/
  - FirePX: https://www.firepx.com/app/
  - MODSAPK: https://getmodsapk.com/
不解释

---
#### 1.4.3. Productivity

- 重装系统: https://linux.do/t/topic/2561124
by @akane https://space.bilibili.com/507699321

- Bandizip 7.06: https://www.lanzn.com/iUP8Hv0taej
压缩文件查看器，选这个是因为可以快速preview图片方便看材质包；7.06有暴力破解压缩包密码功能

- NVCleanInstall: https://www.techpowerup.com/download/techpowerup-nvcleanstall/
轮椅版N卡驱动安装器

- everything: https://www.voidtools.com/zh-cn/
本地搜索工具

- idm crk: https://www.mimods.com/99.html
下载器插件&搬视频

- Jdownloader: https://jdownloader.org/
批量下载mediafire

- qBittorrent: https://www.qbittorrent.org/
种子下载器

- Revo Uninstaller: https://www.423down.com/8544.html
清洁式软件卸载工具，别用geek了

- paint.net: https://www.dotpdn.com/downloads/pdn.html
画材质包用的，半天找不到下载链接的出列

- PhotoShop 2026: https://filecr.com/windows/adobe-photoshop-download-0056/
本该放在Video那边

- Notepad3: https://www.gndown.com/2011.html
最佳文本编辑器

- Recuva: https://filecr.com/windows/recuva/
数据恢复，希望你用不上它

---
## Part 2. In-Game
### 2.1. Tutorial
#### Intro
To newgen: PvP是砍出来的，“教程”并不能代替实战，仅仅是告知你一些game sense，要想消化它们，没个三年两载的Practicing是不现实的，不要妄想一步登天。
自古以来所谓PvP教程乃是炒作重灾区，什么牛鬼蛇神都想来掺一脚博取小红点，社区流通的教学质量更是参差不齐。笔者经缜密考究后终得以下之清单，可供参考。

#### 2.1.1. Haiku

- [Qzark] Gui排布: https://www.bilibili.com/video/BV1JL4y177WZ/
再拿牛鬼蛇神gui录视频的拖出去枪毙

- [iiLuna] Combo: https://www.bilibili.com/video/BV12m4y1i7MV
经典老番，初学者最佳入门视频

- [DiversityPvP] 重置疾跑: https://www.bilibili.com/video/BV1R34y1H7fM
对砍老兵Kaylr认证，侧重trade

- [Intel Edits] Combo: https://www.bilibili.com/video/BV1tT4y1P7mk
Jump那段没啥用，重点在ad的节奏上

- [Zefew] tips: https://www.bilibili.com/video/BV12Z4y1M7rc
必看，相当超前的tips

- [Stimpy] 喷药: https://www.bilibili.com/video/av754452930
要说的字幕里都说了，总结就是喷慢点喷稳点

- [Eloies] Run-eat 跑吃: https://www.bilibili.com/video/BV12A411u7qX
全网最佳跑吃教学，吊打Ziblacking Nakoso。注意完美跑吃无法在现在的minemen生效
补充: 140+ms的情况下，喝完药/吃完食物 立刻切换到 食物/药水 可以强行卡完美跑吃/喝

---
#### 2.1.2. Sonnet

- [PuffedUp] 喷药: https://www.bilibili.com/video/av1300822255
更现代的喷药教学，侧重凹血省药

- Sag Blockhit
尽可能地让格挡「填满」两次攻击之间的「间隔」时间，以让对手的hit打在自己的block上减少伤害

  - [Lewelll] 效果展示: https://www.bilibili.com/video/BV1oy4y1n7NF
    - also精品elo series，建议多看

  - [LoveRenge/如果] Mid Sag (中文解说): https://www.bilibili.com/video/BV1mR4y1t77Q/
视频同款，减kb挡伤两不误

  - [2665xg] Long Sag: https://www.bilibili.com/video/BV1q3411T7f4
新手推荐，挡率更高但是kb sucks

  - [Lewelll] Mid Sag: https://www.bilibili.com/video/BV1dr4y1K7WD/
Lewelll原教旨，改键了

  - [Staind] “完美Sag节奏”: https://www.bilibili.com/video/av802438732/?t=15
kb reduce

---
#### 2.1.3. Opus

- [Raucous] Hit Select: https://www.bilibili.com/video/av974289805
目前没几个驾驭得了

- [VoidRegion] RBW Experience: https://www.bilibili.com/video/BV1jN411s78u
超现代sense，推荐加dc

- [唐妍熙] Knockback: https://www.bilibili.com/video/av114782548006153
很长

- [Revethere] Blog: https://revethere.github.io/
中国顶尖sumo&理论玩家独家力作，顶级智斗超越Usegun假死

---
#### 2.1.4. OSS

- [Kirxo] BCZ jump: https://www.bilibili.com/video/BV1Wx41177GY
combo加伤的，只有大优势局有用，表演价值高一点

- [Nakoso] 蹭药: https://www.bilibili.com/video/av336848237
图一乐

- [minemanner] Jump Reset: https://www.bilibili.com/video/BV1sP4y1M7Lw

- [DJThread] Debuff Tutorial: https://www.bilibili.com/video/BV17P411R7i8
RIP Debuff & Vanilla ~

- [nffn] How 2 HCF: https://www.bilibili.com/video/BV1s642137xw
another dead mode，给感兴趣的人

- (DEAD) [Intel Edits] pvp sense: https://www.bilibili.com/video/BV12e4y1p7Ty

---
#### 2.1.5. Tweak

- [Nilch 抗火药儿] In-Game Settings: https://www.bilibili.com/video/av447677394
本视频讲述了一位玩家的游戏优化经验，包括游戏设置和一些软件的使用。他强调不需要使用外部软件来优化游戏，只需要调整一些设置和清理内存即可。他还分享了一些其他的小技巧，如调整聊天栏大小和关闭一些动画等。--以上内容由AI视频小助理生成，关注解锁AI助理，由[@水肺药水](https://space.bilibili.com/280396990) 召唤发送

- Nvidia控制面板: https://www.bilibili.com/video/av113961890484183
用A卡的埋了吧

---
!!! 以下内容观看前请确保自己有足够动手能力。优化有风险，重装需谨慎；BoosterX一时爽，无脑最大火葬场

- [YoxOnqQAQ] tweaks
  - p1: https://www.bilibili.com/video/av115368492272304
  - p2: https://www.bilibili.com/video/av115481403001924

- CS2调机器(方块人思路同理): https://www.bilibili.com/video/av113754054460421

- 电源计划:
  - https://www.bilibili.com/video/BV1oSifBSEUK/
  - https://www.bilibili.com/video/BV1v44Je3Ert/

---

- ZyperWinHub: https://www.bilibili.com/video/av114843717733352

- Dism++: https://www.bilibili.com/video/av113040737436391

- JVM Arguments: https://exa.y2k.diy/garden/jvm-args/
这好似是高版本的

- Windows 10 LTSC: https://buzzheavier.com/h1yn52aj10ft
more: https://massgrave.dev/windows_ltsc_links

---
### 2.2. Whenever Whatever Whoever
那些无论何时何地任何人都值得观看的

- Lunar Champs:
https://www.bilibili.com/video/BV19S4y1v7zP/
https://www.bilibili.com/video/BV1jU5EzYE5Q/
https://www.bilibili.com/video/BV1BmVvz5EA2/
https://www.bilibili.com/video/BV1wS4y1q7jV/
https://www.bilibili.com/video/BV1QS4y1t7YW/
https://www.bilibili.com/video/BV1aw41117Mb/
https://www.bilibili.com/video/BV1fd4y1S7aC/
https://www.bilibili.com/video/BV1ve4y1t7aT/

- 时代地产搬的19h 100集 full matches: https://www.bilibili.com/video/av691951025

- Lastro elo series p1:
https://www.bilibili.com/video/BV1tA41137Jp/
https://www.bilibili.com/video/BV1EQ4y1a7y7/
https://www.bilibili.com/video/BV1db4y117J2/
https://www.bilibili.com/video/BV1C64y1h7yb/
https://www.bilibili.com/video/BV1iL4y167po/
https://www.bilibili.com/video/BV1eM4y1P7Ny/
https://www.bilibili.com/video/BV1Fm4y1S7JC/
https://www.bilibili.com/video/BV1JT4y1X7yH/
https://www.bilibili.com/video/BV1wP4y1w7Tk/
https://www.bilibili.com/video/BV1HR4y1L7qh/
https://www.bilibili.com/video/BV1tU4y1o7YQ/
https://www.bilibili.com/video/BV11a411b7SW/
https://www.bilibili.com/video/BV1hq4y1e74M/
https://www.bilibili.com/video/BV1Wq4y1Y7jL/
https://www.bilibili.com/video/BV1rT41137UD/

- Lastro elo series p2:
https://www.bilibili.com/video/BV1bz4y1v7sr/
https://www.bilibili.com/video/BV1Ym4y1g7o7/
https://www.bilibili.com/video/BV1dN4y1C73q/
https://www.bilibili.com/video/BV1284y1R75Q/
https://www.bilibili.com/video/BV1Zw411N7Pi/
https://www.bilibili.com/video/BV1Lj411W73G/
https://www.bilibili.com/video/BV1eN4y1q7RU/
https://www.bilibili.com/video/BV1nT4m1S7kF/
https://www.bilibili.com/video/BV1LA4m1G7az/
https://www.bilibili.com/video/BV1vz421974j/
https://www.bilibili.com/video/BV1Pt421g7Ui/

Idiol elo series: https://www.bilibili.com/video/av685287849

- Tringed elo series
https://www.bilibili.com/video/BV1JP4y1s7jc/
https://www.bilibili.com/video/BV1DS4y1C7q2/

isla elo series 2023: https://www.bilibili.com/video/BV13c411J76V/

Staind vs Nakoso: https://www.bilibili.com/video/av778003465

Eloies vs Kyeick: https://www.bilibili.com/video/av629086454

Lizishu Elo Series [1339elo]: https://www.bilibili.com/video/av1152702334

Lizishu vs Eloies: https://www.bilibili.com/video/av1050974501

- DefeatBoy in NA
  - 1v1:
vs Staind: https://www.bilibili.com/video/BV1ST4y1d7D6/
vs Jewdah: https://www.bilibili.com/video/BV1S34y1d7y2/
vs Jerseys: https://www.bilibili.com/video/BV1RR4y1t7d8/
vs How2: https://www.bilibili.com/video/BV1UR4y1t7pj/
vs Miami/Coxcum: https://www.bilibili.com/video/BV13N411e7KY/
vs ZIBLACKINGGG: https://www.bilibili.com/video/BV11t4y1e7q9/
vs Scholar: https://www.bilibili.com/video/BV1DA41187Qh/
vs HydriZe: https://www.bilibili.com/video/BV1fE411H7nk/
  - elo series:
https://www.bilibili.com/video/BV1Bg411j7Bs/
https://www.bilibili.com/video/BV15541127ft/
https://www.bilibili.com/video/BV1SC4y1b72s/
  - Lunar Tournament: https://www.bilibili.com/video/BV1JL4y1e71p/

---
### 2.3. Appreciation!

*「Mythological Artascope of PotPvP Dynasty」*

*这是个脑子一热开了坑最终弃掉的，灵感来源于[这个](https://tieba.baidu.com/p/6593286560)和[那个](https://tieba.baidu.com/p/5272254427)的申必扑克，完成度很低而且很尬(甚至link全几把失效了)，况且potpvp也搞不了这么雅的艺术。但这个标题很吊啊，留着纪念了

---
#### 2.3.1. Classic
- [Jewdah] 8 blocking on lunar client
https://www.bilibili.com/video/BV1Wm4y1R7kp
神

- [Jewdah] smacking kids on the craft
https://www.bilibili.com/video/BV1Eb4y1i7sc
坟

- [iPlayForChange/嫦娥] 砍你爷
https://www.bilibili.com/video/av545841891
听说720p能让渲染变好看

---
#### 2.3.2. Gang
- [Kyeick] Best in the Game
https://www.bilibili.com/video/av373343351
5:52 part II看看看看看看看

- [Kyeick] Just Better
https://www.bilibili.com/video/av891333293
ByRez qwq

- [Kyeick] the best of all time 🌏💯
https://www.bilibili.com/video/av338361406
ByRez pwp

- [Kyeick] NONE
https://www.bilibili.com/video/av810889813
标题来源 https://www.emojiall.com/zh-hans/emoji/‍

- [Staind] Best in the Game
https://www.bilibili.com/video/av1556497493
掉药了谁的药啊

- [ByRez] 2000 Elo on PvPGym with Antic Client
https://www.bilibili.com/video/av376731552
好喜欢这个端的gui谁懂

- [ByRez] Italian Players #4
https://www.bilibili.com/video/av843604879
dislike = losers

- [BCZ] I'm the best at this game
https://www.bilibili.com/video/av18460181
飞起来

---
#### 2.3.3. Chill
- [yungsaphars] i use reach lol (best eu)
https://www.bilibili.com/video/av1550313132
爹

- [Zefew] Im the best (Pack Bundle) [Frozen]
https://www.bilibili.com/video/av23480664
妈

- [Raucous] noob game
https://www.bilibili.com/video/av208514606
大胖狼要是删了提醒我补档

- [BCZ] old but gold
https://www.bilibili.com/video/av221123445
BCZ抄袭酥桃吧·。。。。

- [d0wza] young but gold
https://www.bilibili.com/video/av999775339
酥桃抄袭BCZ吧·。。。。

- [Staind] 1700Elo in a Day
https://www.bilibili.com/video/av373847777
是的Staind也会做chill
聊天框有我的仇人errxr

- [ByRez] #1 NoDeBuff on Syuu.net with 200ms
https://www.bilibili.com/video/av544243967
我的世界白瑞子只会做Gang? 300ms chill combo同样很秀thanks

---
#### 2.3.4. Drill

- [qVarious] Best of qVarious ~ Farewell 👋
https://www.youtube.com/watch?v=kpBnzq_HldM
drill不好看，不看了
## Part 3. Video

**Intro**

这世纪巨坑也是终于开始填上了，码之前感觉脑子里老多想说的了，结果真坐在屏幕前月之脑血栓了又犯了半天挤不出来几个字。说实话呢这个有点(¿)造轮子，而且我的视频一直以来也不咋样，洋文比较好的去看Couleur的 [ctt.cx](https://ctt.cx/video/) 几乎可以解决一切问题了，本栏目基本也就是对其的 翻译+本土化~~+掺私货~~ ，也许在*将来*，会请一名**特邀嘉宾**来补完该部分吧，，，


---
### 3.1. OBS

#### Semi-Intro

- ctt: [https://ctt.cx/video/obs/](https://ctt.cx/video/obs/)
- offical doc: [https://obsproject.com/kb](https://obsproject.com/kb)

录视频用且只用obs，这是板上钉钉的，你要是电脑破烂只能带的动ocam我也没法说啥了。什么你问bandicam水印怎么去，那我可得给你展示一下伟大贤者也有举起屠刀时刻了，，，

版本选择？在2026你应该使用OBS-PT了

- 自OBS 27.2.4，即最后一个qt5架构版本fork而来，在此基础上:

  - 精简安装&便携化，不再依赖C盘Appdata，可与官方版共存
  - 录海克斯战墙都不会编码过载的默认配置，开箱即用，无需折腾
  - 28.0的新P系“预设”体系，性能比「最大性能」还要大
  - 30.2的hybrid mp4，蓝屏断电不丢录像

---
- 下载链接: https://github.com/Sakyvo/OBS-PT/releases/latest
- 镜像加速: https://ghfast.top/github.com/Sakyvo/OBS-PT/releases/download/1.0.0/OBS-PT-1.0.0-Installer.exe
- 仓库地址: https://github.com/Sakyvo/OBS-PT
- 问题反馈: https://github.com/Sakyvo/OBS-PT/issues

![171.png](https://img.grushtom.com/file/potpvp-directory/1790454402916_171.png)

---
#### 3.1.1. Add
防呆不防傻，懂的略过即可

![172.png](https://img.grushtom.com/file/potpvp-directory/1790454410458_172.png)
![173.png](https://img.grushtom.com/file/potpvp-directory/1790454402677_173.png)
![174.png](https://img.grushtom.com/file/potpvp-directory/1790454413909_174.png)
![175.png](https://img.grushtom.com/file/potpvp-directory/1790454409421_175.png)
![176.png](https://img.grushtom.com/file/potpvp-directory/1790454414018_176.png)
关于**采集模式**:
- `游戏采集`: 直接注入hook，捕获延迟低编码性能更高，代价是掉的帧更多
- `窗口采集`: 有bug，我的世界OpenGL太老了会造成帧冻结
- `显示器采集`: 掉帧少但延迟大，易编码过载，你都已经开录制了录制fps才是最重要的，在意游戏里的那三四位数字干什么呢

---
#### 3.1.2. General
![177.png](https://img.grushtom.com/file/potpvp-directory/1790454417497_177.png)

没啥好说的，基本都是个人习惯问题
最好始终将OBS作为管理员运行提高性能和兼容性:
![178.png](https://img.grushtom.com/file/potpvp-directory/1790454413601_178.png)
![179.png](https://img.grushtom.com/file/potpvp-directory/1790454420262_179.png)

---
#### 3.1.3. Output
ctt: [https://ctt.cx/video/obs/output/#recording](https://ctt.cx/video/obs/output/#recording)

最重要的部分，编码过载，十之八九是输出没调好
输出模式调整为“高级”解锁更多设置
![180.png](https://img.grushtom.com/file/potpvp-directory/1790454414048_180.png)

---
##### 录像格式
![181.png](https://img.grushtom.com/file/potpvp-directory/1790454415801_181.png) 
- `hybrid mp4`: 碎片化mp4，既保留了mp4的兼容性也增加了mkv的防崩溃，首选格式
- `mp4`: 兼容性好但崩溃会损坏
- `mkv`: 防崩溃但是兼容性差
- `(hybrid) mov`: 苹果格式
- `别的:` 安卓格式

---
##### 编码器
![182.png](https://img.grushtom.com/file/potpvp-directory/1790454422835_182.png)

速度: NVENC (NVIDIA) ＞ AMF (AMD) ＞ QuickSync (Intel iGPU) ＞ x264/5 (CPU)

独显编码即可，即使你是核显也不例外。CPU编码对质量的提高并不大且极其消耗性能

CPU带核显的可以考虑核显专门录制，独显跑游戏

---
##### 速率控制
![183.png](https://img.grushtom.com/file/potpvp-directory/1790454418520_183.png)

1. **CBR** (`Constant Bitrate` - 固定码率)
- 原理: aka.`恒定比特率`，无论画面静止还是剧烈运动，每秒产生的数据量都是固定的（如设置为50000Kbps，就会一直保持这个速度输出）
- 优点: 文件可控，主要用于直播（因为上行带宽是有限且固定的）
- 缺点: 在录制高速运动的画面时（如快速甩鼠标转视角），画面信息量会瞬陡增，但CBR给的流量上限有限，此时画面易瞬间变糊

2. **CQP** (`Constant Quantization Parameter` - 恒定量化参数)
- 原理: 不管码率是多少，只认画质。设定一个画质级别 (如CQ ，数字越小画质越好，见下方表格)，编码器会无保留地调动所需的所有流量维持此画质
- 优点: 智能调控。 静态画面中每秒只需几M流量；而画面一旦开始高速移动，码率可能会飙到上百M。而CQP能够确保在任何剧烈运动下，智能分配码率以确保画面质量
- 缺点:文件大小不可预估，通常比较大，不适合直播

3. **VBR** (`Variable Bitrate` - 动态码率)
- 原理: 设定一个“目标码率”和一个“最大码率”。静止时用低码率省空间，画面动起来时则自动提升码率保画质，但最高不会超过设定的上限
- 优点: 比CBR更智能(¿)一点，在画质和文件体积之间做了折中
- 缺点: 高fps录制情况下，显卡在极短的时间内去频繁计算和调整码率波动，反而会增加额外的计算负担。而且如果“最大码率”给得不够高，剧烈运动时依然会发糊

4. **无损** (`Lossless`)
- 原理: 字面意思，放弃所有的有损压缩算法，100%像素级保留原始画面
- 特点: 字面意思。性能极差，文件体积极其恐怖，一分钟可能高达十几个G。而且视频传平台要走二压，别作死了

---
**ctt tip**:
- 现代多采用CQP，比CBR更具适应性，后者总是输出相同的恒定比特率，对动态场景处理效果较差
- CQP会根据内容对“带宽的需求”进行调整。如游戏中静止站立在纯色墙壁前，写入的数据量将远远少于在复杂画面频繁转动视角时，相应的，对于复杂画面分配的资源也会智能增加
![184.png](https://img.grushtom.com/file/potpvp-directory/1790454425399_184.png)
chart by Couleur

---
[Milk_Cha](https://t.bilibili.com/1194914662592806932) [Credits](https://t.bilibili.com/1195621115991425073):
- 720p
![185.png](https://img.grushtom.com/file/potpvp-directory/1790454422730_185.png)
- 1080p
![186.png](https://img.grushtom.com/file/potpvp-directory/1790454432323_186.png)
- 横向
![187.png](https://img.grushtom.com/file/potpvp-directory/1790454433194_187.png)
- 曲线图
![188.png](https://img.grushtom.com/file/potpvp-directory/1790454431418_188.png)
![189.png](https://img.grushtom.com/file/potpvp-directory/1790454435134_189.png)
![190.png](https://img.grushtom.com/file/potpvp-directory/1790454435619_190.png)

至于CQP的值调多少，个人认为21-28之间选一个就行，对砍视频保持属性里显示的码率是100k上下即可，那些各种“渲染设置”视频里的1字开头的提升并不大，反正最后会被二压浪费掉，完全是烧硬盘。关键在于画布分辨率务必与输出分辨率一致，被一压了可就歇菜了

---
##### 预设
![191.png](https://img.grushtom.com/file/potpvp-directory/1790454439295_191.png)
[NVIDIA官方文档](https://docs.nvidia.com/video-technologies/video-codec-sdk/13.0/nvenc-video-encoder-api-prog-guide/index.html)

让显卡的独立编码芯片在画面质量(视频清晰度)、性能消耗(显卡负载)和编码延迟(画面处理的时间)这三个维度之间进行权衡。数字越小越快，数字越大画质越好:

- `P1` / `P2`: 省略更多复杂分析换吞吐量，压缩效率最低但速度最快，适合240fps以上的高帧录制
- `P3` / `P4`: 画质和性能取中间值，非PotPvP录制的可以用
- `P5`: 质量优先的起点。OBS 28对旧H264预设的兼容映射里，“高质量”和“最大质量”都落在P5，区别主要由后面的多次编码模式决定
- `P6` / `P7`: 为最后那点压缩效率继续烧性能，统计窗口都红了还选这个纯魔怔

“质量最低”指编码器使用的压缩算法更简单，并非砍码率。CQP本身已经在按画质给码率兜底，P系往上加带来的往往只是压缩效率和细节上的小幅提升，编码过载掉掉的帧可回不来

因此直接`P1`，有大把余量再从`P2`往上试。视频最后还得被平台二压，质量没有那么重要

---
##### 调节
![192.png](https://img.grushtom.com/file/potpvp-directory/1790454438892_192.png)

不！是！管！`画质`！的！而是NVENC的录制的`编码模式`:

- **高质量** (`High Quality`)
  - 为能接受编码延迟的转码和录像准备，优先压缩质量
  - 本地录制就选这个，没有人在**网线**另一头等这几ms

- **低延迟** (`Low Latency`)
  - 为云游戏，直播，视频会议这类实时传输准备，通常搭配CBR使用
  - 降低的是从画面送进编码器到码流吐出来的等待时间，这意味着要牺牲编码性能，更不能把游戏延迟一起降下来

- **超低延迟** (`Ultra Low Latency`)
  - 比低延迟更激进地牺牲压缩效率换吞吐速度
  - 录本地视频完全没必要，可萨犹太傀儡闹麻了

**总结**
录像无脑`高质量`。`低延迟`和`超低延迟`是传输端的需求，不是改善编码过载的

---
##### 多次编码模式
![193.png](https://img.grushtom.com/file/potpvp-directory/1790454438601_193.png)
[NVIDIA官方文档](https://docs.nvidia.com/video-technologies/video-codec-sdk/13.0/nvenc-video-encoder-api-prog-guide/index.html)

“二次编码”的第一遍，先分析当前帧的复杂度和比特该往哪里分配，第二遍再按照分析结果正式编码。分配会更精细，代价就是更慢、更吃显存。对追目标码率的`CBR`尤其有用

1. **单次编码** (`Single Pass`)
- 看一遍直接编码，性能最好、显存占用最低
- 高fps + CQP首选。CQP又不需要死追某个目标码率，为了一点帧内分配收益把吞吐量搭进去不值当

2. **二次编码 (1/4分辨率)** (`Two Passes - Quarter Resolution`)
- 第一遍只用1/4分辨率做分析，第二遍仍然按完整分辨率输出
- 较轻量的码率分配，但一次分析的读取已产生性能损耗。普通60fps录制或CBR直播、编码余量足时可以选
- 低分辨率分析有时反而更容易抓到大范围运动矢量，所以它并不是全分辨率版本的下位替代

3. **二次编码 (全分辨率)** (`Two Passes - Full Resolution`)
- 第一遍也按完整分辨率分析，能给第二遍提供更细的统计信息
- 性价比很低。性能和显存开销最大，画质收益却没多高。高帧录制直接无视，机器都看不出来区别你肉眼看一个？

**总结**
/ 对砍录制直接`单次编码`；普通录制、直播CBR时再考虑`二次编码 (1/4分辨率)`；`二次编码 (全分辨率)`基本属于闲的折磨显卡
- 连同上面两项，高帧录制的最佳组合即`P1` + `高质量` + `单次编码`

---
##### 配置
![194.png](https://img.grushtom.com/file/potpvp-directory/1790454443022_194.png)

“配置” (Profile) 的三个选项（`high`、`main`、`baseline`）属于H264视频编码标准中的“配置文件”级别，决定了编码器在压缩视频时可以使用多复杂的算法。算法越复杂，压缩出来的视频**画质越好**，但对播放设备**解码**的性能要求也相对更高
**OBS-PT目前不支持h265，如果你用高版本且是h265，选择main即可*

1. **baseline** (基本配置)
- 特点: 算法最简单、最基础，强制关闭了 [B帧](https://zh.wikipedia.org/wiki/视讯压缩图像类型)（大幅提升压缩率的关键画面帧）等高级特性
- 表现: 兼容性最佳，即使是上古设备也不会遇到解码问题。但压缩效率极差，这意味着在相同的码率设置下，它生成的文件会更大，或在固定码率下画质最糊

2. **main** (主配置)
- 特点: 中等复杂度算法，支持B帧
- 表现: 一般

3. **high** (高级配置)
- 特点: 启用了H.264标准里最全面的高级压缩技术（8x8内部预测、自定义量化矩阵 etc.）
- 表现:画质最好，压缩效率最高。 现代的设备都自带硬件解码芯片，播放`high`配置的视频完全是零压力

**总结**
在**post-2020**的现代电脑环境中，强/烈！建议永！远！选择`high`
`baseline`和`main`在现代 PC 录屏场景下可以直接无视。
~~你照抄别人配置没选high也没关系我自己都他妈不知不觉的用了四年baseline ~~

---
##### 得关的选项
![195.png](https://img.grushtom.com/file/potpvp-directory/1790454442990_195.png)

这两个选项会调用显卡的CUDA 核心，即用来渲染游戏画面的算力，辅助录制的NVENC编码芯片进行工作

对于常规的60帧录制，它们通常是好事啊；但是，对于高帧录制和后期渲染的情况下，这俩纯属fw

- **前向考虑** (Look-ahead)
  - 原理: 让编码器**往后看几帧**，占用显卡的算力，提前分析接下来要出现的若干张画面。如果预测后面有复杂的剧烈视角切换，就会提前调配好数据资源来应对，防止那一瞬间画面变糊
  - 适用场景: 直播(CBR)或动态码率(VBR)。因为在这两种模式下，总流量是恒定的，`前向考虑`能把好钢用在刀刃上
  - But！:
    - CQP情况下，只要画面需要，码率会自动无上限提升。所以根本不需要它来“精打细算”分配流量
    - 录制方块人，在1秒内处理240+张画面的极限压力下，还要让显卡分出算力去“提前预测”未来的画面，会极大地增加GPU负担，甚至可能导致游戏本身掉帧或者OBS编码过载
    - 因此不启用

- **心理视觉调整** (Psycho Visual Tuning)
  - 原理: 这是一项欺骗洼人眼睛的技术。它会分析画面，把更多的码率分配给人类视觉最敏感的地方（如高对比度的边缘，快速运动的物体轮廓），同时降低那些人眼平常注意不到的地方（如纯黑的角落，远处的天空）的画质。也就是在同等文件大小下，让人感觉画面“更锐利”。
  - 适用场景: 直接传平台的原素材，能让快速转动视角时的方块边缘看起来更清晰
  - But！:
    - 后期动态模糊中， 这些后期算法不是人类的眼睛，完全靠计算前后两帧像素点（哪怕是暗部像素）的物理位移来生成模糊拖影
    - 如果开启了“心理视觉调整”，编码器可能会在高速运动时悄悄抹除某些它认为“不重要”的像素细节，导致原素材里出现微小的马赛克或像素断层（人眼看不出，但机器可以）。这会导致混合的动态模糊边缘出现诡异的**果！冻！**效应或脏斑
    - 因此不启用


---
##### 回放缓存
![196.png](https://img.grushtom.com/file/potpvp-directory/1790454447455_196.png)

类似于 `NVIDIA ShadowPlay`，但质量更高，跟你录制的效果是完全一样的，因为它直接使用OBS的设置进行录制，并将捕获的最后X秒内容保留在RAM中，可以在任何时候按绑定的热键或操作gui将其保存为视频文件。

可被视为用`LosslessCut`手动裁剪重要clip的替代方法，每次保存将按视频文件分隔

- 启用回放缓存
  - 启用后才能在主页看到回放缓存按钮

- 最长回放时间
  - 每次希望保存的秒数。它被标记为“最长”，因为如果在足够的时间 (X秒) 过去之前启动回放缓冲区并按下保存回放热键，则回放的长度将不会是X秒

- 最大内存
  - 取决于剪辑文件的大小，Couleur设置为2048MB，保存的最大文件是1.15GB

我的世界1.7分配2-4GB完全够用了，高了也不会有多少性能提升甚至产生副作用，留点给生产力吧

---
##### H.264 (AVC), H.265 (HEVC) or AV1?

懒得码直接贴ctt
![197.png](https://img.grushtom.com/file/potpvp-directory/1790454450425_197.png)

----------
#### 3.1.4. Video
ctt: [https://ctt.cx/video/obs/video/](https://ctt.cx/video/obs/video/)

此模块并没有想象的那么重要，唯须谨记画布分辨率(游戏内分辨率)务必与输出分辨率(导出视频文件的分辨率)一致，否则执行缩小时画质会产生断崖式下跌。至于缩小方法无视即可，只要两个分辨率相同它们就不会起作用
![198.png](https://img.grushtom.com/file/potpvp-directory/1790454450992_198.png)

录制请确保游戏内fps＞录制fps
建议录制fps设定为导出fps的整数倍，否则每秒多出来的那几帧会在帧混合中被浪费

- 常用的录制fps:
  - 240: 重影会很多，录出来很og
  - 360: 前现代，最玄学的帧率
  - 480: 分水岭，拖影显著减少
  - 600: old hof大多录的这个fps
  - 720: newgen

再往上没太大区别了

开动态模糊的话120 240 360选一个就行，mb等级4~8均可

---
#### 3.1.5. Advanced
![199.png](https://img.grushtom.com/file/potpvp-directory/1790454450770_199.png)
主要是些小细节

---
##### 进程优先级
![200.png](https://img.grushtom.com/file/potpvp-directory/1790454452084_200.png)
`正常` / `高`， 统计界面哪个数据好看就用哪个，跟机器的线程调度相关

---
##### 颜色格式
![201.png](https://img.grushtom.com/file/potpvp-directory/1790454450319_201.png)

一般`NV12`就行，amd的叫`AMF`。I420是垃圾，I444和RGB提升不大，且占用很高:

OBS 内部渲染器（Direct3D 11 / OpenGL / Vulkan）本身是 RGB 格式，因此选择不同格式本质上是“是否做 YUV 转换 + 是否做色度子采样”。

| 格式 | 色彩空间类型 | 色度子采样 Chroma Subsampling | 数据量相对 | 画质特点 | 性能/兼容性 | 典型适用场景 |
|---|---|---|---|---|---|---|
| **NV12** | YUV | **4:2:0**，色度水平和垂直方向减半，2 平面 | **最低**，8-bit 4:2:0 约 **12 bit/像素**，约 1.5 Byte/像素 | 色彩细节最少，文字、红色边缘、细线、渐变处更容易出现模糊、色晕或彩边 | **最佳**，硬件编码器支持度高，OBS 推流默认推荐 | 直播推流、普通录制、游戏录制、追求低 CPU/GPU 占用 |
| **I420** | YUV | **4:2:0**，与 NV12 相同，3 平面 | **与 NV12 基本相同**，约 **12 bit/像素** | 画质与 NV12 基本一致，差别主要是内存布局，不是视觉质量 | **很好**，但通常不如 NV12 对现代 GPU/硬件编码友好 | 老采集卡、特定编码器、某些兼容性场景 |
| **I444** | YUV | **4:4:4**，全分辨率色度，无子采样，3 平面 | **中高**，8-bit 4:4:4 约 **24 bit/像素**，约 3 Byte/像素 | 色彩边缘更锐利，文字更清晰，渐变更自然，彩边和色晕更少 | **中等**，CPU/GPU 与编码压力明显上升，部分推流平台或编码器可能仍会转为 4:2:0 | 高质量本地录制、代码教程、PPT、UI 演示、需要保留色彩细节的素材 |
| **RGB / BGRA** | RGB | 无 YUV 色度子采样，等效 **4:4:4** | **最高**，RGB24 约 **24 bit/像素**；OBS 常见 BGRA 为 8-bit × 4 通道，约 **32 bit/像素** | 理论上最接近屏幕原始像素，避免 YUV 转换带来的色度损失 | **最差**，推流通常需要转换，OBS 也会对非 NV12/P010 推流给出性能警告 | 极致色彩保真、无损录制、后期剪辑、调色素材、专业屏幕采集 |

I444更接近"录制颜色和屏幕上看到的相同"，不偏色、不丢失细节，但性能开销更大，且主影响"颜色"而非"画质"。若性能有限不推荐再给它分配

---
##### 色彩空间
![202.png](https://img.grushtom.com/file/potpvp-directory/1790454452280_202.png)

709原生，sRGB素材饱和度更高

- **sRGB**: BT.709转换矩阵 + sRGB曲线gamma (≈2.2)
  - 亮度更高，减少了gamma偏移或累积误差，高饱和度、色彩鲜艳、对比自然、细节通透

- **709** (`Rec.709`): BT.709矩阵 + 视频标准gamma (≈2.4)
  - 作为视频平台/电视标准，更与平台兼容，图像中间调较暗，对比度略低，画面更柔和

- **601** (`Rec.601)`: BT.601矩阵 + 标清视频标准gamma (≈2.2)
  - 老旧的标清电视 (SDTV) 标准 (NTSC/PAL 时代)，色彩原色与现代 HD 不同 (绿色会偏红)，从而产生明显的颜色偏差 (尤其是绿色变暗或过亮)。现基本淘汰，仅为兼容老设备保留

---
##### 色彩范围
![203.png](https://img.grushtom.com/file/potpvp-directory/1790454456256_203.png)

为最佳效果，色彩空间建议与色彩范围对应:

- `709` - `Limited` [原生]
- `sRGB` - `Full` [高饱和]

如此搭配，OBS的颜色转换和最终解码完全匹配，以避免任何不必要的电平偏移和观感损失

709也可以上Full，饱和度介于709+Limited和sRGB+Full之间。sRGB不建议上Limited

---
ctt:
![204.png](https://img.grushtom.com/file/potpvp-directory/1790454463419_204.png)

---

### 3.2. Vegas

#### Semi-Intro
宇宙级大坑来了，怕不是填到pvp圈解散都填不完。先从核心要点往外扩得了，这个那个的tweak设置直接默认专业厂商比你懂，剪辑教程啥的，自己悟吧

什么why vegas not pr? 离经叛道的自刎归天好不好，已经2026了孩子你还用光流法补帧？还是说你指望那个破烂帧混合出奇迹？什么你想要极致特效？AE，请

vv 2026也不是不行(

---
#### 3.2.1. Info
##### 本体
DL: [https://t.bilibili.com/1128839283738673156](https://t.bilibili.com/1128839283738673156)
Credit: Milk_Cha

123云盘下不了的话:
- 22 (最佳版本): [https://www.mediafire.com/file/rnopo5x8iqdkoy4/VEGAS_22_Cracked.zip/file](https://www.mediafire.com/file/rnopo5x8iqdkoy4/VEGAS_22_Cracked.zip/file)
- 14: [https://www.mediafire.com/file/46n4brjp37hdizr/Vegas_14_Cracked.zip/file](https://www.mediafire.com/file/46n4brjp37hdizr/Vegas_14_Cracked.zip/file)
- 安人网站filecr (14 - 2026, 老版本见Previous version): [https://filecr.com/windows/magix-vegas/](https://filecr.com/windows/magix-vegas/)

---
##### Sapphire FX 蓝宝石
![209.png](https://img.grushtom.com/file/potpvp-directory/1790454460561_209.png)
- filecr: [https://filecr.com/windows/borisfx-sapphire-0002/](https://filecr.com/windows/borisfx-sapphire-0002/)
- mediafire: [https://www.mediafire.com/file/esbxxdxyzqefmdi/](https://www.mediafire.com/file/esbxxdxyzqefmdi/)
特效插件，PotPvP剪辑常用

![210.png](https://img.grushtom.com/file/potpvp-directory/1790454466542_210.png)
filecr下载时
请选择 dl 4 ofx

---
##### 部分版本说明
 
 2026 (本该是24): MAGIX被Boris收购了，从版本号命名改为Boris传统的年份命名，特效战未来但目前建议观望
- 23: crk疑似跟蓝宝石不兼容
- 22: 最强最稳最快版本
- 21 build 315: 分水岭，优化了视频预览卡顿问题
- 14: 较稳定版本，浅色界面下比高版本好看

---
#### 3.2.2.# Issues
##### Offical
- 
 Offcial forum: [https://forum.borisfx.com/c/vegas-pro/55](https://forum.borisfx.com/c/vegas-pro/55)
- Offcial tutorial: [https://www.vegascreativesoftware.com/vegas-pro/learn/](https://www.vegascreativesoftware.com/vegas-pro/learn/)

---
##### zzzzzz9125
- VEGAS Pro 各种疑难杂症及其解决方案的整理:
https://zzzzzz9125.github.io/VegTips/zh/

by [bilibili zzzzzz9125](https://9125.ibio/sp.ibio/745)，

解决98.46% vv问题，极其推荐看这个 ~~所以有问题别来烦我~~

---
![211.png](https://img.grushtom.com/file/potpvp-directory/1790454469780_211.png)
“22最新版”也就是22 build 250，[mediafire](https://www.mediafire.com/file/rnopo5x8iqdkoy4)里那个
![212.png](https://img.grushtom.com/file/potpvp-directory/1790454463551_212.png)

---
##### 专栏里没提的一些问题:
###### 1. **预览卡飞了，一播放cpu gpu双双飙100%**
![213.png](https://img.grushtom.com/file/potpvp-directory/1790454471749_213.png)
通常出现在15+版本。禁用这两个，如果本来就是禁用的那就打开
别的首选项不推荐瞎改，软件工程师比你懂软件

###### 2. **高版本vv(如22)无法读取boris sapphire插件，但低版本(如14)就可以**
原因为高版本VEGAS对OFX插件的DLL加载机制变化，找不到Sapphire的OpenImageIO依赖库
以vv22为例，打开vv文件夹，找到`vegas220.exe.local`并进入，没有就新建文件夹然后重命名
找到Sapphire的依赖文件文件夹，标准路径为
`C:\Program Files\Common Files\OFX\Plugins\Sapphire.ofx.bundle\Contents\Win64\BorisFX.Sapphire.OpenImageIO.em64t\`
将该文件夹里的所有文件全部复制到`vegas220.exe.local`文件夹里
重启vv，使vv重建插件缓存

###### 3. **vv渲染设置中，nv编码器的“预配置”丢失，尝试渲染报错，intel qsv和hevc正常**
![214.png](https://img.grushtom.com/file/potpvp-directory/1790454472092_214.png)
![215.png](https://img.grushtom.com/file/potpvp-directory/1790454473819_215.png)
NVIDIA新驱动 (`591.xx+`) 的已知 bug，新驱动里移除了VEGAS pre 23使用的旧版`NVENC SDK`支持，唯有回退驱动或换23/2026解决 (推荐`581.57 Studio`)
NVCleanstall: [https://www.techpowerup.com/download/techpowerup-nvcleanstall/](https://www.techpowerup.com/download/techpowerup-nvcleanstall/)
**Techpowerup科技社区的工具，可以极其方便地安装老版本驱动和调试高级选项*
参考设置:
![216.png](https://img.grushtom.com/file/potpvp-directory/1790454473409_216.png)

![217.png](https://img.grushtom.com/file/potpvp-directory/1790454476281_217.png)

---
#### 3.2.32. Render
写在前面: Vegas渲染原理是帧混合，即混合前后两帧的图像生成新的中间帧，意味着混合前也就是原素材的fps越高，混合后的效果越好即拖影越少。所以这些个玩意主要影响的是画质，录不了高帧的，还是拿Smoothie补吧

引经据典:
![218.png](https://img.grushtom.com/file/potpvp-directory/1790454482165_218.png)

**不同录制fps的差异**: [https://www.bilibili.com/video/av714303917](https://www.bilibili.com/video/av714303917)

项目属性中将重采样调为帧混合才能出动态模糊
![219.png](https://img.grushtom.com/file/potpvp-directory/1790454483875_219.png)
![220.png](https://img.grushtom.com/file/potpvp-directory/1790454484091_220.png)

**H.264 & H.265**:
同等画质下，h.265的文件体积约为h.264的一半，反过来同等文件体积下h.265的画质是h.264的两倍。h.264兼容性更好，但在2026，这点完全可以忽略。能选265就265吧
![221.png](https://img.grushtom.com/file/potpvp-directory/1790454481587_221.png)

![222.png](https://img.grushtom.com/file/potpvp-directory/1790454485493_222.png)
至于这玩意，给[专业卡](https://www.nvidia.cn/products/workstations/professional-desktop-gpus/)用的你就别碰了

---
##### CORE:
高帧素材，降到30fps，依靠帧混合得到动态模糊，质量至上
在此前提下，最重要的是:
- 帧大小: 与素材相同
- 码率模式: VBR (可变比特率)
- 编码模式
  MainConcept AVC (绝对质量优先/非常慢) [极其慢且提升不大]
  - NVENC (质量略低/快的多):
    - 预设: 高质量
  RC 模式: VBR - 高品质
  - 色彩空间: Rec.709 / sRGB
  - 颜色范围 (YCbCr 输出): 限制 / 完整

与OBS相同，两条线对应才能出最佳效果

![223.png](https://img.grushtom.com/file/potpvp-directory/1790454486964_223.png)
![224.png](https://img.grushtom.com/file/potpvp-directory/1790454485191_224.png)

![225.png](https://img.grushtom.com/file/potpvp-directory/1790454494032_225.png)![226.png](https://img.grushtom.com/file/potpvp-directory/1790454489897_226.png)

---
##### I. 帧大小(S)
![227.png](https://img.grushtom.com/file/potpvp-directory/1790454497976_227.png)

原素材多少就设置多少，Vegas自带的upscale效果甚微，徒增渲染时间。建议后期使用 [ffmpeg](https://ghfast.top/https://github.com/GyanD/codexffmpeg/releases/download/2026-04-30-git-cc3ca17127/ffmpeg-2026-04-30-git-cc3ca17127-essentials_build.7z) / [Topaz](https://filecr.com/windows/topaz-video-enhance-ai/) 进行放大
- upscale: 机器放大，仅仅强制将每帧的像素大小逐个放大，并不会增强画质。但视频平台给4k分配的码率高于1080p，所以利用upscale强改分辨率获得额外的码率分配

---
##### II. 配置文件(P)
![228.png](https://img.grushtom.com/file/potpvp-directory/1790454493724_228.png)

H.265的底层编码逻辑变了，所以选项与H.264 有所不同
- H.264: 分为 Baseline（低端）、Main（中端）、High（高端）来适应不同算力的播放设备，High才能保证最佳画质
- H.265: 作为新一代标准，其起步点（Default aka. Main）在算法复杂度和压缩效率上，就已经超越了H.264的High Profile

---
##### III. 帧速率(R)
![229.png](https://img.grushtom.com/file/potpvp-directory/1790454502512_229.png)
传b站就30，60没有大会员看二压的30会非常难受
不推荐29 31 36等邪门帧率

---
##### IV. 场顺序(F)
![230.png](https://img.grushtom.com/file/potpvp-directory/1790454496336_230.png)

有且只有: 无(逐行扫描），但应该会有人疑惑为啥是逐行扫描:

- **逐行扫描** (`Progressive scan`) 通常用 "p" 表示 (如 1080p)。原理为电子束或像素电路按照从上到下、从左到右的顺序，一次性完成整帧画面 (所有行) 的扫描，将每帧的所有像素同时显示。
- 尽管没出现，提一下与逐行扫描相对的**隔行扫描** (`Interlaced Scan`)，用 "i" 表示。原理为将一帧画面分成两部分进行扫描，即奇数行 (奇数场) 和偶数 (偶数场)，两场交替显示，利用人眼的视觉暂留效应合成一幅完整的图像。常用于传统的电视系统中 (千禧年的那种大头显示器)。

很明显隔行是技术妥协的产物，现代将其删掉是理所当然的。

---
##### V. 码率模块
![231.png](https://img.grushtom.com/file/potpvp-directory/1790454505797_231.png)

---
###### V - A. 比特率
- 恒定比特率（`CBR`）
- 可变比特率（`VBR`）
- 最大值(bps)
- 平均值(bps)

**VBR & CBR**:
- 质量: VBR更高且稳定；CBR在复杂画面下质量下降
- 文件大小: VBR难以预估；CBR固定可控
 
兼容性: VBR偶尔会在极老旧设备上不兼容；CBR兼容性极好
`CBR`: 整个视频维持固定码率
    - 优点: 码率稳定
对直播、广播、严格带宽限制场景有用
    - 缺点: 码率分配不聪明
简单画面浪费码率，复杂画面又不够,同平均体积下，画质通常不如 VBR
    - 适合: 直播
实时编码  - 
`VBR`: 简单画面少给码率省空间，复杂画面多给码率保质量
    - 优点: 同文件体积下画质更好，更适合高速运动/镜头甩动/细节变化大的视频
    - 缺点: 码率不恒定，文件体积不稳定，

某些极端老旧设备兼容性差 
离线成片输出  高质量上传前成片

所以无脑VBR吧

---
VBR - 最大值(bps)

- 意思: VBR允许冲到的上限
- 作用: 复杂画面瞬时吃得更猛,减少快速转镜时，粒子、HUD、纹理变化时的崩坏
- 设太低的问题复杂画面突然变糊
- 设太高的问题文件更大

VBR - 平均值(bps)
- 意思: 整体平均码率目标
- 作用: 决定总体体积和总体画质上限

---
举例: 源是 1080p 480fps，但成片是 1080p 30fps

要帧混合动态模糊，意味着:
- 源素材瞬时信息量极高
- 但成片输出只有30fps，帧混合会把16帧混成1帧的视觉效果
- 这会让运动变“连续”，但单帧内细节也会被模糊掉一部分

所以最终编码问题在于:
- **Gui / Scoreboard / Chat**
- **方块硬边 / 
高对比纹理 / 粒子 / 拉镜**
- 粒子
- 拉镜
这些地方最吃码率

---
So
最大: 240,000,000
平均: 120,000,000

这已经非常高了。b站的4k视频码率限制也就 20Mbps，yt 4k在 60Mbps 左右。再往上加都会被平台吞掉，虽然不会触发更狠的压缩，但也没有额外收益，白白浪费上传时间和流量

那为什么还要120M呢? 娥因为我这边原素材就是120M的不想被一压

---
###### V - B. 编码模式(M)
![232.png](https://img.grushtom.com/file/potpvp-directory/1790454502476_232.png)

(以下内容Au/A卡用户同理)

**Intel QSV** (Intel Quick Sync Video) [核显编码]:
- 使用 Intel CPU内置核显 的硬件加速编码器
- 优势: 速度相比软解较快，且功耗比NVENC低很多，有独显的情况下可以边渲染边玩；如果是Intel平台(主要为11代以后带Xe核显或Arc独显)，表现更好。
- 画质: 基本与独显处于同一水平，部分老版本QSV会稍弱一些，现代差距已经很小

**NV编码器** (NVIDIA NVENC) [独显编码]:
- 使用 NVIDIA独立显卡 的硬件加速编码器
- 优势: 速度最快，只吃GPU，CPU几乎无占用。
- 画质: 现代NVENC (尤其是Ada/Ampere架构以后) 已经非常接近软件编码，但在极高码率或复杂运动场景下，仍可能比软件编码略逊一筹

**Mainconcept HEVC** [软件编码]
- 纯CPU编码，不调用任何硬件加速 (也就是VEGAS自带的MainConcept HEVC编码器)
- 优势: 画质最高，细节保留和压缩效率最佳
- 缺点: 速度最慢，渲染时间可能是硬件模式的2-5倍，CPU满载，渲染期间基本没法用系统

**总结**

 - 有独显: NV 编码器 (最快+画质已足够好)
 - 有时间: Mainconcept HEVC (凹画质)
 - 贪玩: Intel QSV (核显渲染独显玩)

---
###### V - C. 预配置 & RC模式
![233.png](https://img.grushtom.com/file/potpvp-directory/1790454504228_233.png)![234.png](https://img.grushtom.com/file/potpvp-directory/1790454503698_234.png)

这些玩意实际和obs output里的预设差不多，那些低延迟预设会关闭B帧从而牺！牲！画！质！来换取极限的响应速度。所以选标准预设，质量拉最高就行了
别碰无损，死慢，最后照样被压。况且你obs录的都不是无损就算导出来也不是真无损
对“画质至上”的需求，RC 模式别碰任何低延迟，也别碰普通 CBR

---
###### V - D. 每像素位数
![235.png](https://img.grushtom.com/file/potpvp-directory/1790454511359_235.png)

aigc已截图:
![236.png](https://img.grushtom.com/file/potpvp-directory/1790454511858_236.png)

总结:
- 10-bit: 颜色更细腻，防色带，战未来 (YouTube only)
- 8-bit: 足够用，更稳，更快

---
##### VI. 颜色
![237.png](https://img.grushtom.com/file/potpvp-directory/1790454509764_237.png)![238.png](https://img.grushtom.com/file/potpvp-directory/1790454508820_238.png)

跟obs那边类似，

- 709 - Limited
- sRGB - Full

709原生适配，sRGB线饱和度更高。你obs怎么设置的这边就怎么对应

---
##### VII. 音频&系统
![239.png](https://img.grushtom.com/file/potpvp-directory/1790454518090_239.png)![240.png](https://img.grushtom.com/file/potpvp-directory/1790454513183_240.png)![241.png](https://img.grushtom.com/file/potpvp-directory/1790454518572_241.png)

- 音频跟原素材相关，默认就行，音质不能凭空变出来，况且平台也有限制
- 系统也是你原素材项目的设置，固定在那的，改不了也不用改

---

### 3.3. Upscaling
##### Semi-Intro
Q: 为什么要upscaling?
A: Vegas渲染自带的upscaler锁死bicubic插值，效果十分差劲，且选项黑盒不可控，徒增渲染时间。因此vv的渲染设置中导入分辨率与素材一致即可，接下来交给——

![242.png](https://img.grushtom.com/file/potpvp-directory/1790454523147_242.png)

---
##### A. ffmpeg
###### 参考视频
https://www.bilibili.com/video/av116463977371129/

###### 测试算法
4K 放大算法简介
- p1 - 原视频
- p2 - `Lunatic`: 月都科技；基于 **Anime4K Restore CNN Soft M** 的内容自适应恢复方案，优先增强爱心、盾牌和文字等复杂 HUD，纯色区域尽量旁路，并限制亮度与颜色漂移，再由 **ewa_lanczossharp** 完成 2 倍放大。兼顾二压后的清晰度与原画稳定性。依赖外部 glsl 和 libplacebo 库
- p3 - `Anime4K`: 通过轻量级卷积神经网络和定向边缘锐化技术，针对二维动画特有的高对比度线条，和大面积平滑色块进行专门优化的实时放大算法，对方块人对砍有意外之效。依赖外部glsl
- p4 - `FSRCNNX:` 使用浅层卷积神经网络提取图像特征，基于深度学习的快速超分辨率算法；能通过模型「无中生有」地仿造真实的纹理细节。依赖外部glsl
- p5 - `FSR`: 边缘自适应空间放大算法过分析局部像素的梯度以识别边缘方向，沿边缘走向定向插值，随后进行高频细节锐化，保持边缘清晰的同时避免锯齿。依赖外部glsl
- p6 - `ewa_lanczos`: 椭圆加权平均 (aka. ewa) Lanczos滤波；将传统的正交Lanczos插值转换为极坐标系下的径向插值，消除传统lanczos常见的对角线锯齿和方向性伪影。需要libplacebo库
- p7 - `ewa_lanczossharp`: 锐化版ewa_lanczos，微调了模糊半径和窗口参数；通过收紧采样权重，牺牲少量平滑度来换取更高锐度。需要libplacebo库
- p8 - `ewa_lanczos4sharpest`: 更锐的ewa_lanczos；采用更大的采样半径和最激进的锐化参数，纹理细节更极限，但在强对比度边缘易产生明显的光晕(振铃效应)。需要libplacebo库
- p9 - `neighbor`: 最近邻插值；每个输出像素直接复制距离最近的源像素，不混合颜色，也不生成新细节。能严格保留像素格、纯色和硬边，速度快且无光晕，但会同步放大源画面的锯齿、模糊和抗锯齿痕迹，复杂图标与斜边容易显脏
- p10 - `spline`: 样条插值算法；使用分段多项式平滑拟合像素点间的过渡，相比lanczos画面过渡更自然，光晕感显著减弱，但整体画面相对偏“软”。ffmpeg原生
- p11 - `spline_catmull-rom`: Catmull-Rom三次样条插值；通过相邻控制点计算切线，强制插值曲线精确穿过所有原始像素点。在锐度和抗锯齿之间取得平衡，锐度明显高于普通spline，而振铃效应又弱于lanczos。ffmpeg原生
- p12 - `spline`: 样条插值算法；使用分段多项式平滑拟合像素点间的过渡，相比lanczos画面过渡更自然，光晕感显著减弱，但整体画面相对偏“软”。ffmpeg原生
- p13 - `lanczos`: 传统高阶正交插值算法；一维插值易产生光晕。ffmpeg原生 (白皮用的大多数都是这个，拉完了只能说)

---
###### 总结

- `Lunatic`: 神
- `Anime4K`: 半神
- `FSRCNNX`: 较锐利，界限明显
- `FSR`: 较圆滑，边缘略柔
- `ewa*3`: 都差不多，机器放大天花板，sharp最好
- `neighbor`: 画面还行，细节雷霆
- `原生*3`: 拉了，catmull-rom勉强能看

---
###### 获取
- ffmpeg (包含libplacebo库): https://ghfast.top/github.com/GyanD/codexffmpeg/releases/download/2026-04-30-git-cc3ca17127/ffmpeg-2026-04-30-git-cc3ca17127-full_build.7z
官网是精简版，第三方库需在gyan.dev下载

- 脚本: https://sakyvo.lanzouu.com/iVNlg3xclntc
包含测试视频中所有脚本和对应的glsl文件，但个人只推荐`Lunatic`

---
###### 使用
没有做双击直接upscale，因为那样会把文件夹里所有视频全部加入任务队列，很烦。脚本含两种方案，其一为拖拽，不多赘述；其二为`Windows发送到` aka. `Send to`，配置方法如下

1. 解压ffmpeg，更改文件夹名称`ffmpeg-date-git-num-full_build`为`ffmpeg` ，移动到 C:\ 根目录下
![243.png](https://img.grushtom.com/file/potpvp-directory/1790454518006_243.png)

2. 安置脚本，将glsl文件与脚本放在同一文件夹
![244.png](https://img.grushtom.com/file/potpvp-directory/1790454522738_244.png)

3. Win+R - 输入`shell:sendto`打开"发送到"文件夹![245.png](https://img.grushtom.com/file/potpvp-directory/1790454525429_245.png)

4. 按住alt拖动鼠标，将脚本的快捷方式移动至Sendto文件夹
![246.png](https://img.grushtom.com/file/potpvp-directory/1790454525626_246.png)
![207.png](https://img.grushtom.com/file/potpvp-directory/1790454458574_207.png)
5. 随后即可通过发送到快捷调用
![247.png](https://img.grushtom.com/file/potpvp-directory/1790454525433_247.png)

---
###### extra
以`Lunatic`为例简要讲讲脚本
```
@echo off
chcp 65001 >nul
setlocal EnableExtensions DisableDelayedExpansion
set "FFMPEG=C:\ffmpeg\bin\ffmpeg.exe"
if not exist "%FFMPEG%" (
    echo [ERROR] 找不到 FFmpeg："%FFMPEG%"
    pause
    exit /b 1
)
pushd "%~dp0" >nul
if errorlevel 1 (
    echo [ERROR] 无法进入脚本目录："%~dp0"
    pause
    exit /b 1
)
if not exist "Lunatic.glsl" (
    echo [ERROR] 脚本目录中缺少 Lunatic.glsl
    echo 请前往 https://www.mediafire.com/file/51z9qlfd3sqzxpa 下载
    popd
    pause
    exit /b 1
)
rem ====================== 画质参数 ======================
set "CQ=12"
set "VBR=80M"
set "LOOKAHEAD=32"
echo.
echo ================================================
echo Lunatic 4K Upscale (Soft Restore M + ewa_lanczossharp)
echo 右键 Send To / 拖拽 时仅处理选中的视频
echo ================================================
echo.
set "FILES_PROCESSED=0"

if "%~1"=="" (
    echo 未检测到 Send To / 拖拽 的文件
    echo 请右键视频 - 发送到 - 本脚本
    echo 或直接拖拽视频到 bat 上
    popd
    pause
    exit /b 0
)

:ProcessNext
if "%~1"=="" goto Finished

set /a FILES_PROCESSED+=1
set "INPUT=%~f1"
set "OUTPUT=%~dpn1-4K-Lunatic.mp4"
set "INPUT_NAME=%~nx1"
setlocal EnableDelayedExpansion

echo.
echo ===== Processing: "!INPUT_NAME!" =====

if not exist "!INPUT!" (
    echo [ERROR] 视频文件不存在："!INPUT!"
    endlocal
    shift
    goto ProcessNext
)

rem --- 不强制像素格式或颜色标签；由滤镜 auto 与 NVENC 保留输入属性和位深 ---
rem --- 10系(Pascal)及更旧显卡: 删除下方 -multipass / -temporal_aq / -bf / -b_ref_mode 四行 ---
"!FFMPEG!" -y -init_hw_device vulkan=vk ^
-i "!INPUT!" ^
-vf "libplacebo=w=3840:h=2160:upscaler=ewa_lanczossharp:custom_shader_path=Lunatic.glsl" ^
-c:v hevc_nvenc ^
-preset:v p7 ^
-tune:v hq ^
-rc:v vbr ^
-multipass:v fullres ^
-cq:v !CQ! ^
-b:v !VBR! ^
-maxrate:v 120M ^
-bufsize:v 240M ^
-rc-lookahead:v !LOOKAHEAD! ^
-spatial_aq:v 1 ^
-temporal_aq:v 1 ^
-aq-strength:v 12 ^
-bf:v 4 ^
-b_ref_mode:v middle ^
-c:a copy ^
"!OUTPUT!"
set "FFMPEG_EXIT=!ERRORLEVEL!"

if not "!FFMPEG_EXIT!"=="0" (
    echo [ERROR] 失败（FFmpeg 退出码 !FFMPEG_EXIT!）: "!INPUT_NAME!"
) else (
    echo [OK] 成功: "!INPUT_NAME!"
)

endlocal
shift
goto ProcessNext

:Finished
echo.
echo ====================== 完成（%FILES_PROCESSED% 个） ======================
popd
pause
exit /b 0
```
---

**Lunatic 放大脚本原理**

---
1. 简要流程
```
输入视频
   │
   ├─ FFmpeg 读取视频和音频
   │
   ├─ Vulkan + libplacebo
   │    ├─ 加载 Lunatic.glsl
   │    └─ 使用 ewa_lanczossharp 放大到 3840x2160
   │
   ├─ NVIDIA NVENC 编码 HEVC
   │
   └─ 复制原音频，输出 原文件名-4K-Lunatic.mp4
```
在放大时只对更可能属于线条，图标边缘或细节的区域施加受控修复。对于 PotPvP 画面，兼顾生命值，盔甲值，物品栏和 HUD 文字等不同类型的区域

---
2. 两个文件各自负责什么

`Eirin Lunatic.bat`的 BAT 文件负责“调度”和“编码”，包括：
- 检查 `C:\ffmpeg\bin\ffmpeg.exe` 是否存在
- 进入 BAT 自身目录，确保能找到旁边的 `Lunatic.glsl`
- 接收拖拽或“发送到”传入的一个或多个文件
- 为每个输入构造输出名，并调用 FFmpeg
- 选择 Vulkan、libplacebo、滤镜、NVENC 和音频处理参数
- 保存 FFmpeg 退出码，报告每个文件成功或失败

`Lunatic.glsl`的 GLSL 文件负责“像素处理”。它采用 mpv hook 格式，由 libplacebo 的 `custom_shader_path` 加载。文件中的矩阵和偏置是已经训练/拟合好的 CNN 权重，无需再放另一模型文件

---
3. GLSL 的实际处理链
当前文件包含 10 个 hook 阶段

3.1 Anime4K Soft Restore M CNN
前 7 个阶段的名称是 `Anime4K-v4.0-Restore-CNN-Soft-(M)`：
1. 一个 `4x3x3x3` 卷积阶段，从 3x3 邻域提取初始特征
2. 六个 `4x3x3x8` 卷积阶段继续组合局部特征
3. 每层用 `max(x, 0)` 和 `max(-x, 0)` 分离正、负响应，再交给下一层。这相当于保留带符号的特征，同时使用 ReLU 风格的非线性
4. 最后的 `3x1x1x56` 阶段把各层特征汇总为 `POTION_CNN`，作为候选细节/残差，而不是直接覆盖原始像素
这里的“Soft Restore”很重要：它倾向于恢复边缘和局部结构，不是FSRCNNX强锐化那样对所有高对比度边界都增加白线，也不是凭空生成完整纹理

3.2 自适应残差门控
`PotionPvP-v1.0-Adaptive-Residual-Gate` 不直接采用 CNN 的全部输出，而是先计算 3x3 邻域特征：
- 用 `0.25 / 0.50 / 0.25` 的 RGB 权重估计局部亮度
- 求 3x3 区域的最小值、最大值和范围 `local_range`
- 同时比较横纵方向和对角方向的曲率，估计这里是平坦色块、普通纹理还是硬边缘
- 检查 CNN 残差本身是否足够明显
最终权重为：
```text
mask = flat_mask × residual_mask × structure_weight
```
变量名虽然叫 `flat_mask`，但它使用 `smoothstep(0.010, 0.055, local_range)`，所以真正非常平的区域权重接近 0，局部变化更明显的区域权重才会上升。`structure_weight` 最低为 `0.35`，硬边缘时逐步接近 `1.0`。
这一步的效果是：
- 物品栏纯色背景不会被 CNN 残差大面积污染
- 生命值，盔甲值边缘和文字等有结构的区域仍可获得修复
- 很小或不可信的残差会被 `residual_mask` 丢弃
门控阶段保存两个值：候选残差亮度和 `mask`，供下一阶段使用

3.3 零均值亮度应用
`PotionPvP-v1.0-Zero-Mean-Luma-Apply` 是保持亮度观感的关键阶段。
它先对候选残差计算 3x3 加权局部均值，再使用：
```
零均值残差 = 当前残差 - 局部残差均值
```
因此，连续的一大片区域不会因为残差整体偏正或偏负而一起变亮，变暗
随后应用多重限制：
- `POTION_STRENGTH = 0.65`：只使用候选修复的一部分
- `POTION_MAX_DELTA = 0.018`：限制绝对亮度变化
- `POTION_RELATIVE_DELTA = 0.15`：靠近黑位或白位时进一步收紧变化幅度
- 亮度限制在邻域最小值与最大值之间，减少过冲和振铃
- RGB 通道限制在有效范围内，避免负值或超过 1.0 的溢出
- 高饱和区域在加法修复和比例缩放之间平滑混合，降低生命值，药水等彩色区域的色偏
- 最后保留原始 alpha 通道
即“预测残差、判断可信度、再以受限方式加入残差”

---
4. `ewa_lanczossharp` 在哪里发挥作用
滤镜参数是：
```text
libplacebo=w=3840:h=2160:
    upscaler=ewa_lanczossharp:
    custom_shader_path=Lunatic.glsl
```
- `w=3840:h=2160`：把输出尺寸固定为 4K UHD
- `upscaler=ewa_lanczossharp`：使用 libplacebo 的椭圆加权 Lanczos 锐化插值，负责连续的尺寸重采样
- `custom_shader_path=Lunatic.glsl`：加载自定义 hook 处理链
`ewa_lanczossharp` 不是 CNN，也不会读取 Lunatic 的权重。它负责几何放大和采样平滑；GLSL 负责内容感知的残差修复。二者组合后，既不会像 neighbor 那样保留明显方块，也不会把所有文字边缘都用同一强度硬化
FFmpeg 文档只保证 `custom_shader_path` 会加载 mpv `.hook` GLSL；具体 hook 调度由 libplacebo 的 shader 管线处理。它并不是简单的“先完整跑 CNN、再完整跑 Lanczos”两步串行滤镜，而是同一 libplacebo 管线中的自定义 shader 与内置缩放器协同工作，更加协调

---
5. NVENC 编码参数
| 参数 | 作用 | 对结果的影响 |
| --- | --- | --- |
| `-c:v hevc_nvenc` | 使用 NVIDIA 硬件 HEVC 编码 | 编码速度高，依赖显卡和驱动支持 |
| `-preset:v p7` | NVENC 最慢、质量取向最强的预设 | 更慢，通常压缩效率更好 |
| `-tune:v hq` | 高质量调优 | 优先画质而非低延迟 |
| `-rc:v vbr` | 可变码率控制 | 复杂画面可以使用更多比特 |
| `-multipass:v fullres` | 使用全分辨率多遍分析 | 提高码控判断，增加显存/时间开销 |
| `-cq:v 12` | VBR 下的目标质量等级 | 这是质量目标，不是固定码率；数值越低通常越重 |
| `-b:v 80M` | 目标/平均码率参考 | 影响整体文件大小和码控倾向 |
| `-maxrate:v 120M` | 码率上限 | 限制瞬时峰值，便于平台上传和二次压缩 |
| `-bufsize:v 240M` | VBV 码控缓冲区 | 与峰值上限共同约束码率波动 |
| `-rc-lookahead:v 32` | 向前分析 32 帧 | 能更早判断场景变化，代价是延迟和显存 |
| `-spatial_aq:v 1` | 开启空间自适应量化 | 复杂区域获得更多比特 |
| `-temporal_aq:v 1` | 开启时间自适应量化 | 根据运动和帧间变化分配比特 |
| `-aq-strength:v 12` | 空间 AQ 强度 | 1 到 15，12 属于偏强的细节保护 |
| `-bf:v 4` | 使用最多 4 个 B 帧 | 提高压缩效率，但增加重排延迟 |
| `-b_ref_mode:v middle` | 部分 B 帧作为参考帧 | 进一步提高压缩效率，兼容性要求更高 |
| `-c:a copy` | 音频流直接复制 | 不重新编码音频，不增加音频损失 |
`80M/120M/240M` 是码控约束，不代表每个视频都会严格输出 80 Mbps。实际码率还取决于分辨率、运动、画面复杂度、CQ、编码器版本和驱动

---
6. BAT 的文件名兼容设计
脚本外层使用：
```bat
setlocal EnableExtensions DisableDelayedExpansion
```
先在关闭 delayed expansion 时从 `%~1` 派生绝对输入路径、输出路径和文件名，再在单个文件处理区间局部开启 delayed expansion。这避免了 `!` 在 Windows CMD 二次解析时被吞掉，同时避免 `%`、`&`、括号、`^`、方括号和中文路径被无引号展开
脚本还使用 `Shift` 顺序处理参数，而不是把 `%*` 展开后交给 `for` 或 `call` 二次解析。这样一次拖入多个文件时，每个参数都保持独立

---
7. 运行前提与兼容性
- `C:\ffmpeg\bin\ffmpeg.exe` 必须存在，并且包含 Vulkan、libplacebo 与 NVENC 支持
- `Lunatic.glsl` 必须与 BAT 位于同一目录；脚本通过 `pushd "%~dp0"` 后使用相对 shader 路径
- 需要支持 HEVC NVENC 的 NVIDIA 显卡和正常工作的 Vulkan 驱动
- Pascal（10 系）及更旧显卡可能不支持 `multipass`、`temporal_aq`、B 帧或 B 帧参考的组合。遇到初始化失败时，应按注释逐项删除这些高级参数
- 当前脚本不显式写入 `-pix_fmt`、`-color_range`、`-colorspace`、`-color_trc` 或 `-color_primaries`。它的设计是让 FFmpeg/libplacebo/NVENC 自动协商并尽量保留输入属性；不同输入、FFmpeg 构建、驱动和显卡代际仍可能产生差异，发布或上传前应使用 `ffprobe` 检查输出

---
8. 其他
由于经过PotPvP特化调优，如果输入是非方块人视频，建议传统插值的`ewa_lanczossharp`。

---
9. 来源与许可证
GLSL文件开头保留 Anime4K 相关 MIT License 声明。分发 `Lunatic.glsl` 时应保留该声明，并同时遵守所使用 shader 和 FFmpeg/libplacebo 的许可证要求。
- Anime4K 项目：https://github.com/bloc97/Anime4K
- FFmpeg 文档：https://ffmpeg.org/ffmpeg-all.html
- Lunatic.glsl下载链接：https://www.mediafire.com/file/51z9qlfd3sqzxpa

---
##### B. Topaz
**! ! ! 渣机止步 ! ! !**
dl: https://filecr.com/windows/topaz-video-enhance-ai/

###### 效果对比

- origin 1080p
![248.png](https://img.grushtom.com/file/potpvp-directory/1790454529489_248.png)
![248.png](https://img.grushtom.com/file/potpvp-directory/1790454529489_248.png)
- Topaz Proteus
![250.png](https://img.grushtom.com/file/potpvp-directory/1790454534019_250.png)

贴图边缘改善非常明显，锐度降低的同时保留画质，比glsl还强

---
###### 代价
![251.png](https://img.grushtom.com/file/potpvp-directory/1790454534412_251.png)
无敌死慢，本人i5 10400 + RTX 3060一个2min视频得处理2小时，现在还在用GTX的还是算了吧

---
###### 模型

- `Starlight` 扩散模型，擅长生成式放大和修复极低质量/老旧视频，细节丰富
- `Starlight Mini`: Starlight轻量版，相比更快(依然比传统模型慢的多)
- `Proteus`: 最通用全能模型，支持参数微调，适合大多数视频的去噪、锐化和增强
- `Iris`: 专精面部恢复和压缩伪影去除，适合人脸特写或采访视频
- `Nyx`: 专注强力去噪，适合噪点/颗粒严重的视频，先去噪再增强
- `Rhea`: 细节保留准确，适合低运动场景，大倍数放大强
- `Artemis`: 自动增强能力强，适合质量差、噪点多的视频，速度较快
- `Gaia`: 温和自然增强，破坏最小，适合动画、CG 和原质量较高的视频
- `Theia`: 类似 Gaia 的温和模型，速度稍快，适合高质量源视频的轻度锐化和提升

方块人对砍能用的也就`Proteus`和`Gaia`；扩散模型即使是mini也超级慢，且会凭空造帧还原素材，可能会很诡异。一般还是用`Proteus`

---
###### 参考设置
![252.png](https://img.grushtom.com/file/potpvp-directory/1790454536541_252.png)
更细的yt搜吧这玩意我带不动也懒得折腾，性价比不是很高差不多得了
其实这玩意还能补帧，但感觉不如Smoothie

---
### 3.4. Interpolation

#### Semi-Intro
现代补帧科技的进步，让渣机也能渲染出好看的动态模糊。想想2022那会咱还在看Blyard的PR蒙版RSMB教程，真觉得现在的创作条件简直是天堂。但是！2026了还有一堆人视频拿个必剪剪完就发不渲染的，甚至cos Verzide Kyzuko OTFZaiji的，闹麻了好吗洼完了好吗你们这代人完蛋了好吗。现在立刻马上把世界最强补帧教学端上来，冰沙Smoothie——参见！
![253.png](https://img.grushtom.com/file/potpvp-directory/1790454538851_253.png)

[Q: 为什么不用Blur?](https://ctt.cx/video/smoothie/smoothievsblur)
A: 法国方块人fork而来的Smoothie是PotPvP渲染特化之作，Blur能干的Smoothie都能干，Blur不能干的Smoothie照样能干。Tekno是哪根葱？不熟
![254.png](https://img.grushtom.com/file/potpvp-directory/1790454534415_254.png)

---
#### 获取
- 安装包: [https://ghfast.top/https://github.com/couleur-tweak-tips/SmoothieInstaller/releases/latest/download/SmoothieInstaller.exe](https://ghfast.top/https://github.com/couleur-tweak-tips/SmoothieInstaller/releases/latest/download/SmoothieInstaller.exe)
- Github: [https://github.com/couleur-tweak-tips/smoothie-rs](https://github.com/couleur-tweak-tips/smoothie-rs)
- 说明文档: [https://ctt.cx/video/smoothie/](https://ctt.cx/video/smoothie/)

安装包安装路径固定为`C:\Users\<用户名>\AppData\Roaming\Smoothie`，不想装在C盘的可以下[便携版](https://ghfast.top/https://github.com/couleur-tweak-tips/smoothie-rs/releases/latest/download/smoothie-rs-nightly.zip)，但更新会比较麻烦，且得手动配置Send to

---
#### 配置
![255.png](https://img.grushtom.com/file/potpvp-directory/1790454542381_255.png)
![256.png](https://img.grushtom.com/file/potpvp-directory/1790454539359_256.png)

- Smoothie有gui，但实质上是配置文件recipe.ini的镜面。ini语法简单调试方便，所以更推荐直接在recipe里调
- recipe说明文档: [https://ctt.cx/video/smoothie/recipe/](https://ctt.cx/video/smoothie/recipe/)
- 效果展示(120fps无动态模糊录制): [https://www.bilibili.com/video/av116481694177034](https://www.bilibili.com/video/av116481694177034)

tip:
- flowblur效果好但非常吃cpu
![257.png](https://img.grushtom.com/file/potpvp-directory/1790454547795_257.png)
- pre-interp吃显卡，能分担flowblur的高cpu占用
![258.png](https://img.grushtom.com/file/potpvp-directory/1790454549654_258.png)

---
##### 官方文档参考翻译

recipe (配方，Smoothie的配置文件) 是 Smoothie 学习曲线中最难的部分，阅读本文并使用短视频片段进行测试是熟悉它的最佳方式。
为了方便起见，可以打开或关闭的值（布尔值）有许多别名，我（指Couleur，下同）建议输入 y/n 或 1/0 作为简写。
如果有你不需要的功能，随时都可以将其从文件中删除，这不会破坏任何设置，并且其效果就像禁用了它一样
Smoothie 会加载`defaults.ini`，它就像用户的`recipe.ini`一样，但所有内容都被禁用且具有最大兼容性，然后它会使用 `recipe.ini`中现有的值覆盖这些设置。

以下是每个文件的作用：

- `recipe.ini`
需要编辑的默认配置文件。

- `defaults.ini`
所有现有设置的备份，它会首先被加载，然后被 `recipe.ini` 覆盖，因此你可以删除不使用的功能。

- `encoding_presets.ini`
针对 [output enc args](https://#output) 配置文件设置的预设配置文件。
等号左边的值是你在配置文件中输入的内容，右边的值是它提供给 FFmpeg 参数时展开的内容。
它们都不是硬编码的，因此可以编辑它们，甚至创建自己的 FFmpeg 输出 CLI 预设。

- `jamba.vpy`
Smoothie 使用的 [VapourSynth 脚本](https://www.vapoursynth.com/doc/gettingstarted.html#example-script)，你可以阅读如何使用每个配置值。把它放在这里意味着没有任何东西能阻止您在 `/bin/vapoursynth64/plugins/` 中安装额外的插件并连接您自己的配置文件成分。尽管存在一些[硬编码的配置文件检查](https://github.com/search?q=repo%3Acouleur-tweak-tips%2Fsmoothie-rs+path%3A*.rs+recipe.get&type=code)

---
###### frame blending / 帧混合
`[frame blending]`(帧混合) 就像 blur 的 `- blur` 配置类别、VEGAS的智能重采样和FFmpeg的`tmix`滤镜——但速度要快得多。它将每一帧与其相邻帧进行平均处理，从而产生运动轨迹，看起来就像逼真的动态模糊。

Video: [https://ctt.cx/assets/videos/video/smoothie/frameblending.mp4](https://ctt.cx/assets/videos/video/smoothie/frameblending.mp4)

左边是240FPS的视频，右边是带有帧混合的60FPS视频，这不是一个漂亮的例子，但它展示了帧在较低的FPS中实际是如何被挤压融合的。

> 注意：若需在视频编辑器中对帧混合素材使用变速
> 如果您喜欢在剪辑之前通过 Smoothie 处理您的片段，您可以像这样调整上述设置：
> 根据您的需求，将 `fps` 设置为 120、180 或更高
> 根据您的口味将 `blur intensity`（模糊强度）提高到 2.5 甚至更高
> 然后在编辑器中再次进行帧混合 / 智能重采样
> 
> 译者注: FPS太低的视频，使用Vegas变速时会出现丢帧现象，渲染出来会很卡。120fps以上可解决问题(Vegas变速上限为4x)

- `enabled`: yes
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `fps`: 60 (30)
输出帧率，此项和 `intensity` 会影响要平均的相邻帧（权重）的数量，混合后视频的帧率将被限制为该值。
**译者注: 传b站强烈推荐30fps，没有大会员看60fps视频会非常难受**

- `intensity`: 1.0
帧混合烈度，这与 blur 的 `blur amount`（模糊量）相同。

- `weighting`: equal
权重，即指每个混合帧的透明度权重，可以手动设置它们，如 `[1.0, 1.0, 1.0, 1.0, 1.0]`，或从[可用预设](https://github.com/couleur-tweak-tips/smoothie-rs/blob/main/target/scripts/weighting.py)中选择：
  - `equal`: 相等
  - `vegas`: 最接近 VEGAS Pro 智能重采样的权重（在强度为 1.0 时使用）
  - `gaussian`: 上升高斯曲线
  - `gaussian_sym`: 对称高斯曲线
  - `ascending`: 我个人最喜欢的，我喜欢将它与更高的强度搭配使用
  - `descending`（逐渐下降）
  - `pyramid`: 金字塔，不透明度在中间达到峰值，两边低
  - `custom`: 自定义(非常硬核)。任何 Python 表达式（具有[受限的命名空间](https://github.com/couleur-tweak-tips/smoothie-rs/blob/f04526681aecf6564d5b83f5a7c8d35edeb8bf2f/target/scripts/weighting.py#L116-L144)），例如 `custom; func = x**2`

(同样非常硬核) 对于 `gaussian`、`gaussian_sym` 和 `custom`，可以像这样更改顶点、边界和标准差：`gaussian; apex = 2; bound = [0,2]; std_dev = 1`
`equal` 和 `ascending` 的外观比较：
[https://ctt.cx/assets/videos/video/smoothie/weights.mp4](https://ctt.cx/assets/videos/video/smoothie/weights.mp4)

- `bright blend`: no
使混合效果看起来类似于 Premiere Pro 的帧混合 (往好的方面说)，它类似于使用相加模式混合两张图像，比非明亮混合慢，它是通过在混合期间临时将剪辑转换为 RGB48 色彩空间来实现的。感谢 Zaphyr

---
###### interpolation / 补帧
补帧用于在现有帧之间创建帧，如同魔法一样提高帧率。但这会产生不完美的帧，不可避免地会产生我们称之为“伪影”的东西，例如在静态（HUD / 覆盖层）部分出现拖影。并且在低 fps 输入下，快速运动可能看起来非常诡异。Smoothie 中的interpolation是使用[SVPFlow](https://github.com/couleurm/VSBundler/blob/main/smCi.ps1#L29) 的无 DRM 旧版本构建来完成的。另请参阅他们的 [wiki](https://www.svp-team.com/wiki/Manual:SVPflow)。
建议以尽可能高的 fps 录制（至少 120FPS 以获得尚可的结果）。如果您只打算使用 SVPFlow 进行补帧，像 60FPS 这样的较低帧率[通常看起来比原始剪辑更糟](https://www.youtube.com/watch?v=QihBOhLzQj8)。
另请参阅 [pre-interp](https://ctt.cx/video/smoothie/recipe/#pre-interp) (前置补帧)，这是一种更慢、更准确的补帧方法

- `enabled`: yes
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `masking`: yes
是否希望使用伪影遮罩，注意如果在伪影遮罩类别中禁用了该功能，则此设置将无关紧要

- `fps`: 960
想要补帧到的目标帧率。

- `speed`: medium
补帧计算的精度，影响渲染速度，可用值:
  - `medium`（中等，最准确）
  - `fast`（快）
  - `faster`（更快）
  - `fastest`（最快，最不准确）

- `tuning`: weak
针对内容类型调整设置。来自[InterFrame2 文档](https://www.spirton.com/uploads/InterFrame/InterFrame2.html)：
  - `animation`（动画） - 我从未见过它用于游戏画面。
  - `film`（电影） - 在单个移动对象的准确性和画面的连贯性之间提供了很好的平衡。
  - `smooth`（平滑） - 提高了单个移动对象的准确性，同时降低了画面的连贯性。
  - `weak`（弱） - 降低了单个移动对象的准确性，同时提高了画面的连贯性。
    - 注意：这会在很大程度上削弱补帧效果，这意味着运动不会那么平滑。

大多数人更喜欢 `weak`，有些人喜欢将`film` 用于低 fps 输入。

- `algorithm`: 23
设置算法。来自同一文档：
  - `2` - 这会做出强烈的预测，这对于卡通片很有用，但也可能留下巨大的伪影。
  - `13` - 最智能的算法，因为掩盖了许多伪影，但不如 23 平滑。
  - `23` - 最平滑的算法，但它没有 13 那样的伪影遮盖功能。

大多数人使用 23 / 13

- `block size`: auto
定义块匹配算法的块大小，可以是 8x8、16x8、16x16、32x16 或 32x32
越大速度越快，但产生的帧越差。
更多信息：[https://www.svp-team.com/wiki/Manual:SVPflow](https://www.svp-team.com/wiki/Manual:SVPflow)（按 CTRL+F 并搜索 "`h:`" 以查找更多相关信息）

- `use gpu`: no
是否在 CPU 旁边使用 GPU 来加速转换并提高质量。 为了兼容性，默认情况下它是关闭的，但我建议将其打开。
注意: 此模式可能会运行得更慢，虽然它进行计算的速度快得多，但它也在进行更复杂的计算以提高质量。

- `area`: 0
设置区域遮罩的强度，我建议将其保持在 `0`。更高的值将减少伪影，但会大大降低平滑度。

---
###### flowblur / 光流法
常常与与 Reel Smart Motion blur (RSMB) 进行比较，它通常会比补帧产生更多的伪影（建议使用伪影遮罩）。

- `enabled`: no
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `masking`: yes
是否使用伪影遮罩，注意如果在伪影遮罩类别中禁用了该功能，则此设置将无关紧要。

- `amount`: 100
模糊的强度，0 表示没有效果，200 是最大值。

- `do blending`: after
执行帧混合和 Flowblur 的顺序：
  - `after`：较慢，帧混合在应用 Flowblur 之后完成，如果希望复刻[Freeman's Mind 运动模糊](https://youtu.be/2Rtqm8U7CC8?t=89) 则可使用此项。
  - `before`：较快且最类似于 RSMB，帧混合在应用 Flowblur 之前完成。

---
###### output / 输出
如果想知道编码过程在多大程度上降低了渲染速度，尝试使用 `--tonull`

- `process`: ffmpeg
FFmpeg 可执行文件的文件路径，默认情况下它只会尝试从 PATH 环境变量中调用它，如果您配置了它的其他参数，则可以使用任何其他接受来自 STDIN 的 YUV4MPEG 输入的 CLI 编码器。

- `enc args`: H264 CPU
FFmpeg CLI 编码参数，为了方便起见，您可以使用全部存储在[encoding_presets.ini](https://github.com/couleur-tweak-tips/smoothie-rs/blob/main/target/encoding_presets.ini) 中的预设。
如果您不明白这些是什么意思，我建议您阅读一下 [我应该使用哪种编解码器？](https://ctt.cx/video/codecguide/)。
 (译者注: 推荐H265 CPU）
提示：在末尾添加 `4K` 将扩展为[将视频放大到4K](https://ctt.cx/video/ffmpeg/upscaling/) 所需的参数。

- `container`: MP4
视频容器格式，默认为 MP4。
要容纳 UTVideo 编解码器，您需要切换到 .AVI 或 .MKV
在完成渲染之前，可以使用 .MKV 来读取已经渲染的内容。

- `file format`: %FILENAME% ~ %FRUIT% %OUTPUT_FPS%
输出文件名格式，如果已指定 `-o` / `--output` 则不使用
%FILENAME% 是输出文件的基本名称（不带扩展名）
%FRUIT% 将扩展为[此列表](https://github.com/couleur-tweak-tips/smoothie-rs/blob/5bedf4ff231fd56832deacf4e32c5eb9f640c004/src/video.rs#L92-L101)中的一种随机水果 😋
(译者注: 换成固定的不容易搞混)
可以使用配置文件中的其他值，请参阅[此处](https://github.com/couleur-tweak-tips/smoothie-rs/blob/5bedf4ff231fd56832deacf4e32c5eb9f640c004/src/video.rs#L140)了解它是如何实现的

---
###### preview window / 预览窗口
使 FFmpeg 将渲染好的视频实时输出到 ffplay，这是一款几乎总是与 FFmpeg 捆绑在一起的视频播放器。
按 F 切换全屏，按 SPACE 暂停，按 ESC 或 q 退出
它可以被关闭而不会导致崩溃，有时会显示错误，但这并不影响您的视频是否被渲染。
它还有一些其他的杂项[键盘快捷键](https://ffmpeg.org/ffplay.html#While-playing)

- `enabled`: no
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `process`: ffplay
要管道传输到的可执行文件的文件路径，如果您使用 mpv，渲染速度最高将只能达到实时速度（1.0x）。

- `output args`: -f yuv4mpegpipe -
要附加到 ffmpeg 参数中以创建第二个输出流的额外参数，您可以在 [[miscellaneous]](https://ctt.cx/video/smoothie/recipe/?h=recipe#miscellaneous)（杂项）中修改 ffplay 参数。

---
###### artifact masking / 伪影遮罩
当使用补帧、flowblur 或前置补帧时，您可以选择不将这些效果应用到视频的特定区域，方法是使用伪影遮罩，它们是具有黑色和白色区域的图像。黑色区域将还原所应用的效果（还记得所有的 `masking: yes` 值吗？这就是您单独切换遮罩的方式）。
它们是特定于分辨率的，如果您将 1280x720 的视频与 1920x1080 的遮罩配对，Smoothie 将会崩溃。

- 教程视频: [https://www.youtube.com/watch?v=5GW2TUx78WY&t=20](https://www.youtube.com/watch?v=5GW2TUx78WY&t=20)

- `enabled`: no
全局切换伪影遮罩，如果禁用，则此类别中的其余部分都无关紧要。

- `feathering`: yes
如果视频有介于白色和黑色之间的颜色 (如制作灰色渐变)，请将其打开以支持此功能，像素颜色越暗，效果的不透明度越低。

- `folder path`: 默认为空
示例: D:\smrs\masks\n
希望存储伪影遮罩图像的文件夹路径，可以按住 Shift 键右键单击该文件夹 -> 复制为路径，即可轻松获取它。

- `file name`: 默认为空
示例: overwatch.png
要使用的遮罩图像文件的名称。

---
###### miscellaneous / 杂项
- `source plugin`: lsmash
要使用的 VapourSynth 源插件，可以是 `ffms2`、`lsmash` 或`bestsource`，后者可能在处理 AV1 时效果更好，但索引速度要慢得多，如果您使用 lsmash 没有问题并且介意 bestsource 漫长的索引时间，请切换到 lsmash。

- `play ding`: no
应该在 Smoothie 渲染完成后使用 ffplay 播放 `C:\Windows\Media\ding.wav`，但在 smoothie-py 中尚未实现。

- `always verbose`: no
等效于如果您总是向参数传递 `--verbose`（不过建议实际使用该参数，因为它会更早地激活详细日志记录，并记录更多数据）。

- `dedup threshold`: 0.0
很少使用，因为很难衡量，这是一个尝试猜测哪些帧是由于编码延迟而重复的，并将其替换为补帧的[插件](https://github.com/couleur-tweak-tips/smoothie-rs/blob/main/target/scripts/filldrops.py)。

- `global output folder`: 默认为空
默认情况下，Smoothie 会将其输出到与输入文件相同的目录中，并使用 `[output] file format:`（文件格式）。

- `source indexing`: no
为输入剪辑建立索引，在 %TEMP% 中创建一个缓存，如果您要多次渲染同一个剪辑，启用此功能会很有用。

- `ffmpeg options`: -loglevel error -i - -hide_banner -stats -stats_period 0.15
首先传递给 ffmpeg 的参数。

- `ffplay options`: -loglevel quiet -i - -autoexit -window_title smoothie.preview
启用[预览窗口](https://#preview-window)时传递给 ffplay 的参数，请参阅[ffplay.html#Main-options](https://ffmpeg.org/ffplay.html#Main-options)

---
###### console / 控制台
在 Windows 上，您可以自定义终端窗口的行为（旨在与 `conhost.exe` 一起使用，在 Windows 11 上，它们默认切换到了更精美的 Windows Terminal）。
Windows Terminal 对此处理得不好。

- `stay on top`: no
使窗口保持在最前面，但仍然可以最小化。

- `borderless`: yes
隐藏窗口标题栏，您无法移动窗口，但仍然可以通过在任务栏中单击它来使其最小化。

- `position`: top left
将终端窗口移动到主显示器的某个角落

- `width`: 900 / `height`: 350
窗口的尺寸。

---
###### timescale / 调速
- `in`: 1.0
输入速度。若输入剪辑是以 10% 的速度录制的，可以输入 0.1 将其加速 10 倍。

- `out`: 1.0
输出速度。若想稍微加快一点成品的velocity，可以设置为 1.03。😼

---
###### color grading / 调色
- `enabled`: no
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `brightness` / `saturation` / `contrast` / `hue`: 1.0
亮度/饱和度/对比度/色调。控制输出视频的颜色设置。

---
###### LUT / 颜色查找表
[查找表](https://en.wikipedia.org/wiki/Lookup_table#Lookup_tables_in_image_processing)（Look up table）滤镜
有点像颜色滤镜，可以使颜色完全符合某个标准，但我们这些nerds主要将它用于酷炫的颜色分级 :)

- `enabled`: no
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `path`:
LUT 滤镜 (.cube) 的完整文件路径。

- `opacity`: 0.20
滤镜的不透明度。

---
###### pre-interp / 预插帧
预插帧使用「[RIFE NCNN Vulkan](https://github.com/styler00dollar/VapourSynth-RIFE-ncnn-Vulkan)」(本地AI模型) 进行补帧，在滤镜链中，它在[补帧](https://#interpolation)之前被应用，因此称为“pre-”（预-）。
使用起来非常慢，请在[此处](https://./installation.md#installing-rife-models)查看如何安装模型。
使用 NCNN 而不是 RIFE 是因为它具有更小的依赖项（CUDA大概有5GB °O°）。

> 警告：某些颜色格式无法转换并导致前置补帧崩溃
> 根据在 [OBS 的高级设置选项卡](https://../obs/advanced.md) 中配置颜色的方式，
> 前置补帧可能无法与它们一起工作，这目前是[仓库中的一个未解决问题](https://github.com/couleur-tweak-tips/smoothie-rs/issues/36)
> 建议尝试调整一下，直到找到可行的设置，sRGB 空间和 Limited（有限）范围对我来说没问题
> 
> 译者注: Couleur确实对色彩方面了解不多

- `enabled`: no
是否希望启用此设置，如果禁用，则此类别中的其余部分都无关紧要。

- `masking`: no
是否希望使用伪影遮罩，请注意，如果在伪影遮罩类别中禁用了该功能，则此设置将无关紧要。

- `factor`: 3x
希望将输入 FPS 乘以多少并补帧到多少，例如，如果视频的输入fps是60，factor是 3：60x3=180 则它将补帧到180fps。

- `model`: rife-v4.4
RIFE模型文件夹的路径，它们不包含在Smoothie中，请参阅[安装说明](https://./installation.md#installing-rife-models)。

---
###### Using multiple recipe files / 使用多个配置文件
- 复制一份`recipe.ini`并将其命名为其他名称
- 复制一份用来打开 Smoothie 的快捷方式
- 将`--recipe name.ini`添加到参数中（对于[发送到快捷方式](https://./installation.md#making-a-send-to-shortcut)，请确保它在`-i`之前，`-i`必须是最后一个参数）。

---
##### recipe示例
- 魔改自[skytherd](https://discord.gg/3gPuJw98Rv) 60-30 recipe
- 效果见https://www.bilibili.com/video/BV16yR9BWEm8/

```
[interpolation]
enabled: yes
masking: no
fps: 600
speed: medium
tuning: weak
algorithm: 23
use gpu: yes

[frame blending]
enabled: yes
fps: 30
intensity: 1.1
weighting: [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1]
bright blend: no

[flowblur]
enabled: no
masking: no
amount: 100
do blending: before

[output]
process: ffmpeg
enc args: COPY
file format: %FILENAME% - Smoothie
container: .mp4

[preview window]
enabled: yes
process: ffplay
output args: -f yuv4mpegpipe -

[artifact masking]
enabled: no
feathering: no
folder path: C:\Users\ASUS\AppData\Roaming\Smoothie\masks
file name: best.png

[miscellaneous]
source plugin: bestsource
play ding: no
always verbose: no
dedup threshold: 0.0
global output folder: F:\Finished\Upscaling
source indexing: no
ffmpeg options: -loglevel error -i - -hide_banner -stats -stats_period 0.15
ffplay options: -loglevel quiet -i - -autoexit -window_title smoothie.preview

[console]
stay on top: no
borderless: no
position: top left
width: 900
height: 350

[timescale]
in: 1.0
out: 1.0

[color grading]
enabled: no
brightness: 1.04
saturation: 1.2
contrast: 1.0

[lut]
enabled: no
path: 
opacity: 0.2

[pre-interp]
enabled: no
masking: yes
factor: 4x
model: [copy your path]\rife-v4.6
```

---
##### extra
1. 报错截图的时候，**一！定！**要把**终端**内容也截出来，弹窗只是告诉你出问题了，log在终端里
2. mask的分辨率要和输入视频的分辨率相同，懒得搞就直接关mask然后把algorithm调成13
3. 输出视频码率低是因为用的默认encoding_presets.int，打开这个文本然后调整你用的那个编码模式，语法同ffmpeg，可以照抄Upscaling里的脚本

---
