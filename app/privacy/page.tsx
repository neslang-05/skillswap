import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with other users.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to operate, maintain, and improve SkillSwap, to communicate with you, and to match you with other users for skill exchanges.</p>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>

            <h2>4. Data Security</h2>
            <p>We implement reasonable security measures to protect the security of your personal information.</p>

            <h2>5. Your Choices</h2>
            <p>You can access and update certain information about you from within your SkillSwap account settings.</p>

            <h2>6. Cookies and Similar Technologies</h2>
            <p>We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of SkillSwap.</p>

            <h2>7. Children's Privacy</h2>
            <p>SkillSwap is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.</p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at [Your Contact Information].</p>

            <p>It&apos;s important to read the privacy policy.</p>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2025 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

