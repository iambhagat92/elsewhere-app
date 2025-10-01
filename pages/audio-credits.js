/**
 * Audio Credits Page
 * Lists all audio sources and attributions from Freesound.org
 */

export default function AudioCredits() {
  const credits = [
    { city: "Tokyo", source: "Freesound.org", license: "Creative Commons" },
    { city: "Paris", source: "Freesound.org", license: "Creative Commons" },
    { city: "New York", source: "Freesound.org", license: "Creative Commons" },
    { city: "London", source: "Freesound.org", license: "Creative Commons" },
    { city: "Berlin", source: "Freesound.org", license: "Creative Commons" },
    { city: "Dubai", source: "Freesound.org", license: "Creative Commons" },
    { city: "Mumbai", source: "Freesound.org", license: "Creative Commons" },
    { city: "Seoul", source: "Freesound.org", license: "Creative Commons" },
    { city: "Rome", source: "Freesound.org", license: "Creative Commons" },
    { city: "Barcelona", source: "Freesound.org", license: "Creative Commons" },
    { city: "Amsterdam", source: "Freesound.org", license: "Creative Commons" },
    { city: "Shanghai", source: "Freesound.org", license: "Creative Commons" },
    { city: "Hong Kong", source: "Freesound.org", license: "Creative Commons" },
    { city: "Singapore", source: "Freesound.org", license: "Creative Commons" },
    { city: "Bangkok", source: "Freesound.org", license: "Creative Commons" },
    { city: "Mexico City", source: "Freesound.org", license: "Creative Commons" },
    { city: "Buenos Aires", source: "Freesound.org", license: "Creative Commons" },
    { city: "Rio de Janeiro", source: "Freesound.org", license: "Creative Commons" },
    { city: "Istanbul", source: "Freesound.org", license: "Creative Commons" },
    { city: "Toronto", source: "Freesound.org", license: "Creative Commons" },
    { city: "Los Angeles", source: "Freesound.org", license: "Creative Commons" },
    { city: "Chicago", source: "Freesound.org", license: "Creative Commons" },
    { city: "Cairo", source: "Freesound.org", license: "Creative Commons" },
    { city: "Melbourne", source: "Freesound.org", license: "Creative Commons" },
    { city: "Moscow", source: "Freesound.org", license: "Creative Commons" },
    { city: "Prague", source: "Freesound.org", license: "Creative Commons" },
    { city: "Lisbon", source: "Freesound.org", license: "Creative Commons" },
    { city: "Marrakech", source: "Freesound.org", license: "Creative Commons" },
    { city: "Sydney", source: "Freesound.org", license: "Creative Commons" },
    { city: "Cape Town", source: "Freesound.org", license: "Creative Commons" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary dark:text-textPrimary-dark mb-4">
            🎵 Audio Credits
          </h1>
          <p className="text-lg text-textSecondary dark:text-textSecondary-dark max-w-2xl mx-auto">
            All ambient sounds are sourced from Freesound.org and used under Creative Commons licenses.
            We are grateful to the audio creators for their contributions.
          </p>
        </div>

        {/* Attribution */}
        <div className="bg-panel dark:bg-panel-dark rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-textPrimary dark:text-textPrimary-dark mb-4">
            📜 Attribution
          </h2>
          <p className="text-textSecondary dark:text-textSecondary-dark mb-4">
            All audio files used in ElseWhere are licensed under{" "}
            <a 
              href="https://creativecommons.org/licenses/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-400 underline"
            >
              Creative Commons
            </a>
            {" "}licenses and sourced from{" "}
            <a 
              href="https://freesound.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-400 underline"
            >
              Freesound.org
            </a>
            , a collaborative database of audio snippets, samples, recordings, and bleeps.
          </p>
          <p className="text-textSecondary dark:text-textSecondary-dark">
            We extend our sincere thanks to all the sound artists and creators who have contributed 
            their work to the public domain and Creative Commons, making projects like ElseWhere possible.
          </p>
        </div>

        {/* City List */}
        <div className="bg-panel dark:bg-panel-dark rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-textPrimary dark:text-textPrimary-dark mb-6">
            🌍 City Ambient Sounds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credits.map((credit, index) => (
              <div 
                key={index}
                className="bg-background dark:bg-background-dark rounded-lg p-4 border border-panel dark:border-panel-dark"
              >
                <h3 className="font-semibold text-textPrimary dark:text-textPrimary-dark mb-1">
                  {credit.city}
                </h3>
                <p className="text-sm text-textSecondary dark:text-textSecondary-dark">
                  Source: <span className="text-primary">{credit.source}</span>
                </p>
                <p className="text-xs text-textSecondary dark:text-textSecondary-dark mt-1">
                  License: {credit.license}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Freesound Info */}
        <div className="bg-panel dark:bg-panel-dark rounded-2xl p-6 md:p-8 mt-8 shadow-lg">
          <h2 className="text-2xl font-bold text-textPrimary dark:text-textPrimary-dark mb-4">
            ℹ️ About Freesound.org
          </h2>
          <p className="text-textSecondary dark:text-textSecondary-dark mb-4">
            Freesound is a collaborative database of Creative Commons Licensed sounds. 
            Browse, download and share sounds. All content on Freesound.org is licensed under 
            Creative Commons, ensuring legal and ethical use of audio resources.
          </p>
          <a 
            href="https://freesound.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Visit Freesound.org →
          </a>
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-block text-primary hover:text-blue-400 transition-colors duration-200"
          >
            ← Back to ElseWhere
          </a>
        </div>
      </div>
    </div>
  );
}
