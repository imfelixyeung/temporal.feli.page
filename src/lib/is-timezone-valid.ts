/**
 * Determines whether a string is a valid IANA time zone identifier.
 *
 * @param tz - The time zone identifier to validate (for example, "America/New_York").
 * @returns `true` if `tz` is a recognized IANA time zone, `false` otherwise.
 */
export function isValidTimeZone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}