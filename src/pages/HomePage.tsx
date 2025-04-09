
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, BarChart, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <header className="w-full bg-edu-primary py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 text-white mr-2" />
          <h1 className="text-2xl font-bold text-white">Scholar Hub</h1>
        </div>
        <Link to="/login">
          <Button variant="outline" className="bg-white text-edu-primary hover:bg-edu-light">
            Login <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-edu-primary text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#4f46e5,transparent)]"></div>
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to Scholar Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
                A comprehensive platform connecting students, teachers, and administrators to enhance the learning experience.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-edu-primary hover:bg-edu-light hover:text-edu-primary">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Educational Management</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform provides tools for all stakeholders in the educational ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-edu-primary" />}
                title="Student Portal"
                description="Students can view their marks, track academic progress, and access personalized dashboards."
                delay={0.1}
              />
              <FeatureCard 
                icon={<BookOpen className="h-10 w-10 text-edu-primary" />}
                title="Teacher Portal"
                description="Teachers can enter student marks, view class performance, and track individual student progress."
                delay={0.2}
              />
              <FeatureCard 
                icon={<BarChart className="h-10 w-10 text-edu-primary" />}
                title="Admin Portal"
                description="Administrators can oversee all activities, manage users, and access comprehensive analytics."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to enhance your educational experience?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join Scholar Hub today and revolutionize the way you manage educational data.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-edu-primary text-white hover:bg-edu-dark">
                Sign In Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">Scholar Hub</span>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Scholar Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-t-4 border-t-edu-primary overflow-hidden group">
        <CardContent className="p-6">
          <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HomePage;
