import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Link from "next/link";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-slate-600">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="mb-4">
            Welcome to Odd2Tips! These terms and conditions outline the rules
            and regulations for the use of our website.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing this website, we assume you accept these terms and
            conditions in full. Do not continue to use Odd2Tips if you do not
            accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">License</h2>
          <p className="mb-4">
            Unless otherwise stated, Odd2Tips and/or its licensors own the
            intellectual property rights for all material on Odd2Tips. All
            intellectual property rights are reserved. You may view and/or print
            pages from{" "}
            <Link href="/">
              {" "}
              <span className="underline">Odd2tips</span>{" "}
            </Link>{" "}
            for your own personal use subject to restrictions set in these terms
            and conditions.
          </p>
          <p className="mb-4">You must not:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Republish material from{" "}
              <Link href="/">
                {" "}
                <span className="underline">Odd2tips</span>{" "}
              </Link>
            </li>
            <li>
              Sell, rent or sub-license material from{" "}
              <Link href="/">
                {" "}
                <span className="underline">Odd2tips</span>{" "}
              </Link>
            </li>
            <li>
              Reproduce, duplicate or copy material from{" "}
              <Link href="/">
                {" "}
                <span className="underline">Odd2tips</span>{" "}
              </Link>
            </li>
            <li>
              Redistribute content from{" "}
              <Link href="/">
                {" "}
                <span className="underline">Odd2tips</span>{" "}
              </Link>{" "}
              (unless content is specifically made for redistribution).
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-4">User Comments</h2>
          <p className="mb-4">
            Certain parts of this website offer the opportunity for users to
            post and exchange opinions, information, material, and data
            (&apos;Comments&apos;). Odd2Tips does not screen, edit, publish or
            review Comments prior to their appearance on the website and
            Comments do not reflect the views or opinions of Odd2Tips, its
            agents, or affiliates. Comments reflect the view and opinion of the
            person who posts such view or opinion. To the extent permitted by
            applicable laws, Odd2Tips shall not be responsible or liable for the
            Comments or for any loss cost, liability, damages, or expenses
            caused and or suffered as a result of any use of and/or posting of
            and/or appearance of the Comments on this website.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Hyperlinking to our Content
          </h2>
          <p className="mb-4">
            The following organizations may link to our website without prior
            written approval:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors when they list us in the directory
              may link to our website in the same manner as they hyperlink to
              the websites of other listed businesses;
            </li>
            <li>
              Systemwide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our website.
            </li>
          </ul>
          <p className="mb-4">
            These organizations may link to our home page, to publications, or
            to other website information so long as the link: (a) is not in any
            way misleading; (b) does not falsely imply sponsorship, endorsement,
            or approval of the linking party and its products or services; and
            (c) fits within the context of the linking party&apos;s site.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Content Liability</h2>
          <p className="mb-4">
            We shall have no responsibility or liability for any content
            appearing on your website. You agree to indemnify and defend us
            against all claims arising out of or based upon your website. No
            link(s) may appear on any page on your website or within any context
            containing content or materials that may be interpreted as libelous,
            obscene, or criminal, or which infringes, otherwise violates, or
            advocates the infringement or other violation of, any third party
            rights.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Reservation of Rights
          </h2>
          <p className="mb-4">
            We reserve the right at any time and in its sole discretion to
            request that you remove all links or any particular link to our
            website. You agree to immediately remove all links to our website
            upon such request. We also reserve the right to amend these terms
            and conditions and its linking policy at any time. By continuing to
            link to our website, you agree to be bound to and abide by these
            linking terms and conditions.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Disclaimer</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website (including, without limitation, any
            warranties implied by law in respect of satisfactory quality,
            fitness for purpose, and/or the use of reasonable care and skill).
            Nothing in this disclaimer will:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Limit or exclude our or your liability for death or personal
              injury resulting from negligence;
            </li>
            <li>
              Limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </li>
            <li>
              Limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
            </li>
            <li>
              Exclude any of our or your liabilities that may not be excluded
              under applicable law.
            </li>
          </ul>
          <p className="mb-4">
            The limitations and exclusions of liability set out in this Section
            and elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the
            disclaimer or in relation to the subject matter of this disclaimer,
            including liabilities arising in contract, in tort (including
            negligence) and for breach of statutory duty.
          </p>
          <p className="mb-4">
            To the extent that the website and the information and services on
            the website are provided free of charge, we will not be liable for
            any loss or damage of any nature.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
