// 'use client'

// import { useState, useRef, useEffect, Suspense } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { Text, OrbitControls, Preload } from '@react-three/drei'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import * as THREE from 'three'

// // Floating Cube Animation
// function FloatingCube({ position }) {
//   const ref = useRef()

//   useFrame((state) => {
//     const t = state.clock.getElapsedTime()
//     ref.current.rotation.x = Math.cos(t / 4) / 8
//     ref.current.rotation.y = Math.sin(t / 4) / 8
//     ref.current.position.y = position[1] + Math.sin(t) / 10
//   })

//   return (
//     <mesh ref={ref} position={position}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="#ffffff" />
//     </mesh>
//   )
// }

// // Skill Cloud Animation
// function SkillsCloud() {
//   const skills = ['Deep Learning', 'Next.js', 'TypeScript', 'Node.js', 'Reinforcement Learning', 'TailwindCSS', 'Python', 'Machine Learning', 'React', 'C++', 'Web Development']
//   const { camera } = useThree()
//   const groupRef = useRef()

//   useEffect(() => {
//     const radius = 5
//     skills.forEach((_, i) => {
//       const theta = (i / skills.length) * 2 * Math.PI
//       const x = radius * Math.cos(theta)
//       const y = radius * Math.sin(theta)
//       const z = (Math.random() - 0.5) * 2
//       groupRef.current.children[i].position.set(x, y, z)
//     })
//   }, [skills])

//   useFrame(() => {
//     groupRef.current.rotation.y += 0.001
//     groupRef.current.children.forEach((child) => {
//       child.lookAt(camera.position)
//     })
//   })

//   return (
//     <group ref={groupRef}>
//       {skills.map((skill, i) => (
//         <Text key={i} color="white" fontSize={0.5} maxWidth={2} lineHeight={1} letterSpacing={0.02} textAlign="center">
//           {skill}
//         </Text>
//       ))}
//     </group>
//   )
// }

// // Main 3D Scene
// function Scene() {
//   return (
//     <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Suspense fallback={null}>
//         <SkillsCloud />
//         <FloatingCube position={[0, 0, 0]} />
//         <Preload all />
//       </Suspense>
//       <OrbitControls enableZoom={false} />
//     </Canvas>
//   )
// }

// // Main Component with Updated UI and Features
// export function Page() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
//       <nav className="w-full p-4 bg-white fixed top-0 z-10 shadow-md">
//         <ul className="flex justify-center space-x-6">
//           <li><a href="#education" className="hover:text-gray-600 transition-colors duration-300 ease-in-out">Education</a></li>
//           <li><a href="#internships" className="hover:text-gray-600 transition-colors duration-300 ease-in-out">Internships</a></li>
//           <li><a href="#projects" className="hover:text-gray-600 transition-colors duration-300 ease-in-out">Projects</a></li>
//           <li><a href="#contact" className="hover:text-gray-600 transition-colors duration-300 ease-in-out">Contact</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section */}
//       <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
//         <h1 className="text-5xl font-bold mb-4 z-10">John Doe</h1>
//         <p className="text-xl text-gray-600 mb-8 z-10">Computer Science Student & Aspiring Developer</p>
//         <div className="w-full h-full absolute top-0 left-0">
//           <Scene />
//         </div>
//       </section>

//       {/* Education Section */}
//       <section id="education" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-8">
//         <h2 className="text-4xl font-bold mb-8">Education</h2>
//         <Card className="w-full max-w-2xl">
//           <CardHeader>
//             <CardTitle>Bachelor of Science in Computer Engineering</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-lg mb-2">University of California, Merced</p>
//             <p className="text-gray-600">Expected Graduation: May 2027</p>
//             <ul className="list-disc list-inside mt-4">
//               <li>GPA: 4.0/4.0</li>
//               <li>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Web Development</li>
//               <li>Honors: Dean's List (All Semesters)</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </section>

//       {/* Internships Section */}
//       <section id="internships" className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-8">
//         <h2 className="text-4xl font-bold mb-8">Internships</h2>
//         <div className="grid grid-cols-1 gap-8 w-full max-w-2xl">
//           <Card>
//             <CardHeader>
//               <CardTitle>Full Stack Developer Intern</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-lg mb-2">Echo Frames</p>
//               <p className="text-gray-600 mb-4">June 2023 - August 2023</p>
//               <ul className="list-disc list-inside">
//                 <li> Designed and implemented user authentication using frameworks like Passport.js and JWT to secure access
//                 across the platform.</li>
//                 <li>Built frontend interfaces using React.js, ensuring an engaging user experience and responsive design for social
//                 media management and startup tools.</li>
//                 <li>Integrated Stripe API for payment processing, enabling startups to manage transactions smoothly and securely.
//                 Assess and troubleshoot computer problems brought by students, faculty and staff</li>

//               </ul>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Machine Learning Intern </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-lg mb-2">YBI Foundation</p>
//               <p className="text-gray-600 mb-4">May 2024 - August 2024</p>
//               <ul className="list-disc list-inside">
//                 <li>Implemented NLP algorithms such as Sentiment Analysis (85% accuracy) to monitor and optimize social media
//                 engagement by analyzing audience reactions and feedbacks</li>
//                 <li>Applied predictive analytics models, including Linear Regression and Time Series Forecasting, to analyze
//                 trends and enhance content strategies, resulting in a 20% improvement in user engagement.</li>
//                 <li>Optimized startup operations by building classiKication models (Random Forest, SVM) to assess market potential,
//                 improving their scalability by identifying key metrics and insights.</li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Projects Section */}
//       <section id="projects" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-8">
//         <h2 className="text-4xl font-bold mb-8">Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {[
//             { title: "AI-Powered Chess Tutor", desc: "Developed a chess application that provides real-time move suggestions and analysis using machine learning." },
//             { title: "Eco-Track", desc: "Created a mobile app for tracking and reducing personal carbon footprint, integrating with IoT devices." },
//             { title: "Virtual Study Rooms", desc: "Built a web platform for students to create and join virtual study rooms with video chat and shared whiteboard features." },
//             { title: "Blockchain Voting System", desc: "Implemented a secure and transparent voting system using blockchain technology for student body elections." }
//           ].map((project, index) => (
//             <Card key={index} className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
//               <CardContent className="p-6">
//                 <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
//                 <p className="text-gray-600 mb-4">{project.desc}</p>
//                 <Button variant="outline">View Project</Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-8">
//         <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
//         <form className="w-full max-w-md space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <Input type="text" id="name" name="name" required />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <Input type="email" id="email" name="email" required />
//           </div>
//           <div>
//             <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
//             <Textarea id="message" name="message" rows={4} required />
//           </div>
//           <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out">Send Message</Button>
//         </form>
//       </section>

//       {/* Footer */}
//       <footer className="w-full bg-white text-center p-4 border-t">
//         <p>&copy; 2024 John Doe. All rights reserved.</p>
//       </footer>
//     </main>
//   )
// }
