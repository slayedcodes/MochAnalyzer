export const formatOnlyTexts = (chat) => {
  let chatArr = chat.split(/\r?\n|\r|\n/g);
  return chatArr.map((text) => text.substring(text.lastIndexOf(":" + 1)));
};

export const countStringsContainingSubstring = (array, substring) => {
  return array.filter((str) => str.includes(substring)).length;
};

export const countOccurrences = (str, substring) => {
  const regex = new RegExp(substring, "g");
  const matches = str?.match(regex);
  return matches ? matches.length : 0;
};

export const countCharAfterSubstring = (string, substring, char) => {
  let arr = string.split(/\r?\n|\r|\n/g);
  let count = 0;

  arr.forEach((str) => {
    const index = str.indexOf(substring);
    if (index !== -1) {
      const substringEndIndex = index + substring.length;
      for (let i = substringEndIndex; i < str.length; i++) {
        if (str[i] === char) {
          count++;
        }
      }
    }
  });

  return count;
};

export const countSubstringsAfterSubstring = (
  string,
  mainSubstring,
  searchSubstring
) => {
  let arr = string.split(/\r?\n|\r|\n/g);
  let count = 0;
  arr.forEach((str) => {
    const index = str.indexOf(mainSubstring);
    if (index !== -1) {
      const substringEndIndex = index + mainSubstring.length;
      const stringAfterMainSubstring = str.slice(substringEndIndex);
      count += (
        stringAfterMainSubstring.match(new RegExp(searchSubstring, "g")) || []
      ).length;
    }
  });
  return count;
};

export const findMostUsedWordSequences = async (
  str,
  length,
  excludedTexts = []
) => {
  const words = str.split(/\s+/);
  const sequenceCounts = new Map();

  for (let i = 0; i <= words.length - length; i++) {
    const sequence = words.slice(i, i + length).join(" ");
    if (
      !excludedTexts.some((excludedText) => sequence.includes(excludedText))
    ) {
      sequenceCounts.set(sequence, (sequenceCounts.get(sequence) || 0) + 1);
    }
  }

  return [...sequenceCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([sequence, count]) => ({ sequence, count }));
};
