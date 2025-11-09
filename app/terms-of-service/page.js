export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <p className="text-sm text-gray-600">Last updated: January 2025</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By using KNB Group's real estate, hospitality, travel, or wealth management services, you agree to these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services Offered</h2>
            <p className="text-gray-700 mb-4">
              KNB Group provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Real Estate services (residential and commercial properties)</li>
              <li>Hotel and villa booking services</li>
              <li>Travel packages and tourism services</li>
              <li>Wealth management and investment advisory</li>
              <li>Business support and corporate services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Transactions</h2>
            <p className="text-gray-700 mb-4">
              All property transactions are subject to market conditions, legal verification, and regulatory approvals. Property prices and availability are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Investment Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              Wealth management services involve market risks. Past performance does not guarantee future results. Please read all investment documents carefully before investing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking Terms</h2>
            <p className="text-gray-700 mb-4">
              Hotel and travel bookings are subject to availability and third-party terms. Cancellation policies vary by service provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms, contact us at info@knbgrp.com or call 033 45001863.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}