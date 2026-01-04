// app/about/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';



export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 opacity-90"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
              About <span className="text-rose-600 bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Our Clinic</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10 leading-relaxed md:leading-loose max-w-3xl mx-auto">
              Welcome to our premier Physiotherapy & Chiropractor Clinic, where expert care meets compassionate healing. 
              For years, we&apos;ve been dedicated to helping our patients achieve optimal health and recovery through personalized treatment plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link 
                href="/contact" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold rounded-lg hover:from-rose-700 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg active:translate-y-0"
                aria-label="Book an appointment with our clinic"
              >
                Book Appointment
              </Link>
              <Link 
                href="/services" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-rose-600 text-rose-600 font-semibold rounded-lg hover:bg-rose-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                aria-label="Explore our healthcare services"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-amber-500/20 group-hover:from-rose-600/30 group-hover:to-amber-500/30 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                  <div className="text-center p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-xl max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-700 text-base sm:text-lg">
                      To provide exceptional, evidence-based care that empowers patients to regain function, reduce pain, and improve their quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="text-rose-600">Commitment</span> to Your Health
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                  At our clinic, we believe in a holistic approach to healthcare. Our team of highly trained physiotherapists and chiropractors work together to create comprehensive treatment plans tailored to your unique needs.
                </p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  We combine the latest techniques with time-tested methods to ensure you receive the most effective care possible. Your recovery and wellbeing are our top priorities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-rose-500 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">Expert Team</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Licensed professionals with specialized training</p>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">Modern Facilities</h4>
                  <p className="text-gray-600 text-sm sm:text-base">State-of-the-art equipment and treatment rooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Meet Our <span className="text-rose-600">Expert Team</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Our dedicated professionals bring years of experience and a passion for healing to every patient interaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <article 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="h-64 bg-gradient-to-r from-rose-50 to-amber-50 flex items-center justify-center group-hover:from-rose-100 group-hover:to-amber-100 transition-all duration-300">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-r from-rose-100 to-amber-200 flex items-center justify-center text-3xl sm:text-4xl font-bold text-rose-800 mb-4 shadow-lg">
                      {member.initials}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900" itemProp="name">{member.name}</h3>
                    <p className="text-rose-600 font-medium" itemProp="jobTitle">{member.title}</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-gray-600 mb-4 text-sm sm:text-base" itemProp="description">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-rose-50 text-rose-700 text-xs sm:text-sm rounded-full hover:bg-rose-100 transition-colors duration-200"
                        itemProp="knowsAbout"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
              Our <span className="text-rose-600">Treatment</span> Approach
            </h2>
            
            <div className="space-y-8 sm:space-y-12">
              {approachSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center group"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 flex items-center justify-center text-rose-600 text-xl sm:text-2xl md:text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4" itemProp="name">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg" itemProp="text">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-rose-600 to-amber-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Start Your Journey to Better Health Today
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-95">
            Experience the difference of personalized, expert care at our physiotherapy and chiropractic clinic.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              href="/contact" 
              className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-rose-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg active:translate-y-0"
              aria-label="Book your first session with us"
            >
              Book Your First Session
            </Link>
            <Link 
              href="/services" 
              className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              aria-label="Learn more about our services"
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