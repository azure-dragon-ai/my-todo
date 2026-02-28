```shell
给我做一个待办软件，使用html实现
!open index.html
将当前的待办应用重构为使用React + Typescript + Vite的项目
保留所有现有功能，且UI风格保持一致
给每个待办事项增加一个优先级（高、中、低），并用不同的颜色标记出来
这个命令等会儿我自己执行，你确保其它部分都完成了即可
/rewind
在页面右上角增加一个切换语言的选项，用户可以选择中文或者英文，默认为中文
claude mcp add --transport http figma https://mcp.figma.com/mcp
/resume
claude -c
/mcp
修改当前页面，使它与figma稿件保持一致: https://figma.com
/compact
/clear
/compact 
  ⎿  Compacted (ctrl+o to see full summary)
  ⎿  Read ../../../../../../.claude/todos/6de5edc7-7821-4f97-8220-9d2847978bd4-agent-6de5edc7-7821-4f97-822
     0-9d2847978bd4.json (1 lines)
  ⎿  Read src/index.css (342 lines)
  ⎿  Read src/App.tsx (63 lines)
  ⎿  Read src/components/Footer.tsx (26 lines)
  ⎿  Read src/components/TodoItem.tsx (39 lines)
  ⎿  Plan file referenced (~/.claude/plans/glistening-tinkering-parnas.md)
/init
把CLAUDE.md的语言改为中文
/memory
/hooks
npm install -g prettier
npm fund
Matcher: Write|Edit
jq -r '.tool_input.file_path' | xargs prettier --write
创建一个新的文件test.html，里面随便写点HTML
就行，所有的内容都写在一行里面
mkdir -p ~/.claude/skills/daily-report
sudo ln -fs "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" /usr/local/bin/
code ~/.claude/skills/daily-report
SKILL.md
写一份每日总结
/daily-report 写一份每日总结
/agents
这是一个用于代码审核的SubAgent，在用户要求“代码审核”的时候调用它
给我做一下代码审核
/plugin
按照frontend-design的要求做一个待办软件，使用html实现

claude --dangerously-skip-permissions

Esc + Esc
Ctrl + g
Option + Enter
```

```shell
nvm use v22.15.0

curl -fsSL https://gitee.com/CoderRouter/scripts/raw/master/install_claude.sh | sed 's/\r$//' | sh
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
curl -fsSL https://gitee.com/CoderRouter/scripts/raw/master/setup_claude_env.sh | sed 's/\r$//' | bash -s -- "你的API_KEY"
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

# Claude Code & Codex Environment Variables
export ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/apps/anthropic
export ANTHROPIC_API_KEY=
export ANTHROPIC_MODEL=qwen3.5-plus
# End Claude Code & Codex Environment Variables

#glm
export GLM_API_KEY=
cat ~/.codex/config.toml
model = "GLM-5"
model_provider = "glm"

[model_providers.glm]
name = "glm"
base_url = "https://open.bigmodel.cn/api/paas/v4"
env_key = "GLM_API_KEY"

# modelscope
export MODELSCOPE_API_KEY=
cat ~/.codex/config.toml
model = "Qwen/Qwen3-Next-80B-A3B-Instruct"
model_provider = "modelscope"

[model_providers.modelscope]
name = "Modelscope"
base_url = "https://api-inference.modelscope.cn/v1"
env_key = "MODELSCOPE_API_KEY"

cat ~/.codex/auth.json 
{
  "auth_mode": "apikey",
  "OPENAI_API_KEY": ""
}


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