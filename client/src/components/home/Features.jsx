import { Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Fast and trusted shopping",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Hassle-free returns",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Best quality products",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                <Icon size={28} />
              </div>

              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
