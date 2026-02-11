const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

const serializeField = (field: any) =>
  field ? JSON.stringify(field) : undefined;

async function main() {
  await prisma.recipe.deleteMany();

  const recipes = [
    {
      title: "Čokoladni kolač s orasima",
      lead: "Ukusan i sočan kolač s komadićima oraha, idealan za cijelu obitelj.",
      prepTimeMinutes: 60,
      servings: 8,
      difficulty: "MEDIUM",
      dishGroup: "DESSERT",
      preparationType: "BAKING",
      tags: ["čokolada", "kolač", "desert", "orah"],
      ingredients: [
        { name: "Brašno", amount: 250, unit: "g" },
        { name: "Šećer", amount: 150, unit: "g" },
        { name: "Maslac", amount: 100, unit: "g" },
        { name: "Jaja", amount: 3, unit: "kom" },
        { name: "Orasi", amount: 50, unit: "g" },
        { name: "Kakao", amount: 30, unit: "g" },
      ],
      steps: [
        "Zagrijati pećnicu na 180°C.",
        "Pomiješati maslac i šećer dok smjesa ne postane pjenasta.",
        "Dodati jaja i dobro umutiti.",
        "Umiješati brašno, kakao i nasjeckane orahe.",
        "Uliti smjesu u kalup i peći 35-40 minuta.",
        "Ohladiti i poslužiti.",
      ],
      heroImagePath: "/recipes/cokoladni-kolac-s-orasima/hero.jpg",
      heroImageAlt: "Čokoladni kolač s orasima na bijeloj podlozi",
    },
    {
      title: "Slana pita s povrćem",
      lead: "Brza i jednostavna pita s povrćem za svaki obrok.",
      prepTimeMinutes: 45,
      servings: 4,
      difficulty: "EASY",
      dishGroup: "MAIN",
      preparationType: "BAKING",
      tags: ["slanica", "pita", "povrće"],
      ingredients: [
        { name: "Kora za pitu", amount: 1, unit: "pak" },
        { name: "Špinat", amount: 200, unit: "g" },
        { name: "Sir feta", amount: 100, unit: "g" },
        { name: "Jaja", amount: 2, unit: "kom" },
        { name: "Maslinovo ulje", amount: 2, unit: "žlice" },
      ],
      steps: [
        "Zagrijati pećnicu na 200°C.",
        "Pomiješati špinat, sir i jaja u zdjeli.",
        "Razvaljati kore i složiti smjesu unutra.",
        "Peci 25-30 minuta dok pita ne postane zlatno-smeđa.",
        "Poslužiti toplo.",
      ],
      heroImagePath: "/recipes/slana-pita/hero.jpg",
      heroImageAlt: "Slana pita s povrćem",
    },
    {
      title: "Majoneza-salata s piletinom",
      lead: "Brza i kremasta salata s kuhanom piletinom i povrćem, idealna za sendviče ili kao prilog.",
      prepTimeMinutes: 20,
      servings: 4,
      difficulty: "EASY",
      dishGroup: "OTHER",
      preparationType: "NO_COOK",
      tags: ["salata", "piletina", "prilog"],
      ingredients: [
        { name: "Kuhana piletina", amount: 300, unit: "g" },
        { name: "Mrkva", amount: 100, unit: "g" },
        { name: "Grah", amount: 150, unit: "g" },
        { name: "Majoneza", amount: 100, unit: "g" },
        { name: "Sol i papar", amount: 1, unit: "žličica" },
      ],
      steps: [
        "Narezati piletinu na kockice.",
        "Skuhati mrkvu i grah i ohladiti.",
        "Pomiješati sve sastojke i začiniti po želji.",
        "Ohladiti u hladnjaku 30 minuta prije posluživanja.",
      ],
      heroImagePath: "/recipes/pileca-salata/hero.jpg",
      heroImageAlt: "Majoneza-salata s piletinom u zdjeli",
    },
    {
      title: "Klasični kruh",
      lead: "Mirisan domaći kruh s hrskavom koricom i mekanom sredinom.",
      prepTimeMinutes: 180,
      servings: 1,
      difficulty: "MEDIUM",
      dishGroup: "BREAD",
      preparationType: "BAKING",
      tags: ["kruh", "domaći", "pecivo"],
      ingredients: [
        { name: "Brašno", amount: 500, unit: "g" },
        { name: "Kvasac", amount: 20, unit: "g" },
        { name: "Voda", amount: 300, unit: "ml" },
        { name: "Sol", amount: 10, unit: "g" },
      ],
      steps: [
        "Pomiješati kvasac s toplom vodom i ostaviti 10 minuta.",
        "Dodati brašno i sol, zamijesiti tijesto.",
        "Ostaviti da se diže 60 minuta.",
        "Oblikovati kruh i peći 40-50 minuta na 220°C.",
        "Ohladiti i poslužiti.",
      ],
      heroImagePath: "/recipes/klasicni-kruh/hero.jpg",
      heroImageAlt: "Svježe pečen klasični kruh",
    },
    {
      title: "Voćna salata s jogurtom",
      lead: "Svježa i zdrava salata od raznog voća s jogurtom i medom.",
      prepTimeMinutes: 15,
      servings: 2,
      difficulty: "EASY",
      dishGroup: "OTHER",
      preparationType: "NO_COOK",
      tags: ["voće", "salata", "zdravo"],
      ingredients: [
        { name: "Jabuke", amount: 1, unit: "kom" },
        { name: "Banane", amount: 1, unit: "kom" },
        { name: "Kivi", amount: 2, unit: "kom" },
        { name: "Jogurt", amount: 150, unit: "ml" },
        { name: "Med", amount: 1, unit: "žlica" },
      ],
      steps: [
        "Narezati voće na kockice.",
        "Pomiješati s jogurtom i medom.",
        "Poslužiti odmah ili hladiti kratko prije posluživanja.",
      ],
      heroImagePath: "/recipes/vocna-salata/hero.jpg",
      heroImageAlt: "Voćna salata s jogurtom u zdjeli",
    },
    {
      title: "Smoothie od bobičastog voća",
      lead: "Ukusan i osvježavajući smoothie od šumskog voća, savršen za doručak ili užinu.",
      prepTimeMinutes: 10,
      servings: 2,
      difficulty: "EASY",
      dishGroup: "OTHER",
      preparationType: "NO_COOK",
      tags: ["smoothie", "voće", "zdravo"],
      ingredients: [
        { name: "Jagode", amount: 100, unit: "g" },
        { name: "Borovnice", amount: 100, unit: "g" },
        { name: "Maline", amount: 50, unit: "g" },
        { name: "Banana", amount: 1, unit: "kom" },
        { name: "Jogurt", amount: 200, unit: "ml" },
        { name: "Med", amount: 1, unit: "žlica" },
      ],
      steps: [
        "Staviti sve sastojke u blender.",
        "Blendati dok smjesa ne postane glatka i kremasta.",
        "Poslužiti odmah u čašama.",
      ],
      heroImagePath: "/recipes/smoothie-bobice/hero.jpg",
      heroImageAlt: "Smoothie od bobičastog voća u čaši",
    },
    {
      title: "Palačinke s Nutellom",
      lead: "Tanke i mekane palačinke, savršene za doručak ili desert uz Nutellu i voće.",
      prepTimeMinutes: 25,
      servings: 4,
      difficulty: "EASY",
      dishGroup: "DESSERT",
      preparationType: "COOKING",
      tags: ["palačinke", "Nutella", "desert", "brzo"],
      ingredients: [
        { name: "Brašno", amount: 200, unit: "g" },
        { name: "Jaja", amount: 2, unit: "kom" },
        { name: "Mlijeko", amount: 300, unit: "ml" },
        { name: "Maslac", amount: 20, unit: "g" },
        { name: "Nutella", amount: 100, unit: "g" },
        { name: "Voće po želji", amount: 0, unit: "" },
      ],
      steps: [
        "Pomiješati brašno, jaja i mlijeko dok ne bude glatko tijesto.",
        "Zagrijati tavu i premazati maslacem.",
        "Peci tanke palačinke s obje strane dok ne dobiju zlatnu boju.",
        "Namaži Nutellu i dodaj voće po želji.",
        "Poslužiti odmah.",
      ],
      heroImagePath: "/recipes/palacinke-nutella/hero.jpg",
      heroImageAlt: "Palačinke premazane Nutellom s voćem",
    },
    {
      title: "Rižoto s gljivama",
      lead: "Kremasti rižoto s gljivama i parmezanom, idealan za lagani ručak.",
      prepTimeMinutes: 40,
      servings: 2,
      difficulty: "MEDIUM",
      dishGroup: "MAIN",
      preparationType: "COOKING",
      tags: ["rižoto", "gljive", "ručak", "kremasto"],
      ingredients: [
        { name: "Riža za rižoto", amount: 150, unit: "g" },
        { name: "Gljive", amount: 200, unit: "g" },
        { name: "Luk", amount: 1, unit: "kom" },
        { name: "Maslac", amount: 30, unit: "g" },
        { name: "Parmezan", amount: 30, unit: "g" },
        { name: "Temeljac", amount: 400, unit: "ml" },
      ],
      steps: [
        "Na maslacu pirjati sitno nasjeckani luk dok ne postane staklast.",
        "Dodati gljive i kratko pirjati.",
        "Dodati rižu i miješati dok ne postane staklasta.",
        "Postepeno dodavati temeljac dok riža ne bude kremasta i kuhana.",
        "Umiješati parmezan i poslužiti toplo.",
      ],
      heroImagePath: "/recipes/rizoto-gljive/hero.jpg",
      heroImageAlt: "Kremasti rižoto s gljivama u zdjeli",
    },
    {
      title: "Tjestenina s pestom i cherry rajčicama",
      lead: "Brza i ukusna tjestenina s domaćim pestom i sočnim cherry rajčicama, idealna za ručak ili večeru.",
      prepTimeMinutes: 25,
      servings: 2,
      difficulty: "EASY",
      dishGroup: "MAIN",
      preparationType: "COOKING",
      tags: ["tjestenina", "pesto", "brzo", "glavno jelo"],
      ingredients: [
        { name: "Tjestenina (fusilli ili penne)", amount: 200, unit: "g" },
        { name: "Cherry rajčice", amount: 150, unit: "g" },
        { name: "Pesto", amount: 50, unit: "g" },
        { name: "Maslinovo ulje", amount: 1, unit: "žlica" },
        { name: "Parmezan", amount: 30, unit: "g" },
        { name: "Sol i papar", amount: 1, unit: "žličica" },
      ],
      steps: [
        "Skuhati tjesteninu prema uputama na pakiranju.",
        "U međuvremenu, prepoloviti cherry rajčice.",
        "Pomiješati tjesteninu s pestom, rajčicama i maslinovim uljem.",
        "Začiniti solju i paprom po ukusu.",
        "Poslužiti uz naribani parmezan.",
      ],
      heroImagePath: "/recipes/tjestenina-pesto/hero.jpg",
      heroImageAlt: "Tjestenina s pestom i cherry rajčicama u bijelom tanjuru",
    },
  ];

  for (const recipe of recipes) {
    const slug = slugify(recipe.title, { lower: true, strict: true });
    await prisma.recipe.create({
      data: {
        ...recipe,
        slug: slug,
        tags: serializeField(recipe.tags) || "[]",
        ingredients: serializeField(recipe.ingredients) || "[]",
        steps: serializeField(recipe.steps) || "[]",
      },
    });
  }

  console.log(`${recipes.length} recipes seeded successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
