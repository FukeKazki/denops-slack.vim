import { Denops, vars } from "./deps.ts";

// options.luaでgに設定してるtoken等を取得する
export const getBuildOption = async (denops: Denops) => {
  const token = await vars.g.get<string>(
    denops,
    "slack_api_token",
    "",
  );
  const channel = await vars.g.get<string>(
    denops,
    "slack_channel",
    "",
  );
  // const token = await vars.environment.get(denops, "SLACK_API_TOKEN", "");
  // const channel = await vars.environment.get(denops, "SLACK_CHANNEL", "");
  return {
    token,
    channel,
  };
};
