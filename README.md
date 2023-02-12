# FukeKazki/denops-slack.vim
Slackに投稿するVim/Neovimプラグイン。

## Requirements
- [vim-denops/denops.vim: 🐜 An ecosystem of Vim/Neovim which allows developers to write cross-platform plugins in Deno](https://github.com/vim-denops/denops.vim)

## Usage

```vim
:Slack チャンネルに投稿するメッセージ
```

## Option

```vim
-- BOTのAPI TOKENが必要です
g:slack_api_token="xxxx-xxxxx-xxxxxx-xxxxx"
-- 投稿するチャンネルのIDが必要です
g:slack_channel="xxxxxxxx"
```

### AstroNvim

```lua
return {
  g = {
   slack_api_token = 'xxxx-xxxxx-xxxxxx-xxxxx',
   slack_channel = 'xxxxxxxx'
  }
}
```
shellの環境変数に定義して`os.getenv("SLACK_API_TOKEN")`するのがおすすめです。
