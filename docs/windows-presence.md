# Windows 实时状态卡片

当前正式环境：博客 <https://blog.grushtom.com/>，状态接口 <https://firefly-presence.2114223063.workers.dev/status>。本机已完成部署及歌曲实播上报验证，`presenceConfig.ts` 默认使用该正式接口。以下部署步骤用于重建或迁移。

仅支持 Windows：显示当前活动、网易云歌曲/歌手、播放或暂停、暂离及离线。浏览器每 15 秒读取一次；采集器每 15 秒上报，端到端通常在 30 秒内更新。空闲 5 分钟或锁屏显示暂离；90 秒没有上报显示离线。两种状态互相独立，暂离时音乐可以继续播放。

## 组成

- `src/config/presenceConfig.ts`：开关、公开读取地址、刷新间隔。
- `src/components/features/PresenceCard.svelte`：侧栏卡片，兼容亮/暗主题；停止显示过期活动和歌曲；请求失败显示状态不可用。
- `services/presence/`：独立 Cloudflare Worker + SQLite Durable Object；不修改博客自身的 Cloudflare 配置。
- `scripts/presence/`：Python 采集器和 PowerShell 启动器。

公网 GET `/status` 只返回当前活动标签、歌曲、歌手、播放状态及更新时间。POST `/status` 要求 `Authorization: Bearer <PRESENCE_TOKEN>`。服务端生成时间戳，丢弃额外字段。只保留最新一份状态，不记录历史。

## 1. 部署状态 Worker

以下命令在仓库根目录运行。需要你自己的 Cloudflare 登录；没有部署临时预览账号。

```powershell
pnpm exec wrangler login
pnpm exec wrangler deploy --config services/presence/wrangler.jsonc
pnpm exec wrangler secret put PRESENCE_TOKEN --config services/presence/wrangler.jsonc
```

最后一条命令会要求输入密钥。使用密码管理器生成并保存至少 32 字符的随机密钥，电脑采集器必须使用相同值。不要把它放进博客配置、`PUBLIC_` 环境变量、Git、URL 或聊天消息。

部署会创建 `firefly-presence` Worker 及独立 Durable Object。没有配置密钥时写入接口返回 503。访问部署输出域名的 `/status`，初始应返回 `state: "offline"`。

## 2. 接入博客

在 Cloudflare Pages/博客 Worker 的**构建环境变量**中设置：

```text
PUBLIC_PRESENCE_ENDPOINT=https://firefly-presence.<你的子域>.workers.dev/status
```

也可以把同一个公开地址填写到 `src/config/presenceConfig.ts` 的 `endpoint`。重新构建部署博客即可。地址留空时控件隐藏；无需网易云 Cookie 或 access token。

侧栏位置由 `src/config/sidebarConfig.ts` 中 `type: "presence"` 的条目控制，默认放在左栏顶部。是否在窄屏显示取决于原有侧栏布局；如需移动端也展示，可把该类型加入 `mobileBottomComponents`。

## 3. 安装并检查 Windows 采集器

需要 Windows 10/11、Python 3.10+，以当前登录用户运行（不要作为系统服务运行）。

```powershell
python -m venv scripts/presence/.venv
.\scripts\presence\.venv\Scripts\python.exe -m pip install -r scripts/presence/requirements.txt
.\scripts\presence\.venv\Scripts\python.exe scripts/presence/collector.py --dry-run --once
```

`--dry-run` 只在本机打印，不发送任何网络请求。先打开网易云并播放音乐再测试。`music: null` 表示没有找到网易云可用的系统媒体会话；采集器不会用最近播放记录猜测当前歌曲。

