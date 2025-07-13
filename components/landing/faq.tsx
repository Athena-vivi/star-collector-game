import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. Your personal data is stored locally on your device when possible, and all communications with our AI models are encrypted. We never sell your data or use it for advertising. You can export or delete your data at any time. Privacy is a core value, not an afterthought.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-slate-200 bg-slate-700/60 border-slate-500/50">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Frequently asked <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to know about Star-Collector and how it can transform your personal growth journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-800/80 rounded-lg border border-slate-600/50 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-100 hover:text-purple-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 leading-relaxed pt-2">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <div className="bg-slate-800/80 rounded-2xl p-8 shadow-lg border border-slate-600/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Still have questions?</h3>
            <p className="text-slate-300 mb-6">
              Our team is here to help you succeed. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@star-collector.com" className="text-blue-400 hover:text-blue-300 font-medium">
                support@star-collector.com
              </a>
              <span className="text-slate-500 hidden sm:block">•</span>
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                Schedule a demo call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
