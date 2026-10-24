import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface LegalProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicy: React.FC<LegalProps> = ({ onNavigate }) => {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D0A3E]">
                Student & Parent Privacy Policy
              </h1>
              <p className="text-xs text-slate-500">
                City English School System (CESS) • Last updated October 2026
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              1. Information We Collect
            </h2>
            <p>
              City English School System collects relevant information necessary to process admission inquiries, maintain academic progress dossiers, issue examination roll numbers, manage school transportation, and ensure campus security. This data includes student names, NADRA B-Form/birth certificate details, parent contact numbers, email addresses, residential locations, and medical emergency advisories.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              2. Protection of Student Records
            </h2>
            <p>
              Under no circumstances does CESS sell, rent, or trade student records or parental contact directories to third-party marketing entities. Information is shared strictly with regulatory educational boards (such as the Board of Secondary Education Karachi, Cambridge Assessment International Education, or relevant educational secretariats) for examination certification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              3. Media & Photography Permissions
            </h2>
            <p>
              Photographs and video footage captured during school sports galas, science olympiads, and annual convocations may be featured in our official prospectus, annual magazine, and verified school social media to honor student achievements. Parents wishing to opt out may notify their campus principal in writing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#2D0A3E]">
              4. Contacting the Data Secretariat
            </h2>
            <p>
              If you have any questions or wish to review stored student records, please contact the Central Secretariat at <span className="text-[#8B0A8C] font-semibold">info@cess.edu.pk</span> or visit your respective campus administrative office.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
