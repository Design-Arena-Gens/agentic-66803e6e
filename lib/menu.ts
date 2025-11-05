export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  tags?: string[];
};

export const menu: MenuCategory[] = [
  {
    id: 'burgers',
    name: 'Burgers & Sandwiches',
    items: [
      {
        id: 'big-mac',
        name: 'Big Mac',
        description: 'Two 100% beef patties, Special Sauce, lettuce, cheese, pickles, onions on a sesame seed bun.',
        price: 5.99,
        calories: 550,
        tags: ['classic', 'beef']
      },
      {
        id: 'quarter-pounder-cheese',
        name: 'Quarter Pounder with Cheese',
        description: 'Quarter-pound beef patty with melty cheese, onions, pickles, ketchup, and mustard.',
        price: 5.79,
        calories: 520,
        tags: ['beef', 'cheese']
      },
      {
        id: 'mcchicken',
        name: 'McChicken',
        description: 'Crispy chicken patty, shredded lettuce, and mayo on a toasted bun.',
        price: 3.59,
        calories: 400,
        tags: ['chicken']
      }
    ]
  },
  {
    id: 'breakfast',
    name: 'All Day Breakfast',
    items: [
      {
        id: 'egg-mcmuffin',
        name: 'Egg McMuffin',
        description: 'Freshly cracked egg on a toasted English muffin with Canadian bacon and cheese.',
        price: 3.99,
        calories: 300,
        tags: ['breakfast', 'egg']
      },
      {
        id: 'hotcakes',
        name: 'Hotcakes',
        description: 'Three golden brown pancakes served with butter and syrup.',
        price: 2.99,
        calories: 580,
        tags: ['breakfast', 'sweet']
      }
    ]
  },
  {
    id: 'sides',
    name: 'Sides & Snacks',
    items: [
      {
        id: 'fries-medium',
        name: 'World Famous Fries',
        description: 'Crispy golden fries lightly salted to perfection.',
        price: 2.79,
        calories: 320,
        tags: ['vegetarian', 'side']
      },
      {
        id: 'apple-slices',
        name: 'Apple Slices',
        description: 'Fresh, crisp apple slices for a light snack.',
        price: 1.29,
        calories: 15,
        tags: ['vegan', 'kids']
      }
    ]
  },
  {
    id: 'drinks',
    name: 'Beverages',
    items: [
      {
        id: 'coke-medium',
        name: 'Coca-Cola',
        description: 'Classic Coke served ice cold.',
        price: 1.99,
        calories: 210,
        tags: ['drink']
      },
      {
        id: 'caramel-frappé',
        name: 'Caramel Frappé',
        description: 'Icy caramel coffee drink topped with whipped cream and caramel drizzle.',
        price: 3.99,
        calories: 510,
        tags: ['coffee', 'sweet']
      }
    ]
  }
];

export const deals = [
  {
    id: 'mix-and-match',
    title: 'Mix & Match for $5',
    description: 'Pick any two: McDouble, McChicken, or Small Fries.'
  },
  {
    id: 'coffee-club',
    title: 'McCafé Rewards',
    description: 'Buy 5 McCafé beverages, get the 6th free.'
  },
  {
    id: 'happy-meal',
    title: 'Happy Meal Surprise',
    description: 'Free apple slices upgrade with every Happy Meal this week.'
  }
];

export function findMenuItem(query: string) {
  const normalized = query.trim().toLowerCase();
  return menu
    .flatMap((category) => category.items.map((item) => ({ ...item, category: category.name })))
    .filter((item) =>
      [item.name, item.description, ...(item.tags ?? [])].some((value) =>
        value.toLowerCase().includes(normalized)
      )
    );
}
