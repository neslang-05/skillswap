export interface Skill {
  id: number
  name: string
  category: string
  popularity: number
  difficulty: string
}

export type Category = "All" | "Technology" | "Design" | "Communication" | "Arts" | "Business" 