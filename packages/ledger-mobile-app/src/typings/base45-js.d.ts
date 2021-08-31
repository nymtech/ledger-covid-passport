// 😢 https://github.com/ehn-dcc-development/base45-js/pull/2
declare module 'base45-js' {
  export function encode(buffer: ArrayBuffer): string;
  export function decode(str: string): ArrayBuffer;
}
