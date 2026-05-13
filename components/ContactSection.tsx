"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

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

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-background w-full"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--brand)]/10 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[var(--brand)]" />
            <span className="text-[var(--brand)] text-sm tracking-[0.2em] uppercase font-medium">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white leading-tight">
            {t("titleLine1")}
            <br />
            <span className="text-foreground/60 dark:text-white/40">{t("titleLine2")}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-foreground/70 dark:text-white/50 text-sm mb-2 font-medium">
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
                    className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/80 focus:outline-none focus:border-[var(--brand)]/60 transition-all duration-300"
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-foreground/70 dark:text-white/50 text-sm mb-2 font-medium">
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
                    className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/80 focus:outline-none focus:border-[var(--brand)]/60 transition-all duration-300"
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-foreground/70 dark:text-white/50 text-sm mb-2 font-medium">
                  {t("form.subjectLabel")}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/80 focus:outline-none focus:border-[var(--brand)]/60 transition-all duration-300"
                  placeholder={t("form.subjectPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-foreground/70 dark:text-white/50 text-sm mb-2 font-medium">
                  {t("form.messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/80 focus:outline-none focus:border-[var(--brand)]/60 transition-all duration-300 resize-none"
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
                className="w-full sm:w-auto px-10 py-4 text-sm font-semibold text-[var(--text-on-inverse)] bg-gradient-to-r from-[var(--brand)] to-[var(--brand-strong)] rounded-full hover:shadow-xl hover:shadow-[var(--brand)]/30 transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="space-y-6">
              {/* Phone */}
              <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-[var(--brand)]/30 transition-all duration-300 group">
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
              <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-[var(--brand)]/30 transition-all duration-300 group">
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
              <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-[var(--brand)]/30 transition-all duration-300 group">
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

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border h-[200px]">
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
