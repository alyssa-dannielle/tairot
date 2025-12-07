# tAIrot 🔮

**Human intuition. AI interpretation.**

tAIrot is a tarot reading web application that combines the personal touch of hand-pulled cards with the comprehensive analysis of AI. Users request readings, I pull the cards manually, and AI generates personalized interpretations based on centuries of tarot wisdom.

## Features

- 🌙 Three unique 3-card spreads (Past-Present-Future, Situation-Action-Outcome, Mind-Body-Spirit)
- 🎴 Human-pulled tarot cards for authentic energy channeling
- 🤖 AI-powered interpretations using OpenAI GPT-4
- 📧 Email delivery within 24 hours
- 💰 Simple $5 per reading pricing (Stripe integration coming soon)
- 🎯 Admin dashboard for managing readings

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 15 with App Router
- **Frontend**: React 19 + Tailwind CSS
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **AI**: [OpenAI API](https://openai.com/api/)
- **Payments**: Stripe (coming soon)
- **Email**: Resend (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://app.supabase.com))
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd tairot
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

You can find your Supabase credentials in your [Supabase project settings](https://app.supabase.com).

4. **Set up the database**

In your Supabase project, create a `readings` table with the following schema:

```sql
create table readings (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  context text not null,
  birthday date,
  sun_sign text,
  location text,
  photo_url text,
  spread_id text not null,
  spread_name text not null,
  selected_cards jsonb,
  bottom_of_deck jsonb,
  interpretation text,
  status text not null default 'pending',
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Admin Dashboard

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) to:

- View pending reading requests
- Manually select cards for each reading
- Generate AI interpretations
- Track completed readings

## Project Structure

```
tairot/
├── app/
│   ├── page.js              # Landing page with spread selection
│   ├── booking/page.js      # User booking form
│   ├── admin/page.js        # Admin dashboard
│   ├── reading/[id]/page.js # Individual reading display
│   └── api/
│       └── generate-reading/route.js  # AI interpretation API
├── lib/
│   └── supabase.js          # Supabase client setup
└── public/                  # Static assets
```

## How It Works

1. **User Journey**:

   - User selects a 3-card spread
   - User fills out booking form with name, context, and optional details
   - Reading request is saved to database with `pending` status

2. **Admin Process**:

   - Admin views pending requests in dashboard
   - Admin manually selects 3 cards + bottom of deck card
   - Admin triggers AI interpretation generation

3. **AI Generation**:

   - OpenAI GPT-4 analyzes the cards in context of user's information
   - Interpretation is saved to database
   - Status updated to `completed`

4. **Delivery**:
   - User receives email notification (coming soon)
   - User can view reading at unique URL

## Roadmap

- [ ] Stripe payment integration
- [ ] Email notifications via Resend
- [ ] Photo upload to Supabase Storage
- [ ] Reading history for users
- [ ] More spread types
- [ ] Mobile app

## For Entertainment Purposes Only

This app is designed for entertainment and personal reflection. It is not a substitute for professional advice.

## License

MIT

---

Built with ✨ by Alyssa and AI