采集器依赖网易云向 Windows 系统媒体控制（SMTC）提供曲目信息。请在网易云「设置 → 系统」中勾选「开启 SMTC」，然后暂停再播放一次（参见 [Music Presence 的播放器接入说明](https://docs.musicpresence.app/setup/media-player/)）。如果所用版本没有该选项，需要使用支持 SMTC 的版本。代码不读取网易云数据库或窗口标题来推测歌曲。其他播放器的会话会被忽略。

本机已验证 **网易云 2.10.13.202675 + 用户安装的 BetterNCM SMTC 桥接插件** 可用，无需升级网易云。原版未暴露媒体会话；启用插件后，采集器成功识别 `cloudmusic.exe` 会话，读取实际歌名、歌手和播放状态，并成功上报至本地 Worker。连续采样也读取到了切换后的歌曲。旧版找不到上述内置开关时，可以使用兼容的 BetterNCM SMTC 桥接插件；插件具体名称和安装方式以用户当前配置为准。

## 4. 开始上报

```powershell
.\scripts\presence\start.ps1
```

按提示输入公开的 Worker `/status` 地址和上报密钥（输入隐藏）。程序每次成功上报会打印 `Status sent`。前台运行时按 Ctrl+C 停止并尽力上报离线；断网或强制结束后由 90 秒过期兜底。

前台验证成功后，可以隐藏窗口运行：

```powershell
.\scripts\presence\start.ps1 -Background
```

启动器会输出进程 PID 和停止命令，并把 PID 保存到 `%LOCALAPPDATA%\FireflyPresence\collector.pid`。Windows 的 venv `python.exe` 只是启动器，真正运行采集器的是它派生的子进程，写进该文件的也是子进程（即持有互斥锁的那个进程）的 PID。判断是否已在运行时以采集器持有的 Windows 会话互斥锁为准，因此两次启动即使权限级别不同（例如任务计划以普通权限运行、而手动在管理员终端启动）也能正确识别，重复启动只打印现有 PID 后直接退出，不会再派生多余进程；命令行扫描只在拿不到 PID 时用于兜底提示。密钥通过子进程环境变量传递，不写入项目。后台日志位于 `%LOCALAPPDATA%\FireflyPresence`，按 UTF-8 写入，即使歌曲名含本机代码页无法表示的字符（韩文、emoji 等）也不会中断采集。

本机已注册任务计划 **FireflyPresence**：当前 Windows 用户登录后自动隐藏启动，不需要管理员权限或保存 Windows 密码；允许电池供电时运行，无运行时长限制，异常退出最多按一分钟间隔重试三次。它以交互式登录用户运行，才能读取该用户的媒体会话和解密本机上报密钥。用户注销后停止，下次登录重新启动。不是登录前运行的系统服务。

采集器运行期间该任务一直处于「正在运行」状态（启动器在前台等待采集器退出）。如果在任务计划程序里手动结束这个任务，采集器进程不会被一起结束；下次登录或再次运行任务时，启动器会通过互斥锁发现它并直接复用，不会重复启动。

如需取消自动启动：`Unregister-ScheduledTask -TaskName FireflyPresence -Confirm:$false`。任务引用本仓库的绝对路径；移动项目或删除 `.venv` 后需要更新任务。任务启动命令为 `powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -File "<项目路径>\scripts\presence\start.ps1" -NonInteractive`，不修改 PowerShell 执行策略。

本机部署时已将正式接口地址保存至上述目录的 `endpoint.txt`，并使用 Windows DPAPI 把上报密钥加密保存为 `token.xml`。启动器会自动读取这组配置；密钥只能由本机当前 Windows 用户解密。指定其他接口地址时不会自动套用这份密钥。无需每次手动输入，也不要将本机密钥文件提交到仓库。

如果 PowerShell 策略阻止脚本，可在当前终端设置 `PRESENCE_ENDPOINT`、`PRESENCE_TOKEN` 环境变量并直接运行 `collector.py`；不需要修改系统执行策略。

`scripts/presence/apps.json` 将**前台窗口所属进程的文件名**映射为公开标签。例如加入 `"yourgame.exe": "正在玩游戏"`，重启采集器生效。未知程序统一显示「正在使用电脑」，不会上传进程名、窗口标题、文件路径或浏览网址。仅仅后台开着某软件不会算作当前活动。

## 本地联调

创建 `services/presence/.dev.vars`，内容为 `PRESENCE_TOKEN=<本地测试随机密钥>`（已被 Git 忽略），启动：

```powershell
pnpm exec wrangler dev --config services/presence/wrangler.jsonc --local --port 8789
```

另开终端启动博客：

```powershell
$env:PUBLIC_PRESENCE_ENDPOINT = "http://127.0.0.1:8789/status"
pnpm dev
```

运行采集器启动脚本，填入上述本地地址及 `.dev.vars` 中的本地密钥。HTTP 仅允许 loopback 地址；正式地址要求 HTTPS，且不跟随重定向，避免向其他目标转发密钥。

## 验证

```powershell
node --test services/presence/worker.test.mjs
.\scripts\presence\.venv\Scripts\python.exe -m unittest discover -s scripts/presence -p 'test_*.py'
pnpm exec wrangler deploy --dry-run --config services/presence/wrangler.jsonc
pnpm check
pnpm type-check
pnpm build
```

手动验收：切换已映射软件、切歌、暂停/继续、退出网易云、锁屏/解锁、关闭采集器等待 90 秒，以及亮/暗主题和站内导航。浏览器后台标签页停止轮询，回到前台立即刷新。接口失败会清除旧状态，不会继续显示上一次正在听的歌。
