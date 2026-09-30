// Photo credits — every image in /public was sourced from Unsplash (free license,
// no attribution legally required, but credited here per our own content rules).
// Rendered on /credits. Do not remove an entry without removing the matching file.

export type Credit = {
  file: string; // path relative to /public
  photographer: string; // Unsplash @username
  profileUrl: string;
};

const u = (username: string) => `https://unsplash.com/@${username}`;

export const credits: Credit[] = [
  // Site hero
  { file: "/hero.jpg", photographer: "one23four56", profileUrl: u("one23four56") },

  // Featured project heroes
  { file: "/featured/lodhi-residence-hero.jpg", photographer: "apyfz", profileUrl: u("apyfz") },
  { file: "/featured/farmhouse-chhatarpur-hero.jpg", photographer: "palle1958", profileUrl: u("palle1958") },
  { file: "/featured/penthouse-gurugram-hero.jpg", photographer: "aalolens", profileUrl: u("aalolens") },

  // Interiors
  { file: "/projects/interiors/interior-01.jpg", photographer: "itsbilalmn", profileUrl: u("itsbilalmn") },
  { file: "/projects/interiors/interior-02.jpg", photographer: "krummly", profileUrl: u("krummly") },
  { file: "/projects/interiors/interior-03.jpg", photographer: "alanrost", profileUrl: u("alanrost") },
  { file: "/projects/interiors/interior-04.jpg", photographer: "jonathanrudic_", profileUrl: u("jonathanrudic_") },
  { file: "/projects/interiors/interior-05.jpg", photographer: "rohitbhusan", profileUrl: u("rohitbhusan") },
  { file: "/projects/interiors/interior-06.jpg", photographer: "saylessstudio", profileUrl: u("saylessstudio") },
  { file: "/projects/interiors/interior-07.jpg", photographer: "cloudett", profileUrl: u("cloudett") },
  { file: "/projects/interiors/interior-08.jpg", photographer: "ryangeller", profileUrl: u("ryangeller") },
  { file: "/projects/interiors/interior-09.jpg", photographer: "poojanclicks", profileUrl: u("poojanclicks") },
  { file: "/projects/interiors/interior-10.jpg", photographer: "davidkristianto", profileUrl: u("davidkristianto") },
  { file: "/projects/interiors/interior-11.jpg", photographer: "chonky_films", profileUrl: u("chonky_films") },
  { file: "/projects/interiors/interior-12.jpg", photographer: "kevinlieder", profileUrl: u("kevinlieder") },

  // Exteriors
  { file: "/projects/exteriors/exterior-01.jpg", photographer: "assa_999", profileUrl: u("assa_999") },
  { file: "/projects/exteriors/exterior-02.jpg", photographer: "sumanpathak002", profileUrl: u("sumanpathak002") },
  { file: "/projects/exteriors/exterior-03.jpg", photographer: "woodkell", profileUrl: u("woodkell") },
  { file: "/projects/exteriors/exterior-04.jpg", photographer: "sthomanns", profileUrl: u("sthomanns") },
  { file: "/projects/exteriors/exterior-05.jpg", photographer: "shotbyjoe", profileUrl: u("shotbyjoe") },
  { file: "/projects/exteriors/exterior-06.jpg", photographer: "moritz_photography", profileUrl: u("moritz_photography") },
  { file: "/projects/exteriors/exterior-07.jpg", photographer: "griyabangun", profileUrl: u("griyabangun") },
  { file: "/projects/exteriors/exterior-08.jpg", photographer: "gautam_prajapattt_", profileUrl: u("gautam_prajapattt_") },
  { file: "/projects/exteriors/exterior-09.jpg", photographer: "albrown112", profileUrl: u("albrown112") },
  { file: "/projects/exteriors/exterior-10.jpg", photographer: "tonny_huang", profileUrl: u("tonny_huang") },
  { file: "/projects/exteriors/exterior-11.jpg", photographer: "yakubudo", profileUrl: u("yakubudo") },

  // Material studies
  { file: "/projects/material-studies/material-01.jpg", photographer: "nssaremi", profileUrl: u("nssaremi") },
  { file: "/projects/material-studies/material-02.jpg", photographer: "sthomanns", profileUrl: u("sthomanns") },
  { file: "/projects/material-studies/material-03.jpg", photographer: "e_solyom", profileUrl: u("e_solyom") },
  { file: "/projects/material-studies/material-04.jpg", photographer: "gabiontheroad", profileUrl: u("gabiontheroad") },
  { file: "/projects/material-studies/material-05.jpg", photographer: "enginakyurt", profileUrl: u("enginakyurt") },
  { file: "/projects/material-studies/material-06.jpg", photographer: "sjobjio", profileUrl: u("sjobjio") },
  { file: "/projects/material-studies/material-07.jpg", photographer: "hieptltb97", profileUrl: u("hieptltb97") },
  { file: "/projects/material-studies/material-08.jpg", photographer: "olga_o", profileUrl: u("olga_o") },
  { file: "/projects/material-studies/material-09.jpg", photographer: "enginakyurt", profileUrl: u("enginakyurt") },

  // Modeling (physical architectural scale models)
  { file: "/projects/modeling/model-01.jpg", photographer: "thisisnando", profileUrl: u("thisisnando") },
  { file: "/projects/modeling/model-02.jpg", photographer: "thisisnando", profileUrl: u("thisisnando") },
  { file: "/projects/modeling/model-03.jpg", photographer: "hdbernd", profileUrl: u("hdbernd") },
  { file: "/projects/modeling/model-04.jpg", photographer: "declansun", profileUrl: u("declansun") },
  { file: "/projects/modeling/model-05.jpg", photographer: "urbanrival", profileUrl: u("urbanrival") },
  { file: "/projects/modeling/model-06.jpg", photographer: "lorem_ipsuman", profileUrl: u("lorem_ipsuman") },

  // 3D Walkthroughs (architectural visualization / render-style photography)
  { file: "/projects/3d-walkthroughs/render-01.jpg", photographer: "shawko", profileUrl: u("shawko") },
  { file: "/projects/3d-walkthroughs/render-02.jpg", photographer: "muratdemircan", profileUrl: u("muratdemircan") },
  { file: "/projects/3d-walkthroughs/render-03.jpg", photographer: "muratdemircan", profileUrl: u("muratdemircan") },
  { file: "/projects/3d-walkthroughs/render-04.jpg", photographer: "maverickframe", profileUrl: u("maverickframe") },
  { file: "/projects/3d-walkthroughs/render-05.jpg", photographer: "maverickframe", profileUrl: u("maverickframe") },
  { file: "/projects/3d-walkthroughs/render-06.jpg", photographer: "muratdemircan", profileUrl: u("muratdemircan") },
];
