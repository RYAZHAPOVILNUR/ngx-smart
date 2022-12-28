export const select = <T>(data: T, path: string | string[]): any =>
  Array.isArray(path)
    // @ts-ignore // todo fix after
    ? path.reduce((acc, x) => acc[x], data)
    : path.split('.').
        // @ts-ignore // todo fix after
        reduce((acc, x) => acc[x], data);


export const getValueToUpsert = ([path, value]: [string, any]) =>
  path.split('.').reduceRight(
    (acc, el) => ({[el]: acc}), value
  )
