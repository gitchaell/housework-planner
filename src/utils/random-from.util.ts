export function randomFromList<T>(list: T[]): T {

  const dataset = list
    .map(responsable => ({ responsable, weight: 1 }))
    .map((data, index) => Array(data.weight).fill(index))
    .reduce((accumulation, data) => accumulation.concat(data), []);

  const index = Math.floor((Math.random() * dataset.length));

  return list[dataset[index]];
}