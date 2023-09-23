export function errorToString(err: any): string {
  if (err instanceof Error) {
    return err.message;
  } else if (typeof err === "string") {
    return err;
  } else {
    try {
      return JSON.stringify(err);
    } catch (e) {
      return "Unknown error";
    }
  }
}
