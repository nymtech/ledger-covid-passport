export interface CovidPassWithBoolAttributes {
  patient_id: string;
  full_name: string;
  vaccine_medication_product_id: string;
  country_of_vaccination: string;
  issuer: string;
  dob_iso8601_date_only: string;
  is_vaccinated: boolean;
  is_over_18: boolean;
  is_over_21: boolean;
}
