// app/api/skills/route.ts
import { NextResponse } from 'next/server'
import connect from '@/lib/mongodb'
import User from '@/models/User'

// Define the types for the aggregation data
interface SkillData {
  _id: string;
  count: number;
  users: {
    id: string;
    name: string;
    avatar: string;
  }[];
}

// Define the type for the final skill object
interface Skill {
  id: string;
  name: string;
  category: string;
  popularity: number;
  difficulty: string;
  stats: {
    offering: number;
    seeking: number;
    offeringUsers: { id: string; name: string; avatar: string }[];
    seekingUsers: { id: string; name: string; avatar: string }[];
  };
}

export async function GET() {
  try {
    await connect();

    // Aggregate all unique skills and their usage statistics
    const skillStats = await User.aggregate([
      {
        $facet: {
          offered: [
            { $unwind: "$skillsOffered" },
            { 
              $group: {
                _id: "$skillsOffered",
                count: { $sum: 1 },
                users: { $push: { 
                  id: "$_id",
                  name: "$name",
                  avatar: "$avatar"
                }}
              }
            }
          ],
          wanted: [
            { $unwind: "$skillsWanted" },
            {
              $group: {
                _id: "$skillsWanted",
                count: { $sum: 1 },
                users: { $push: {
                  id: "$_id",
                  name: "$name",
                  avatar: "$avatar"
                }}
              }
            }
          ]
        }
      }
    ]);

    // Process the aggregation results
    const offered: SkillData[] = skillStats[0].offered;
    const wanted: SkillData[] = skillStats[0].wanted;

    // Combine and format the skills data
    const skills: Skill[] = Array.from(new Set([
      ...offered.map(item => item._id),
      ...wanted.map(item => item._id)
    ])).map(skillName => {
      const offeredData = offered.find(item => item._id === skillName) || { count: 0, users: [] };
      const wantedData = wanted.find(item => item._id === skillName) || { count: 0, users: [] };
      
      // Calculate popularity based on total number of users interested in the skill
      const totalUsers = offeredData.count + wantedData.count;
      const popularity = Math.round((totalUsers / (offered.length + wanted.length)) * 100);

      // Determine category based on the skill name (you might want to store this in the database instead)
      let category: string = "Technology"; // default category
      if (skillName.toLowerCase().includes('design') || 
          skillName.toLowerCase().includes('figma') || 
          skillName.toLowerCase().includes('ui') || 
          skillName.toLowerCase().includes('ux')) {
        category = "Design";
      } else if (skillName.toLowerCase().includes('communication') || 
                 skillName.toLowerCase().includes('writing')) {
        category = "Communication";
      }

      // Determine difficulty based on the ratio of people wanting vs offering the skill
      let difficulty: string;
      if (wantedData.count > offeredData.count * 2) {
        difficulty = "Advanced";
      } else if (wantedData.count > offeredData.count) {
        difficulty = "Intermediate";
      } else {
        difficulty = "Beginner";
      }

      return {
        id: skillName.toLowerCase().replace(/\s+/g, '-'),
        name: skillName,
        category,
        popularity,
        difficulty,
        stats: {
          offering: offeredData.count,
          seeking: wantedData.count,
          offeringUsers: offeredData.users,
          seekingUsers: wantedData.users
        }
      };
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
