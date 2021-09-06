import { isHCertWrapper } from './hcert';

// https://github.com/ehn-dcc-development/ehn-dcc-schema/blob/release/1.3.0/examples/vaccination/simple.json
const json = JSON.parse(`{
  "iss": "NL",
  "exp": "2021-06-25T10:50:31.000Z",
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
          "dn": 1,
          "sd": 2,
          "dt": "2021-06-11",
          "co": "NL",
          "is": "Ministry of Health Welfare and Sport",
          "ci": "URN:UVCI:01:NL:DADFCC47C7334E45A906DB12FD859FB7#1"
        }
      ]
    }
  }
}`);

describe('Parsing health certificate JSON', () => {
  test('null ignored', () => {
    expect(isHCertWrapper(null)).toBeFalsy();
  });
  test('undefined ignored', () => {
    expect(isHCertWrapper(undefined)).toBeFalsy();
  });
  test('{} ignored', () => {
    expect(isHCertWrapper({})).toBeFalsy();
  });
  test('{ foo: 1, bar: 2 } ignored', () => {
    expect(isHCertWrapper({ foo: 1, bar: 2 })).toBeFalsy();
  });
  test('JSON is parsed', () => {
    expect(isHCertWrapper(json)).toBeTruthy();
  });
  test('JSON is parsed correctly', () => {
    if (!isHCertWrapper(json)) {
      throw new Error('Not valid');
    }
    expect(json.hcert.iss.ver).toBe('1.3.0');
    expect(json.hcert.iss.v[0]).toBeDefined();
  });
});
