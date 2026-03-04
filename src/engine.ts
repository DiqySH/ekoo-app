/* eslint-disable @typescript-eslint/no-explicit-any */
let wasm: any = null;

export async function initWasm() {
  if (wasm) return wasm;

  const init = (await import("./wasm/engine")).default;
  wasm = await init();

  return wasm;
}
