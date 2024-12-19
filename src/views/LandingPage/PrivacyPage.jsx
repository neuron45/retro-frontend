import React from "react";
import LNavbar from "./LNavbar";
import Footer from "./Footer";

export default function PrivacyPage() {
  return (
    <div className="w-full">
      {/* navbar */}
      <LNavbar />
      {/* navbar */}

      <div className="container mx-auto px-4 py-10 max-w-4xl text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> 10th October, 2024
      </p>
      <p className="mb-6">
        Thank you for choosing Prodiner, the point-of-sale (POS) solution for restaurants to manage orders effectively. 
        At Prodiner, we value your trust and are committed to safeguarding your privacy. This Privacy Policy explains 
        how we collect, use, and protect your information when you use our services.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
        <p className="mb-4">To deliver our services, we collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Restaurant Information:</strong> Business name, address, and contact details during account registration.
          </li>
          <li>
            <strong>User Information:</strong> Admin and staff account details, including names, email addresses, and roles within the restaurant.
          </li>
          <li>
            <strong>Order and Transaction Data:</strong> Order details, payment amounts, and transaction history to facilitate restaurant operations and reporting.
          </li>
          <li>
            <strong>Device and Usage Data:</strong> Information about devices accessing our services, such as operating systems and browser types.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance functionality.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">The information collected is used to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Facilitate restaurant order management, including taking, tracking, and completing orders.</li>
          {/* <li>Process payments securely and generate accurate financial reports.</li> */}
          <li>Improve and personalize the Prodiner platform for better user experience.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>Send updates, training materials, and notifications about new features or changes.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">We respect your privacy and only share information when necessary:</p>
        <ul className="list-disc pl-6 space-y-2">
          {/* <li>
            <strong>With Service Providers:</strong> Trusted third-party providers who assist with payment processing, analytics, or hosting.
          </li> */}
          <li>
            <strong>For Legal Obligations:</strong> When required to comply with laws, regulations, or legal processes.
          </li>
        </ul>
        <p>Prodiner does not sell your information to third parties.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
        <p>
          We take data protection seriously and implement robust security measures, including encryption and secure servers, 
          to protect your information. However, no online system is completely secure, so please use our services responsibly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
        <p>
          We retain your data as long as your account is active or as necessary to provide our services and meet legal obligations. 
          If you would like your data deleted, please email us at <a href="mailto:privacy@prodiner.net" className="text-blue-600 hover:underline">privacy@prodiner.net</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Privacy Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access and review the information we hold about you.</li>
          <li>Request corrections to any inaccurate information.</li>
          <li>Opt out of marketing communications.</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:privacy@prodiner.net" className="text-blue-600 hover:underline">privacy@prodiner.net</a>.</p>
      </section>



      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Changes to This Privacy Policy</h2>
        <p>
          We may update this policy periodically to reflect changes in our services or legal requirements. 
          We will notify you of significant changes through email or a notice on our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
        <p>If you have questions or concerns about our Privacy Policy, please contact us:</p>
        <address className="not-italic">
          <strong>Prodiner Support Team</strong><br />
          Email: <a href="mailto:privacy@prodiner.net" className="text-blue-600 hover:underline">privacy@prodiner.net</a>
        </address>
      </section>
    </div>

      {/* footer */}
        <Footer />
      {/* footer */}
    </div>
  );
}
