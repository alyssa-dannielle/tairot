"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  User,
  MapPin,
  Calendar,
  Search,
  ChevronRight,
} from "lucide-react";

export default function TairotAdminDashboard() {
  const [view, setView] = useState("pending"); // 'pending' or 'card-selection'
  const [selectedReading, setSelectedReading] = useState(null);
  const [selectedCards, setSelectedCards] = useState([null, null, null]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock pending readings data (will come from Supabase later)
  const pendingReadings = [
    {
      id: 1,
      name: "Sarah",
      spread: "Past • Present • Future",
      spreadId: "past-present-future",
      positions: ["Past", "Present", "Future"],
      context:
        "Feeling uncertain about a career change and wondering if I should take the leap or stay where I am.",
      birthday: "1992-09-15",
      sunSign: "Virgo",
      location: "Portland, OR",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      timestamp: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      name: "Alex",
      spread: "Mind • Body • Spirit",
      spreadId: "mind-body-spirit",
      positions: ["Mind", "Body", "Spirit"],
      context:
        "Working on self-growth and want to understand where I need to focus my energy.",
      birthday: "1988-03-22",
      sunSign: "Aries",
      location: "Austin, TX",
      photo: null,
      timestamp: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      name: "Jordan",
      spread: "Situation • Action • Outcome",
      spreadId: "situation-action-outcome",
      positions: ["Situation", "Action", "Outcome"],
      context:
        "Dealing with a complicated relationship situation and need guidance on how to move forward.",
      birthday: null,
      sunSign: null,
      location: "Brooklyn, NY",
      photo: null,
      timestamp: "8 hours ago",
      status: "pending",
    },
  ];

  // Simplified tarot deck (Major Arcana + few Minor for demo)
  const tarotDeck = [
    // Major Arcana
    { id: 0, name: "The Fool", suit: "major", arcana: "Major Arcana" },
    { id: 1, name: "The Magician", suit: "major", arcana: "Major Arcana" },
    {
      id: 2,
      name: "The High Priestess",
      suit: "major",
      arcana: "Major Arcana",
    },
    { id: 3, name: "The Empress", suit: "major", arcana: "Major Arcana" },
    { id: 4, name: "The Emperor", suit: "major", arcana: "Major Arcana" },
    { id: 5, name: "The Hierophant", suit: "major", arcana: "Major Arcana" },
    { id: 6, name: "The Lovers", suit: "major", arcana: "Major Arcana" },
    { id: 7, name: "The Chariot", suit: "major", arcana: "Major Arcana" },
    { id: 8, name: "Strength", suit: "major", arcana: "Major Arcana" },
    { id: 9, name: "The Hermit", suit: "major", arcana: "Major Arcana" },
    { id: 10, name: "Wheel of Fortune", suit: "major", arcana: "Major Arcana" },
    { id: 11, name: "Justice", suit: "major", arcana: "Major Arcana" },
    { id: 12, name: "The Hanged Man", suit: "major", arcana: "Major Arcana" },
    { id: 13, name: "Death", suit: "major", arcana: "Major Arcana" },
    { id: 14, name: "Temperance", suit: "major", arcana: "Major Arcana" },
    { id: 15, name: "The Devil", suit: "major", arcana: "Major Arcana" },
    { id: 16, name: "The Tower", suit: "major", arcana: "Major Arcana" },
    { id: 17, name: "The Star", suit: "major", arcana: "Major Arcana" },
    { id: 18, name: "The Moon", suit: "major", arcana: "Major Arcana" },
    { id: 19, name: "The Sun", suit: "major", arcana: "Major Arcana" },
    { id: 20, name: "Judgement", suit: "major", arcana: "Major Arcana" },
    { id: 21, name: "The World", suit: "major", arcana: "Major Arcana" },
    // Wands
    { id: 22, name: "Ace of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 23, name: "Two of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 24, name: "Three of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 25, name: "Four of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 26, name: "Five of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 27, name: "Six of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 28, name: "Seven of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 29, name: "Eight of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 30, name: "Nine of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 31, name: "Ten of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 32, name: "Page of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 33, name: "Knight of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 34, name: "Queen of Wands", suit: "wands", arcana: "Minor Arcana" },
    { id: 35, name: "King of Wands", suit: "wands", arcana: "Minor Arcana" },
    // Cups
    { id: 36, name: "Ace of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 37, name: "Two of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 38, name: "Three of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 39, name: "Four of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 40, name: "Five of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 41, name: "Six of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 42, name: "Seven of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 43, name: "Eight of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 44, name: "Nine of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 45, name: "Ten of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 46, name: "Page of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 47, name: "Knight of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 48, name: "Queen of Cups", suit: "cups", arcana: "Minor Arcana" },
    { id: 49, name: "King of Cups", suit: "cups", arcana: "Minor Arcana" },
    // Swords
    { id: 50, name: "Ace of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 51, name: "Two of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 52, name: "Three of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 53, name: "Four of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 54, name: "Five of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 55, name: "Six of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 56, name: "Seven of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 57, name: "Eight of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 58, name: "Nine of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 59, name: "Ten of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 60, name: "Page of Swords", suit: "swords", arcana: "Minor Arcana" },
    {
      id: 61,
      name: "Knight of Swords",
      suit: "swords",
      arcana: "Minor Arcana",
    },
    { id: 62, name: "Queen of Swords", suit: "swords", arcana: "Minor Arcana" },
    { id: 63, name: "King of Swords", suit: "swords", arcana: "Minor Arcana" },
    // Pentacles
    {
      id: 64,
      name: "Ace of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 65,
      name: "Two of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 66,
      name: "Three of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 67,
      name: "Four of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 68,
      name: "Five of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 69,
      name: "Six of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 70,
      name: "Seven of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 71,
      name: "Eight of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 72,
      name: "Nine of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 73,
      name: "Ten of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 74,
      name: "Page of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 75,
      name: "Knight of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 76,
      name: "Queen of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
    {
      id: 77,
      name: "King of Pentacles",
      suit: "pentacles",
      arcana: "Minor Arcana",
    },
  ];

  const handleCardSelect = (card, position) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[position] = card;
    setSelectedCards(newSelectedCards);
  };

  const handleStartReading = (reading) => {
    setSelectedReading(reading);
    setSelectedCards([null, null, null]);
    setView("card-selection");
  };

  const handleGenerateReading = () => {
    console.log("Generating reading for:", selectedReading);
    console.log("Selected cards:", selectedCards);
    // Will connect to AI API
    alert(
      "Reading generated! (In production, this will call the AI API and notify the user)"
    );
    setView("pending");
    setSelectedReading(null);
  };

  const allCardsSelected = selectedCards.every((card) => card !== null);

  const filteredDeck = tarotDeck.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suitColors = {
    major: "from-purple-400 to-indigo-500",
    wands: "from-orange-400 to-red-500",
    cups: "from-blue-400 to-cyan-500",
    swords: "from-gray-400 to-slate-600",
    pentacles: "from-green-400 to-emerald-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="bg-indigo-950 text-amber-50 py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <h1 className="text-3xl font-bold">tAIrot Admin</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-amber-200">Daily Limit</p>
              <p className="text-lg font-bold">{pendingReadings.length} / 3</p>
            </div>
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-bold">
              You
            </div>
          </div>
        </div>
      </header>

      {view === "pending" && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-stone-700">Pending</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-950">
                {pendingReadings.length}
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Waiting for your pull
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-stone-700">
                  Completed Today
                </h3>
              </div>
              <p className="text-3xl font-bold text-indigo-950">0</p>
              <p className="text-sm text-stone-500 mt-1">You're doing great!</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-stone-700">Slots Left</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-950">
                {3 - pendingReadings.length}
              </p>
              <p className="text-sm text-stone-500 mt-1">Available today</p>
            </div>
          </div>

          {/* Pending Readings */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b-2 border-stone-100">
              <h2 className="text-2xl font-bold text-indigo-950">
                Pending Readings
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              {pendingReadings.map((reading) => (
                <div
                  key={reading.id}
                  className="p-6 hover:bg-amber-50 transition"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-6 flex-1">
                      {/* Photo - if it exists */}
                      {reading.photo && (
                        <div className="flex-shrink-0">
                          <img
                            src={reading.photo}
                            alt={reading.name}
                            className="w-24 h-24 rounded-lg object-cover border-2 border-amber-300 shadow-md"
                          />
                        </div>
                      )}

                      {/* Main content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-indigo-950">
                            {reading.name}
                          </h3>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                            {reading.timestamp}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-semibold text-stone-600 mb-1">
                              Spread
                            </p>
                            <p className="text-stone-800">{reading.spread}</p>
                          </div>

                          {reading.sunSign && (
                            <div>
                              <p className="text-sm font-semibold text-stone-600 mb-1 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Sun Sign
                              </p>
                              <p className="text-stone-800">
                                {reading.sunSign}
                              </p>
                            </div>
                          )}

                          {reading.location && (
                            <div>
                              <p className="text-sm font-semibold text-stone-600 mb-1 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                Location
                              </p>
                              <p className="text-stone-800">
                                {reading.location}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-stone-50 rounded-lg p-4 border-2 border-stone-100">
                          <p className="text-sm font-semibold text-stone-600 mb-2">
                            Context
                          </p>
                          <p className="text-stone-700 leading-relaxed">
                            {reading.context}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartReading(reading)}
                      className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                    >
                      Start Reading
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "card-selection" && selectedReading && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Reading Info Header */}
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <button
              onClick={() => setView("pending")}
              className="text-stone-600 hover:text-stone-800 text-sm font-medium mb-4 flex items-center gap-1"
            >
              ← Back to pending
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-indigo-950 mb-2">
                  Reading for {selectedReading.name}
                </h2>
                <p className="text-stone-600">{selectedReading.spread}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-stone-600 mb-1">Cards Selected</p>
                <p className="text-2xl font-bold text-indigo-950">
                  {selectedCards.filter((c) => c !== null).length} / 3
                </p>
              </div>
            </div>
          </div>

          {/* Selected Cards Preview */}
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <h3 className="text-xl font-bold text-indigo-950 mb-4">
              Your Pull
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {selectedReading.positions.map((position, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-sm font-semibold text-stone-600 mb-3">
                    {position}
                  </p>
                  <div
                    className={`h-48 rounded-xl flex items-center justify-center transition ${
                      selectedCards[idx]
                        ? `bg-gradient-to-br ${
                            suitColors[selectedCards[idx].suit]
                          } text-white shadow-lg`
                        : "bg-stone-100 border-2 border-dashed border-stone-300"
                    }`}
                  >
                    {selectedCards[idx] ? (
                      <div className="text-center px-4">
                        <p className="font-bold text-lg mb-1">
                          {selectedCards[idx].name}
                        </p>
                        <p className="text-xs opacity-80">
                          {selectedCards[idx].arcana}
                        </p>
                      </div>
                    ) : (
                      <p className="text-stone-400 text-sm">Select a card</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Deck */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-indigo-950">
                Select Cards from Deck
              </h3>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-stone-200 rounded-lg focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto p-2">
              {filteredDeck.map((card) => {
                const isSelected = selectedCards.some((c) => c?.id === card.id);
                const nextEmptyPosition = selectedCards.findIndex(
                  (c) => c === null
                );

                return (
                  <button
                    key={card.id}
                    onClick={() =>
                      !isSelected &&
                      nextEmptyPosition !== -1 &&
                      handleCardSelect(card, nextEmptyPosition)
                    }
                    disabled={isSelected || nextEmptyPosition === -1}
                    className={`h-32 rounded-lg flex items-center justify-center text-center p-3 transition ${
                      isSelected
                        ? "bg-stone-200 opacity-50 cursor-not-allowed"
                        : `bg-gradient-to-br ${
                            suitColors[card.suit]
                          } text-white hover:shadow-xl hover:scale-105 cursor-pointer`
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm mb-1">{card.name}</p>
                      <p className="text-xs opacity-80">{card.arcana}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleGenerateReading}
              disabled={!allCardsSelected}
              className={`px-12 py-5 rounded-xl font-bold text-xl transition shadow-lg ${
                allCardsSelected
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 hover:shadow-xl"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              {allCardsSelected
                ? "Generate AI Reading ✨"
                : "Select all 3 cards to continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
