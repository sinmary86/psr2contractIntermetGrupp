import React from "react";
import { generateDocument } from "../utils/documentUtils"; // Функция генерации документа
import { saveAs } from "file-saver";

const DownloadButton = ({ tableData, contract, supplier, buyer, fileName = "ПСР.docx" }) => {
  const handleDownload = async () => {
    try {
      const doc = generateDocument({ tableData, contract, supplier, buyer });
      const blob = await doc;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Ошибка при генерации документа:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 m-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
    >
      Скачать Word
    </button>
  );
};

export default DownloadButton;
