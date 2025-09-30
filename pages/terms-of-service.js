import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - ElseWhere</title>
        <meta name="description" content="Terms of Service for ElseWhere - Read our terms and conditions for using our ambient sound service." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-blue-400 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <article className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-textPrimary mb-4">Terms of Service</h1>
            <p className="text-textSecondary mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="space-y-8 text-textSecondary leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using ElseWhere ("the Service"), you accept and agree to be bound by the terms and provisions 
                  of this agreement. If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">2. Description of Service</h2>
                <p>
                  ElseWhere provides free ambient sound experiences from various global locations. The Service is provided "as is" 
                  without any warranties, expressed or implied.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">3. Use License</h2>
                <p>
                  Permission is granted to temporarily access and use the Service for personal, non-commercial purposes. 
                  This license does not include:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Modifying or copying the Service materials</li>
                  <li>Using the materials for commercial purposes</li>
                  <li>Attempting to reverse engineer any software contained in the Service</li>
                  <li>Removing any copyright or proprietary notations</li>
                  <li>Transferring the materials to another person or "mirroring" on another server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">4. User Conduct</h2>
                <p>
                  You agree to use the Service only for lawful purposes. You agree not to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use automated systems to access the Service</li>
                  <li>Reproduce, duplicate, or copy any part of the Service for commercial purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">5. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of the Service are owned by ElseWhere and are protected by 
                  international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">6. Disclaimer of Warranties</h2>
                <p>
                  The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, 
                  including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">7. Limitation of Liability</h2>
                <p>
                  In no event shall ElseWhere be liable for any indirect, incidental, special, consequential, or punitive damages 
                  resulting from your use of or inability to use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">8. Service Modifications</h2>
                <p>
                  We reserve the right to modify, suspend, or discontinue the Service at any time without notice. 
                  We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to 
                  conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to update these Terms of Service at any time. We will notify users of any material 
                  changes by updating the "Last Updated" date at the top of this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">11. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="mt-2">
                  Email: <a href="mailto:hello@elsewhere.app" className="text-primary hover:text-blue-400">hello@elsewhere.app</a>
                </p>
              </section>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
}