import create from 'zustand';
import produce from 'immer';
import type {
  VerifierAccessControlPolicy,
  VerifierAttributes,
  ZKPayload,
} from 'coconut-wasm';

interface VerifierState {
  verifierPolicy?: VerifierAccessControlPolicy;
  verifierAttributes?: VerifierAttributes;
  verifyResult?: ZKPayload;

  setVerifierPolicy: (value: VerifierAccessControlPolicy) => void;
  setVerifierAttributes: (value: VerifierAttributes) => void;
  setVerifyResult: (value: ZKPayload) => void;
}

export const useVerifierState = create<VerifierState>((set) => ({
  setVerifierPolicy: (value: VerifierAccessControlPolicy) =>
    set(
      produce<VerifierState>((state) => {
        state.verifierPolicy = value;
      }),
    ),
  setVerifierAttributes: (value: VerifierAttributes) =>
    set(
      produce<VerifierState>((state) => {
        state.verifierAttributes = value;
      }),
    ),
  setVerifyResult: (value: ZKPayload) =>
    set(
      produce<VerifierState>((state) => {
        state.verifyResult = value;
      }),
    ),
}));
