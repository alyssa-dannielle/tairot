import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { readingId } = await request.json();

    // Fetch the reading from database
    const { data: reading, error: fetchError } = await supabase
      .from("readings")
      .select("*")
      .eq("id", readingId)
      .single();

    if (fetchError || !reading) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    // Build the prompt for AI
    const cards = reading.selected_cards;
    const spreadPositions = getSpreadPositions(reading.spread_id);

    const prompt = `You are an intuitive and empathetic tarot reader. Generate a detailed, personalized tarot reading based on the following information:

**Querent Information:**
- Name: ${reading.name}
${reading.sun_sign ? `- Sun Sign: ${reading.sun_sign}` : ""}
${reading.location ? `- Location: ${reading.location}` : ""}
- Context: ${reading.context}

**Spread:** ${reading.spread_name}

**Cards Drawn:**
${cards
  .map(
    (card, idx) => `- ${spreadPositions[idx]}: ${card.name} (${card.arcana})`
  )
  .join("\n")}

Please provide a comprehensive reading that:
1. Interprets each card in its position
2. Explains how the cards relate to each other
3. Addresses the querent's specific context and concerns
4. Offers guidance and insights
5. Maintains a warm, supportive, and mystical tone

Format the reading with clear sections for each card position, followed by an overall synthesis.`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a skilled and compassionate tarot reader who provides insightful, nuanced interpretations that honor both traditional tarot meanings and the unique context of each reading.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const interpretation = completion.choices[0].message.content;

    // Save interpretation to database
    const { error: updateError } = await supabase
      .from("readings")
      .update({
        interpretation: interpretation,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", readingId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      interpretation: interpretation,
    });
  } catch (error) {
    console.error("Error generating reading:", error);
    return NextResponse.json(
      { error: "Failed to generate reading", details: error.message },
      { status: 500 }
    );
  }
}

// Helper function
function getSpreadPositions(spreadId) {
  const spreads = {
    "past-present-future": ["Past", "Present", "Future"],
    "situation-action-outcome": ["Situation", "Action", "Outcome"],
    "mind-body-spirit": ["Mind", "Body", "Spirit"],
  };
  return spreads[spreadId] || ["Position 1", "Position 2", "Position 3"];
}
