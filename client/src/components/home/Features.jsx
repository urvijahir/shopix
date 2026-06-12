function Features() {
  const features = [
    { icon: "🚚", title: "Free Shipping" },
    { icon: "🔒", title: "Secure Payment" },
    { icon: "↩️", title: "Easy Returns" },
    { icon: "⭐", title: "Premium Quality" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900"
          >
            <div className="text-4xl">{feature.icon}</div>

            <h3 className="mt-3 font-semibold dark:text-white">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
