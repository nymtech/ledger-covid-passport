import create from 'zustand';
import produce from 'immer';
import type {
  CovidPassAttributes,
  SignatureWithShares,
  ValidatorKeys,
  VerifierAccessControlPolicy,
  VerifierAttributes,
  ZKPayload,
} from 'coconut-wasm';
import { App as CoconutApp } from 'coconut-wasm';
import { countries, CountryData } from '../components/Onboarding/data';

// const immer =
//   <T extends State>(config: StateCreator<T>): StateCreator<T> =>
//   (set, get, api) =>
//     config(
//       (partial, replace) => {
//         const nextState =
//           typeof partial === 'function'
//             ? produce(partial as (state: Draft<T>) => T)
//             : (partial as T);
//         return set(nextState, replace);
//       },
//       get,
//       api,
//     );

interface OnboardingState {
  country: CountryData;
  setByCountryCode: (countryCode: string) => void;
}

export const useOnboardingState = create<OnboardingState>((set) => ({
  country: countries.UK,
  setByCountryCode: (countryCode: string) =>
    set(
      produce<OnboardingState>((state) => {
        state.country = countries[countryCode] || countries.UK;
      }),
    ),
}));

interface CoconutState {
  app: CoconutApp;
  validatorKeys?: ValidatorKeys;
  pccClearText?: CovidPassAttributes;
  pccHashed?: CovidPassAttributes;
  signatureWithShares?: SignatureWithShares;
  userShowDataBase58?: string;
  verifierPolicy?: VerifierAccessControlPolicy;
  verifierAttributes?: VerifierAttributes;

  // setters
  setValidatorKeys: (validatorKeys: ValidatorKeys) => void;
  setPccClearText: (value: CovidPassAttributes) => void;
  setPccHashed: (value: CovidPassAttributes) => void;
  setSignatureWithShares: (value: SignatureWithShares) => void;
  setUserShowDataBase58: (value: string) => void;
  setVerifierPolicy: (value: VerifierAccessControlPolicy) => void;
  setVerifierAttributes: (value: VerifierAttributes) => void;
}

export const useCoconutState = create<CoconutState>((set) => ({
  app: new CoconutApp([
    'https://pcc-validator1.ci.nymte.ch/api',
    'https://pcc-validator2.ci.nymte.ch/api',
    'https://pcc-validator3.ci.nymte.ch/api',
  ]),
  setValidatorKeys: (validatorKeys: ValidatorKeys) =>
    set(
      produce<CoconutState>((state) => {
        state.validatorKeys = validatorKeys;
      }),
    ),
  setPccClearText: (value: CovidPassAttributes) =>
    set(
      produce<CoconutState>((state) => {
        state.pccClearText = value;
      }),
    ),
  setPccHashed: (value: CovidPassAttributes) =>
    set(
      produce<CoconutState>((state) => {
        state.pccHashed = value;
      }),
    ),
  setSignatureWithShares: (value: SignatureWithShares) =>
    set(
      produce<CoconutState>((state) => {
        state.signatureWithShares = value;
      }),
    ),
  setUserShowDataBase58: (value: string) =>
    set(
      produce<CoconutState>((state) => {
        state.userShowDataBase58 = value;
      }),
    ),
  setVerifierPolicy: (value: VerifierAccessControlPolicy) =>
    set(
      produce<CoconutState>((state) => {
        state.verifierPolicy = value;
      }),
    ),
  setVerifierAttributes: (value: VerifierAttributes) =>
    set(
      produce<CoconutState>((state) => {
        state.verifierAttributes = value;
      }),
    ),
}));
