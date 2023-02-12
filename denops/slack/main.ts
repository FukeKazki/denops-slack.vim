import {
  Denops,
  ensureNumber,
  ensureString,
  execute,
  mapping,
  Mode,
  SlackAPI,
} from "./deps.ts";
import { getBuildOption, getMessage } from "./helper.ts";

export async function main(denops: Denops): Promise<void> {
  // わからない
  const maps = [
    {
      lhs: "<silent> <Plug>(Slack)",
      rhs: ":Slack<CR>",
      mode: ["n", "v"],
    },
  ];

  for (const map of maps) {
    await mapping.map(denops, map.lhs, map.rhs, {
      mode: map.mode as Mode[],
    });
  }
  denops.dispatcher = {
    // slackに投稿する
    async post(start: unknown, end: unknown, text: unknown): Promise<unknown> {
      // 絶対に[始まりの行, 終わりの行]
      // テキストがある場合 [始まりの行, 終わりの行, テキスト]
      const { message, isPlane } = await getMessage(
        denops,
        ensureNumber(start),
        ensureNumber(end),
        ensureString(text),
      );

      const option = await getBuildOption(denops);
      const client = SlackAPI(option.token);

      // ファイルのテキストの場合はバッククォートで囲む
      const res = await client.chat.postMessage({
        text: isPlane ? message : `\`\`\`${message}\`\`\``,
        channel: option.channel,
      });
      return res.ok;
    },
  };

  // -range: 範囲選択できるように
  // -nargs: 引数の数
  // line1, line2: 選択している最初の行と最後の行
  // q-args: 良い感じにエスケープして文字を受け取る
  await execute(
    denops,
    `command! -range -nargs=? Slack call denops#request('${denops.name}', 'post', [<line1>, <line2>, <q-args>])`,
  );
}
