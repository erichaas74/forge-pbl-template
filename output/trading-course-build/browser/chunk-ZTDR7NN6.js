// src/app/shared/media/hosted-media.ts
var MEDIA_BUCKET = "livelessondemogames.firebasestorage.app";
var MEDIA_PREFIX = "site-media";
function hostedMediaUrl(path) {
  const clean = path.replace(/^\/+/, "");
  if (!clean) throw new Error("hostedMediaUrl requires a non-empty path");
  const object = [MEDIA_PREFIX, ...clean.split("/")].map(encodeURIComponent).join("%2F");
  return `https://firebasestorage.googleapis.com/v0/b/${MEDIA_BUCKET}/o/${object}?alt=media`;
}
var HOSTED_MEDIA_PREFIX = `https://firebasestorage.googleapis.com/v0/b/${MEDIA_BUCKET}/o/${MEDIA_PREFIX}%2F`;
function isAllowedMediaSrc(value) {
  if (typeof value !== "string") return false;
  return /^\/(?!\/)/.test(value) || value.startsWith(HOSTED_MEDIA_PREFIX);
}

export {
  hostedMediaUrl,
  isAllowedMediaSrc
};
//# debugId=bb968ecd-a9c5-5fb8-98ad-855a857496e0
//# sourceMappingURL=chunk-ZTDR7NN6.js.map
