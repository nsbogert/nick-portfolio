import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '../layout/Section';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RESUME_URL = '/Nick_Bogert_Resume_20260210.pdf';

export default function ResumeSection() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState(false);

  return (
    <Section id="resume" title="Resume">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>

        {loadError ? (
          <div className="text-center py-12 text-text-secondary">
            <p>Unable to preview PDF.</p>
            <a
              href={RESUME_URL}
              download
              className="mt-2 inline-block text-primary-600 hover:underline"
            >
              Download directly
            </a>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-xl shadow-sm p-4 overflow-hidden">
            <Document
              file={RESUME_URL}
              onLoadSuccess={({ numPages: n }) => setNumPages(n)}
              onLoadError={() => setLoadError(true)}
              loading={
                <div className="text-center py-12 text-text-muted">Loading resume...</div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={Math.min(720, typeof window !== 'undefined' ? window.innerWidth - 80 : 720)}
                renderTextLayer
                renderAnnotationLayer
              />
            </Document>

            {numPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-text-secondary">
                  {pageNumber} / {numPages}
                </span>
                <button
                  onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
