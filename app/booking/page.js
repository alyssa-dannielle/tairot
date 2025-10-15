"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Upload, AlertCircle, Calendar, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TairotBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spreadId = searchParams.get("spread");

  const [formData, setFormData] = useState({
    name: "",
    context: "",
    birthday: "",
    location: "",
    photo: null,
    ageConfirmed: false,
  });

  const [charCount, setCharCount] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [sunSign, setSunSign] = useState("");

  const spreads = {
    "past-present-future": {
      name: "Past • Present • Future",
      icon: "🌙",
      positions: ["Past", "Present", "Future"],
    },
    "situation-action-outcome": {
      name: "Situation • Action • Outcome",
      icon: "⭐",
      positions: ["Situation", "Action", "Outcome"],
    },
    "mind-body-spirit": {
      name: "Mind • Body • Spirit",
      icon: "✨",
      positions: ["Mind", "Body", "Spirit"],
    },
  };

  const selectedSpread = spreads[spreadId] || spreads["past-present-future"];
  const maxChars = 200;

  const calculateSunSign = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const signs = [
      { sign: "Capricorn", start: [12, 22], end: [1, 19] },
      { sign: "Aquarius", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", start: [2, 19], end: [3, 20] },
      { sign: "Aries", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", start: [5, 21], end: [6, 20] },
      { sign: "Cancer", start: [6, 21], end: [7, 22] },
      { sign: "Leo", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", start: [8, 23], end: [9, 22] },
      { sign: "Libra", start: [9, 23], end: [10, 22] },
      { sign: "Scorpio", start: [10, 23], end: [11, 21] },
      { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
    ];

    for (let s of signs) {
      const [startMonth, startDay] = s.start;
      const [endMonth, endDay] = s.end;

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return s.sign;
      }
    }

    return "";
  };

  const handleContextChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setFormData({ ...formData, context: text });
      setCharCount(text.length);
    }
  };

  const handleBirthdayChange = (e) => {
    const birthday = e.target.value;
    setFormData({ ...formData, birthday });
    setSunSign(calculateSunSign(birthday));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.context.trim() !== "" &&
      formData.ageConfirmed
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log("Form submitted:", formData);
      // TODO: Connect to Stripe payment
      alert(
        "Payment integration coming next! For now, this would go to Stripe checkout."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="bg-indigo-950 text-amber-50 py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <h1 className="text-3xl font-bold">tAIrot</h1>
          </div>
          <span className="text-sm text-amber-200">Step 1 of 2</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Selected Spread Summary */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{selectedSpread.icon}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-950 mb-1">
                {selectedSpread.name}
              </h2>
              <p className="text-stone-600 text-sm">Three-card reading • $5</p>
            </div>
            <div className="flex gap-2">
              {selectedSpread.positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="w-12 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-indigo-950 mb-2">
            Tell Me About Yourself
          </h3>
          <p className="text-stone-600 mb-8">
            Help me channel your energy while pulling your cards
          </p>

          <div className="space-y-6">
            {/* Name - Required */}
            <div>
              <label className="block text-sm font-semibold text-indigo-950 mb-2">
                Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="What should I call you?"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-500 focus:outline-none transition"
              />
            </div>

            {/* Context - Required */}
            <div>
              <label className="block text-sm font-semibold text-indigo-950 mb-2">
                What&apos;s on your mind?{" "}
                <span className="text-orange-600">*</span>
              </label>
              <textarea
                value={formData.context}
                onChange={handleContextChange}
                placeholder="Share what's bringing you here today..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-500 focus:outline-none transition resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-stone-500">
                  Be as specific or general as you&apos;d like
                </p>
                <span
                  className={`text-sm font-medium ${
                    charCount > maxChars - 20
                      ? "text-orange-600"
                      : "text-stone-500"
                  }`}
                >
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>

            {/* Birthday - Optional */}
            <div>
              <label className="block text-sm font-semibold text-indigo-950 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Birthday{" "}
                <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                type="date"
                value={formData.birthday}
                onChange={handleBirthdayChange}
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-500 focus:outline-none transition"
              />
              {sunSign && (
                <p className="mt-2 text-sm text-amber-700 font-medium flex items-center gap-1">
                  ✨ Sun Sign: {sunSign}
                </p>
              )}
            </div>

            {/* Location - Optional */}
            <div>
              <label className="block text-sm font-semibold text-indigo-950 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location{" "}
                <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="City, State or Country"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-500 focus:outline-none transition"
              />
            </div>

            {/* Photo Upload - Optional */}
            <div>
              <label className="block text-sm font-semibold text-indigo-950 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Photo{" "}
                <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <p className="text-xs text-stone-500 mb-3">
                Helps me connect with your energy
              </p>

              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition border-2 border-stone-200 hover:border-stone-300">
                    Choose Photo
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {photoPreview && (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border-2 border-amber-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setFormData({ ...formData, photo: null });
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Age Confirmation - Required */}
            <div className="pt-4 border-t-2 border-stone-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.ageConfirmed}
                  onChange={(e) =>
                    setFormData({ ...formData, ageConfirmed: e.target.checked })
                  }
                  className="w-5 h-5 mt-0.5 rounded border-2 border-stone-300 text-amber-600 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-stone-700 group-hover:text-stone-900 transition">
                  I am 18 years of age or older and understand this reading is
                  for entertainment purposes only.
                </span>
              </label>
            </div>

            {/* Info Box */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-indigo-900">
                <p className="font-semibold mb-1">
                  Your information is private
                </p>
                <p className="text-indigo-700">
                  I&apos;ll use these details only to channel your energy and
                  provide your reading. Nothing is shared or stored beyond your
                  session.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full py-4 rounded-xl font-bold text-lg transition shadow-lg ${
                isFormValid()
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 hover:shadow-xl"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              {isFormValid()
                ? "Continue to Payment →"
                : "Please complete required fields"}
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/")}
            className="text-stone-600 hover:text-stone-800 text-sm font-medium transition"
          >
            ← Back to spreads
          </button>
        </div>
      </div>
    </div>
  );
}
