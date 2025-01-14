import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Generate and download a styled emission report.
 * @param {Array} emissionData - The data to include in the report.
 * @param {String} companyName - The name of the company to display in the report.
 */
const generateEmissionReport = (emissionData, companyName) => {
  const doc = new jsPDF();

  // Calculate page width for centering
  const pageWidth = doc.internal.pageSize.width;

  // Report Title (Centered)
  doc.setFontSize(18);
  const titleWidth = doc.getTextWidth(companyName);
  doc.text(companyName, (pageWidth - titleWidth) / 2, 20);

  // Subtitle: "Emission Report" (Centered)
  doc.setFontSize(14);
  const subtitle = "Emission Report";
  const subtitleWidth = doc.getTextWidth(subtitle);
  doc.text(subtitle, (pageWidth - subtitleWidth) / 2, 30);

  // Generated On: Top-Right
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth - 60, 10);

  // Table Columns
  const columns = [
    { header: "Start Date", dataKey: "startDate" },
    { header: "End Date", dataKey: "endDate" },
    { header: "Consumed Data", dataKey: "consumedData" },
    { header: "Assessment Type", dataKey: "assessmentType" },
    { header: "Period", dataKey: "periodOfDate" },
    { header: "Comments", dataKey: "comments" },
    { header: "Fuel Supplier", dataKey: "fuelSupplier" },
    { header: "Emission CO2", dataKey: "emissionCO2" },
    { header: "Emission CH4", dataKey: "emissionCH4" },
    { header: "Emission N2O", dataKey: "emissionN2O" },
    { header: "Emission CO2e", dataKey: "emissionCO2e" },
    { header: "Standards", dataKey: "standards" },
  ];

  // Adjusted column widths
  const styles = {
    columnStyles: {
      startDate: { cellWidth: 25 },
      endDate: { cellWidth: 25 },
      consumedData: { cellWidth: 30 },
      assessmentType: { cellWidth: 30 },
      periodOfDate: { cellWidth: 25 },
      comments: { cellWidth: 40 },
      fuelSupplier: { cellWidth: 40 },
      emissionCO2: { cellWidth: 30 },
      emissionCH4: { cellWidth: 30 },
      emissionN2O: { cellWidth: 30 },
      emissionCO2e: { cellWidth: 30 },
      standards: { cellWidth: 30 },
    },
  };

  // Add Table
  doc.autoTable({
    columns,
    body: emissionData,
    startY: 50,
    theme: "grid",
    headStyles: { fillColor: [0, 102, 204] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 10 },
    styles,
  });

  // Footer
  doc.setFontSize(10);
  doc.text(
    "This is a system-generated report ",
    14,
    doc.internal.pageSize.height - 10
  );

  // Save the PDF
  doc.save("emission-report.pdf");
};

export default generateEmissionReport;
