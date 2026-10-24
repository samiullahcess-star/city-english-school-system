import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface LegalProps {
  onNavigate: (page: string) => void;
}

export const TermsPage: React.FC<LegalProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F7F3F9] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B0A8C] hover:text-[#2D0A3E] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100 space-y-6 text-slate-700 leading-relaxed text-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-purple-100">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D0A3E]">
                Terms of Admission & Code of Conduct
              </h1>
              <p className="text-xs text-slate-500">
                City English School System (CESS) • Academic Guidelines
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              1. Admission & Academic Standards
            </h2>
            <p>
              Admission to City English School System is merit-based and subject to clearance of the diagnostic entrance assessment and verification of authentic previous educational credentials. The school reserves the right to determine class placement based on developmental readiness.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              2. Student Discipline & Moral Ethics
            </h2>
            <p>
              CESS is deeply committed to character formation, mutual respect, and courteous manners. Bullying, indiscipline, disrespect toward educators or peers, or breach of school uniform decorum will invoke disciplinary reviews.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              3. Attendance & Examination Protocol
            </h2>
            <p>
              A minimum of 85% attendance across terms is mandatory for student eligibility in Board (BISE) and Cambridge (CAIE) examinations. Regular participation in morning assemblies, term diagnostics, and co-curricular programs is mandatory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              4. Fee Payments & Concessions
            </h2>
            <p>
              Monthly fee dues must be deposited by the designated banking deadline stated on the official voucher. Merit scholarships are maintained contingent on students securing 90%+ marks in internal and board examinations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
