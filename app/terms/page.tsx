import Footer from '@/components/footer';
import Head from 'next/head';

const Terms = () => {
  return (
    <div className=''>
      <Head>
        <title>Terms and Conditions - StethX</title>
        <meta name="description" content="Terms and Conditions for using StethX, a Diabetes Prediction App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-950 text-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-blue-400">Terms and Conditions</h1>
            <p className="mt-4 text-lg text-gray-400">Please read these terms and conditions carefully before using our services.</p>
          </div>

          <div className="prose lg:prose-xl text-gray-300 space-y-6">
            <section>
              <h2 className="text-2xl text-blue-300">1. Introduction</h2>
              <p>
                Welcome to StethX! These terms and conditions govern your use of our website
                services (collectively, &quot;Services&quot;). By accessing or using our Services, you agree to comply with these Terms.
                If you disagree with any part of these Terms, you must not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">2. Data Privacy and Security</h2>
              <p>
                StethX takes your privacy seriously. We are committed to protecting the privacy and confidentiality of your personal
                and health data. By using our Services, you consent to the collection and use of your information as outlined in our
                <a href="/privacy" className="text-blue-400"> Privacy Policy</a>.
              </p>
              <p>
                We comply with the Health Insurance Portability and Accountability Act (HIPAA) to ensure the privacy and security of
                health information. All data you provide through our platform is encrypted and stored securely, and we take
                all reasonable measures to prevent unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">3. Eligibility</h2>
              <p>
                Our Services are intended for users who are 18 years or older. By using our Services, you affirm that you are at least
                18 years old. If you are under 18, you may not access or use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">4. User Responsibilities</h2>
              <p>
                As a user, you are responsible for the accuracy of the information you provide. You must ensure that all data provided,
                including medical and personal information, is accurate, current, and truthful.
              </p>
              <p>
                You agree to use our Services only for lawful purposes and in accordance with the Terms. You must not use our
                platform for any illegal activities or in a manner that could damage, disable, or impair the functionality of our
                Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">5. Health Disclaimer</h2>
              <p>
                The information provided by StethX is intended for general informational purposes only and should not be construed
                as medical advice. Our diabetes prediction model is based on statistical analysis and predictive algorithms and is
                not a substitute for professional medical diagnosis or treatment. Always consult with a healthcare provider for
                any concerns or questions regarding your health.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">6. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites or services that are not owned or controlled by StethX. We do
                not endorse or assume responsibility for any third-party sites or services. You access them at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, StethX and its affiliates shall not be liable for any direct, indirect,
                incidental, special, consequential, or punitive damages arising from your use of our Services. This includes
                damages resulting from the loss of data or interruptions to our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">8. Modifications to Terms</h2>
              <p>
                StethX reserves the right to modify, update, or change these Terms at any time. Any changes will be posted on this
                page with an updated effective date. By continuing to use our Services after any modifications, you agree to be bound
                by the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">9. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of [Your Country]. Any disputes arising under
                or in connection with these Terms will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-blue-300">10. Contact Us</h2>
              <p>
                If you have any questions or concerns about these Terms, please contact us at <a href="mailto:support@stethx.com" className="text-blue-400">support@stethx.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
