import { HCertWrapper } from '../../models/hcert';

// https://github.com/ehn-dcc-development/ehn-dcc-schema/blob/release/1.3.0/examples/vaccination/simple.json
export const fakeHCert: HCertWrapper = [
  JSON.parse(`{
  "iss": "NL",
  "exp": "2022-06-25T10:50:31.000Z",
  "iat": "2021-05-26T10:50:31.000Z",
  "hcert": {
    "iss": {
      "ver": "1.3.0",
      "nam": {
        "fn": "Smith-Jones",
        "fnt": "SMITH<JONES",
        "gn": "Charles Edward",
        "gnt": "CHARLES<EDWARD"
      },
      "dob": "1964-01-01",
      "v": [
        {
          "tg": "840539006",
          "vp": "1119349007",
          "mp": "EU/1/20/1507",
          "ma": "ORG-100031184",
          "dn": 2,
          "sd": 2,
          "dt": "2021-06-11",
          "co": "UK",
          "is": "NHS England",
          "ci": "URN:UVCI:01:UK:1234567890"
        }
      ]
    }
  }
}`),
].map<HCertWrapper>((i: any) => ({
  ...(i as HCertWrapper),
  exp: new Date(Date.parse(i.exp)),
  iat: new Date(Date.parse(i.iat)),
}))[0];
