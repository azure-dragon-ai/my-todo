```shell
给我做一个待办软件，使用html实现
!open index.html
将当前的待办应用重构为使用React + Typescript + Vite的项目
保留所有现有功能

curl -fsSL https://gitee.com/CoderRouter/scripts/raw/master/install_claude.sh | sed 's/\r$//' | sh
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
curl -fsSL https://gitee.com/CoderRouter/scripts/raw/master/setup_claude_env.sh \
  | sed 's/\r$//' \
  | bash -s -- 
~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.code-relay.com/",
    "ANTHROPIC_AUTH_TOKEN": "你的API_KEY"
  }
}
claude -v

npm i -g @openai/codex
codex
```
