import React from 'react';
import { saveAs } from 'file-saver';
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
} from 'docx';

const DownloadWordButton = ({ content, tableData, contract, supplier, buyer, fileName = 'document.docx' }) => {
  const downloadWord = async () => {
    if (!tableData || tableData.length === 0) {
      console.error('Table data is empty or undefined');
      return;
    }

    const highlightIfEmpty = (text, isBold = false) => {
        return new TextRun({
          text: text || 'не указан(а)',
          size: 18, // Шрифт 18 (9pt)
          bold: isBold, 
          highlight: text ? undefined : 'yellow', 
        });
      };

    const header = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'ПРОТОКОЛ СОГЛАСОВАНИЯ РАЗНОГЛАСИЙ', bold: true, size: 18 }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'к договору поставки № ', size: 18 }), // Текст перед номером договора
          highlightIfEmpty(contract.contractNumber), // Динамическое выделение номера договора
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'и к протоколу разногласий Покупателя от ', size: 18 }), 
          highlightIfEmpty(contract.dateProtocol), 
        ],
      }),
      new Paragraph({
        spacing: { after: 50 },
      }),
    ];

    // Локация и даты
    const locationAndDate = [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: 'г. Москва', size: 18 })],
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
            highlightIfEmpty(contract.dateProtocol),
        ],
      }),
    ];

    // Поставщик и покупатель
    const parties = [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { firstLine: 720 },
        children: [new TextRun({ text: 'Поставщик: ООО "ИнтерметГрупп"', bold: true, size: 18 })],
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { firstLine: 720 },
        children: [
            new TextRun({ text: `Покупатель: `, bold: true, size: 18 }),
            highlightIfEmpty(buyer.name, true),
        ],
      }),
      new Paragraph({
        spacing: { before: 50, after: 50 },
      }),
    ];

    // Таблица данных
    const tableHeader = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '№ Пункта',  bold: true, size: 18 })], 
              }),
            ],
            width: { size: 7, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Редакция Поставщика',  bold: true, size: 18 })], 
              }),
            ],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Редакция Покупателя',  bold: true, size: 18 })], 
              }),
            ],
            width: { size: 16, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Согласованная редакция',  bold: true, size: 18 })],
              }),
            ],
            width: { size: 60, type: WidthType.PERCENTAGE },
          }),
        ],
      });

      const tableRows = tableData.map((row, index) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: row.section, size: 18 })], 
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: row.supplier || 'по тексту договора', size: 18 })], 
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: 'по тексту протокола разногласий', size: 18 })], 
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: row.customAgreed || row.agreed || 'по тексту протокола разногласий',
                      size: 18,
                    }),
                  ],
                }),
              ],
            }),
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
          indent: { firstLine: 720 }, // Красная строка (720 twips = 0.5 inch = 1.27 см)
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: 'Стороны договорились изложить вышеуказанные условия договора поставки № ',
              size: 18,
            }),
            highlightIfEmpty(contract.contractNumber), // Динамическое выделение номера договора
            new TextRun({
              text: ' г. в согласованной редакции. Все остальные условия договора, не затронутые настоящим протоколом согласования разногласий, остаются без изменений.',
              size: 18,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 720 }, // Красная строка (720 twips = 0.5 inch = 1.27 см)
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: 'Настоящий протокол согласования разногласий составлен в 2 экземплярах, имеющих одинаковую юридическую силу, и является неотъемлемой частью договора № ',
              size: 18,
            }),
            highlightIfEmpty(contract.contractNumber), // Динамическое выделение номера договора
            new TextRun({
              text: ' г., составлен в двух экземплярах, вступает в силу с момента подписания.',
              size: 18,
            }),
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
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Поставщик: ООО "ИнтерметГрупп"',
                        size: 18, // Шрифт 18
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                  new Paragraph({
                    children: [
                      highlightIfEmpty(supplier?.position), // Динамическое выделение должности
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 400 }, // Больший отступ перед фамилией
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `__________________`,
                        size: 18,
                      }),
                      highlightIfEmpty(supplier?.surname), // Динамическое выделение фамилии
                    ],
                    alignment: AlignmentType.LEFT,
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
                      new TextRun({
                        text: `Покупатель: `,
                        size: 18, // Шрифт 18
                      }),
                      highlightIfEmpty(buyer?.name), // Динамическое выделение имени покупателя
                    ],
                    alignment: AlignmentType.LEFT,
                  }),
                  new Paragraph({
                    children: [
                      highlightIfEmpty(buyer?.position), // Динамическое выделение должности
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 400 }, // Больший отступ перед фамилией
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `__________________`,
                        size: 18,
                      }),
                      highlightIfEmpty(buyer?.surname), // Динамическое выделение фамилии
                    ],
                    alignment: AlignmentType.LEFT,
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
        styles: {
            paragraphStyles: [
              {
                id: 'normalText',
                name: 'Normal Text',
                run: {
                  font: 'Times New Roman',
                  size: 18, // Устанавливаем размер 9pt по умолчанию
                },
              },
            ],
          },
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, right: 720, bottom: 720, left: 720 },
            },
          },
          children: [...header, ...locationAndDate, ...parties, table, ...mainTextAfterTable, signatureTable],
        },
      ],
    });

    // Генерация файла Word
    const blob = await Packer.toBlob(doc);

    // Сохраняем файл
    saveAs(blob, fileName);
  };

  return (
    <button
      onClick={downloadWord}
      className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
    >
      Скачать Word
    </button>
  );
};

export default DownloadWordButton;
