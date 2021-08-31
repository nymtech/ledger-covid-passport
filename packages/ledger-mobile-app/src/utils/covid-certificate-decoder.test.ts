import { decodeCovidCertificate } from './covid-certificate-decoder';

describe('EU and NHS issues COVID certificate decoder', () => {
  test('can decode a valid certificate', async () => {
    expect(async () =>
      decodeCovidCertificate(
        'HC1:NCFOXN%TSMAHN-H%OCHOS80JS3NL73:D4+OV-36HD7AOMOW4S2S**J4G5W/JT3FF/8X*G3M9BM9Z0BZW4V/AY733J7%2HV77ADFYRVNDF.93$PN-*0X37*090GVVNNGM5V.499TP+M5*K*U3*96846A$Q 76UW62U10%MPF65ZMNH6LK92R5QV1O2R0NLD+9 BLXE6UC65ZM176NF675IPF5$5QA46/Q6576PR6PF5RBQ746B46O1N646RM9XC5.Q69L6-96QW6U46%E5 NPC71AL6ZO66X69/9-3AKI63ZMLEQZ76UW6*E99Q9E$BDZIE9J/MJFZI*IB*NIZ0KA42BKBTKBA4229BCWKXSJGZI8DJC0J*PITQTA.SGD32OIZ0K%GA+ESCQSETC%ESISTR SR63+NTWVBDKBYLDN4DE1D-NSLFUKQ9B.UP-1AZJS9JE6F*ZJKE7+3G3UUS.77SU1QUB5JPN2R*O55OOQC*3JSH53SFN*46PBMZL+H2%-T$LVVV1Y:D3T3AP7BFPI7SYM0/KO+DG',
      ),
    ).toBeDefined();
  });
  test('fails when version identifier is not present', async () => {
    await expect(async () =>
      decodeCovidCertificate(
        'NCFOXN%TSMAHN-H%OCHOS80JS3NL73:D4+OV-36HD7AOMOW4S2S**J4G5W/JT3FF/8X*G3M9BM9Z0BZW4V/AY733J7%2HV77ADFYRVNDF.93$PN-*0X37*090GVVNNGM5V.499TP+M5*K*U3*96846A$Q 76UW62U10%MPF65ZMNH6LK92R5QV1O2R0NLD+9 BLXE6UC65ZM176NF675IPF5$5QA46/Q6576PR6PF5RBQ746B46O1N646RM9XC5.Q69L6-96QW6U46%E5 NPC71AL6ZO66X69/9-3AKI63ZMLEQZ76UW6*E99Q9E$BDZIE9J/MJFZI*IB*NIZ0KA42BKBTKBA4229BCWKXSJGZI8DJC0J*PITQTA.SGD32OIZ0K%GA+ESCQSETC%ESISTR SR63+NTWVBDKBYLDN4DE1D-NSLFUKQ9B.UP-1AZJS9JE6F*ZJKE7+3G3UUS.77SU1QUB5JPN2R*O55OOQC*3JSH53SFN*46PBMZL+H2%-T$LVVV1Y:D3T3AP7BFPI7SYM0/KO+DG',
      ),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
  test('fails on invalid string data', async () => {
    await expect(async () => {
      await decodeCovidCertificate('');
    }).rejects.toThrowErrorMatchingSnapshot();
    await expect(async () => {
      await decodeCovidCertificate('1234');
    }).rejects.toThrowErrorMatchingSnapshot();
    await expect(async () => {
      await decodeCovidCertificate('HC1');
    }).rejects.toThrowErrorMatchingSnapshot();
    await expect(async () => {
      await decodeCovidCertificate('HC1:');
    }).rejects.toThrowErrorMatchingSnapshot();
    await expect(async () => {
      await decodeCovidCertificate('\n');
    }).rejects.toThrowErrorMatchingSnapshot();
  });
});
