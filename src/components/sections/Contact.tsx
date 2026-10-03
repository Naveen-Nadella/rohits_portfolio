import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { RedSeal } from '../common/RedSeal';
import { personalData } from '../../data/personal';
import { soundEngine } from '../../utils/audio';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { Mail, Phone, Send, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundEngine.playChime(396, 1.2);

    // Emulate transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <KanjiWatermark char="06" position="top-left" opacity={0.02} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          sealCode="06"
          chapterNumber="CHAPTER 06"
          title="BEGIN A NEW CHAPTER"
          subtitle="Open to software engineering opportunities, web development projects, and technical collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Inscribed Channels in Black & White */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#09090B] border border-white/15 rounded-sm p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <RedSeal char="SR" size="md" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    DIRECT CHANNELS
                  </h3>
                  <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider block">
                    Immediate Inscriptions
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email Dispatch Channel */}
                <div className="p-4 bg-[#121214] border border-white/10 rounded-sm">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] flex items-center gap-1.5 mb-1">
                    <Mail size={12} className="text-white" />
                    ELECTRONIC MAIL
                  </span>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="font-serif text-sm sm:text-base font-bold text-white hover:text-[#A1A1AA] transition-colors break-all"
                  >
                    {personalData.email}
                  </a>
                </div>

                {/* Telephone Channel */}
                <div className="p-4 bg-[#121214] border border-white/10 rounded-sm">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] flex items-center gap-1.5 mb-1">
                    <Phone size={12} className="text-white" />
                    VOICE CONTACT
                  </span>
                  <a
                    href={`tel:${personalData.phone}`}
                    className="font-serif text-sm sm:text-base font-bold text-white hover:text-[#A1A1AA] transition-colors"
                  >
                    {personalData.phone}
                  </a>
                </div>

                {/* Professional Networks */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#121214] border border-white/10 hover:border-white rounded-sm flex items-center gap-2 text-xs font-serif font-bold text-white transition-colors"
                  >
                    <LinkedinIcon size={16} className="text-white" />
                    <span>LINKEDIN</span>
                  </a>

                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#121214] border border-white/10 hover:border-white rounded-sm flex items-center gap-2 text-xs font-serif font-bold text-white transition-colors"
                  >
                    <GithubIcon size={16} className="text-white" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="p-5 bg-[#09090B] border border-white/15 rounded-sm text-xs text-[#A1A1AA] space-y-2">
              <div className="flex items-center gap-2 text-white font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>AVAILABILITY: OPEN FOR OPPORTUNITIES</span>
              </div>
              <p className="font-editorial">
                Based in India. Available for software engineering internships, frontend development projects, and technical collaborations worldwide.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Scroll Message Form */}
          <div className="lg:col-span-7 bg-[#09090B] border border-white/20 rounded-sm p-6 sm:p-10 shadow-2xl parchment-texture relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <div className="mb-6">
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest block">
                COMMUNIQUE TRANSMISSION
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                Dispatch an Inscription
              </h3>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-[#121214] border-2 border-white mx-auto flex items-center justify-center text-white">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">
                  COMMUNIQUE RECORDED
                </h4>
                <p className="text-sm text-[#A1A1AA] font-editorial max-w-md mx-auto">
                  Thank you for reaching out. Your dispatch has been inscribed and will be answered promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif tracking-wider uppercase text-[#A1A1AA] mb-1.5">
                      YOUR NAME / SENDER *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Recruiter / Collaborator"
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-white/15 focus:border-white text-white text-xs font-sans rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif tracking-wider uppercase text-[#A1A1AA] mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. recruiter@enterprise.com"
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-white/15 focus:border-white text-white text-xs font-sans rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif tracking-wider uppercase text-[#A1A1AA] mb-1.5">
                    SUBJECT / PURPOSE
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Software Engineering Opportunity"
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-white/15 focus:border-white text-white text-xs font-sans rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif tracking-wider uppercase text-[#A1A1AA] mb-1.5">
                    MESSAGE / INSCRIBED INQUIRY *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Inscribe your inquiry, project scope, or opportunity details..."
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-white/15 focus:border-white text-white text-xs font-sans rounded-sm focus:outline-none focus:ring-1 focus:ring-white resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-white hover:bg-[#E4E4E7] text-black font-serif text-sm tracking-widest uppercase font-bold rounded-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-black" />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'DISPATCH MESSAGE'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
