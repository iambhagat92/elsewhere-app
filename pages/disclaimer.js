import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer - ElseWhere</title>
        <meta name="description" content="Disclaimer for ElseWhere - Important information about using our ambient sound service." />
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
            <h1 className="text-4xl font-bold text-textPrimary mb-4">Disclaimer</h1>
            <p className="text-textSecondary mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="space-y-8 text-textSecondary leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">1. General Information</h2>
                <p>
                  The information provided by ElseWhere (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on https://elsewhere.app (the &quot;Site&quot;) is for 
                  general informational and entertainment purposes only. All information on the Site is provided in good faith, 
                  however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, 
                  validity, reliability, availability, or completeness of any information on the Site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">2. No Medical or Health Claims</h2>
                <p>
                  ElseWhere provides ambient sounds for relaxation, focus, and enjoyment. We do not make any medical or health 
                  claims about our service. The ambient sounds are not intended to diagnose, treat, cure, or prevent any disease 
                  or medical condition.
                </p>
                <p className="mt-4">
                  If you have any health concerns, please consult with a qualified healthcare professional before using our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">3. Audio Safety</h2>
                <p>
                  While using ElseWhere, please be mindful of your audio volume levels. Prolonged exposure to loud sounds can 
                  damage hearing. We recommend:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Starting at a low volume and adjusting to a comfortable level</li>
                  <li>Avoiding extremely high volume levels</li>
                  <li>Taking regular breaks from headphone use</li>
                  <li>Not using the service in situations requiring full attention (driving, operating machinery, etc.)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">4. External Links Disclaimer</h2>
                <p>
                  The Site may contain links to external websites that are not provided or maintained by us. We do not guarantee 
                  the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">5. Professional Disclaimer</h2>
                <p>
                  The Site cannot and does not contain medical, mental health, or professional advice. The ambient sound service 
                  is provided for general informational and entertainment purposes only and is not a substitute for professional advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">6. No Warranties</h2>
                <p>
                  The Service is provided &quot;as is&quot; without warranty of any kind. We do not warrant that:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>The service will be uninterrupted or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The service is free of viruses or harmful components</li>
                  <li>Results from using the service will meet your requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">7. Limitation of Liability</h2>
                <p>
                  Under no circumstances shall ElseWhere be liable for any direct, indirect, special, incidental, or consequential 
                  damages resulting from:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Your use or inability to use the service</li>
                  <li>Any content obtained from the service</li>
                  <li>Unauthorized access to or alteration of your data</li>
                  <li>Any other matter relating to the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">8. Fair Use</h2>
                <p>
                  ElseWhere is a free service intended for personal use. We reserve the right to limit or terminate access 
                  for users who abuse the service or use it in ways that negatively impact other users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">9. Changes to This Disclaimer</h2>
                <p>
                  We may update this Disclaimer from time to time. We will notify you of any changes by posting the new Disclaimer 
                  on this page and updating the &quot;Last Updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-textPrimary mt-8 mb-4">10. Contact Us</h2>
                <p>
                  If you have any questions about this Disclaimer, please contact us at:
                </p>
                <p className="mt-2">
                  Email: <a href="mailto:bhagatpaaji@gmail.com" className="text-primary hover:text-blue-400">bhagatpaaji@gmail.com</a>
                </p>
              </section>

              <section className="bg-panel bg-opacity-50 p-6 rounded-lg mt-8">
                <p className="font-medium text-textPrimary">
                  By using ElseWhere, you acknowledge that you have read and understood this Disclaimer and agree to be bound by its terms.
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