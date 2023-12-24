export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    type: "cubic-bezier",
    duration: 4, // transform duration
    ease: [0.18, 1, 0.21, 1],
    opacity: {
      duration: 1.5, // opacity duration
      ease: [0.18, 1, 0.21, 1],
    },
  },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "cubic-bezier",
      duration: 4, // transform duration
      ease: [0.18, 1, 0.21, 1],
      opacity: {
        duration: 2.5, // opacity duration
        ease: [0.18, 1, 0.21, 1],
      },
    },
  },
};

export const FADE_UP_ANIMATION = {
  variants: { ...FADE_UP_ANIMATION_VARIANTS },
  initial: "hidden",
  animate: "show",
};

export const DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent&project-name=precedent&repository-name=precedent&demo-title=Precedent&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https%3A%2F%2Fprecedent.dev&demo-image=https%3A%2F%2Fprecedent.dev%2Fapi%2Fog&env=DATABASE_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent%2Fblob%2Fmain%2F.env.example";
