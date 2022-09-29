export function range(start: number, end: number): ReadonlyArray<number> {
  return [...Array(end - start + 1).keys()].map(i => i + start);
}