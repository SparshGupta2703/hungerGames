import { useState } from "react";
import {
  ArrowRight,
  Users,
  Trophy,
  Brain,
  Camera,
  ChevronDown,
} from "lucide-react";

import LandingNavbar from "../components/auth/LandingNavbar";
import AuthModal from "../components/auth/AuthModal";

const features = [
  {
    icon: Camera,
    title: "AI Meal Analysis",
    desc: "Upload your food and let AI estimate nutrition and health score.",
  },
  {
    icon: Trophy,
    title: "Compete with Friends",
    desc: "Earn points and climb the leaderboard together.",
  },
  {
    icon: Users,
    title: "Groups",
    desc: "Create private food challenge groups with your friends.",
  },
  {
    icon: Brain,
    title: "Smart Suggestions",
    desc: "Receive AI-generated improvements for healthier meals.",
  },
];

export default function Landing() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const openLogin = () => {
    setMode("login");
    setOpen(true);
  };

  const openSignup = () => {
    setMode("signup");
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-x-hidden">

      <LandingNavbar
        onLogin={openLogin}
        onSignup={openSignup}
      />

      <AuthModal
        open={open}
        setOpen={setOpen}
        mode={mode}
        setMode={setMode}
      />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">

        <div className="absolute h-80 w-80 rounded-full bg-primary/15 blur-3xl top-20 left-10"></div>

        <div className="absolute h-96 w-96 rounded-full bg-secondary/15 blur-3xl bottom-0 right-0"></div>

      </div>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <div className="badge badge-primary badge-outline mb-6 p-4">

              🚀 AI Powered Healthy Competition

            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">

              Eat Better.

              <br />

              <span className="text-primary">

                Compete Smarter.

              </span>

            </h1>

            <p className="text-lg mt-8 opacity-70 max-w-xl leading-8">

              HungerGames lets your friend group compete through healthy meals.
              Upload food, receive AI feedback, earn points and dominate the
              leaderboard.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <button
                onClick={openSignup}
                className="btn btn-primary btn-lg"
              >
                Get Started

                <ArrowRight size={20} />

              </button>

              <button
                className="btn btn-ghost btn-lg"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                Learn More

              </button>

            </div>

            <div className="flex gap-8 mt-14">

              <div>

                <h2 className="text-4xl font-bold">

                  4+

                </h2>

                <p className="opacity-60">

                  Core Features

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold">

                  AI

                </h2>

                <p className="opacity-60">

                  Nutrition Analysis

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold">

                  100%

                </h2>

                <p className="opacity-60">

                  Free

                </p>

              </div>

            </div>

          </div>

          {/* MOCKUP */}

          <div className="flex justify-center">

            <div className="mockup-phone border-primary shadow-2xl">

              <div className="camera"></div>

              <div className="display">

                <div className="artboard artboard-demo phone-1 bg-base-200 p-5">

                  <div className="card bg-base-100 shadow-xl">

                    <div className="card-body">

                      <div className="flex justify-between">

                        <div>

                          <h2 className="font-bold">

                            Today's Meal

                          </h2>

                          <p className="text-xs opacity-50">

                            Uploaded 2 mins ago

                          </p>

                        </div>

                        <div className="badge badge-success">

                          +9

                        </div>

                      </div>

                      <div className="h-40 rounded-xl bg-base-300 mt-4 flex items-center justify-center">

                        🍱

                      </div>

                      <div className="mt-4 space-y-2">

                        <div className="badge badge-primary">

                          Healthy Score: 84

                        </div>

                        <div className="badge badge-outline">

                          Protein 31g

                        </div>

                        <div className="badge badge-outline">

                          Calories 590

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="text-center">

          <h2 className="text-5xl font-bold">

            Everything you need

          </h2>

          <p className="mt-5 opacity-70">

            Built for fitness enthusiasts, friends and healthy competitions.

          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="card bg-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="card-body">

                  <div className="w-14 h-14 rounded-xl bg-primary text-primary-content flex items-center justify-center">

                    <Icon size={28} />

                  </div>

                  <h2 className="card-title mt-4">

                    {feature.title}

                  </h2>

                  <p className="opacity-70">

                    {feature.desc}

                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="hero rounded-3xl bg-primary text-primary-content">

            <div className="hero-content text-center py-20">

              <div>

                <h1 className="text-5xl font-black">

                  Ready to win?

                </h1>

                <p className="py-6 max-w-xl mx-auto">

                  Create your first group and start competing with friends
                  today.

                </p>

                <button
                  className="btn btn-neutral btn-lg"
                  onClick={openSignup}
                >
                  Create Free Account

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      <footer className="footer footer-center p-10 border-t border-base-300">

        <aside>

          <h2 className="font-bold text-xl">

            🍽 HungerGames

          </h2>

          <p className="opacity-60">

            Eat Better • Compete Smarter

          </p>

          <p className="text-xs opacity-40 mt-2">

            Built with React, Tailwind, DaisyUI & AI

          </p>

        </aside>

      </footer>

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="btn btn-circle btn-primary fixed bottom-6 right-6 shadow-xl"
      >
        <ChevronDown className="rotate-180" />
      </button>

    </div>
  );
}