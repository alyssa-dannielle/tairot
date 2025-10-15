"use client";

import React, { useState } from "react";
import { Sparkles, User, Zap, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TairotLanding() {
  const router = useRouter();
  const [selectedSpread, setSelectedSpread] = useState(null);

  const spreads = [
    {
      id: "past-present-future",
      name: "Past • Present • Future",
      description:
        "Understand where you've been, where you are, and where you're heading",
      positions: ["Past", "Present", "Future"],
      icon: "🌙",
      color: "from-amber-100 to-orange-100",
    },
    {
      id: "situation-action-outcome",
      name: "Situation • Action • Outcome",
      description: "Clarity on your current situation and the path forward",
      positions: ["Situation", "Action", "Outcome"],
      icon: "⭐",
      color: "from-emerald-100 to-teal-100",
    },
    {
      id: "mind-body-spirit",
      name: "Mind • Body • Spirit",
      description: "Holistic insight into your complete well-being",
      positions: ["Mind", "Body", "Spirit"],
      icon: "✨",
      color: "from-purple-100 to-pink-100",
    },
  ];

  const handleContinue = () => {
    if (selectedSpread) {
      router.push(`/booking?spread=${selectedSpread}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="bg-indigo-950 text-amber-50 py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <h1 className="text-3xl font-bold">tAIrot</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#how" className="hover:text-amber-300 transition">
              How It Works
            </a>
            <a href="#spreads" className="hover:text-amber-300 transition">
              Spreads
            </a>
            <a href="#pricing" className="hover:text-amber-300 transition">
              Pricing
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-sage-600 text-white rounded-full text-sm font-medium mb-4">
            Human intuition. AI interpretation.
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-indigo-950 mb-6 leading-tight">
          Cards Pulled by Hand.
          <br />
          Meaning Unlocked by AI.
        </h2>
        <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Real tarot readings channeled with human energy and intuition, then
          interpreted through comprehensive AI analysis that combines centuries
          of tarot wisdom.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#spreads"
            className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-amber-700 transition shadow-lg"
          >
            Get Your Reading
          </a>
          <a
            href="#how"
            className="px-8 py-4 bg-white text-stone-700 rounded-lg font-semibold text-lg hover:bg-stone-50 transition border-2 border-stone-200"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-center text-indigo-950 mb-16">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <User className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-center mb-4 text-indigo-950">
              Choose & Share
            </h4>
            <p className="text-stone-600 text-center leading-relaxed">
              Select your spread and share a bit about yourself so I can channel
              your energy while pulling your cards.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-center mb-4 text-indigo-950">
              Human Touch
            </h4>
            <p className="text-stone-600 text-center leading-relaxed">
              I personally pull your cards by hand, connecting with your energy
              and intention.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-center mb-4 text-indigo-950">
              AI Insights
            </h4>
            <p className="text-stone-600 text-center leading-relaxed">
              AI analyzes your cards using comprehensive tarot knowledge,
              delivering a personalized interpretation within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Spreads Selection */}
      <section id="spreads" className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-center text-indigo-950 mb-4">
          Choose Your Spread
        </h3>
        <p className="text-center text-stone-600 mb-16 text-lg">
          Each three-card reading is $5 • Delivered within 24 hours
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {spreads.map((spread) => (
            <div
              key={spread.id}
              onClick={() => setSelectedSpread(spread.id)}
              className={`bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition cursor-pointer border-2 ${
                selectedSpread === spread.id
                  ? "border-amber-600 ring-4 ring-amber-200"
                  : "border-transparent hover:border-stone-200"
              }`}
            >
              <div className="text-6xl text-center mb-6">{spread.icon}</div>
              <h4 className="text-2xl font-bold text-center mb-3 text-indigo-950">
                {spread.name}
              </h4>
              <p className="text-stone-600 text-center mb-6 leading-relaxed">
                {spread.description}
              </p>

              {/* Card Positions Preview */}
              <div className="flex gap-2 justify-center mb-6">
                {spread.positions.map((position, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-24 bg-gradient-to-br ${spread.color} rounded-lg flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-xs font-medium text-stone-700 text-center px-1">
                      {position}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedSpread === spread.id
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {selectedSpread === spread.id ? "Selected ✓" : "Select Spread"}
              </button>
            </div>
          ))}
        </div>

        {selectedSpread && (
          <div className="text-center mt-12">
            <button
              onClick={handleContinue}
              className="px-12 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-xl hover:from-orange-700 hover:to-amber-700 transition shadow-xl hover:shadow-2xl"
            >
              Continue to Booking
            </button>
          </div>
        )}
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 rounded-2xl p-12 text-center text-amber-50 shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h3>
          <p className="text-lg mb-8 text-amber-100">
            $5 per three-card reading • No subscriptions, pay only when you need
            guidance
          </p>
          <div className="inline-block bg-amber-600 bg-opacity-20 rounded-lg px-6 py-3 border border-amber-400 border-opacity-30">
            <p className="text-sm text-amber-200">
              ✨ Limited to 3 readings per day to ensure quality and
              intentionality
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-amber-100 py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-2xl font-bold text-amber-50">tAIrot</span>
          </div>
          <p className="text-sm mb-6">Human intuition. AI interpretation.</p>
          <p className="text-xs text-amber-200">
            © 2025 tAIrot • For entertainment purposes only • 18+ only
          </p>
        </div>
      </footer>
    </div>
  );
}
