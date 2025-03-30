export const TITLE_SUFFIX = "Board - ZZULI";
export const RATING_TITLE_SUFFIX = "Rating - ZZULI";
export const BALLOON_TITLE_SUFFIX = "Balloon - ZZULI";
export const RESOLVER_TITLE_SUFFIX = "Resolver - ZZULI";
export const COUNTDOWN_TITLE_SUFFIX = "Countdown - ZZULI";
export const SUBMISSION_TITLE_SUFFIX = "Submission - ZZULI";

export const CDN_HOST = computed(() => {
  if (!window) {
    return "";
  }

  return window.CDN_HOST;
});

export const DATA_HOST = computed(() => {
  if (!window) {
    return "";
  }

  return window.DATA_HOST;
});

export const RATING_DATA_HOST = computed(() => {
  const dataHost = DATA_HOST.value;
  return dataHost.replace("/data/", "/rating-data/");
});

export const DATA_REGION = computed(() => {
  if (!window) {
    return "";
  }

  return window.DATA_REGION;
});
