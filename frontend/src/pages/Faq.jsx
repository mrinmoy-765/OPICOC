import React from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const Faq = () => {
  const [search, setSearch] = React.useState("");

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        'Click the "Sign Up" button in the top right corner and follow the registration process.',
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
    {
      question: "How do I update my profile information?",
      answer:
        'Go to "My Account" settings and select "Edit Profile" to make changes.',
    },
    // ----------------
    {
      question: "What's the difference between packs?",
      answer: (
        <ul className="ml-6" style={{ listStyleType: "disc", padding: 0 }}>
          <li>Blue Packs: Monthly new bases, affordable.</li>
          <li>Essential Packs: Focused on CWL, Legend League, etc.</li>
          <li>Exclusive Packs: Limited, competitive bases.</li>
          <li>Limited Edition Packs: One-time, special meta bases.</li>
        </ul>
      ),
    },
    {
      question: "How often are packs updated?",
      answer: "Every 28th of the month.",
    },
    {
      question: "Can I order a custom base? ",
      answer:
        "Yes, via Custom Designs or TH15 Pro Designs Each is unique, tested, and made only for you.",
    },
    {
      question: "What's the wait time?",
      answer: (
        <ul className="ml-6" style={{ listStyleType: "disc", padding: 0 }}>
          <li>Custom Designs: 3-5 days</li>
          <li>Pro Designs: 4-8 days</li>
        </ul>
      ),
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Visa, MasterCard, Amex, Apple Pay, Google Pay, Shop Pay, Crypto, and Bank Transfer (via Discord).",
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Yes, within 24 hours of purchase.",
    },
    {
      question: "What is the BP Guarantee?",
      answer:
        "If your custom base gets 3-starred on the first try or shows weakness, we'll replace or adjust it (valid 10 days).",
    },
    {
      question: "Where do I get my bases?",
      answer: "Delivered via email or Discord.",
    },
    {
      question: "What is Patreon?",
      answer:
        "A subscription platform with tiers offering monthly base packs and perks.",
    },
    {
      question: "What's the wait time?",
      answer: (
        <ul className="ml-6" style={{ listStyleType: "disc", padding: 0 }}>
          <li>Website/Discord: Custom-made, exclusive, with guarantee.</li>
          <li>Patreon: Same pro quality but shared across subscribers.</li>
        </ul>
      ),
    },
    {
      question: "How do I cancel Patreon?",
      answer: "Through your Patreon account settings.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#201F31] px-10 pt-16 pb-8">
      <Link to="/">
        <MdArrowBack className="text-white font-semibold text-4xl mb-8" />
      </Link>

      <div className="bg-[#6B6B6B] lg:px-11 md:px-11 px-4 text-white rounded-2xl py-10">
        <h1 className="text-3xl py-5">FAQ's</h1>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full mb-6 text-gray-800"
        />

        {filteredFaqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-[#6B6B6B]">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
