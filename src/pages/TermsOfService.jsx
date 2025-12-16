import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const TermsOfService = () => {
  useDocumentTitle('Terms of Service');
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Effective Date: January 15, 2024</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using UtilityBill Pro ("the Platform"), you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by these terms, 
                  please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Description of Service</h2>
                <p>
                  UtilityBill Pro provides utility bill management services, including but not limited to 
                  bill tracking, payment processing, and report generation for electricity, gas, water, 
                  and internet bills.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Accounts</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You agree to provide accurate and complete information during registration</li>
                  <li>You are solely responsible for all activities that occur under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Payment Terms</h2>
                <p>
                  All bill payments are processed through our secure payment gateway. You agree to pay all 
                  charges incurred by your account, including applicable taxes. We reserve the right to 
                  change our pricing structure with prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. User Responsibilities</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Submit false or misleading information</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice, for conduct 
                  that we believe violates these Terms or is harmful to other users, us, or third parties, 
                  or for any other reason.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Limitation of Liability</h2>
                <p>
                  UtilityBill Pro shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of significant 
                  changes via email or through the Platform. Continued use after changes constitutes acceptance 
                  of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of Bangladesh, 
                  without regard to its conflict of law provisions.
                </p>
              </section>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h3>
                <p className="text-gray-600">
                  If you have any questions about these Terms, please contact us at legal@utilitybillpro.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;