import { deals, findMenuItem, menu } from './menu';

export type Role = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  role: Role;
  content: string;
  timestamp?: number;
};

const storeHours = {
  weekdays: '6:00 AM – 11:00 PM',
  weekend: '6:00 AM – midnight'
};

const allergenGuide = {
  dairy: ['Big Mac', 'Quarter Pounder with Cheese', 'Caramel Frappé'],
  gluten: ['Big Mac', 'Quarter Pounder with Cheese', 'McChicken'],
  nuts: ['Caramel Frappé']
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function buildMenuResponse(query: string) {
  const results = findMenuItem(query);
  if (!results.length) {
    return "I couldn't find that on the menu right now, but I can help you explore burgers, chicken, breakfast, sides, or drinks. Let me know what you're craving!";
  }

  const top = results.slice(0, 3);
  const summary = top
    .map(
      (item) =>
        `• ${item.name} (${formatPrice(item.price)}) — ${item.description} ${item.calories} calories. Category: ${item.category}.`
    )
    .join('\n');

  const more =
    results.length > top.length
      ? `\nI have ${results.length - top.length} more options if you want to see them.`
      : '';

  return `${summary}${more}\nReady to add one of these to your order?`;
}

function handleAllergens(userInput: string) {
  const matches = Object.entries(allergenGuide)
    .filter(([allergen]) => userInput.includes(allergen))
    .map(([allergen, items]) => `• ${allergen.toUpperCase()}: ${items.join(', ')}`);

  if (!matches.length) {
    return undefined;
  }

  return `Here are some menu items that currently contain the ingredients you mentioned:\n${matches.join('\n')}\nLet me know if you need more detailed allergen info or alternative options.`;
}

function handleCombos(userInput: string) {
  const keywords = ['combo', 'meal', 'suggest', 'recommend', 'hungry'];
  if (!keywords.some((word) => userInput.includes(word))) {
    return undefined;
  }

  return `Here's a guest-loved lineup for a satisfying meal:\n• Big Mac Meal — Big Mac, Medium Fries, and a Medium Coke for a classic experience.\n• Chicken Favorite — Crispy McChicken with Tangy BBQ sauce, Small Fries, and a Sweet Tea.\n• McCafé Break — Hotcakes with a Caramel Frappé for breakfast vibes any time.\nWant me to start an order for one of these or customize it further?`;
}

function handleDeals(userInput: string) {
  if (!userInput.includes('deal') && !userInput.includes('special') && !userInput.includes('offer')) {
    return undefined;
  }

  const overview = deals
    .map((deal) => `• ${deal.title} — ${deal.description}`)
    .join('\n');

  return `Today's featured offers:\n${overview}\nYou can redeem these in the McDonald's app at checkout.`;
}

function handleGreetings(userInput: string) {
  const greetings = ['hi', 'hello', 'hey', 'howdy'];
  if (greetings.some((word) => userInput.startsWith(word))) {
    return `Hi there! I'm your McDonald's AI crew member. I can help with menu questions, deals, allergen info, and building the perfect order. What can I get started for you?`;
  }
  return undefined;
}

function handleHours(userInput: string) {
  const keywords = ['hour', 'open', 'close', 'time'];
  if (!keywords.some((word) => userInput.includes(word))) {
    return undefined;
  }

  return `Most restaurants open ${storeHours.weekdays} on weekdays and extend to ${storeHours.weekend} on weekends. Hours can vary, so tap the Store Locator in the McDonald's app or at mcdonalds.com to confirm your local restaurant.`;
}

function handleNutrition(userInput: string) {
  if (!userInput.includes('calorie') && !userInput.includes('nutrition')) {
    return undefined;
  }

  const matches = menu
    .flatMap((category) => category.items)
    .filter((item) => userInput.includes(item.name.toLowerCase()))
    .map((item) => `${item.name}: ${item.calories} calories per serving.`);

  if (matches.length) {
    return matches.join('\n');
  }

  return `I can share calorie counts, ingredients, and allergen flags for any menu item. Just let me know the name and I'll pull it up!`;
}

function handleLocations(userInput: string) {
  const locationKeywords = ['where', 'location', 'nearby', 'closest', 'address'];
  if (!locationKeywords.some((word) => userInput.includes(word))) {
    return undefined;
  }

  return `To find the closest McDonald's, open the McDonald's app or visit https://www.mcdonalds.com/store-locator and enable location services. You'll get directions, mobile order pickup options, and real-time hours.`;
}

function handleOrderCreation(userInput: string) {
  const intents = ['order', 'add', 'buy', 'get'];
  if (!intents.some((word) => userInput.includes(word))) {
    return undefined;
  }

  const results = findMenuItem(userInput);
  if (!results.length) {
    return `Sure, I can help with your order. Tell me the item name or category you want, like "add a Big Mac" or "get a caramel frappé".`;
  }

  const picks = results.slice(0, 2);
  const lines = picks.map((item) => `${item.name} (${formatPrice(item.price)}) added to your cart draft.`);

  return `${lines.join(' ')} When you're ready, confirm and I'll generate a handoff summary you can take into the McDonald's app to finish checkout.`;
}

function buildConversationSummary(history: ChatMessage[]) {
  const relevant = history.filter((message) => message.role === 'user').slice(-3);
  if (!relevant.length) {
    return '';
  }

  const prompts = relevant
    .map((message, index) => `${index + 1}. ${message.content}`)
    .join('\n');

  return `Just to recap what you've asked so far:\n${prompts}`;
}

const FALLBACK_RESPONSE =
  "I'm here to help with McDonald's menu recommendations, pricing, nutrition, and mobile order prep. Try asking for deals, allergen info, or a custom combo!";

const handlers = [
  handleGreetings,
  handleDeals,
  handleAllergens,
  handleCombos,
  handleHours,
  handleNutrition,
  handleOrderCreation,
  handleLocations
];

export function generateAgentResponse(history: ChatMessage[]): string {
  const latest = history.at(-1);
  if (!latest || latest.role !== 'user') {
    return FALLBACK_RESPONSE;
  }

  const userInput = latest.content.trim().toLowerCase();

  for (const handler of handlers) {
    const response = handler(userInput);
    if (response) {
      return response;
    }
  }

  if (/[?]/.test(userInput)) {
    return `${buildMenuResponse(userInput)}\n${buildConversationSummary(history)}`.trim();
  }

  const menuResponse = buildMenuResponse(userInput);
  if (!menuResponse.includes("couldn't")) {
    return menuResponse;
  }

  return FALLBACK_RESPONSE;
}

export function createSystemPrompt() {
  return `You are McAssistant, a friendly and efficient AI crew member for McDonald's guests. You:
- Always stay positive, upbeat, and concise.
- Offer specific menu recommendations with pricing and calories when you can.
- Suggest the McDonald's app for checkout and mobile order pickup.
- Remind guests that availability may vary by restaurant if mentioning limited items.
- Never ask for payment details; direct them to the app or in-restaurant kiosks instead.
- Promote current deals and popular combinations when relevant.`;
}
