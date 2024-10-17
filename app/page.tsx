'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, Preload } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import * as THREE from 'three'
import { Github, Linkedin, Download } from 'lucide-react'

// Floating Cube Animation
function FloatingCube({ position }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = position[1] + Math.sin(t) / 10
  })

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

// Skill Cloud Animation
function SkillsCloud() {
  const skills = ['Deep Learning', 'Next.js', 'TypeScript', 'Node.js', 'Reinforcement Learning', 'TailwindCSS', 'Python', 'Machine Learning', 'React', 'C++', 'Web Development' , "Artificial Intelligence"]
  const { camera } = useThree()
  const groupRef = useRef()

  useEffect(() => {
    const radius = 5
    skills.forEach((_, i) => {
      const theta = (i / skills.length) * 2 * Math.PI
      const x = radius * Math.cos(theta)
      const y = radius * Math.sin(theta)
      const z = (Math.random() - 0.5) * 2
      groupRef.current.children[i].position.set(x, y, z)
    })
  }, [skills])

  useFrame(() => {
    groupRef.current.rotation.y += 0.001
    groupRef.current.children.forEach((child) => {
      child.lookAt(camera.position)
    })
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <Text key={i} color="white" fontSize={0.5} maxWidth={2} lineHeight={1} letterSpacing={0.02} textAlign="center">
          {skill}
        </Text>
      ))}
    </group>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <SkillsCloud />
        <FloatingCube position={[0, 0, 0]} />
        <Preload all />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

// Function to handle sending an email
const sendEmail = async (formData) => {
  const { name, email, message } = formData;

  const mailtoLink = `mailto:theriyanshshah@icloud.com?subject=Contact%20From%20${name}&body=Email: ${email}%0D%0A%0D%0A${message}`;

  window.location.href = mailtoLink;
}

