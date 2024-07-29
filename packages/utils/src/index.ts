
export * from './dates';
export * from './browser';
export * from './strings';
export * from './colors';


export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}


export function isUrl (url: string | undefined) {
  if (!url) return false;
  try {
    new URL(url);
    console.log('true')
    return true;
  } catch (e) {
    return false;
  }
}

export function isFile (url: string | undefined){
  if (!url) return false;
  return url.startsWith("/");
}