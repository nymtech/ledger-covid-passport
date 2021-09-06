import diseaseAgentTargeted from './data/disease-agent-targeted.json';
import vaccineMedicationManufacturers from './data/vaccine-mah-manf.json';
import vaccineMedicinalProduct from './data/vaccine-medicinal-product.json';
import vaccineProphylaxis from './data/vaccine-prophylaxis.json';
import { ValueSet, ValueSetValue } from './hcert';

interface IValueSets {
  diseaseAgentTargeted: ValueSet;
  vaccineMedicationManufacturers: ValueSet;
  vaccineMedicinalProduct: ValueSet;
  vaccineProphylaxis: ValueSet;

  maToValue: (ma: string) => ValueSetValue | undefined;
  mpToValue: (mp: string) => ValueSetValue | undefined;
  tgToValue: (tg: string) => ValueSetValue | undefined;
  vpToValue: (vp: string) => ValueSetValue | undefined;
}

export const valueSets: IValueSets = {
  diseaseAgentTargeted,
  vaccineMedicationManufacturers,
  vaccineMedicinalProduct,
  vaccineProphylaxis,

  /** Marketing authorisation holder or manufacturer - ORG-100030215 (Biontech Manufacturing GmbH) */
  maToValue: (ma: string) =>
    valueSets.vaccineMedicationManufacturers.valueSetValues[ma],

  /** Medicinal product - EU/1/20/1528 (Comirnaty) */
  mpToValue: (mp: string) =>
    valueSets.vaccineMedicinalProduct.valueSetValues[mp],

  /** Target disease (SARS-CoV or one of its variants is 840539006) */
  tgToValue: (tg: string) => valueSets.diseaseAgentTargeted.valueSetValues[tg],

  /** Vaccine product (1119349007 is a SARS-CoV-2 mRNA vaccine) */
  vpToValue: (vp: string) => valueSets.vaccineProphylaxis.valueSetValues[vp],
};
