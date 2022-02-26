import csvFile from "../datasource/data.csv";
import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function useCSVReader() {
  const [csvData, setCSVData] = useState([]);
  useEffect(() => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
      complete: function (input) {
        setCSVData(input.data);
      },
    });
  }, []);

  return csvData;
}
