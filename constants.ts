import { ProfileLink, StatItem } from './types';

export const PROFILE_DATA = {
  name: "神思庭",
  englishName: "Shen Si Ting",
  title: "灵愿循环数字宇宙主理人",
  englishTitle: "Master of the Spirit Wish Loop Digital Universe",
  org: "天算AI实验室",
  englishOrg: "TianSuan AI Lab",
  role: "超个体构建者",
  englishRole: "Super Individual Builder",
  contact: {
    wx: "Shensi-ST"
  },
  // Generates a logo-style avatar with the character "思" (Si) in Cyan on Slate background
  avatar: "https://ui-avatars.com/api/?name=思&background=0f172a&color=22d3ee&size=512&length=1&font-size=0.5&bold=true&rounded=true"
};

export const STATS: StatItem[] = [
  {
    label: "视觉创作",
    value: "20,000",
    subValue: "部AI短片",
    icon: "film"
  },
  {
    label: "音乐创作",
    value: "7,000",
    subValue: "分钟原创交响",
    icon: "music"
  }
];

export const COLLABORATIONS = [
  "NFT发行与策划",
  "数字内容版权授权",
  "前沿科技项目投资"
];

export const SOCIAL_LINKS: ProfileLink[] = [
  {
    label: "Web3 核心身份",
    url: "https://hey.xyz/u/mmmmmmmm1r",
    icon: "globe",
    description: "Hey.xyz Social Graph"
  },
  {
    label: "SORA2APP 未来工厂",
    url: "https://sora.chatgpt.com/profile/mmmmmmmm1r",
    icon: "cpu",
    description: "AI Gen Video Portfolio"
  },
  {
    label: "X 广播塔",
    url: "https://x.com/jinvbar46275",
    icon: "twitter",
    description: "Real-time Signal"
  },
  {
    label: "Audius 音乐宇宙",
    url: "https://audius.co/shensi_st",
    icon: "headphones",
    description: "Sonic Creations"
  },
  {
    label: "Odysee 频道",
    url: "https://odysee.com/@invjinvbar:b",
    icon: "video",
    description: "Decentralized Video"
  },
  {
    label: "开发日志",
    url: "https://jinv2.github.io",
    icon: "code",
    description: "Web2 Development Log"
  }
];