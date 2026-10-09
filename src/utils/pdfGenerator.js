import html2pdf from 'html2pdf.js';

/**
 * Format candidate name into clean filename: [name]_resume.pdf
 * e.g., "Sanivada Rohith" -> "sanivada_rohith_resume.pdf"
 * e.g., "Rohit" -> "rohit_resume.pdf"
 */
export const getResumeFilename = (candidateName) => {
  const clean = (candidateName || 'candidate')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return `${clean || 'candidate'}_resume.pdf`;
};

/**
 * Download a DOM element as a formatted A4 PDF
 */
export const downloadElementAsPdf = async (element, filename = 'resume.pdf') => {
  if (!element) {
    console.error('downloadElementAsPdf: target element not found');
    return false;
  }

  const opt = {
    margin: [6, 6, 6, 6], // mm margins
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      scrollY: 0,
      scrollX: 0
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    const worker = html2pdf();
    await worker.set(opt).from(element).save();
    return true;
  } catch (err) {
    console.warn('html2pdf failed, falling back to window.print():', err);
    window.print();
    return false;
  }
};
