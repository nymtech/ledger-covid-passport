import { DateTime } from 'luxon';
import {
  parseMachineReadableZone,
  parseMachineReadableZoneIntoFields,
  parseMRZDate,
} from './parseMachineReadableZone';

describe('parsing machine readable zone (MRZ) from documents', () => {
  test('ignores empty string', () => {
    expect(parseMachineReadableZone()).toStrictEqual({ valid: false });
  });
  test('ignores empty array', () => {
    expect(parseMachineReadableZone([])).toStrictEqual({ valid: false });
  });
  test('ignores empty lines', () => {
    expect(parseMachineReadableZone([''])).toStrictEqual({ valid: false });
  });
  test('valid data', () => {
    const result = parseMachineReadableZone([
      'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
      'L898902C36UTO7408122F1204159ZE184226B<<<<<10',
    ]);
    expect(result.valid).toBeTruthy();
    expect(result.parsed?.format).toBe('TD3');
    expect(result.parsed?.fields.lastName).toBe('ERIKSSON');
    expect(result.parsed?.fields.firstName).toBe('ANNA MARIA');

    const dob = parseMRZDate(result);
    const expectedDob = DateTime.local(1974, 8, 12);
    expect(dob?.equals(expectedDob)).toBeTruthy();
  });
  test('parse only fields of interest', () => {
    expect(
      parseMachineReadableZoneIntoFields([
        'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
        'L898902C36UTO7408122F1204159ZE184226B<<<<<10',
      ]),
    ).toStrictEqual({
      givenName: 'ANNA MARIA',
      familyName: 'ERIKSSON',
      dateOfBirth: DateTime.local(1974, 8, 12),
    });
  });
  test('parse only fields of interest (UK with OCR mistakes)', () => {
    const lines = [
      'P<GBRSALMON<<IRENE<<<<<<<<<<<<<<<<<<<<<<<<<<',
      '3018866217GBR2402099F1208308<<<<<<<<<<<<<<04',
    ];
    const result = parseMachineReadableZone(lines);
    expect(result.valid).toBeTruthy();
    expect(parseMachineReadableZoneIntoFields(lines)).toStrictEqual({
      givenName: 'IRENE',
      familyName: 'SALMON',
      dateOfBirth: DateTime.local(2024, 2, 9),
    });
  });
});

const foo = `UK DRIVING LICENCE
1. MORGAN
2. SARAH
MEREDYTH
3. 11,08.1976 UNITED KINGDOM
4a. 01.01.2021 4c. DVLA WY >4
4b. 31.12.2030
, > ~
.. & 5.  MORGA753116SM9lJ 35 < 1IN
s 7
/\\. K,»(. ‘!\\\\I\\/\\Y:\\\\ <2
31
™ 8. 122 BURNS CRESCENT
EDINBURGH
EH1 9GP
9. AM/A/B1/B/BE/f/k/I/n/p/q`;
