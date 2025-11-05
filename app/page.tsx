import Image from 'next/image';
import { ChatPanel } from './components/ChatPanel';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row">
      <section className="flex flex-1 flex-col justify-center gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mcdonalds-yellow/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mcdonalds-red">
          McAssistant Beta
        </span>
        <h1 className="text-4xl font-black tracking-tight text-mcdonalds-dark sm:text-5xl">
          Your McDonald&apos;s AI crew member for crave-worthy decisions.
        </h1>
        <p className="text-base text-mcdonalds-dark/80">
          Discover menu items, build combos, check calories, and prep mobile orders with an assistant tuned
          to McDonald&apos;s hospitality. Ask questions, get recommendations, and head to the app to finish your
          order.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-mcdonalds-yellow/40 bg-white/80 p-4 shadow-sm">
            <p className="text-sm font-semibold text-mcdonalds-red">Menu intelligence</p>
            <p className="mt-1 text-xs text-mcdonalds-dark/70">
              Ask about burgers, breakfast, sides, or seasonal treats and get price, calories, and descriptions.
            </p>
          </div>
          <div className="rounded-2xl border border-mcdonalds-yellow/40 bg-white/80 p-4 shadow-sm">
            <p className="text-sm font-semibold text-mcdonalds-red">Deals on demand</p>
            <p className="mt-1 text-xs text-mcdonalds-dark/70">
              Explore current offers and loyalty perks you can redeem in the McDonald&apos;s app.
            </p>
          </div>
          <div className="rounded-2xl border border-mcdonalds-yellow/40 bg-white/80 p-4 shadow-sm">
            <p className="text-sm font-semibold text-mcdonalds-red">Custom combos</p>
            <p className="mt-1 text-xs text-mcdonalds-dark/70">
              Describe your craving and McAssistant builds a meal plan with the perfect pairings.
            </p>
          </div>
          <div className="rounded-2xl border border-mcdonalds-yellow/40 bg-white/80 p-4 shadow-sm">
            <p className="text-sm font-semibold text-mcdonalds-red">Nutrition clarity</p>
            <p className="mt-1 text-xs text-mcdonalds-dark/70">
              Quickly surface calories, allergens, and ingredient flags for peace of mind.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col">
        <div className="relative mb-6 hidden h-40 rounded-3xl bg-mcdonalds-red/90 px-6 py-4 text-white shadow-xl lg:block">
          <div className="flex h-full items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">Featured combo</p>
              <p className="text-2xl font-bold">Big Mac Happiness Set</p>
              <p className="mt-1 text-sm text-white/80">Pair with World Famous Fries &amp; an icy Coke.</p>
            </div>
            <Image
              src="https://images.ctfassets.net/mcd9xr3s1e00/6b5OJrCdmYjsO3YtSQb8X1/9e0f0f399db0212b10f29c709c793676/big-mac.png"
              alt="Big Mac combo"
              width={160}
              height={160}
              className="absolute -top-10 right-6 drop-shadow-xl"
            />
          </div>
        </div>
        <ChatPanel />
      </section>
    </main>
  );
}
