import React, { useState } from "react";
import { contactData } from "../data/mock";
import { Mail, Github, Linkedin, Twitter, Send, Instagram } from "lucide-react";
import toast from "react-hot-toast";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">04.</span>
            GET IN TOUCH
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-heading">
              Let’s Work Together
            </h3>

            <p className="contact-description">
              I’m always open to discussing new ideas, projects, or learning opportunities.
              Whether you want to collaborate, build something from scratch, or just have a quick chat — feel free to reach out.
            </p>

            <div className="contact-links">
              <a
                href={`mailto:${contactData.email}`}
                className="contact-link-item"
              >
                <Mail size={20} />
                <span>{contactData.email}</span>
              </a>

              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>

              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>

              <a
                href={contactData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="submit-button">
                <Send size={18} />
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
