import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pages = {
  '/': {
    title: 'Bite Club — Seriously Good Food',
    description:
      'Bite Club is a fictional demo restaurant serving big flavours, loud colours and even louder good moods. Explore the menu, reviews and gallery.',
  },
  '/menu': {
    title: 'Menu — Bite Club',
    description:
      'Browse the full Bite Club demo menu: pizzas, burgers, bowls, pasta, sides, desserts and drinks. Filter, search and build your bag.',
  },
  '/reviews': {
    title: 'Reviews — Bite Club',
    description:
      'Sample guest feedback from the fictional Bite Club diners. Filter by rating and sort the wall of very kind demo words.',
  },
  '/gallery': {
    title: 'Gallery — Bite Club',
    description:
      'A look inside the fictional Bite Club: warm lights, loud plates and the kind of mess that happens when good food meets good people.',
  },
  '/about': {
    title: 'About — Bite Club',
    description:
      'The story, people and kitchen behind Bite Club, a fictional neighbourhood restaurant built as a demonstration experience.',
  },
  '/cart': {
    title: 'Your Bag — Bite Club',
    description: 'Review the dishes in your Bite Club demo bag before heading to checkout.',
  },
  '/checkout': {
    title: 'Checkout — Bite Club',
    description: 'Add your demo delivery details to continue to the simulated Bite Club payment step.',
  },
  '/payment': {
    title: 'Payment — Bite Club',
    description: 'A fully simulated payment step for the Bite Club demo restaurant experience.',
  },
  '/order-success': {
    title: 'Order Confirmed — Bite Club',
    description: 'Your demo Bite Club order confirmation and receipt.',
  },
  '/reservation': {
    title: 'Reservations — Bite Club',
    description: 'Request a demo table at Bite Club. Reservations are saved locally and are entirely fictional.',
  },
  '/privacy': {
    title: 'Privacy Policy — Bite Club',
    description: 'How the fictional Bite Club demo handles your sample data (spoiler: it stays in your browser).',
  },
  '/terms': {
    title: 'Terms & Conditions — Bite Club',
    description: 'The plain-language rules for using the fictional Bite Club demonstration website.',
  },
}

const fallback = {
  title: 'Page Not Found — Bite Club',
  description: 'That page is off the menu. Head back to the Bite Club home page or browse the demo menu.',
}

export default function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = pages[pathname] || fallback
    document.title = page.title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', page.description)
  }, [pathname])
}
