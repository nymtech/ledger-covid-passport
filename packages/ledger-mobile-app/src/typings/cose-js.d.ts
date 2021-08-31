declare module 'cose-js' {
  declare function verify(
    payload: Uint8Array,
    verifierParam: any,
    options?: any,
  ): Promise<Buffer>;

  const sign = {
    verify,
  };

  export default {
    sign,
  };
}
