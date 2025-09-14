import { Card, Carousel } from '@/components/ui/apple-cards-carousel';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import WorldMap from '@/components/ui/world-map';
import React from 'react';

const ProjectsList = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <>
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Descoperă proiectele noastre
      </h2>
      <Carousel items={cards} />
    </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </>
  );
};

const CardContent = ({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {name}
        </span>{" "}
        {description}
      </p>
      <img
        src={image}
        alt={name}
        className="w-full h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};


const data = [
  {
    category: 'Echipamente Agricole',
    title: 'Suport pentru achiziționarea de utilaje agricole moderne',
    src: 'https://i0.wp.com/cluju.ro/wp-content/uploads/2021/04/utilaje-agricole.jpg',
    content: (
      <CardContent
        name="Echipamente Agricole"
        description="Sprijin pentru achiziționarea de tractoare și combine moderne."
        image="https://i0.wp.com/cluju.ro/wp-content/uploads/2021/04/utilaje-agricole.jpg"
      />
    ),
  },
  {
    category: 'Semințe și Material Săditor',
    title: 'Subvenție pentru semințe și material săditor de calitate',
    src: 'https://agroexpert.md/pic/news/gallery/30299/Cereale.jpeg',
    content: (
      <CardContent
        name="Semințe și Material Săditor"
        description="Sprijin pentru achiziționarea de semințe certificate și material săditor."
        image="https://agroexpert.md/pic/news/gallery/30299/Cereale.jpeg"
      />
    ),
  },
  {
    category: 'Sisteme de Irigație',
    title: 'Finanțare pentru instalarea sistemelor de irigație',
    src: 'https://dilexis.md/wp-content/uploads/2025/03/IRIGARE-LIVADA.jpg',
    content: (
      <CardContent
        name="Sisteme de Irigație"
        description="Suport pentru instalarea sistemelor de irigație eficiente."
        image="https://dilexis.md/wp-content/uploads/2025/03/IRIGARE-LIVADA.jpg"
      />
    ),
  },
  {
    category: 'Creșterea Animalelor',
    title: 'Suport pentru achiziționarea de animale și echipamente',
    src: 'https://ecoferma.ro/wp-content/uploads/2020/01/2882673-1170x780.jpg',
    content: (
      <CardContent
        name="Creșterea Animalelor"
        description="Sprijin pentru achiziționarea de vaci și echipamente moderne."
        image="https://ecoferma.ro/wp-content/uploads/2020/01/2882673-1170x780.jpg"
      />
    ),
  },
  {
    category: 'Seră și Horticultură',
    title: 'Subvenție pentru construcția de sere și proiecte horticole',
    src: 'https://intercompanysolutions.com/wp-content/uploads/2022/04/Canva-Inside-plastic-covered-horticulture-greenhouse-scaled-e1623371548548-1200x675.jpg',
    content: (
      <CardContent
        name="Seră și Horticultură"
        description="Suport pentru construcția de sere și proiecte de horticultură."
        image="https://intercompanysolutions.com/wp-content/uploads/2022/04/Canva-Inside-plastic-covered-horticulture-greenhouse-scaled-e1623371548548-1200x675.jpg"
      />
    ),
  },
  {
    category: 'Apicultură',
    title: 'Suport pentru achiziționarea de echipamente apicole',
    src: 'https://ecostup.md/wp-content/uploads/2024/03/centrifugi_ecostup.jpg',
    content: (
      <CardContent
        name="Apicultură"
        description="Sprijin pentru achiziționarea de stupi și echipamente apicole."
        image="https://ecostup.md/wp-content/uploads/2024/03/centrifugi_ecostup.jpg"
      />
    ),
  },
];

const testimonials = [
  {
    quote:
      "AgroTech has transformed the way we manage our farms. With the digital cadastru and crop tracking system, we can now plan, monitor, and optimize every field with unprecedented precision.",
    name: "Ion Popescu",
    title: "Farm Manager, Ialoveni",
  },
  {
    quote:
      "The livestock tracking feature is a game-changer. We can instantly see quantities, contamination levels, and overall health metrics, which saves us time and reduces losses.",
    name: "Maria Rusu",
    title: "Livestock Owner, Anenii Noi",
  },
  {
    quote:
      "I love how user-friendly the interface is. Even someone with minimal tech experience can navigate through cadastru, crops, and livestock modules without confusion.",
    name: "Andrei Ceban",
    title: "Agricultural Consultant",
  },
  {
    quote:
      "Thanks to AgroTech, we now have reliable data on production and resources. This allows for smarter decisions and better reporting to local authorities.",
    name: "Elena Moraru",
    title: "Farm Operations Coordinator",
  },
  {
    quote:
      "The integration of crops and livestock management in one platform saves so much time. It’s efficient, reliable, and tailored to our local agricultural needs.",
    name: "Vlad Ursu",
    title: "Agritech Specialist",
  },
];


export default ProjectsList;
