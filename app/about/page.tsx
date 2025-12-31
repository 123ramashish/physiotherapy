// app/about/page.jsx
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Physiotherapy & Chiropractor Clinic',
  description: 'Learn about our expert team, mission, and approach to physiotherapy and chiropractic care for your recovery and wellbeing.',
  keywords: 'physiotherapy about us, chiropractor clinic, expert care, recovery treatment, personalized plans',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 opacity-70"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-blue-600">Our Clinic</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Welcome to our premier Physiotherapy & Chiropractor Clinic, where expert care meets compassionate healing. 
              For years, we&apos;ve been dedicated to helping our patients achieve optimal health and recovery through personalized treatment plans.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </Link>
              <Link 
                href="/services" 
                className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                    <p className="text-gray-700 text-lg">
                      To provide exceptional, evidence-based care that empowers patients to regain function, reduce pain, and improve their quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Our <span className="text-blue-600">Commitment</span> to Your Health
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  At our clinic, we believe in a holistic approach to healthcare. Our team of highly trained physiotherapists and chiropractors work together to create comprehensive treatment plans tailored to your unique needs.
                </p>
                <p className="text-gray-600 text-lg">
                  We combine the latest techniques with time-tested methods to ensure you receive the most effective care possible. Your recovery and wellbeing are our top priorities.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 text-xl mb-2">Expert Team</h4>
                  <p className="text-gray-600">Licensed professionals with specialized training</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-500">
                  <h4 className="font-bold text-gray-800 text-xl mb-2">Modern Facilities</h4>
                  <p className="text-gray-600">State-of-the-art equipment and treatment rooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Meet Our <span className="text-blue-600">Expert Team</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our dedicated professionals bring years of experience and a passion for healing to every patient interaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="h-64 bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-200 to-teal-200 flex items-center justify-center text-4xl font-bold text-blue-800 mb-4">
                      {member.initials}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
              Our <span className="text-blue-600">Treatment</span> Approach
            </h2>
            
            <div className="space-y-12">
              {approachSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center text-blue-600 text-3xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Start Your Journey to Better Health Today
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Experience the difference of personalized, expert care at our physiotherapy and chiropractic clinic.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Book Your First Session
            </Link>
            <Link 
              href="/services" 
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Team members data
const teamMembers = [
  {
    initials: "DR",
    name: "Dr. Sarah Johnson",
    title: "Lead Physiotherapist",
    description: "With over 15 years of experience in sports rehabilitation and orthopedic physiotherapy, Dr. Johnson specializes in helping patients recover from injuries and improve mobility.",
    specialties: ["Sports Injuries", "Orthopedic Rehab", "Post-Surgical Recovery"]
  },
  {
    initials: "MC",
    name: "Michael Chen",
    title: "Chiropractic Specialist",
    description: "Michael is a certified chiropractor with advanced training in spinal adjustments, posture correction, and pain management techniques.",
    specialties: ["Spinal Health", "Posture Correction", "Pain Management"]
  },
  {
    initials: "ER",
    name: "Elena Rodriguez",
    title: "Senior Physiotherapist",
    description: "Elena focuses on neurological and geriatric physiotherapy, helping patients with chronic conditions regain independence and improve quality of life.",
    specialties: ["Neurological Rehab", "Geriatric Care", "Chronic Pain"]
  }
];

// Approach steps data
const approachSteps = [
  {
    step: "01",
    title: "Comprehensive Assessment",
    description: "We begin with a thorough evaluation of your condition, medical history, and lifestyle to understand the root cause of your issues."
  },
  {
    step: "02",
    title: "Personalized Treatment Plan",
    description: "Based on our assessment, we create a customized treatment plan that addresses your specific needs and recovery goals."
  },
  {
    step: "03",
    title: "Integrated Therapy Sessions",
    description: "Our sessions combine physiotherapy, chiropractic adjustments, and other modalities as needed to optimize your healing process."
  },
  {
    step: "04",
    title: "Progress Monitoring & Adjustment",
    description: "We continuously track your progress and adjust treatments as needed to ensure you&apos;re on the fastest path to recovery."
  },
  {
    step: "05",
    title: "Education & Prevention",
    description: "We empower you with knowledge and exercises to prevent future injuries and maintain optimal health long-term."
  }
];