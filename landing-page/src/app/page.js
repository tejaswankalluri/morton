"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Github,
  Code,
  Database,
  Globe,
  Users,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (show) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white ">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-[#1E1E1E]/80 backdrop-blur-lg z-50">
        <Link className="flex items-center justify-center" href="#">
          <ShoppingCart className="h-6 w-6 text-primary text-white" />
          <span className="ml-2 text-2xl font-bold">Morton</span>
        </Link>
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#community"
          >
            Community
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="https://github.com/morton/morton"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-64 bg-[#1E1E1E] z-50 p-4 flex flex-col"
          >
            <Button
              variant="ghost"
              size="icon"
              className="self-end mb-6"
              onClick={toggleMenu}
            >
              <X className="h-6 w-6" />
            </Button>
            <nav className="flex flex-col gap-4">
              <Link
                className="text-lg font-medium hover:text-gray-300 transition-colors"
                href="#features"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                className="text-lg font-medium hover:text-gray-300 transition-colors"
                href="#community"
                onClick={toggleMenu}
              >
                Community
              </Link>
              <Link
                className="text-lg font-medium hover:text-gray-300 transition-colors"
                href="#contact"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                className="text-lg font-medium hover:text-gray-300 transition-colors"
                href="https://github.com/morton/morton"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="mx-auto container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-100">
                    Empower Your E-commerce with Morton
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                    Open-source, seamless, and scalable headless e-commerce
                    backend for modern businesses.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-x-4"
              >
                <Button asChild>
                  <Link
                    href="https://github.com/tejaswankalluri/morton"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </Link>
                </Button>
                <Button variant="outline" className="">
                  View Docs
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="mx-auto container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Morton?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Headless Architecture",
                  description:
                    "Flexible frontend integration with any framework or platform of your choice.",
                },
                {
                  icon: Database,
                  title: "Scalable Infrastructure",
                  description:
                    "Built to handle high-traffic and large inventories with ease.",
                },
                {
                  icon: Code,
                  title: "Developer-Friendly API",
                  description:
                    "Comprehensive API documentation and SDKs for seamless integration.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group bg-[#2A2A2A] border-gray-700">
                    <CardHeader>
                      <feature.icon className="w-8 h-8 text-primary mb-2 text-white" />
                      <CardTitle className="text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="community"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#2A2A2A]"
        >
          <div className="mx-auto container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <Users className="h-12 w-12 text-primary text-white" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Join Our Community
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Morton is built by developers, for developers. Contribute,
                learn, and grow with us.
              </p>
              <Button asChild>
                <Link
                  href="https://github.com/tejaswankalluri/morton"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute on GitHub
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="mx-auto container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Stay Updated
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join our mailing list to receive updates on Morton&apos;s
                  development and community events.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-[#2A2A2A] px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#1E1E1E] disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          © 2023 Morton. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white transition-colors"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
            >
              ↑
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
