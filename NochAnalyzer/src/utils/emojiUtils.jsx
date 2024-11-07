import emojiRegexFunc from "emoji-regex";
export const findMostUsedEmoji = (str) => {
  const emojiRegex = emojiRegexFunc();
  const emojiCounts = {};

  let match;
  while ((match = emojiRegex.exec(str)) !== null) {
    const emoji = match[0];
    emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1;
  }

  const sortedEmojis = Object.keys(emojiCounts).sort(
    (a, b) => emojiCounts[b] - emojiCounts[a]
  );

  return sortedEmojis.map((emoji) => ({ emoji, count: emojiCounts[emoji] }));
};
