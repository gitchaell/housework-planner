export function slug(str: string) {
  return str.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}