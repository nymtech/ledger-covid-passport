// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
import('./index').catch(e => console.error("Error importing `index.js`:", e));

// import('coconut-wasm').then(async ({ App }) => {
//   const app = new App([
//     'https://pcc-validator1.ci.nymte.ch/api',
//     'https://pcc-validator2.ci.nymte.ch/api',
//     'https://pcc-validator3.ci.nymte.ch/api',
//   ]);
//
//   await app.get_validator_keys();
//
// //  app.set_covid_pass(data);
//   app.set_covid_pass({
//     full_name: 'Joe Bloggs',
//     country_of_vaccination: 'GB',
//     issuer: 'GB',
//     dob_iso8601_date_only: '1980-01-01',
//     vaccine_medication_product_id: 'EU/1/20/1528',
//     patient_id: 'NHS678777',
//   });
//
//
//   console.log('Clear text', app.get_covid_pass_cleartext());
//   console.log('Hashed', app.get_covid_pass_hashed_base58());
// })
