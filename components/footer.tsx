export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">© 2025 SkillSwap LLC. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
            <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
            <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
} 