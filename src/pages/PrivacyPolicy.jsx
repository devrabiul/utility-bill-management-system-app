import React from 'react';
import { FaShieldAlt, FaUserLock, FaDatabase } from 'react-icons/fa';
import useDocumentTitle from '../hooks/useDocumentTitle';

const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy');
  
  const sections = [
    {
      title: "Information We Collect",
      icon: FaDatabase,
      content: `We collect information you provide directly to us, such as when you create an account, 
                pay bills, or contact us. This includes: name, email address, phone number, billing address, 
                and payment information. We also automatically collect certain information about your device 
                and how you interact with our services.`
    },
    {
      title: "How We Use Your Information",
      icon: FaUserLock,
      content: `We use the information we collect to: provide and improve our services, process your bill payments, 
                communicate with you about your account, send you important updates, prevent fraud and abuse, 
                and comply with legal obligations. We never sell your personal information to third parties.`
    },
    {
      title: "Data Security",
      icon: FaShieldAlt,
      content: `We implement appropriate technical and organizational security measures to protect your 
                personal information. This includes encryption, access controls, and regular security 
                assessments. However, no method of transmission over the Internet is 100% secure.`
    },
    {
      title: "Your Rights",
      content: `You have the right to: access your personal data, correct inaccurate data, request deletion 
                of your data, object to processing, and request data portability. To exercise these rights, 
                please contact us at privacy@utilitybillpro.com.`
    },
    {
      title: "Cookies & Tracking",
      content: `We use cookies and similar tracking technologies to enhance your experience, analyze usage, 
                and deliver targeted advertisements. You can control cookies through your browser settings.`
    },
    {
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy periodically. We will notify you of any significant changes 
                by posting the new policy on this page and updating the "Last Updated" date.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: January 15, 2024</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-6">
              At UtilityBill Pro, we are committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform.
            </p>
            <p className="text-gray-600">
              Please read this privacy policy carefully. By using our services, you consent to the 
              practices described in this policy.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  {section.icon && (
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <section.icon className="text-blue-600" />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
            <p className="text-gray-600 mb-2">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>Email: privacy@utilitybillpro.com</li>
              <li>Address: 123/A, Business Street, Dhaka 1212, Bangladesh</li>
              <li>Phone: +880 1234 567890</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;