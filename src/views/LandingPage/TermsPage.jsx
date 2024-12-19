import React from "react";
import LNavbar from "./LNavbar";
import Footer from "./Footer";

export default function TermsPage() {
  return (
    <div className="w-full">
      {/* navbar */}
      <LNavbar />
      {/* navbar */}

      <div className="container mx-auto px-4 py-10 max-w-4xl text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> [Insert Date]
      </p>
      <p className="mb-6">
        Welcome to Prodiner, the point-of-sale (POS) solution for restaurants. By using our services, you agree to comply 
        with and be bound by the following terms and conditions. Please read them carefully before accessing or using our platform.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Prodiner, you confirm that you have read, understood, and agree to be bound by these terms 
          and conditions. If you do not agree with any part of these terms, you must not use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the 
          platform after changes have been made constitutes your acceptance of the updated terms. We encourage you to review 
          this page periodically for any updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must provide accurate and complete information when creating an account on Prodiner.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</li>
          <li>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful behavior.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Use of Services</h2>
        <p>
          Prodiner is designed to assist restaurants in managing orders and operations. By using our platform, you agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comply with all applicable laws and regulations in connection with your use of Prodiner.</li>
          <li>Use the platform only for lawful purposes and in a manner consistent with its intended use.</li>
          <li>Not attempt to access unauthorized areas of the platform or interfere with its functionality.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Payment and Billing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Subscription fees and payment terms are outlined in your agreement with Prodiner.</li>
          <li>All fees are non-refundable except as required by law.</li>
          <li>We reserve the right to change pricing or payment terms with prior notice.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
        <p>
          All content, trademarks, and other intellectual property on Prodiner are the exclusive property of Prodiner or 
          its licensors. You may not reproduce, distribute, or create derivative works based on our intellectual property 
          without our prior written consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
        <p>
          Prodiner is provided "as is" without warranties of any kind, express or implied. To the fullest extent permitted by law, 
          we disclaim all liability for damages arising from your use of the platform, including but not limited to lost profits, 
          data loss, or business interruptions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to Prodiner at any time for violations of these terms or 
          other reasons, including non-payment of fees or suspected fraudulent activity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
        <p>
          These terms are governed by the laws of [Insert Jurisdiction]. Any disputes arising from these terms or your use 
          of Prodiner shall be resolved exclusively in the courts of [Insert Jurisdiction].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
        <p>
          If you have any questions or concerns about these Terms & Conditions, please contact us:
        </p>
        <address className="not-italic">
          <strong>Prodiner Support Team</strong><br />
          Email: <a href="mailto:support@prodiner.net" className="text-blue-600 hover:underline">support@prodiner.net</a>
        </address>
      </section>
    </div>
      {/* footer */}
        <Footer />
      {/* footer */}
    </div>
  );
}
