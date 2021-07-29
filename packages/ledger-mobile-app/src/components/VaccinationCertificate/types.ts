export interface VaccinationCertificate {
  patient: {
    displayName: string;
    givenName: string;
    familyName: string;
    dateOfBirth: Date;
  };
  diseaseOrAgent: string;
  vaccination: {
    totalPrescribedDoses: number;
    doses: VaccinationAdministration[];
  };
  certificate: {
    issuedBy: {
      name: string;
    };
    identifier: string;
  };
}

export interface VaccinationAdministration {
  doseNumber: number;
  vaccine: VaccinationProduct;
  administration: {
    date: Date;
    location: {
      iso3166Alpha2: string;
      displayName: string;
    };
  };
}

export interface VaccinationProduct {
  name: string;
  product: string;
  manufacturer: string;
}
