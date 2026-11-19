const Page = () => {
  const facts = [
    {
      title: "Body Weight kya hai?",
      text: "Body weight aap ke poore jism ka wazan hai, jis ma muscles, haddiyan, fat aur paani sab shamil hain. Ye kilogram (kg) ma naapa jata hai.",
    },
    {
      title: "BMI kya hai?",
      text: "BMI (Body Mass Index) aap ke wazan aur qad se nikalta hai: weight (kg) ko height (m) ke square sa divide kiya jata hai. Is sa andaza hota hai ke wazan theek hai ya nahi.",
    },
    {
      title: "BMI ki Categories",
      text: "18.5 sa kam under-weight, 18.5 sa 25 tak normal, 25 sa 30 tak over-weight, aur 30 sa zyada obese kehlata hai.",
    },
  ];

  const tips = [
    {
      title: "Wazan Barhana (Under-weight)",
      text: "Agar wazan kam ho to din ma 3 waqt acha khana khayein, sath ma healthy snacks lein. Doodh, anday, daal, kela aur dry fruits madad karte hain.",
    },
    {
      title: "Wazan Kam Karna (Over-weight)",
      text: "Jitni energy kharch ho us sa thodi kam khayein, magar bohat zyada kami na karein. Meethi cheezein aur fried khana kam kar dein.",
    },
    {
      title: "Chalna aur Exercise",
      text: "Roz chalna aur hafte ma kuch din exercise karna wazan theek rakhne ma madad karta hai, chahe wazan barhana ho ya kam karna ho.",
    },
    {
      title: "Neend aur Paani",
      text: "Poori neend aur kaafi paani lene sa bhook, energy aur wazan teeno theek rehte hain.",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Body Weight <span className="text-blue-400">Calculator</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Ya body weight calculator ha. Ap apni age, height or weight daalein,
          ya ap ka BMI nikaal kar bata da ga ke ap under-weight, normal ya
          over-weight ho.
        </p>
      </section>

      {/* Body Weight Info */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Body Weight ke Bare Mein</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {facts.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-700 p-6 hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weight Tips */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Sehatmand Wazan ke Tips</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {tips.map((tip, index) => (
            <div
              key={tip.title}
              className="flex gap-4 rounded-xl bg-gray-900 p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-gray-400">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <p className="mt-8 text-center text-xs text-gray-500">
        BMI sirf aik andaza ha. Muscles wale ya khiladi logon ka BMI zyada aa
        sakta ha. Ye sirf aam maloomat ha. Diet ya exercise plan shuru karne sa
        pehle doctor ya nutritionist sa mashwara zaroor lein.
      </p>
    </main>
  );
};

export default Page;
