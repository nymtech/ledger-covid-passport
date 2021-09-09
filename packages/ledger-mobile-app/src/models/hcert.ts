// see https://ec.europa.eu/health/sites/default/files/ehealth/docs/covid-certificate_json_specification_en.pdf
// and https://github.com/ehn-dcc-development/ehn-dcc-schema/tree/release/1.3.0/valuesets
export const covidCertFields = {
  iss: 'Issued by country ISO 3166-1 alpha-2 code',
  exp: 'Certified expiry date',
  iat: 'Issued at date',
  hcert: {
    _default: 'Health certificate structure',
    ver: 'version',
    v: {
      _default: 'Array of vaccinations',
      ci: 'Unique certificate identifier (UVCI)',
      co: 'Country where vaccine was administered',
      dn: 'Dose number (1, 2, ...)',
      dt: 'Date of vaccination (YYYY-MM-DD)',
      is: 'Name of the organisation that issued the certificate',
      ma: 'Marketing authorisation holder or manufacturer - ORG-100030215 (Biontech Manufacturing GmbH)',
      mp: 'Medicinal product - EU/1/20/1528 (Comirnaty)',
      sd: 'Series of doses / total number of doses',
      tg: 'Target disease (SARS-CoV or one of its variants is 840539006)',
      vp: 'Vaccine product (1119349007 is a SARS-CoV-2 mRNA vaccine)',
    },
    dob: "Patient's date of birth (YYYY-MM-DD, YYYY-MM, YYYY)",
    nam: {
      _default: "Patient's name",
      fn: 'Surname(s)',
      gn: 'Given name(s)',
      fnt:
        'Surname(s) in the holder’s machine\n' +
        'readable travel documents (such as the rules defined in\n' +
        'ICAO Doc 9303 Part 3).',
      gnt:
        'Given name(s) of the holder transliterated using the same\n' +
        'convention as the one used in the holder’s machine\n' +
        'readable travel documents (such as the rules defined in\n' +
        'ICAO Doc 9303 Part 3).',
    },
  },
};

export interface HCertWrapper {
  /** Issued by country ISO 3166-1 alpha-2 code */
  iss: string;
  /** Certified expiry date */
  exp: Date;
  /** Issued at date */
  iat: Date;

  /** Health certificat */
  hcert: {
    iss: HCert;
  };
}

export interface HCert {
  /** Version */
  ver: string;
  /** Vaccination */
  v: HCertVaccination[];
  /** Date of birth */
  dob: string;
  /** Name */
  nam: {
    /** First name(s) */
    fn: string;
    /** Given name(s) */
    gn: string;
    /** First name(s) in MRZ ICAO Doc 9303 Part 3 format */
    fnt: string;
    /** Given name(s) in MRZ ICAO Doc 9303 Part 3 format */
    gnt: string;
  };
}

export interface HCertVaccination {
  /** Unique certificate identifier (UVCI) */
  ci: string;
  /** Country where vaccine was administered */
  co: string;
  /** Dose number (1, 2, ...) */
  dn: string;
  /** Series of doses / total number of doses */
  sd: string;
  /** Date of vaccination (YYYY-MM-DD) */
  dt: string;
  /** Name of the organisation that issued the certificate */
  is: string;
  /** Marketing authorisation holder or manufacturer - ORG-100030215 (Biontech Manufacturing GmbH) */
  ma: string;
  /** Medicinal product - EU/1/20/1528 (Comirnaty) */
  mp: string;
  /** Target disease (SARS-CoV or one of its variants is 840539006) */
  tg: string;
  /** Vaccine product (1119349007 is a SARS-CoV-2 mRNA vaccine) */
  vp: string;
}

export interface ValueSet {
  valueSetId: string;
  valueSetDate: string; // YYYY-MM-DD
  valueSetValues: ValueSetValues;
}

export interface ValueSetValues {
  [key: string]: ValueSetValue;
}

export interface ValueSetValue {
  display: string;
  lang: string;
  active: boolean;
  system: string;
  version?: string;
}

export const isHCertWrapper = (json: any): json is HCertWrapper => {
  if (!json) {
    return false;
  }
  if (!json.hcert?.iss) {
    return false;
  }
  return 'iss' in json && 'exp' in json && 'iat' in json;
};

export const isHCertWrapperVaccinationRecord = (
  json: any,
): json is HCertWrapper => {
  if (!isHCertWrapper(json)) {
    return false;
  }
  return (
    json.hcert?.iss?.v &&
    Array.isArray(json.hcert.iss.v) &&
    json.hcert.iss.v.length > 0
  );
};
