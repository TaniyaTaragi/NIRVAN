export interface EventTrack {
  id: string;
  code: string;
  title: string;
  category: 'Hackathon' | 'Esports' | 'CTF' | 'Treasure Hunt' | 'Workshop';
  subtitle: string;
  description: string;
  fullOverview: string;
  image: string;
  prizePool: string;
  entryFee: string;
  teamSize: string;
  tags: string[];
  rules: string[];
  eligibility: string[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  stage: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  photo: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  code: string;
  name: string;
  role: string;
  collegeOrOrg: string;
  avatar: string;
  quote: string;
  rating: number;
}
