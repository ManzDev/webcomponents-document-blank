export const basicLoader = name => `https://unpkg.com/${name}?module`;

export const advancedLoader = name => {
  const isRel = /^\.{1,2}?\//i.test(name);
  const isImage = /\.(jpg|png|svg|webp|gif)$/i.test(name);
  const isAsset = /\.(p?css|less|sc|ass|stylus)$/i.test(name);
  return !isRel && !isImage && !isAsset
    ? `https://unpkg.com/${name}?module`
    : name;
};
