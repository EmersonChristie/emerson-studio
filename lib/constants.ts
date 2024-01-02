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

export const BOX_SHADOW =
  "rgba(0, 0, 0, 0.043) 0.37237016456675937px 0.44377348139733286px 0.5793051374284405px 0px, rgba(0, 0, 0, 0.06) 0.8657897618972239px 1.0318080591723024px 1.3469297616353146px 0px, rgba(0, 0, 0, 0.075) 1.5547577922105507px 1.8528881844807665px 2.418773742338844px 0px, rgba(0, 0, 0, 0.086) 2.5803221177377376px 3.075108153864249px 4.014268599539516px 0px, rgba(0, 0, 0, 0.1) 4.2509936997828595px 5.066137013811576px 6.613372186585694px 0px, rgba(0, 0, 0, 0.118) 7.429504811692371px 8.854139050530355px 11.558257657323903px 0px, rgba(0, 0, 0, 0.16) 16.06969024216348px 19.151111077974452px 25px 0px";
