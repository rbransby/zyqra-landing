import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Can I import my existing customer data?",
    answer: "Yes! During onboarding, we'll help you import your customer list from spreadsheets, your current software, or even handwritten notes. The process is quick and we're here to help every step of the way."
  },
  {
    question: "How much do the SMS reminders cost?",
    answer: "SMS reminders cost just 2p per message in the UK. Most businesses spend less than £10/month on SMS. You can also use free email reminders, or a combination of both based on customer preference."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. Zyqra is a monthly subscription with no contracts or cancellation fees. You can cancel anytime from your account settings, and you'll have access until the end of your billing period."
  },
  {
    question: "When will Zyqra be ready?",
    answer: "We're launching our beta in early 2024. Join the waitlist to get early access and lock in our special launch pricing of £19/month (regular price will be £29/month)."
  },
  {
    question: "Do I need to be tech-savvy to use Zyqra?",
    answer: "Not at all! Zyqra is designed specifically for busy sole traders who don't have time to learn complex software. If you can send a text message, you can use Zyqra. We also provide video tutorials and friendly support."
  },
  {
    question: "What about customer payments?",
    answer: "Zyqra integrates with Stripe to let you accept card payments instantly. Your customers can pay via a secure link sent by SMS or email. Money goes directly to your bank account, and we track everything automatically."
  }
]

export function FAQ() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          Got questions? We've got answers.
        </p>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

