export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight + 500,
    behavior: "smooth",
  });
};

export const scrollToRef = (ref) => {
  ref?.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
};
