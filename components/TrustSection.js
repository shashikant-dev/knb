import { Shield, Award, Users, Globe, Star, CheckCircle } from 'lucide-react';

export default function TrustSection() {
  const achievements = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Fully licensed and regulated across all jurisdictions',
      color: 'text-blue-500',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Multiple awards for excellence and innovation',
      color: 'text-yellow-500',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced professionals across all business sectors',
      color: 'text-green-500',
    },
    {
      icon: Globe,
      title: 'Global Presence',
      description: 'Serving clients across multiple countries and regions',
      color: 'text-purple-500',
    },
  ];

  const certifications = [
    'ISO 9001:2015',
    'Financial Conduct Authority',
    'Tourism Authority',
    'Property Standards Board',
    'GDPR Compliant',
    'Security Certified',
  ];

  return (
    <section id="trust-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose KNB Group
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on trust, driven by excellence, and committed to your success.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative rounded-3xl p-12 sm:p-16 mb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop"
              alt="Statistics Background"
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/95 via-blue-700/90 to-blue-900/95 rounded-3xl"></div>
          </div>

          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-white mb-4">Our Impact in Numbers</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">25+</div>
                <div className="text-blue-200 font-medium uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="group">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">10K+</div>
                <div className="text-blue-200 font-medium uppercase tracking-wider">Happy Clients</div>
              </div>
              <div className="group">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 group-hover:text-green-400 transition-colors duration-300">500+</div>
                <div className="text-blue-200 font-medium uppercase tracking-wider">Properties Managed</div>
              </div>
              <div className="group">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 group-hover:text-green-400 transition-colors duration-300">15+</div>
                <div className="text-blue-200 font-medium uppercase tracking-wider">Countries Served</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted & Certified
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-100 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md flex items-center"
              >
                <Shield className="h-4 w-4 text-blue-500 mr-2" />
                <span className="font-semibold text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}