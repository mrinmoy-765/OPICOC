import React from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#201F31] px-10 pt-16 pb-8">
      <Link to="/">
        <MdArrowBack className="text-white font-semibold text-4xl mb-8" />
      </Link>

      <div className="bg-[#6B6B6B] px-11 text-white rounded-2xl py-10">
        <h1 className="text-3xl py-5">Privacy Policy</h1>

        <span className="lg:text-lg md:text-lg text-md">
          This Privacy Policy explains how we collect, use, and protect your
          information when you visit or make purchases on our website. By using
          our website, you agree to the terms described in this Privacy Policy.
        </span>

        <div className="lg:text-lg md:text-lg text-md  mt-8 text-md">
          <p className="text-xl">1. Information We Collect</p>
          <p className="ml-3.5">a. Personal Information</p>
          <p className="ml-3.5">
            We may collect the following personal details when you make a
            purchase or contact us:
          </p>
          <ul className="ml-10" style={{ listStyleType: "disc", padding: 0 }}>
            <li>Name</li>
            <li>Email address</li>
            <li>
              Payment information (processed securely through third-party
              payment gateways)
            </li>
            <li>Contact details (if provided)</li>
          </ul>
          {/*  */}
          <p className="ml-3.5">b. Non-Personal Information</p>
          <p className="ml-3.5">We also collect non-personal data such as:</p>
          <ul className="ml-10" style={{ listStyleType: "disc", padding: 0 }}>
            <li>
              Device information (browser type, IP address, operating system)
            </li>
            <li>Usage data (pages visited, time spent, clicks)</li>
          </ul>
          {/*  */}
          <p className="text-xl mt-7">2. How We Use Your Information</p>
          <p className="ml-3.5">We use your information to:</p>
          <ul className="ml-10" style={{ listStyleType: "disc", padding: 0 }}>
            <li>Process orders and deliver digital COC bases</li>
            <li>Provide customer support</li>
            <li>Improve website performance and user experience</li>
            <li>Send order updates or important notifications</li>
            <li>Detect and prevent fraud or unauthorized access</li>
          </ul>
          <p>
            We do not sell or share your personal information with third parties
            for marketing purposes.
          </p>
          {/*  */}
          <p className="text-xl mt-7">3. Cookies & Tracking Technologies</p>
          <p className="ml-3.5">We use cookies and similar technologies to:</p>
          <ul className="ml-10" style={{ listStyleType: "disc", padding: 0 }}>
            <li>Remember your preferences</li>
            <li>Improve loading speed and user experience</li>
            <li>Improve website performance and user experience</li>
            <li>Analyze traffic and website performance</li>
          </ul>
          <p>
            You can disable cookies through your browser settings, but some
            features may not work correctly.
          </p>
        </div>

        <div className="text-lg pt-10 ml-4">
          “For any questions or concerns, contact us at support@opicoc.cc.”
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
