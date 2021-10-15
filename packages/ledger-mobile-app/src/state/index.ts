import create from 'zustand';
import produce from 'immer';
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
