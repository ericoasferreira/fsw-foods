import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon, Ghost } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
        discountPercentage: {
            gt: 0
        }
    },
    take: 10,
    include: {
        restaurant: {
            select: {
                name: true
            }
        }
    }
})

  return (
  <>
    <Header />
    <div className="px-5 pt-6">
      <Search />
    </div>

    <div className="px-5 pt-6">
      <CategoryList />
    </div>

    <div className="px-5 pt-6">
      <PromoBanner 
        src="/promo-banner-01.png" 
        alt="Até 30% de desconto em pizzas!"
      />
    </div>

    <div className="pt-6 space-y-4">
      <div className="px-5 flex items-center justify-between">
        <h2 className="font-semibold">Pedidos Recomendados</h2>
        <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">
          Ver todos
          <ChevronRightIcon size={16}/>
        </Button>
      </div>
      <ProductList products={products} />
    </div>

    <div className="px-5 pt-6">
    <PromoBanner 
        src="/promo-banner-02.png" 
        alt="A partir de R$17,90 em lanches"
      />
    </div>

    <div className="py-6 space-y-4">
      <div className="px-5 flex items-center justify-between">
        <h2 className="font-semibold">Resturantes Recomendados</h2>
        <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">
          Ver todos
          <ChevronRightIcon size={16}/>
        </Button>
      </div>
      <RestaurantList />
    </div>
  </>
)};

export default Home;