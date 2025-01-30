import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = vfsFonts.pdfMake ? vfsFonts.pdfMake.vfs : vfsFonts.vfs;

const generatePrescriptionPdf = (prescription) => {
  const docDefinition = {
    content: [
      { text: 'Prescription', style: 'header', alignment: 'center' },
      { text: `Date: ${new Date(prescription.date).toLocaleDateString()}`, style: 'subheader', alignment: 'right' },
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Patient Information', style: 'columnHeader' },
              { text: `Name: ${prescription.patient.name}` },
              { text: `Age: ${prescription.patient.age}` },
              { text: `Gender: ${prescription.patient.gender}` },
              { text: `Weight: ${prescription.patient.weight}` },
            ]
          },
          {
            width: 1,
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 100,
                lineWidth: 1,
              }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Doctor Information', style: 'columnHeader' },
              { text: `Name: ${prescription.doctor.name}` },
              { text: `Reg. No: ${prescription.doctor.registrationNo}` },
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 20]
      },
      { text: 'Vitals:', style: 'subheader' },
      { text: `Blood Pressure: ${prescription.vitals.bp}` },
      { text: `Temperature: ${prescription.vitals.temp}` },
      { text: `Heart Rate: ${prescription.vitals.heartRate} bpm` },
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5 }] },
      { text: 'Symptoms:', style: 'subheader' },
      ...prescription.symptoms.map((symptom) => ({ text: symptom })),
      { text: 'Diagnosis:', style: 'subheader' },
      { text: prescription.diagnosis },
      { text: 'Allergies:', style: 'subheader' },
      { text: prescription.allergies },
      { text: 'Prescription:', style: 'subheader' },
      ...prescription.prescription.map((med) => ({
        text: `${med.medicine} - ${med.dosage}, ${med.frequency}, ${med.duration}, ${med.instructions}`
      })),
      { text: 'Lifestyle Recommendations:', style: 'subheader' },
      ...prescription.lifestyleRecommendations.map((rec) => ({ text: rec })),
      { text: 'Recommended Tests:', style: 'subheader' },
      ...prescription.recommendedTests.map((test) => ({ text: test })),
      { text: 'Follow Up:', style: 'subheader' },
      { text: prescription.followUp },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      columnHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    }
  };

  pdfMake.createPdf(docDefinition).download(`prescription_${new Date(prescription.date).toLocaleDateString()}.pdf`);
};

export default generatePrescriptionPdf;
