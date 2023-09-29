import fs from "fs";

export function log(logMessage: string) {
  let dateNow = getCurrentDate(false);
  fs.appendFile(`logs/${dateNow}.md`, `${logMessage}\n`, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
      return;
    }
  });
}

export function getCurrentDate(withTimeset: boolean): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return withTimeset
    ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    : `${year}-${month}-${day}`;
}
