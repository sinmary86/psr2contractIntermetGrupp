import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    AlignmentType,
    WidthType,
  } from "docx";
  
  // Функция выделения пустого значения
  const highlightIfEmpty = (text, isBold = false) => {
    return new TextRun({
      text: text || "не указан(а)",
      size: 18, // Размер шрифта
      bold: isBold, // Жирный текст при необходимости
      highlight: text ? undefined : "yellow", // Жёлтый фон, если значение пустое
    });
  };
  
  // Стиль для стандартного текста
  const defaultTextStyle = {
    font: "Times New Roman",
    size: 18,
  };
  
  // Функция создания параграфа
  const createParagraph = (text, options = {}) => {
    const { alignment = AlignmentType.LEFT, bold = false, indent, spacing } = options;
    return new Paragraph({
      alignment,
      indent,
      spacing,
      children: [
        new TextRun({
          text,
          bold,
          ...defaultTextStyle,
        }),
      ],
    });
  };
  
  // Функция создания ячейки таблицы
  const createTableCell = (text, options = {}) => {
    const { bold = false, alignment = AlignmentType.LEFT, borders = true } = options;
  
    return new TableCell({
      children: [
        new Paragraph({
          alignment,
          children: [
            new TextRun({
              text,
              bold,
              ...defaultTextStyle,
            }),
          ],
        }),
      ],
      borders: borders
        ? undefined
        : {
            top: { size: 0, color: "FFFFFF" },
            bottom: { size: 0, color: "FFFFFF" },
            left: { size: 0, color: "FFFFFF" },
            right: { size: 0, color: "FFFFFF" },
          },
    });
  };
  
  // Генерация документа Word
  export const generateDocument = async ({ tableData, contract, supplier, buyer }) => {
    const pageMargins = {
        top: 740, 
        right: 740, 
        bottom: 740, 
        left: 740, 
      };
    
    // Заголовок
    const header = [
      createParagraph("ПРОТОКОЛ СОГЛАСОВАНИЯ РАЗНОГЛАСИЙ", { alignment: AlignmentType.CENTER, bold: true }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "к договору поставки № ", ...defaultTextStyle }),
          highlightIfEmpty(contract.contractNumber),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "и к протоколу разногласий Покупателя от ", ...defaultTextStyle }),
          highlightIfEmpty(contract.dateProtocol),
        ],
      }),
      new Paragraph({ spacing: { after: 50 } }),
    ];
  
    // Локация и даты
    const locationAndDate = [
      createParagraph("г. Москва", { alignment: AlignmentType.LEFT }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [highlightIfEmpty(contract.dateProtocol)],
      }),
    ];
  
    // Поставщик и покупатель
    const parties = [
      createParagraph('Поставщик: ООО "ИнтерметГрупп"', { indent: { firstLine: 720 }, bold: true }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { firstLine: 720 },
        children: [
          new TextRun({ text: "Покупатель: ", bold: true, ...defaultTextStyle }),
          highlightIfEmpty(buyer?.name, true),
        ],
      }),
      new Paragraph({ spacing: { before: 50, after: 50 } }),
    ];
  
    // Таблица данных
    const tableHeader = new TableRow({
      children: [
        createTableCell("№ Пункта", { alignment: AlignmentType.CENTER, bold: true }),
        createTableCell("Редакция Поставщика", { alignment: AlignmentType.CENTER, bold: true }),
        createTableCell("Редакция Покупателя", { alignment: AlignmentType.CENTER, bold: true }),
        createTableCell("Согласованная редакция", { alignment: AlignmentType.CENTER, bold: true }),
      ],
    });
  
    const tableRows = tableData.map((row) =>
      new TableRow({
        children: [
          createTableCell(row.section || "-"),
          createTableCell(row.supplier || "по тексту договора"),
          createTableCell("по тексту протокола разногласий"),
          createTableCell(row.customAgreed || row.agreed || "по тексту протокола разногласий"),
        ],
      })
    );
  
    const table = new Table({
      rows: [tableHeader, ...tableRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    });
  
    // Основной текст после таблицы
    const mainTextAfterTable = [
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { before: 200 },
        children: [
          new TextRun({ text: "Стороны договорились изложить вышеуказанные условия договора поставки № ", ...defaultTextStyle }),
          highlightIfEmpty(contract.contractNumber),
          new TextRun({ text: " г. в согласованной редакции. Все остальные условия договора, не затронутые настоящим протоколом согласования разногласий, остаются без изменений.", ...defaultTextStyle }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "Настоящий протокол согласования разногласий составлен в 2 экземплярах, имеющих одинаковую юридическую силу, и является неотъемлемой частью договора № ", ...defaultTextStyle }),
          highlightIfEmpty(contract.contractNumber),
          new TextRun({ text: " г., составлен в двух экземплярах, вступает в силу с момента подписания.", ...defaultTextStyle }),
        ],
      }),
    ];
  
    // Подписи
    const signatureTable = new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  createParagraph('Поставщик: ООО "ИнтерметГрупп"'),
                  new Paragraph({ children: [highlightIfEmpty(supplier?.position)] }),
                  new Paragraph({
                    spacing: { before: 200 },
                    children: [
                      new TextRun({ text: "__________________", ...defaultTextStyle }),
                      highlightIfEmpty(supplier?.surname),
                    ],
                  }),
                ],
                borders: {
                  top: { size: 0, color: "FFFFFF" },
                  bottom: { size: 0, color: "FFFFFF" },
                  left: { size: 0, color: "FFFFFF" },
                  right: { size: 0, color: "FFFFFF" },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Покупатель: ", ...defaultTextStyle }),
                      highlightIfEmpty(buyer?.name),
                    ],
                  }),
                  new Paragraph({ children: [highlightIfEmpty(buyer?.position)] }),
                  new Paragraph({
                    spacing: { before: 200 },
                    children: [
                      new TextRun({ text: "__________________", ...defaultTextStyle }),
                      highlightIfEmpty(buyer?.surname),
                    ],
                  }),
                ],
                borders: {
                  top: { size: 0, color: "FFFFFF" },
                  bottom: { size: 0, color: "FFFFFF" },
                  left: { size: 0, color: "FFFFFF" },
                  right: { size: 0, color: "FFFFFF" },
                },
              }),
            ],
          }),
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { size: 0, color: "FFFFFF" },
          bottom: { size: 0, color: "FFFFFF" },
          left: { size: 0, color: "FFFFFF" },
          right: { size: 0, color: "FFFFFF" },
        },
      });
  
    // Создаём документ Word
    const doc = new Document({
      sections: [
        {
            properties: {
              page: {
                margin: pageMargins, // Устанавливаем поля страницы
              },
            },
            children: [
              // Содержимое документа
              ...header,
              ...locationAndDate,
              ...parties,
              table,
              ...mainTextAfterTable,
              signatureTable,
            ],
          },
        ],
      });
  
    return await Packer.toBlob(doc);
  };
  