export type GalleryCategory =
  | "Interiors"
  | "Exteriors"
  | "Material studies"
  | "Modeling"
  | "3D Walkthroughs";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  src: string;
  ratio: "4/5" | "1/1" | "3/4" | "16/9";
  title: string;
  location: string;
  year: string;
  caption: string;
};

const ratios: GalleryItem["ratio"][] = ["4/5", "1/1", "3/4", "16/9"];

function buildCategory(
  category: GalleryCategory,
  files: string[],
  titlePrefix: string,
  captions: string[],
): GalleryItem[] {
  return files.map((src, i) => ({
    id: `${category.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
    category,
    src,
    ratio: ratios[i % ratios.length],
    title: `${titlePrefix} ${String(i + 1).padStart(2, "0")}`,
    location: "New Delhi",
    year: String(2021 + (i % 4)),
    caption: captions[i % captions.length],
  }));
}

const interiorCaptions = [
  "Travertine and walnut, west light",
  "Living room, evening light",
  "Stair detail, brushed steel",
  "Cabinetry, ground floor",
  "Window seat, hand-block textile",
  "Corridor, lime plaster wall",
];

const exteriorCaptions = [
  "Facade, terracotta and stucco",
  "Courtyard walkway",
  "Archway, local stone",
  "Covered veranda",
  "Evening light, west facade",
];

const materialCaptions = [
  "Lime plaster, hand-finished",
  "Brushed brass, hardware detail",
  "Walnut grain, joinery sample",
  "Handwoven jute, natural fibre",
  "Jaipur hand-block textile",
];

const modelingCaptions = [
  "Massing study, 1:100",
  "Material & light study",
  "Section model, ground floor",
  "Working model, design stage",
];

const renderCaptions = [
  "Visualization, early massing",
  "Interior walkthrough still",
  "Material study, render pass",
];

export const gallery: GalleryItem[] = [
  ...buildCategory(
    "Interiors",
    [
      "/projects/interiors/interior-01.jpg",
      "/projects/interiors/interior-02.jpg",
      "/projects/interiors/interior-03.jpg",
      "/projects/interiors/interior-04.jpg",
      "/projects/interiors/interior-05.jpg",
      "/projects/interiors/interior-06.jpg",
      "/projects/interiors/interior-07.jpg",
      "/projects/interiors/interior-08.jpg",
      "/projects/interiors/interior-09.jpg",
      "/projects/interiors/interior-10.jpg",
      "/projects/interiors/interior-11.jpg",
      "/projects/interiors/interior-12.jpg",
    ],
    "Interior study",
    interiorCaptions,
  ),
  ...buildCategory(
    "Exteriors",
    [
      "/projects/exteriors/exterior-01.jpg",
      "/projects/exteriors/exterior-02.jpg",
      "/projects/exteriors/exterior-03.jpg",
      "/projects/exteriors/exterior-04.jpg",
      "/projects/exteriors/exterior-05.jpg",
      "/projects/exteriors/exterior-06.jpg",
      "/projects/exteriors/exterior-07.jpg",
      "/projects/exteriors/exterior-08.jpg",
      "/projects/exteriors/exterior-09.jpg",
      "/projects/exteriors/exterior-10.jpg",
      "/projects/exteriors/exterior-11.jpg",
    ],
    "Exterior study",
    exteriorCaptions,
  ),
  ...buildCategory(
    "Material studies",
    [
      "/projects/material-studies/material-01.jpg",
      "/projects/material-studies/material-02.jpg",
      "/projects/material-studies/material-03.jpg",
      "/projects/material-studies/material-04.jpg",
      "/projects/material-studies/material-05.jpg",
      "/projects/material-studies/material-06.jpg",
      "/projects/material-studies/material-07.jpg",
      "/projects/material-studies/material-08.jpg",
      "/projects/material-studies/material-09.jpg",
    ],
    "Material study",
    materialCaptions,
  ),
  ...buildCategory(
    "Modeling",
    [
      "/projects/modeling/model-01.jpg",
      "/projects/modeling/model-02.jpg",
      "/projects/modeling/model-03.jpg",
      "/projects/modeling/model-04.jpg",
      "/projects/modeling/model-05.jpg",
      "/projects/modeling/model-06.jpg",
    ],
    "Model",
    modelingCaptions,
  ),
  ...buildCategory(
    "3D Walkthroughs",
    [
      "/projects/3d-walkthroughs/render-01.jpg",
      "/projects/3d-walkthroughs/render-02.jpg",
      "/projects/3d-walkthroughs/render-03.jpg",
      "/projects/3d-walkthroughs/render-04.jpg",
      "/projects/3d-walkthroughs/render-05.jpg",
      "/projects/3d-walkthroughs/render-06.jpg",
    ],
    "Visualization",
    renderCaptions,
  ),
];

export const categoryCounts: Record<GalleryCategory, number> = gallery.reduce(
  (acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<GalleryCategory, number>,
);
