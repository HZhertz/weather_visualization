export const getImageUrl = (path: String) => {
  console.log(new URL(`../assets/img/${path}`, import.meta.url).href)
  return new URL(`../assets/img/${path}`, import.meta.url).href
}
export const formatVis = (visString: string) => {
  return (Number(visString) / 1000).toFixed(1)
}
export const formatPre = (preString: string) => {
  return Number(preString).toFixed(1)
}
