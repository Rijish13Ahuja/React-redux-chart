import Papa from "papaparse";

export const loadCSV = async () => {
  return new Promise((resolve, reject) => {
    fetch("/src/assets/backend_table.csv") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSV file");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
