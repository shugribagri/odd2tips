import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Link from "next/link";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-slate-600">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4">
            Welcome to our Privacy Policy page. We value your privacy and are
            committed to protecting your personal data. This Privacy Policy
            outlines how we collect, use, and protect your information.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Information We Collect
          </h2>
          <p className="mb-4">
            We collect various types of information in connection with the
            services we provide, including:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Personal identification information (Name, email address, phone
              number, etc.)
            </li>
            <li>
              Log data (IP address, browser type, date and time of visit, etc.)
            </li>
            <li>Cookies and usage data</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>
              To allow you to participate in interactive features of our service
              when you choose to do so
            </li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our service
            </li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-4">Cookies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track the
            activity on our service and hold certain information. You can
            instruct your browser to refuse all cookies or to indicate when a
            cookie is being sent.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Third-Party Services</h2>
          <p className="mb-4">
            We may employ third-party companies and individuals to facilitate
            our service, provide the service on our behalf, perform
            service-related services, or assist us in analyzing how our service
            is used. These third parties have access to your personal data only
            to perform these tasks on our behalf and are obligated not to
            disclose or use it for any other purpose.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Your Data Protection Rights
          </h2>
          <p className="mb-4">
            You have the right to access, update, or delete the information we
            have on you. If you wish to exercise any of these rights, please
            contact us.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <Link href="/contact">
                <span className="underline">By Email</span>{" "}
              </Link>
            </li>
            <li>
              By visiting this page on our website:
              <Link href="/">
                <span className="underline">Odd2tips</span>{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
