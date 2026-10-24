import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Calendar,
  Sparkles,
  ShieldCheck,
  Send,
  Building2,
  GraduationCap,
  Clock,
  Search,
  Calculator,
  Printer,
  Table,
  Check,
  Percent
} from 'lucide-react';
import { FAQ, Campus } from '../types';
import { dataService } from '../services/dataService';

interface AdmissionsPageProps {
  campuses: Campus[];
  faqs: FAQ[];
  initialCampus?: string;
  initialClass?: string;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  campuses,
  faqs,
  initialCampus = '',
  initialClass = ''
}) => {
  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    classApplyingFor: initialClass || 'Class 1 (Primary)',
    preferredCampus: initialCampus || (campuses[0]?.name || 'Main Campus (Central)'),
    previousSchool: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  // Fee Calculator State
  const [calcLevel, setCalcLevel] = useState('primary');
  const [calcSiblings, setCalcSiblings] = useState(0);
  const [calcMerit, setCalcMerit] = useState('none');

  const feeTable: Record<string, { name: string; monthly: number; lab: number; admissionOneTime: number }> = {
    preschool: { name: 'Montessori Pre-School', monthly: 9500, lab: 500, admissionOneTime: 15000 },
    primary: { name: 'Primary School (Grades 1-5)', monthly: 11500, lab: 800, admissionOneTime: 18000 },
    middle: { name: 'Middle School (Grades 6-8)', monthly: 13500, lab: 1200, admissionOneTime: 20000 },
    matric: { name: 'Secondary Matric (Grades 9-10)', monthly: 15500, lab: 1500, admissionOneTime: 22000 },
    olevel: { name: 'Cambridge O-Levels (CAIE)', monthly: 18500, lab: 2000, admissionOneTime: 25000 }
  };

  const selectedFee = feeTable[calcLevel] || feeTable.primary;
  const siblingDiscountPct = calcSiblings === 1 ? 0.20 : calcSiblings >= 2 ? 0.25 : 0;
  const meritDiscountPct = calcMerit === '90plus' ? 0.50 : calcMerit === 'topper' ? 1.0 : calcMerit === '80plus' ? 0.20 : 0;
  const totalDiscountPct = Math.min(1.0, siblingDiscountPct + meritDiscountPct);
  const discountedTuition = Math.round(selectedFee.monthly * (1 - totalDiscountPct));
  const estimatedNetMonthly = discountedTuition + selectedFee.lab;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.phone) return;

    const newInq = dataService.createInquiry({
      studentName: formData.studentName,
      parentName: formData.parentName,
      email: formData.email,
      phone: formData.phone,
      classApplyingFor: formData.classApplyingFor,
      preferredCampus: formData.preferredCampus,
      previousSchool: formData.previousSchool,
      message: formData.message
    });

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setSubmittedData({ ...newInq });
    setInquiryRef(newInq.id.toUpperCase());
    setSubmitted(true);
    // Reset form
    setFormData({
      studentName: '',
      parentName: '',
      email: '',
      phone: '',
      classApplyingFor: 'Class 1 (Primary)',
      preferredCampus: campuses[0]?.name || 'Main Campus (Central)',
      previousSchool: '',
      message: ''
    });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const steps = [
    {
      num: '01',
      title: 'Online Inquiry or Secretariat Registration',
      desc: 'Submit the electronic inquiry form below or visit any CESS campus admission office to collect an admission prospectus kit.'
    },
    {
      num: '02',
      title: 'Diagnostic Campus Assessment & Interaction',
      desc: 'Age-appropriate diagnostic evaluation covering basic English, Mathematics, and Urdu aptitude, followed by a warm parent consultation.'
    },
    {
      num: '03',
      title: 'Document Verification & Provisional Offer',
      desc: 'Submission of birth certificate, previous school records, and photographs. Receipt of provisional admission acceptance.'
    },
    {
      num: '04',
      title: 'Enrollment Confirmation & Student Welcome',
      desc: 'Payment of nominal admission fee dues, issuance of student ID, uniform schedule, and welcome orientation packet.'
    }
  ];

  const eligibilityMatrix = [
    {
      level: 'Pre-School Montessori',
      grades: 'Playgroup to Kindergarten',
      age: '2.5 to 5.5 Years',
      prerequisites: 'Developmental readiness & parent interview',
      tests: 'Sensory observation, shapes, and speech interaction'
    },
    {
      level: 'Primary Wing',
      grades: 'Classes 1 to 5',
      age: '5.5 to 10.5 Years',
      prerequisites: 'Passed prior grade with min. 60%',
      tests: 'English Reading/Writing, Mental Math, and Urdu basics'
    },
    {
      level: 'Middle School',
      grades: 'Classes 6 to 8',
      age: '11 to 13.5 Years',
      prerequisites: 'Passed prior grade with min. 65%',
      tests: 'English Grammar, General Mathematics, General Science'
    },
    {
      level: 'Secondary Matric',
      grades: 'Classes 9 & 10',
      age: '14 to 16.5 Years',
      prerequisites: 'Class 8 clearance with min. 70%',
      tests: 'Physics, Chemistry/Bio, Mathematics, and English'
    },
    {
      level: 'Cambridge O-Levels',
      grades: 'O1 & O2 (CAIE IGCSE)',
      age: '14 to 17 Years',
      prerequisites: 'Class 8 / O-Level checkpoint with 75%+',
      tests: 'English Comprehension, Math D, Integrated Sciences'
    }
  ];

  const requiredDocuments = [
    '4 Recent Passport-Size Photographs with blue background',
    'Copy of NADRA B-Form or Original Birth Certificate',
    'Copy of CNIC of Father / Mother / Legal Guardian',
    'Previous School Leaving Certificate (SLC) / Report Card (Grade 1 onwards)',
    'Vaccination Record / Blood Group Certificate',
    'Migration Certificate (for out-of-board Secondary / Matric admissions)'
  ];

  const importantDates = [
    { event: 'Online Admission Portal Opens', date: 'October 1, 2026', status: 'Active Now' },
    { event: 'Early Bird Sibling Concession Closes', date: 'November 30, 2026', status: 'Upcoming' },
    { event: 'Inter-Campus Diagnostic Entry Tests', date: 'December 12 - 15, 2026', status: 'Scheduled' },
    { event: 'First Merit List Publication', date: 'December 22, 2026', status: 'Scheduled' },
    { event: 'Orientation & Academic Session Start', date: 'January 2027', status: 'Upcoming' }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Page Header */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Academic Session 2026-27</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Admissions & Enrollment
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Join a 35+ year legacy of academic distinction, moral virtue, and modern discovery across 4 campuses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 4-Step Process Strip */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              Transparent & Simple
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#2D0A3E]">
              4-Step Admission Journey
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-xs border border-purple-100 flex flex-col justify-between relative group hover:border-[#8B0A8C] transition-all"
              >
                <div className="space-y-3">
                  <div className="text-3xl font-heading font-black text-[#FFC107] group-hover:text-[#8B0A8C] transition-colors">
                    {st.num}
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#2D0A3E]">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Criteria Matrix Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-purple-100 space-y-6">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-[#8B0A8C]" />
            <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
              Standard Eligibility & Age Criteria Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Official guidelines for admission across each academic tier for the upcoming academic session.
          </p>

          <div className="overflow-x-auto rounded-xl border border-purple-100">
            <div className="md:hidden text-[10px] text-slate-500 py-1.5 px-3 bg-purple-50/70 text-center font-medium border-b border-purple-100">
              ← Swipe horizontally to inspect all age criteria & subjects →
            </div>
            <table className="w-full text-left text-xs min-w-[640px]">
              <thead className="bg-[#2D0A3E] text-white uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Academic Level</th>
                  <th className="p-3.5">Classes Included</th>
                  <th className="p-3.5">Age Bracket</th>
                  <th className="p-3.5">Prior Academic Merit</th>
                  <th className="p-3.5">Diagnostic Assessment Subjects</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-slate-700">
                {eligibilityMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/40 transition-colors">
                    <td className="p-3.5 font-heading font-bold text-[#2D0A3E] whitespace-nowrap">
                      {item.level}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      {item.grades}
                    </td>
                    <td className="p-3.5 font-mono text-[#8B0A8C] font-semibold whitespace-nowrap">
                      {item.age}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {item.prerequisites}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <span className="inline-block bg-purple-50 text-purple-900 px-2 py-0.5 rounded-sm">
                        {item.tests}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Structure & Live Scholarship Calculator */}
        <div className="bg-linear-to-br from-purple-950 via-[#2D0A3E] to-[#4A0D5B] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-bold uppercase">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Fee Estimator</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                Fee Structure & Sibling Scholarship Calculator
              </h3>
            </div>
            <span className="text-xs text-purple-200">
              Session 2026-27 Approved Vouchers
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1.5">
                  Select Student Grade / Program:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'preschool', label: 'Montessori Pre-School' },
                    { id: 'primary', label: 'Primary (Grades 1-5)' },
                    { id: 'middle', label: 'Middle (Grades 6-8)' },
                    { id: 'matric', label: 'Secondary Matric (9-10)' },
                    { id: 'olevel', label: 'Cambridge O-Levels' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setCalcLevel(lvl.id)}
                      className={`p-2.5 rounded-xl border font-semibold text-left transition-all ${
                        calcLevel === lvl.id
                          ? 'bg-[#FFC107] text-[#2D0A3E] border-[#FFC107] font-bold shadow-md'
                          : 'bg-white/10 text-purple-100 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1.5">
                    Sibling Enrolled in CESS:
                  </label>
                  <select
                    value={calcSiblings}
                    onChange={(e) => setCalcSiblings(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl bg-purple-900/60 border border-purple-700 text-white focus:outline-hidden"
                  >
                    <option value={0}>No Sibling (Standard)</option>
                    <option value={1}>1 Sibling (20% Off Second Child)</option>
                    <option value={2}>2+ Siblings (25% Off Third Child)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1.5">
                    Merit Score Bracket:
                  </label>
                  <select
                    value={calcMerit}
                    onChange={(e) => setCalcMerit(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-purple-900/60 border border-purple-700 text-white focus:outline-hidden"
                  >
                    <option value="none">Standard Academic Entry</option>
                    <option value="80plus">80% - 89% in Prior Board (20% Waiver)</option>
                    <option value="90plus">90%+ Board Achiever (50% Waiver)</option>
                    <option value="topper">Board Position Holder (100% Tuition Free)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculated Breakdown Box */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider">
                Monthly Breakdown: {selectedFee.name}
              </div>

              <div className="space-y-2 text-xs text-purple-100">
                <div className="flex justify-between">
                  <span>Standard Monthly Tuition:</span>
                  <span className="font-mono">Rs. {selectedFee.monthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Science / STEM Labs Fee:</span>
                  <span className="font-mono">Rs. {selectedFee.lab.toLocaleString()}</span>
                </div>

                {totalDiscountPct > 0 && (
                  <div className="flex justify-between text-emerald-300 font-bold">
                    <span>Scholarship / Sibling Concession ({Math.round(totalDiscountPct * 100)}%):</span>
                    <span className="font-mono">- Rs. {Math.round(selectedFee.monthly * totalDiscountPct).toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-purple-700 flex justify-between text-sm font-extrabold text-white">
                  <span>Estimated Net Monthly:</span>
                  <span className="text-[#FFC107] text-base font-mono">
                    Rs. {estimatedNetMonthly.toLocaleString()}
                  </span>
                </div>

                <div className="text-[10px] text-purple-300 pt-1">
                  One-time Admission Dues: Rs. {selectedFee.admissionOneTime.toLocaleString()} (Includes registration, identity cards, and library deposit).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form and Document Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Online Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-purple-100">
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8B0A8C] text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Quick Online Registration</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
                Online Admission Inquiry Form
              </h3>
              <p className="text-xs text-slate-500">
                Fill in the details below. Our admissions coordinator will contact you within 24 hours to schedule the campus tour and interaction.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-xl text-emerald-900">
                  Admission Inquiry Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you for choosing City English School System. Your official inquiry tracking reference is:
                </p>
                <div className="inline-block px-5 py-2.5 rounded-xl bg-white border border-emerald-300 font-mono font-extrabold text-base text-emerald-900 shadow-sm">
                  {inquiryRef}
                </div>
                
                {submittedData && (
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 text-left text-xs space-y-1.5 max-w-md mx-auto text-slate-700">
                    <div className="font-bold text-[#2D0A3E] border-b pb-1">Official Slip Summary:</div>
                    <div><strong>Applicant:</strong> {submittedData.studentName}</div>
                    <div><strong>Parent:</strong> {submittedData.parentName}</div>
                    <div><strong>Class:</strong> {submittedData.classApplyingFor}</div>
                    <div><strong>Campus:</strong> {submittedData.preferredCampus}</div>
                    <div><strong>Phone:</strong> {submittedData.phone}</div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handlePrintSlip}
                    className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#8B0A8C]" />
                    <span>Print Registration Slip</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded-xl font-heading font-semibold text-xs text-[#8B0A8C] bg-white border border-purple-200 hover:bg-purple-50 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Rayyan Asif"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Muhammad Asif"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. parent@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Grade / Class Applying For *
                    </label>
                    <select
                      value={formData.classApplyingFor}
                      onChange={(e) => setFormData({ ...formData, classApplyingFor: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-white"
                    >
                      <option>Playgroup (Montessori)</option>
                      <option>Nursery (Montessori)</option>
                      <option>Kindergarten (Montessori)</option>
                      <option>Class 1 (Primary)</option>
                      <option>Class 2 (Primary)</option>
                      <option>Class 3 (Primary)</option>
                      <option>Class 4 (Primary)</option>
                      <option>Class 5 (Primary)</option>
                      <option>Class 6 (Middle)</option>
                      <option>Class 7 (Middle)</option>
                      <option>Class 8 (Middle)</option>
                      <option>Class 9 (Matric Science)</option>
                      <option>Class 9 (Matric Computer)</option>
                      <option>Class 10 (Matric)</option>
                      <option>Cambridge O-Level (Grade 9)</option>
                      <option>Cambridge O-Level (Grade 10)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred CESS Campus *
                    </label>
                    <select
                      value={formData.preferredCampus}
                      onChange={(e) => setFormData({ ...formData, preferredCampus: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-white"
                    >
                      {campuses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Previous School (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="Name of current school or institution"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Inquiries, Siblings or Comments
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific questions regarding transport, fee concessions, or academic stream?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#8B0A8C]" />
                  <span>Submit Admission Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Required Documents & Fee Note (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Required Documents */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8B0A8C]" />
                <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                  Required Documents Checklist
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#8B0A8C] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee Structure Note & Scholarships */}
            <div className="bg-linear-to-br from-purple-900 to-[#2D0A3E] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-purple-800 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Merit & Welfare Policy</span>
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                Affordable Fee & Scholarship Grants
              </h4>
              <p className="text-xs text-purple-200 leading-relaxed">
                City English School System is committed to accessible excellence. Our fee vouchers are standardized with zero hidden surcharges.
              </p>
              <div className="space-y-2 text-xs text-purple-100 pt-1">
                <div className="p-2 rounded-lg bg-white/10 flex items-center justify-between">
                  <span>Board 90%+ Achievers:</span>
                  <span className="font-bold text-[#FFC107]">Up to 100% Tuition Waiver</span>
                </div>
                <div className="p-2 rounded-lg bg-white/10 flex items-center justify-between">
                  <span>Sibling Concession:</span>
                  <span className="font-bold text-[#FFC107]">20% Off Second Child</span>
                </div>
                <div className="p-2 rounded-lg bg-white/10 flex items-center justify-between">
                  <span>Orphan / Welfare Quota:</span>
                  <span className="font-bold text-[#FFC107]">Special Welfare Fund</span>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FFC107]" />
                <h4 className="font-heading font-bold text-lg text-[#2D0A3E]">
                  Important Dates
                </h4>
              </div>
              <div className="divide-y divide-purple-50 text-xs">
                {importantDates.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2D0A3E]">{item.event}</div>
                      <div className="text-slate-500 text-[11px]">{item.date}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#8B0A8C]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-purple-100 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B0A8C] uppercase">
                <HelpCircle className="w-4 h-4 text-[#FFC107]" />
                <span>Got Questions?</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
                Frequently Asked Questions
              </h3>
            </div>

            {/* FAQ Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions or topics..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-purple-100 text-xs focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-purple-100 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-purple-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-purple-100 text-[#8B0A8C]">
                        {faq.category}
                      </span>
                      <h4 className="font-heading font-semibold text-sm sm:text-base text-[#2D0A3E]">
                        {faq.question}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#8B0A8C]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 border-t border-purple-50 bg-[#F7F3F9]/40 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
