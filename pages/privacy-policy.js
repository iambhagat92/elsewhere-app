import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - ElseWhere</title>
        <meta name="description" content="Privacy Policy for ElseWhere - Learn how we protect your privacy and handle your data." />
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
            <h1 className="text-4xl font-bold text-textPrimary mb-4">Privacy Policy</h1>
            <p className="text-textSecondary mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="space-y-8 text-textSecondary leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">1. Introduction</h2>
                <p>
                  Welcome to ElseWhere ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you use our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">2. Information We Collect</h2>
                <p>
                  ElseWhere is designed with privacy in mind. We do not collect, store, or process any personal information. 
                  Our service works entirely in your browser without requiring any registration or account creation.
                </p>
                <p className="mt-4">
                  <strong>Information we DO NOT collect:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Names, email addresses, or contact information</li>
                  <li>Payment information (our service is completely free)</li>
                  <li>Login credentials (no accounts required)</li>
                  <li>Personal preferences or settings (stored locally only)</li>
                  <li>Audio listening history</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">3. Local Storage</h2>
                <p>
                  We may use browser local storage to save your volume preferences and selected location for your convenience. 
                  This information never leaves your device and is not transmitted to our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">4. Cookies</h2>
                <p>
                  We do not use cookies for tracking or analytics. Any cookies used are strictly necessary for the basic 
                  functioning of the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">5. Third-Party Services</h2>
                <p>
                  We do not share your information with third-party services. Our audio files are hosted on our own servers 
                  or trusted content delivery networks solely for performance purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">6. Children's Privacy</h2>
                <p>
                  Our service is suitable for all ages. Since we don't collect any personal information, there are no 
                  special concerns regarding children's privacy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">7. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the 
                  new privacy policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2">
                  Email: <a href="mailto:bhagatpaaji@gmail.com" className="text-primary hover:text-blue-400">bhagatpaaji@gmail.com</a>
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