import React from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="bg-[#201F31] px-10 pt-16 pb-8">
      <Link to="/">
        <MdArrowBack className="text-white font-semibold text-4xl mb-8" />
      </Link>

      <div className="bg-[#6B6B6B] lg:px-11 md:px-11 px-4 text-white rounded-2xl py-10">
        <h1 className="text-2xl py-5">Terms & Conditions</h1>

        <div className="lg:text-lg md:text-lg text-md space-y-5">
          <p>
            1.“By accessing and using this website, you agree to be bound by
            these Terms and Conditions. If you do not agree, please do not use
            our services.”
          </p>
          <p>
            2. All prices are listed in USD. Payments must be completed before
            delivery. Refunds are not available once login details have been
            delivered unless otherwise stated.
          </p>
          <p>
            3.“We are not responsible for any damages, losses, or bans that
            occur after the transfer of ownership. All transactions are at your
            own risk.”
          </p>
          <p>
            4.“Users must not engage in fraudulent behavior. Any attempt to scam
            or manipulate another user will result in permanent suspension.”
          </p>
          <p>
            5.“We reserve the right to modify these Terms and Conditions at any
            time. Continued use of the site means you accept the updated
            version.”
          </p>
        </div>

        <div className="lg:text-lg md:text-lg pt-10 ml-4 text-sm/6">
          “For any questions or concerns, contact us at support@opicoc.cc.”
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
