export interface CountryData {
  countryCode: string;
  countryName: string;
  uniqueIdentifierName: string;
  healthAuthorityName: string;
}

interface Countries {
  [countryCode: string]: CountryData;
}

export const countries: Countries = {
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    uniqueIdentifierName: 'NHS Number',
    healthAuthorityName: 'NHS',
  },
  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    uniqueIdentifierName: 'Documento nacional de identidad',
    healthAuthorityName: 'INSS',
  },
  IT: {
    countryCode: 'IT',
    countryName: 'Italy',
    uniqueIdentifierName: 'Codice fiscale',
    healthAuthorityName: 'ASL',
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    uniqueIdentifierName: 'INSEE code',
    healthAuthorityName: 'PUMa',
  },
};
