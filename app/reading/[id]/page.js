"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ReadingDisplay() {
  const params = useParams();
  const router = useRouter();
  const readingId = params.id;

  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReading();
  }, [readingId]);

  const fetchReading = async () => {
    try {
      const { data, error } = await supabase
        .from("readings")
        .select("*")
        .eq("id", readingId)
        .single();

      if (error) throw error;

      if (data.status !== "completed") {
        setError("pending");
        setLoading(false);
        return;
      }

      setReading(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reading:", err);
      setError("notfound");
      setLoading(false);
    }
  };

  const suitColors = {
    major: "from-purple-400 to-indigo-500",
    wands: "from-orange-400 to-red-500",
    cups: "from-blue-400 to-cyan-500",
    swords: "from-gray-400 to-slate-600",
    pentacles: "from-green-400 to-emerald-600",
  };

  const getSpreadPositions = (spreadId) => {
    const spreads = {
      "past-present-future": ["Past", "Present", "Future"],
      "situation-action-outcome": ["Situation", "Action", "Outcome"],
      "mind-body-spirit": ["Mind", "Body", "Spirit"],
    };
    return spreads[spreadId] || ["Position 1", "Position 2", "Position 3"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-indigo-950">Loading your reading...</p>
        </div>
      </div>
    );
  }

  if (error === "pending") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
        <header className="bg-indigo-950 text-amber-50 py-6 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <h1 className="text-3xl font-bold">tAIrot</h1>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-xl p-12 shadow-md">
            <div className="text-6xl mb-6">🔮</div>
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">
              Your Reading is Being Prepared
            </h2>
            <p className="text-lg text-stone-600 mb-6">
              Your cards are being pulled and interpreted with care. You&apos;ll
              receive an email when your reading is ready (within 24 hours).
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error === "notfound") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
        <header className="bg-indigo-950 text-amber-50 py-6 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <h1 className="text-3xl font-bold">tAIrot</h1>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-xl p-12 shadow-md">
            <div className="text-6xl mb-6">🤔</div>
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">
              Reading Not Found
            </h2>
            <p className="text-lg text-stone-600 mb-6">
              We couldn&apos;t find this reading. It may have been removed or
              the link is incorrect.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const positions = getSpreadPositions(reading.spread_id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="bg-indigo-950 text-amber-50 py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-300" />
          <h1 className="text-3xl font-bold">tAIrot</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-950 mb-3">
            Your Reading is Complete
          </h2>
          <p className="text-xl text-stone-600">{reading.spread_name}</p>
        </div>

        {/* Cards Display */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-8">
          <h3 className="text-2xl font-bold text-indigo-950 mb-6 text-center">
            Your Cards
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {reading.selected_cards.map((card, idx) => (
              <div key={idx} className="text-center">
                <p className="text-sm font-semibold text-stone-600 mb-3">
                  {positions[idx]}
                </p>
                <div
                  className={`h-48 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                    suitColors[card.suit]
                  } text-white shadow-lg mb-3`}
                >
                  <div className="text-center px-4">
                    <p className="font-bold text-lg mb-1">{card.name}</p>
                    <p className="text-xs opacity-80">{card.arcana}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-indigo-950 mb-6">
            Your Interpretation
          </h3>
          <div className="prose prose-stone max-w-none">
            <div className="text-stone-700 leading-relaxed whitespace-pre-wrap">
              {reading.interpretation}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-stone-600 mb-4">For entertainment purposes only</p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition"
          >
            Get Another Reading
          </button>
        </div>
      </div>
    </div>
  );
}