// Main Component with Updated UI and Features
export default function Page() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Email validation logic
    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError) {
      sendEmail(formData);
    }
  };

  // Scroll to section animation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <header className="w-full bg-white fixed top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Riyansh Shah</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a onClick={() => scrollToSection('about')} className="hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer">About</a></li>
              <li><a onClick={() => scrollToSection('education')} className="hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer">Education</a></li>
              <li><a onClick={() => scrollToSection('internships')} className="hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer">Internships</a></li>
              <li><a onClick={() => scrollToSection('projects')} className="hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer">Projects</a></li>
              <li><a onClick={() => scrollToSection('skills')} className="hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer">Skills</a></li>
              <li><a onClick={() => scrollToSection('contact')} className="hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer">Contact</a></li>
            </ul>
          </nav>
         
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden mt-16">
        <h1 className="text-5xl font-bold mb-4 z-10">Riyansh Shah</h1>
        <p className="text-xl text-gray-600 mb-8 z-10">Computer Engineering Student & Aspiring Entrepreneur</p>
        <div className="w-full h-full absolute top-0 left-0">
          <Scene />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              I am Riyansh Shah, a passionate computer engineering student with a keen interest in robotics, deep reinforcement learning, and artificial intelligence.
            </p>
            <p className="text-lg mb-4">
              I am constantly learning and exploring the intersections of software and hardware to develop intelligent systems and autonomous robots. I believe in the power of AI to transform industries and improve human lives, and I'm excited to be part of this rapidly evolving field.
            </p>
            
          </CardContent>
        </Card>
      </section>
        
          {/* Skills Section */}
      <section id="skills" className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-8">
        <h2 className="text-4xl font-bold mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Languages</h3>
              <p className="text-gray-600 mb-4">Python, C/C++, JavaScript, SQL (Postgres, MongoDB), HTML/CSS, (Familiar with TypeScript)</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Frameworks & Libraries</h3>
              <p className="text-gray-600 mb-4">React.js, Node.js, Express.js, Next.js, Flask, Django, TensorFlow, Keras, Tailwind CSS, Passport.js, WebRTC, Socket.io, FastAPI, Material-UI</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">ML Algorithms & Architectures</h3>
              <p className="text-gray-600 mb-4">Decision Trees, XGBoost, SVM, Naive Bayes, CNNs, LSTMs, RNNs, GANs, LMMs – GPT</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Libraries & Packages</h3>
              <p className="text-gray-600 mb-4">pandas, NumPy, Matplotlib, OpenCV, SciKit-Learn, Streamlit, Redux, JUnit, Hugging Face Transformers</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-8">
        <h2 className="text-4xl font-bold mb-8">Education</h2>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Bachelor of Science in Computer Engineering</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">University of California, Merced</p>
            <p className="text-gray-600">Expected Graduation: May 2028</p>
            <ul className="list-disc list-inside mt-4">
              <li>GPA: 4.0/4.0</li>
              <li>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Web Development</li>
              <li>Honors: Dean's List (All Semesters)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Internships Section */}
      <section id="internships" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-4xl font-bold mb-8">Internships</h2>
        <div className="grid grid-cols-1 gap-8">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Machine Learning Student Intern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-2">YBI Foundation, Bangalore, IND</p>
              <p className="text-gray-600 mb-4">June 2024 – August 2024</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Implemented NLP algorithms such as Sentiment Analysis (85% accuracy) to monitor and optimize social media engagement by analyzing audience reactions and feedback.</li>
                <li>Applied predictive analytics models, including Linear Regression and Time Series Forecasting, to analyze trends and enhance content strategies, resulting in a 20% improvement in user engagement.</li>
                <li>Developed automated dashboards using Python (Pandas, Matplotlib) for performance monitoring, significantly reducing reporting time by 30% and facilitating data-driven decision-making for remote startups.</li>
                <li>Optimized startup operations by building classification models (Random Forest, SVM) to assess market potential, improving their scalability by identifying key metrics and insights.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Full Stack Web Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-2">Echo Frame, Mumbai, IND</p>
              <p className="text-gray-600 mb-4">June 2023 – December 2023</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Developed and integrated RESTful APIs for seamless communication between the Frontend and backend, ensuring efficient data flow and scalability.</li>
                <li>Designed and implemented user authentication using frameworks like Passport.js and JWT to secure access across the platform.</li>
                <li>Built frontend interfaces using React.js, ensuring an engaging user experience and responsive design for social media management and startup tools.</li>
                <li>Integrated Stripe API for payment processing, enabling startups to manage transactions smoothly and securely.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-4xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "NLP Text Classification & Summarization", 
              desc: "Developed a hybrid NLP model for medical  abstracts, using GloVe embeddings and character embeddings. Summarized abstracts using advanced NLP techniques.",
              link: "https://github.com/Riyansh08/NLP_TextClassifier"
            },
            {
              title: "Food Vision ML Model", 
              desc: "Developed a CNN-based image classification model with TensorFlow, achieving 90% accuracy using the Food101 dataset and transfer learning.",
              link: "https://github.com/Riyansh08/Food-vision-ML_MODEL"
            },
            {
              title: "Sync Meeting", 
              desc: "Built a real-time video chat app with React, Node.js, and WebRTC, featuring user authentication and Socket.io for low-latency messaging.",
              link: "https://github.com/Riyansh08/SYNC"
            },
            {
              title: "Brain Tumor Classification Project", 
              desc: "Developed a model for brain tumor classification using MRI images, employing CNNs with TensorFlow and Flask for real-time predictions.",
              link: "https://github.com/Riyansh08/Brain_Tumor_Classification"
            }
          ].map((project, index) => (
            <Card key={index} className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.desc}</p>
                <Button as="a" href={project.link} target="_blank" rel="noopener noreferrer" variant="outline">View Project</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-8">
        <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required />
          </div>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out">Send Message</Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 text-center p-4 border-t">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://github.com/Riyansh08" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/riyansh-shah-0806r/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
        <p>&copy; 2024 Riyansh Shah. All rights reserved.</p>
      </footer>
    </main>
  )
}