import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Alex Zhang",
    role: "Astrophotography Enthusiast",
    company: "",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The AI wallpaper generation and real-time stargazing data make this site my favorite astronomy tool!",
    highlight: "Astronomy & AI",
  },
  {
    name: "Linda Wang",
    role: "Weather Watcher",
    company: "",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Finally, a platform that combines accurate weather with beautiful space images. Highly recommended!",
    highlight: "Weather & Visuals",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            用户真实评价
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Star-Collector is helping people achieve their goals and transform their lives with AI-powered
            guidance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
            <div className="text-gray-600">Goal Completion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
            <div className="text-gray-600">User Satisfaction</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-gray-300 mb-4" />

                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="mt-4">
                  {testimonial.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join the success stories</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your transformation today and become the next success story. Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((testimonial, index) => (
                  <img
                    key={index}
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
