import React from 'react';
import { TrendingUp, Users, Leaf, Calculator, ArrowRight, MapPin, Mail, Phone, Linkedin, Facebook, Instagram } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export default function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Hybrid ROI Calculator</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Measure and optimize your organization's impact across Profit, People, and Planet 
            dimensions with advanced financial modeling and AI-powered strategic insights.
          </p>
          
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Contact BluePlan
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Reach out to our regional teams for expert sustainability consulting and ROI analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Singapore Office */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-2">
                Singapore (Asia-Pacific)
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>531 Upper Cross Street, 03-62 Hong Lim Complex, 050531</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <a href="mailto:dale@blueplan.eco" className="text-blue-400 hover:text-blue-300 transition-colors">
                    dale@blueplan.eco
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <a href="tel:+6596634309" className="text-blue-400 hover:text-blue-300 transition-colors">
                    +65 9663 4309
                  </a>
                </div>
              </div>
            </div>

            {/* UK Office */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-2">
                United Kingdom (EMEA)
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>7 Oakland Close<br />OX29 8AX Freeland, United Kingdom</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <a href="mailto:henrik@blueplan.eco" className="text-blue-400 hover:text-blue-300 transition-colors">
                    henrik@blueplan.eco
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <a href="tel:+447768466801" className="text-blue-400 hover:text-blue-300 transition-colors">
                    +44 776 846 6801
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-6">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/company/blueplanconsulting/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/people/Blue-Plan-Ltd/100063774323591/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/bluep.lan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6 mx-auto">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Financial ROI (Profit)
            </h3>
            <p className="text-gray-600 text-center">
              Calculate traditional financial returns with advanced DCF modeling, 
              including operational efficiencies, cost reductions, and revenue growth analysis.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-6 mx-auto">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Environmental Impact (Planet)
            </h3>
            <p className="text-gray-600 text-center">
              Measure environmental benefits through CO2e token systems, covering energy, 
              water, waste, emissions, and renewable energy initiatives.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-lg mb-6 mx-auto">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Social Value (People)
            </h3>
            <p className="text-gray-600 text-center">
              Quantify social impact through employee satisfaction, turnover reduction, 
              career development, and employer brand enhancement metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Hybrid TBL ROI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Go beyond traditional financial metrics to capture the full value of your investments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Calculator className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comprehensive Analysis
              </h3>
              <p className="text-gray-600">
                Integrate financial, environmental, and social metrics into a unified ROI framework 
                with DCF modeling and brand margin benefits analysis.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600">
                Generate strategic analysis reports with actionable recommendations 
                based on your data and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Calculate Your Hybrid TBL ROI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start measuring your complete impact across all three bottom lines
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Begin Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}