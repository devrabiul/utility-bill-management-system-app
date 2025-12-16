import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import useDocumentTitle from '../hooks/useDocumentTitle';

const FAQ = () => {
  useDocumentTitle('FAQ');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          q: "What is UtilityBill Pro?",
          a: "UtilityBill Pro is a comprehensive platform for managing all your utility bills (electricity, gas, water, internet) in one place. You can track, pay, and generate reports for your bills."
        },
        {
          q: "Is UtilityBill Pro free to use?",
          a: "Yes, our basic features are completely free. We offer premium features for businesses and advanced users at affordable prices."
        },
        {
          q: "How secure is my data?",
          a: "We use bank-level encryption and security protocols to protect your data. Your information is never shared with third parties without your consent."
        }
      ]
    },
    {
      category: "Billing & Payments",
      questions: [
        {
          q: "Which bill categories do you support?",
          a: "We currently support Electricity, Gas, Water, and Internet bills. More categories will be added soon."
        },
        {
          q: "How do I pay my bills through the platform?",
          a: "You can pay bills directly through our secure payment gateway. We support mobile banking, credit/debit cards, and digital wallets."
        },
        {
          q: "Can I pay bills from previous months?",
          a: "You can only pay bills for the current month. For previous month bills, please contact the respective service provider directly."
        },
        {
          q: "How long does it take for payments to process?",
          a: "Most payments are processed instantly. In rare cases, it may take up to 24 hours."
        }
      ]
    },
    {
      category: "Account & Features",
      questions: [
        {
          q: "How do I reset my password?",
          a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
        },
        {
          q: "Can I download my payment history?",
          a: "Yes, you can download detailed PDF reports of your payment history from the 'My Bills' section."
        },
        {
          q: "Is there a mobile app available?",
          a: "Our mobile app is currently in development and will be available soon on both iOS and Android."
        },
        {
          q: "How do I update my profile information?",
          a: "Go to your Profile page in the dashboard to update your personal information, address, and contact details."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaQuestionCircle className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about UtilityBill Pro
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const faqIndex = categoryIndex * 10 + index;
                  const isOpen = openIndex === faqIndex;
                  
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faqIndex)}
                        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-medium text-gray-800">{faq.q}</span>
                        {isOpen ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-blue-100 mb-6">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/bills"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                View All Bills
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;