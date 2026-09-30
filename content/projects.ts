export type FeaturedProject = {
  slug: string;
  title: string;
  type: string;
  location: string;
  area: string;
  year: string;
  scope: string;
  hero: string;
  description: string;
  quote: { text: string; role: string };
  gallery: { src: string; caption: string }[];
  materials: { label: string; note: string; swatch: string }[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "the-lodhi-residence",
    title: "The Lodhi Residence",
    type: "Residence",
    location: "New Delhi",
    area: "6,500 sq ft",
    year: "2023",
    scope: "Full renovation, interiors & landscape",
    hero: "/featured/lodhi-residence-hero.jpg",
    description:
      "A 1990s bungalow renovation for a joint family who wanted the house to feel quieter than it looked from the outside. Travertine and walnut carry the ground floor; the brief was restraint, not more square footage.",
    quote: {
      text: "[Client testimonial placeholder — real quote to be supplied]",
      role: "Homeowner, The Lodhi Residence",
    },
    gallery: [
      { src: "/projects/interiors/interior-06.jpg", caption: "Travertine and walnut, west light" },
      { src: "/projects/interiors/interior-07.jpg", caption: "Stair detail, brushed steel" },
      { src: "/projects/interiors/interior-08.jpg", caption: "Cabinetry, ground floor" },
      { src: "/projects/material-studies/material-01.jpg", caption: "Walnut ceiling detail" },
      { src: "/projects/interiors/interior-01.jpg", caption: "Living room, evening light" },
      { src: "/projects/interiors/interior-02.jpg", caption: "Reading corner, ground floor" },
      { src: "/projects/interiors/interior-03.jpg", caption: "West light, stairwell" },
      { src: "/projects/interiors/interior-05.jpg", caption: "Curtain detail, warm lamp" },
    ],
    materials: [
      { label: "Travertine", note: "Flooring, ground level", swatch: "/projects/material-studies/material-04.jpg" },
      { label: "Walnut", note: "Joinery & ceiling battens", swatch: "/projects/material-studies/material-01.jpg" },
      { label: "Brushed brass", note: "Hardware, stair rail", swatch: "/projects/material-studies/material-05.jpg" },
      { label: "Lime plaster", note: "Feature walls", swatch: "/projects/material-studies/material-06.jpg" },
      { label: "Handwoven jute", note: "Living room rug", swatch: "/projects/material-studies/material-09.jpg" },
    ],
  },
  {
    slug: "farmhouse-at-chhatarpur",
    title: "Farmhouse at Chhatarpur",
    type: "Farmhouse",
    location: "Chhatarpur, New Delhi",
    area: "2 acres",
    year: "2022",
    scope: "Architecture, interiors & courtyard landscape",
    hero: "/featured/farmhouse-chhatarpur-hero.jpg",
    description:
      "A weekend home built around three courtyards instead of one large lawn. Lime-plastered walls hold the heat out; every room opens onto stone and shade rather than a corridor.",
    quote: {
      text: "[Client testimonial placeholder — real quote to be supplied]",
      role: "Homeowner, Farmhouse at Chhatarpur",
    },
    gallery: [
      { src: "/projects/exteriors/exterior-08.jpg", caption: "Courtyard corridor, lime plaster" },
      { src: "/projects/exteriors/exterior-09.jpg", caption: "Courtyard walkway" },
      { src: "/projects/exteriors/exterior-10.jpg", caption: "Stone archway" },
      { src: "/projects/material-studies/material-06.jpg", caption: "Lime plaster, hand-finished" },
      { src: "/projects/exteriors/exterior-11.jpg", caption: "Covered walkway, benches" },
      { src: "/projects/exteriors/exterior-01.jpg", caption: "Facade, terracotta and stucco" },
      { src: "/projects/exteriors/exterior-02.jpg", caption: "Evening light, west facade" },
      { src: "/projects/material-studies/material-07.jpg", caption: "Stone doorway detail" },
    ],
    materials: [
      { label: "Lime plaster", note: "Exterior & courtyard walls", swatch: "/projects/material-studies/material-03.jpg" },
      { label: "Local stone", note: "Flooring & steps", swatch: "/projects/material-studies/material-07.jpg" },
      { label: "Teak", note: "Doors & window frames", swatch: "/projects/material-studies/material-02.jpg" },
      { label: "Jaipur hand-block textile", note: "Loose furnishings", swatch: "/projects/material-studies/material-09.jpg" },
      { label: "Brass", note: "Door hardware", swatch: "/projects/material-studies/material-05.jpg" },
    ],
  },
  {
    slug: "penthouse-gurugram",
    title: "Penthouse, Gurugram",
    type: "Apartment",
    location: "Gurugram",
    area: "4,200 sq ft",
    year: "2024",
    scope: "Interiors & styling",
    hero: "/featured/penthouse-gurugram-hero.jpg",
    description:
      "An NRI client's Delhi base, designed for a handful of weeks a year. Warm minimalism, so the apartment reads as lived-in rather than staged the moment they land.",
    quote: {
      text: "[Client testimonial placeholder — real quote to be supplied]",
      role: "Homeowner, Penthouse Gurugram",
    },
    gallery: [
      { src: "/projects/interiors/interior-09.jpg", caption: "Living room, brown leather" },
      { src: "/projects/interiors/interior-10.jpg", caption: "Lounge, city view" },
      { src: "/projects/interiors/interior-11.jpg", caption: "Daybed alcove" },
      { src: "/projects/interiors/interior-12.jpg", caption: "Living room, cream sofa" },
      { src: "/projects/material-studies/material-05.jpg", caption: "Brass surface detail" },
      { src: "/projects/material-studies/material-08.jpg", caption: "Walnut surface, joinery sample" },
      { src: "/projects/material-studies/material-04.jpg", caption: "Travertine, bathroom" },
      { src: "/projects/interiors/interior-04.jpg", caption: "Seating, evening light" },
    ],
    materials: [
      { label: "Walnut", note: "Joinery", swatch: "/projects/material-studies/material-08.jpg" },
      { label: "Brass", note: "Fixtures & hardware", swatch: "/projects/material-studies/material-05.jpg" },
      { label: "Wool bouclé", note: "Upholstery", swatch: "/projects/material-studies/material-09.jpg" },
      { label: "Travertine", note: "Bathroom & bar", swatch: "/projects/material-studies/material-04.jpg" },
    ],
  },
];

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug);
}
