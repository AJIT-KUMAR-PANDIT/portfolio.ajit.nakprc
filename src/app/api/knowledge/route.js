import { NextResponse } from 'next/server';
import aboutData from '../../../config/about.json';
import contactData from '../../../config/contact.json';
import experienceData from '../../../config/experience.json';
import heroData from '../../../config/hero.json';
import navData from '../../../config/nav.json';
import skillsData from '../../../config/skills.json';
import socialData from '../../../config/social.json';
 
export const runtime = 'edge';
 
export async function GET() {
  const knowledgeData = {
    about: aboutData.aboutMe,
    contact: contactData,
    experience: experienceData.experience,
    hero: heroData,
    nav: navData,
    skills: skillsData,
    social: socialData,
  };
 
  return new Response(JSON.stringify(knowledgeData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}