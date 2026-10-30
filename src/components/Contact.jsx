import React, { useState } from "react";
import { contactData } from "../data/mock";
import { Mail, Github, Linkedin, Send, Instagram } from "lucide-react";
import toast from "react-hot-toast";
import SectionHeading from "./SectionHeading";

/* ── Contact Section ─────────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* ── Form handlers — preserved exactly from original ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    // mock success feedback
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="relative bg-black px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-container">
        <SectionHeading number="04." title="GET IN TOUCH" />

        {/* ── Two-column layout: info left / form right ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Left column: heading + blurb + social links ── */}
          <div className="flex flex-col gap-7">
            <h3 className="font-display text-[2rem] leading-[1.2] tracking-[1px] text-white md:text-[2.5rem]">
              Let&apos;s Work Together
            </h3>

            <p className="text-[1.05rem] leading-[1.75] text-[#A1A1AA] md:text-[1.1rem]">
              I&apos;m always open to discussing new ideas, projects, or learning
              opportunities. Whether you want to collaborate, build something from
              scratch, or just have a quick chat — feel free to reach out.
            </p>

            {/* Social / contact links */}
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contactData.email}`}
                className="contact-social-link"
                aria-label={`Send email to ${contactData.email}`}
              >
                <Mail size={20} aria-hidden="true" />
                <span className="break-all">{contactData.email}</span>
              </a>

              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <Github size={20} aria-hidden="true" />
                <span>GitHub</span>
              </a>

              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <Linkedin size={20} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>

              <a
                href={contactData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <Instagram size={20} aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* ── Right column: contact form ── */}
          <div className="border border-white/[0.06] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] md:p-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="contact-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="contact-input"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="contact-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  autoComplete="email"
                  className="contact-input"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="contact-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="contact-input min-h-[132px] resize-y"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary px-8 py-4 text-base font-semibold uppercase tracking-[1px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-primary hover:shadow-[0_10px_30px_rgba(226,54,54,0.3)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                <Send size={18} aria-hidden="true" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
