"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  BrandGlow,
  SectionEyebrow,
  SectionHeading,
  SECTION_CARD_LIGHT,
  SECTION_PADDING,
} from "@/components/ui/section-decor";
import { cn } from "@/lib/utils";

const GOOGLE_MAP_EMBED_BASE =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.5!2d20.9167!3d44.0128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDAwJzQ2LjEiTiAyMMKwNTUnMDAuMSJF!5e0!3m2!1sen!2srs!4v1!5m2!1sen!2srs";

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapEmbedSrc = `${GOOGLE_MAP_EMBED_BASE}&hl=${locale}`;

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t("form.validation.nameRequired"));
      return false;
    }
    if (!formData.email.trim()) {
      toast.error(t("form.validation.emailRequired"));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      toast.error(t("form.validation.emailInvalid"));
      return false;
    }
    if (!formData.message.trim()) {
      toast.error(t("form.validation.messageRequired"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      const result = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !result.success) {
        toast.error(result.error || t("form.toasts.error"));
        return;
      }

      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      toast.success(t("form.toasts.success"));
    } catch {
      toast.error(t("form.toasts.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card/60 px-4 py-3.5 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] placeholder-muted-foreground/70 backdrop-blur-sm transition-all duration-300 focus:border-[var(--brand)]/60 focus:outline-none focus:ring-4 focus:ring-[var(--brand)]/15 dark:bg-white/[0.04] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

  return (
    <section
      id="contact"
      className={cn(
        "relative w-full overflow-hidden bg-background",
        SECTION_PADDING,
      )}
    >
      <BrandGlow
        size="xl"
        className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4"
        animated
      />
      <BrandGlow
        size="md"
        intensity="soft"
        className="-right-24 top-24"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <SectionEyebrow className="mb-6">{t("eyebrow")}</SectionEyebrow>
          <SectionHeading
            line1={t("titleLine1")}
            line2={t("titleLine2")}
            size="lg"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className={cn(SECTION_CARD_LIGHT, "p-6 md:p-8")}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-foreground/70 dark:text-white/60"
                  >
                    {t("form.nameLabel")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClass}
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-foreground/70 dark:text-white/60"
                  >
                    {t("form.emailLabel")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-foreground/70 dark:text-white/60"
                >
                  {t("form.subjectLabel")}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={inputClass}
                  placeholder={t("form.subjectPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-foreground/70 dark:text-white/60"
                >
                  {t("form.messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={cn(inputClass, "resize-none")}
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">{t("form.honeypotLabel")}</label>
                <input
                  id="contact-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--brand-solid)] px-10 py-4 text-sm font-semibold text-[var(--text-on-inverse)] shadow-lg shadow-[var(--brand)]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--brand-solid-hover)] hover:shadow-xl hover:shadow-[var(--brand)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)] disabled:opacity-70 sm:w-auto"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">
                  {isSubmitting ? t("form.submitting") : t("form.submit")}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="space-y-6">
              {/* Phone */}
              <div
                className={cn(
                  SECTION_CARD_LIGHT,
                  "group p-6 transition-all duration-300 hover:border-[var(--brand)]/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] flex-shrink-0 group-hover:bg-[var(--brand)]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-foreground dark:text-white font-semibold mb-2">{t("info.phoneTitle")}</h4>
                    <p className="text-foreground/70 dark:text-white/50 text-sm leading-relaxed">
                      {t("info.phoneLine1")}
                    </p>
                    <p className="text-foreground/70 dark:text-white/50 text-sm leading-relaxed">
                      {t("info.phoneLine2")}
                    </p>
                    <p className="text-foreground/70 dark:text-white/50 text-sm leading-relaxed">
                      {t("info.phoneLine3")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div
                className={cn(
                  SECTION_CARD_LIGHT,
                  "group p-6 transition-all duration-300 hover:border-[var(--brand)]/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] flex-shrink-0 group-hover:bg-[var(--brand)]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-foreground dark:text-white font-semibold mb-2">{t("info.emailTitle")}</h4>
                    <a
                      href="mailto:enterijerstil@gmail.com"
                      className="text-[var(--brand)] hover:text-[var(--brand-strong)] transition-colors text-sm"
                    >
                      enterijerstil@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div
                className={cn(
                  SECTION_CARD_LIGHT,
                  "group p-6 transition-all duration-300 hover:border-[var(--brand)]/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] flex-shrink-0 group-hover:bg-[var(--brand)]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-foreground dark:text-white font-semibold mb-2">{t("info.addressTitle")}</h4>
                    <p className="text-foreground/70 dark:text-white/50 text-sm leading-relaxed">
                      {t("info.addressLine1")}
                      <br />
                      {t("info.addressLine2")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div
                className={cn(
                  SECTION_CARD_LIGHT,
                  "h-[220px] overflow-hidden p-0",
                )}
              >
                <iframe
                  title={t("mapTitle")}
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  className="h-full w-full dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-125"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
