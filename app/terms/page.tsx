import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using SkillSwap, you agree to be bound by these Terms and Conditions.</p>

            <h2>2. User Accounts</h2>
            <p>You must create an account to use SkillSwap. You are responsible for maintaining the confidentiality of your account information.</p>

            <h2>3. User Conduct</h2>
            <p>You agree to use SkillSwap for lawful purposes only and in a way that does not infringe upon the rights of others.</p>

            <h2>4. Skill Exchange</h2>
            <p>SkillSwap facilitates skill exchanges between users. We are not responsible for the quality or accuracy of the skills shared.</p>

            <h2>5. Intellectual Property</h2>
            <p>Users retain ownership of their content. By posting on SkillSwap, you grant us a license to use your content for platform purposes.</p>

            <h2>6. Privacy</h2>
            <p>Your use of SkillSwap is also governed by our Privacy Policy.</p>

            <h2>7. Termination</h2>
            <p>We reserve the right to terminate or suspend accounts that violate these terms.</p>

            <h2>8. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of SkillSwap after changes constitutes acceptance of the new terms.</p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>SkillSwap is provided "as is" without any warranties, express or implied.</p>

            <h2>10. Limitation of Liability</h2>
            <p>SkillSwap shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

            <h2>11. Governing Law</h2>
            <p>These terms are governed by the laws of [Your Jurisdiction].</p>

            <h2>12. Contact</h2>
            <p>For any questions about these Terms and Conditions, please contact us at [Your Contact Information].</p>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2024 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

