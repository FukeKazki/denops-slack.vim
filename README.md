# FukeKazki/denops-slack.vim
Slackに投稿するVim/Neovimプラグイン。

## Requirements
- [vim-denops/denops.vim: 🐜 An ecosystem of Vim/Neovim which allows developers to write cross-platform plugins in Deno](https://github.com/vim-denops/denops.vim)
- BotのAPI TOKENを取得してください
- Botにchat:write権限を与えてください

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

## Not Worked
`g:denops#debug = 1`にして`console.log`を確認してください。

## Gif
![denops-slack](https://user-images.githubusercontent.com/40536586/218308294-186b0d78-c5fb-4a59-8f67-42d1cbba03ba.gif)

