'use client';
import { FaStethoscope, FaUserMd, FaAward, FaGraduationCap, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { MdAccessTimeFilled, MdHealthAndSafety } from 'react-icons/md';

export default function TherapistsPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Expert Physiotherapists & Chiropractors | SKM Physiotherapy Team</title>
        <meta name="description" content="Meet our team of licensed physiotherapists and chiropractors. 50+ years combined experience, specialized certifications, and personalized care for your recovery journey." />
        <meta name="keywords" content="physiotherapist, chiropractor, sports therapy, rehabilitation specialist, certified therapist, physical therapy team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Meet Our Expert Therapists - SKM Physiotherapy" />
        <meta property="og:description" content="Licensed physiotherapists and chiropractors with specialized training and compassionate care" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "SKM Physiotherapy",
           
          })}
        </script>
      </head>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section - Enhanced Responsive */}
        <section 
          className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
          itemScope 
          itemType="https://schema.org/MedicalBusiness"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50 opacity-90"></div>
          <div className="absolute top-5 sm:top-10 right-5 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-rose-100 rounded-full mb-4 sm:mb-6 animate-bounce">
                <FaUserMd className="text-2xl sm:text-3xl text-rose-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight px-2">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Expert Therapists</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4" itemProp="description">
                Our team of licensed physiotherapists and chiropractors bring years of specialized experience, 
                advanced training, and a compassionate approach to every patient&apos;s journey to recovery.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 px-4">
                <a 
                  href="#therapists" 
                  className="group px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  aria-label="View our team of therapists"
                >
                  <FaStethoscope className="group-hover:rotate-12 transition-transform text-lg sm:text-base" />
                  <span className="text-sm sm:text-base">View Our Team</span>
                </a>
                <a 
                  href="/contact" 
                  className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white border-2 border-rose-600 text-rose-600 font-semibold rounded-lg hover:bg-rose-50 transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2"
                  aria-label="Book a consultation"
                >
                  <FaCalendarAlt className="text-lg sm:text-base" />
                  <span className="text-sm sm:text-base">Book Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced Mobile */}
        {/* <section className="py-8 sm:py-12 md:py-16 px-4">
          <div className="container mx-auto px-2 sm:px-4 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 mb-2 sm:mb-3 md:mb-4">
                      <div className="text-xl sm:text-2xl md:text-3xl">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Therapists Grid - Enhanced Cards */}
        <section id="therapists" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {/* <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Our <span className="text-rose-600">Specialized</span> Professionals
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Each therapist brings unique expertise and specialized training to provide comprehensive care for your specific needs.
              </p>
            </div> */}
            
            
          </div>
        </section>

        {/* Why Choose Our Therapists */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-rose-50 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Why <span className="text-rose-600">Choose</span> Our Therapists
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                  Our team stands out through continuous education, compassionate care, and evidence-based practices.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-rose-100 to-amber-100 text-rose-600 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                      <div className="text-xl sm:text-2xl">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Approach - Responsive Layout */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8">
                  Our <span className="text-rose-600">Collaborative</span> Treatment Approach
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Our therapists work together as a multidisciplinary team, combining physiotherapy and chiropractic expertise to develop comprehensive treatment plans tailored to your unique needs.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  {approaches.map((approach, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-white to-rose-50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm sm:text-base">
                        {approach.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{approach.title}</h4>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{approach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-500 opacity-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4 sm:p-6 md:p-8">
                      <MdHealthAndSafety className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-rose-600 opacity-20 mx-auto mb-4 sm:mb-6 md:mb-8" />
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">Team-Based Care</h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 px-4">
                        Regular case reviews and collaborative planning ensure you receive the most effective treatment from multiple perspectives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Mobile Optimized */}
        {/* <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-rose-600 to-amber-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 px-4">
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 opacity-90 max-w-2xl mx-auto px-4 leading-relaxed">
                Schedule a consultation with one of our expert therapists and take the first step toward optimal health and wellbeing.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 px-4">
                <a 
                  href="/contact" 
                  className="group px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white text-rose-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  aria-label="Book your appointment"
                >
                  <FaCalendarAlt className="group-hover:scale-110 transition-transform" />
                  Book Your Appointment
                </a>
                <a 
                  href="/contact" 
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  aria-label="Emergency consultation"
                >
                  <MdAccessTimeFilled className="text-lg sm:text-xl" />
                  Emergency Consultation
                </a>
              </div>
              
              <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/20">
                <p className="text-base sm:text-lg mb-4 sm:mb-6 px-4">Not sure which therapist is right for you?</p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium underline decoration-2 underline-offset-4 transition-colors text-sm sm:text-base"
                  aria-label="Get matched with a specialist"
                >
                  Let us match you with the perfect specialist
                  <span className="text-lg sm:text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
}

// Stats Data
// const stats = [
//   {
//     value: "50+",
//     label: "Years Combined Experience",
//     icon: <FaAward className="text-rose-600" />
//   },
//   {
//     value: "5000+",
//     label: "Patients Treated",
//     icon: <FaUserMd className="text-amber-600" />
//   },
//   {
//     value: "15+",
//     label: "Specialized Certifications",
//     icon: <FaGraduationCap className="text-rose-600" />
//   },
//   {
//     value: "24/7",
//     label: "Emergency Support",
//     icon: <MdHealthAndSafety className="text-amber-600" />
//   }
// ];

// Therapists Data
// const therapists = [
//   {
//     id: "dr-sarah-johnson",
//     initials: "SJ",
//     name: "Dr. Sarah Johnson",
//     role: "Lead Physiotherapist",
//     specialty: "Doctor of Physiotherapy",
//     description: "Specializing in sports rehabilitation and orthopedic physiotherapy with over 15 years of clinical experience. Former team physiotherapist for professional athletes.",
//     qualifications: [
//       "Doctor of Physiotherapy (DPT)",
//       "Certified Orthopedic Specialist",
//       "Sports Physiotherapy Certification",
//       "Advanced Dry Needling Certification"
//     ],
//     expertise: ["Sports Injuries", "Post-Surgical Rehab", "Chronic Pain", "Musculoskeletal Disorders"]
//   },
//   {
//     id: "michael-chen",
//     initials: "MC",
//     name: "Michael Chen",
//     role: "Chiropractic Director",
//     specialty: "Doctor of Chiropractic",
//     description: "Expert in spinal health, posture correction, and pain management. Integrates chiropractic care with rehabilitative exercises for comprehensive treatment.",
//     qualifications: [
//       "Doctor of Chiropractic (DC)",
//       "Certified in Spinal Rehabilitation",
//       "Advanced Biomechanics Training",
//       "Webster Technique Certified"
//     ],
//     expertise: ["Spinal Adjustments", "Posture Correction", "Headache Relief", "Joint Mobility"]
//   },
//   {
//     id: "elena-rodriguez",
//     initials: "ER",
//     name: "Elena Rodriguez",
//     role: "Senior Physiotherapist",
//     specialty: "Neurological Specialist",
//     description: "Focuses on neurological rehabilitation and geriatric care. Passionate about helping patients regain independence and improve quality of life.",
//     qualifications: [
//       "MSc in Neurological Physiotherapy",
//       "Bobath Certified Therapist",
//       "Parkinson's Disease Specialist",
//       "Vestibular Rehabilitation Certified"
//     ],
//     expertise: ["Stroke Recovery", "Parkinson's Care", "Balance Disorders", "Geriatric Rehab"]
//   }
// ];

// Features Data
const features = [
  {
    icon: <FaGraduationCap />,
    title: "Continuous Education",
    description: "Our therapists complete 50+ hours of continuing education annually to stay current with the latest research and techniques."
  },
  {
    icon: <FaUserMd />,
    title: "Personalized Care",
    description: "One-on-one attention with treatment plans customized to your specific needs, goals, and lifestyle."
  },
  {
    icon: <MdHealthAndSafety />,
    title: "Evidence-Based Practice",
    description: "All treatments are based on the latest scientific research and proven clinical outcomes."
  },
  {
    icon: <FaStethoscope />,
    title: "Advanced Technology",
    description: "Utilizing state-of-the-art equipment and diagnostic tools for accurate assessment and effective treatment."
  },
  {
    icon: <FaAward />,
    title: "Multiple Specializations",
    description: "Team members hold specialized certifications in various areas of physiotherapy and chiropractic care."
  },
  {
    icon: <FaCheckCircle />,
    title: "Proven Results",
    description: "Track record of successful outcomes with measurable improvements in patient function and pain reduction."
  }
];

// Approaches Data
const approaches = [
  {
    step: "1",
    title: "Initial Comprehensive Assessment",
    description: "Thorough evaluation including movement analysis, posture assessment, and detailed medical history review."
  },
  {
    step: "2",
    title: "Multidisciplinary Diagnosis",
    description: "Collaborative analysis by physiotherapist and chiropractor to identify root causes of your condition."
  },
  {
    step: "3",
    title: "Integrated Treatment Plan",
    description: "Customized plan combining manual therapy, exercises, education, and lifestyle recommendations."
  },
  {
    step: "4",
    title: "Progress Monitoring",
    description: "Regular reassessment and adjustment of treatment based on your progress and feedback."
  }
];