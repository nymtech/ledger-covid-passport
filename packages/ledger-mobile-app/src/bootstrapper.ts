/**
 * This file is needed to dynamically import the index to allow the WASM package to load asynchronously while
 * not violating the TS isolated modules setting
 */

/* eslint-disable import/no-extraneous-dependencies */
export async function bootstrap() {
  // eslint-disable-next-line import/extensions
  try {
    await import('./index');
  } catch (e) {
    console.error(e);
  }
}
