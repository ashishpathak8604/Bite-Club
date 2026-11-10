import FoodCard from './FoodCard'

export default function FoodGrid({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  )
}
