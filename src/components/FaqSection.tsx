"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqList } from "@/data/faq";
import { cn } from "@/lib/utils";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-surface/50 border-t border-white/[0.06] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-300 uppercase tracking-widest mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-brand-pink" />
            Tire Suas Dúvidas
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            PERGUNTAS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              FREQUENTES.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Respostas claras para as principais dúvidas sobre o catálogo, liberação do acesso e formato das novelas.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl bg-surface-card border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-brand-pink/50 shadow-md bg-surface-elevated/90"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-white text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={cn(
                      "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-transform duration-300",
                      isOpen ? "rotate-180 bg-brand-pink/20 text-brand-pink border-brand-pink/40" : "text-slate-400"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

