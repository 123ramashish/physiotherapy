'use client';
import Link from 'next/link';
import { FaStethoscope, FaUserMd, FaAward, FaGraduationCap, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { MdAccessTimeFilled, MdHealthAndSafety } from 'react-icons/md';



export default function TherapistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 opacity-90"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
              <FaUserMd className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Expert Therapists</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our team of licensed physiotherapists and chiropractors bring years of specialized experience, 
              advanced training, and a compassionate approach to every patient&apos;s journey to recovery.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="#therapists" 
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <FaStethoscope className="group-hover:rotate-12 transition-transform" />
                View Our Team
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center gap-2"
              >
                <FaCalendarAlt />
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapists Grid */}
      <section id="therapists" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Specialized</span> Professionals
            </h2>
            <p className="text-gray-600 text-lg">
              Each therapist brings unique expertise and specialized training to provide comprehensive care for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapists.map((therapist, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
              >
                {/* Therapist Image/Profile */}
                <div className="relative h-72 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 flex items-center justify-center text-6xl font-bold text-blue-800 mb-4 shadow-inner">
                        {therapist.initials}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {therapist.role}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-20"></div>
                </div>
                
                {/* Therapist Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{therapist.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
                    <FaGraduationCap />
                    {therapist.specialty}
                  </p>
                  <p className="text-gray-600 mb-6">{therapist.description}</p>
                  
                  {/* Qualifications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaAward className="text-teal-500" />
                      Qualifications
                    </h4>
                    <ul className="space-y-2">
                      {therapist.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Specialties */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.expertise.map((area, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 text-sm rounded-full border border-blue-100"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="px-6 pb-6">
                  <Link 
                    href={`/contact?therapist=${therapist.id}`}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]"
                  >
                    Book with {therapist.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Therapists */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why <span className="text-blue-600">Choose</span> Our Therapists
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Our team stands out through continuous education, compassionate care, and evidence-based practices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-blue-100 to-teal-100 text-blue-600 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                Our <span className="text-blue-600">Collaborative</span> Treatment Approach
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our therapists work together as a multidisciplinary team, combining physiotherapy and chiropractic expertise to develop comprehensive treatment plans tailored to your unique needs.
              </p>
              
              <div className="space-y-6">
                {approaches.map((approach, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-blue-50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {approach.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{approach.title}</h4>
                      <p className="text-gray-600">{approach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MdHealthAndSafety className="text-9xl text-blue-600 opacity-20 mx-auto mb-8" />
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Team-Based Care</h3>
                    <p className="text-gray-700 text-lg">
                      Regular case reviews and collaborative planning ensure you receive the most effective treatment from multiple perspectives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Schedule a consultation with one of our expert therapists and take the first step toward optimal health and wellbeing.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/contact" 
                className="group px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                <FaCalendarAlt className="group-hover:scale-110 transition-transform" />
                Book Your Appointment
              </Link>
              <Link 
                href="/contact" 
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <MdAccessTimeFilled className="text-xl" />
                Emergency Consultation
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-lg mb-6">Not sure which therapist is right for you?</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium underline decoration-2 underline-offset-4"
              >
                Let us match you with the perfect specialist
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Stats Data
const stats = [
  {
    value: "50+",
    label: "Years Combined Experience",
    icon: <FaAward className="text-3xl text-blue-600" />
  },
  {
    value: "5000+",
    label: "Patients Treated",
    icon: <FaUserMd className="text-3xl text-teal-600" />
  },
  {
    value: "15+",
    label: "Specialized Certifications",
    icon: <FaGraduationCap className="text-3xl text-blue-600" />
  },
  {
    value: "24/7",
    label: "Emergency Support",
    icon: <MdHealthAndSafety className="text-3xl text-teal-600" />
  }
];

// Therapists Data
const therapists = [
  {
    id: "dr-sarah-johnson",
    initials: "SJ",
    name: "Dr. Sarah Johnson",
    role: "Lead Physiotherapist",
    specialty: "Doctor of Physiotherapy",
    description: "Specializing in sports rehabilitation and orthopedic physiotherapy with over 15 years of clinical experience. Former team physiotherapist for professional athletes.",
    qualifications: [
      "Doctor of Physiotherapy (DPT)",
      "Certified Orthopedic Specialist",
      "Sports Physiotherapy Certification",
      "Advanced Dry Needling Certification"
    ],
    expertise: ["Sports Injuries", "Post-Surgical Rehab", "Chronic Pain", "Musculoskeletal Disorders"]
  },
  {
    id: "michael-chen",
    initials: "MC",
    name: "Michael Chen",
    role: "Chiropractic Director",
    specialty: "Doctor of Chiropractic",
    description: "Expert in spinal health, posture correction, and pain management. Integrates chiropractic care with rehabilitative exercises for comprehensive treatment.",
    qualifications: [
      "Doctor of Chiropractic (DC)",
      "Certified in Spinal Rehabilitation",
      "Advanced Biomechanics Training",
      "Webster Technique Certified"
    ],
    expertise: ["Spinal Adjustments", "Posture Correction", "Headache Relief", "Joint Mobility"]
  },
  {
    id: "elena-rodriguez",
    initials: "ER",
    name: "Elena Rodriguez",
    role: "Senior Physiotherapist",
    specialty: "Neurological Specialist",
    description: "Focuses on neurological rehabilitation and geriatric care. Passionate about helping patients regain independence and improve quality of life.",
    qualifications: [
      "MSc in Neurological Physiotherapy",
      "Bobath Certified Therapist",
      "Parkinson's Disease Specialist",
      "Vestibular Rehabilitation Certified"
    ],
    expertise: ["Stroke Recovery", "Parkinson's Care", "Balance Disorders", "Geriatric Rehab"]
  }
];

// Features Data
const features = [
  {
    icon: <FaGraduationCap className="text-2xl" />,
    title: "Continuous Education",
    description: "Our therapists complete 50+ hours of continuing education annually to stay current with the latest research and techniques."
  },
  {
    icon: <FaUserMd className="text-2xl" />,
    title: "Personalized Care",
    description: "One-on-one attention with treatment plans customized to your specific needs, goals, and lifestyle."
  },
  {
    icon: <MdHealthAndSafety className="text-2xl" />,
    title: "Evidence-Based Practice",
    description: "All treatments are based on the latest scientific research and proven clinical outcomes."
  },
  {
    icon: <FaStethoscope className="text-2xl" />,
    title: "Advanced Technology",
    description: "Utilizing state-of-the-art equipment and diagnostic tools for accurate assessment and effective treatment."
  },
  {
    icon: <FaAward className="text-2xl" />,
    title: "Multiple Specializations",
    description: "Team members hold specialized certifications in various areas of physiotherapy and chiropractic care."
  },
  {
    icon: <FaCheckCircle className="text-2xl" />,
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