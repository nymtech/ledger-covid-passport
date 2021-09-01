import { parse } from 'mrz';
import type { Result } from 'mrz';
import { DateTime } from 'luxon';

interface MRZResult {
  valid: boolean;
  parsed?: Result;
}

export interface MRZFields {
  givenName: string;
  familyName: string;
  dateOfBirth: DateTime;
}

export const parseMachineReadableZone = (lines?: string[]): MRZResult => {
  if (!lines?.length) {
    return { valid: false };
  }

  const filteredLines = (lines || [])
    .map((text) => text.replace(/ |\r\n|\r|\n/g, ''))
    .filter((text) => text.includes('<<'))
    .filter((text) => text.length > 5);

  if (!filteredLines.length) {
    return { valid: false };
  }

  return { valid: true, parsed: parse(filteredLines.join('\n')) };
};

export const parseMRZDate = (result: MRZResult): DateTime | null => {
  if (!result.valid || !result.parsed?.fields.birthDate) {
    return null;
  }
  return DateTime.fromFormat(result.parsed.fields.birthDate, 'yyMMdd');
};

export const parseMachineReadableZoneIntoFields = (
  lines?: string[],
): MRZFields | null => {
  const result = parseMachineReadableZone(lines);
  const dateOfBirth = parseMRZDate(result);
  if (
    !result.valid ||
    !result.parsed?.fields.firstName ||
    !result.parsed?.fields.lastName ||
    !result.parsed?.fields.birthDate ||
    !dateOfBirth
  ) {
    return null;
  }

  return {
    givenName: result.parsed.fields.firstName,
    familyName: result.parsed.fields.lastName,
    dateOfBirth,
  };
};
