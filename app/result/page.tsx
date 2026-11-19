"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

const getResult = (w: number) => {
  if (w < 18.5) {
    return { title: "Bohat zyada Under Weight 😶", color: "text-orange-400" };
  }
  if (w < 25) {
    return { title: "Your weight is OK, good!😋", color: "text-green-400" };
  }
  if (w < 30) {
    return { title: "over weight😕", color: "text-yellow-400" };
  }
  return { title: "Bohat zyada over weight😱", color: "text-red-700" };
};

// BMI scale: 10 se 40 tak ki range, har section ki width us ke BMI range ke hisab se.
const SCALE_MIN = 10;
const SCALE_MAX = 40;

const segments = [
  { label: "Under", from: 10, to: 18.5, color: "#fb923c" },
  { label: "Normal", from: 18.5, to: 25, color: "#4ade80" },
  { label: "Over", from: 25, to: 30, color: "#facc15" },
  { label: "Obese", from: 30, to: 40, color: "#b91c1c" },
];

const ResultContent = () => {
  const searchParams = useSearchParams();

  const [checking, setChecking] = useState(true);

  // Agar user direct result URL paste kare aur permission na ho to Home par bhej do.
  useEffect(() => {
    const access = sessionStorage.getItem("bmi-access");

    if (access !== "true") {
      window.location.replace("/");
    } else {
      // Permission ko delete nahi karna, warna React Strict Mode mein problem ho sakti hai.
      setChecking(false);
    }
  }, []);

  const age = Number(searchParams.get("age"));
  const height = Number(searchParams.get("height"));
  const weight = Number(searchParams.get("weight"));

  const isValid =
    Number.isFinite(age) &&
    Number.isFinite(height) &&
    Number.isFinite(weight) &&
    age >= 1 &&
    age <= 50 &&
    height > 0 &&
    height <= 2.1336 &&
    weight > 0 &&
    weight <= 100;

  const bmi = isValid ? weight / (height * height) : 0;

  // Sirf tab true hoga jab input valid ho or BMI 18.5 sa 25 ke darmiyan ho.
  const isGood = isValid && bmi >= 18.5 && bmi < 25;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Random ✨ stars ki list (sirf acha result par). Random values effect ma banti hain taake hydration error na aaye.
  const [stars, setStars] = useState<
    { left: string; top: string; size: number; delay: number; dur: number }[]
  >([]);

  useEffect(() => {
    if (checking || !isGood) return;

    setStars(
      Array.from({ length: 18 }, () => ({
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 90}%`,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 2.5,
        dur: 1.8 + Math.random() * 1.6,
      })),
    );
  }, [checking, isGood]);
  const isUnder = isValid && bmi < 18.5;

  // Hooks hamesha early return sa PEHLE likhna zaroori ha, isi liye yaha ha.
  // FIX: "checking" ko bhi dependency ma rakha, taake canvas ban-ne ke baad effect dobara chale.
  useEffect(() => {
    if (checking || !isValid || !canvasRef.current) return;

    // Apna canvas use kar rahe hain taake confetti text ke PECHE rahe (default canvas sab ke upar aata ha).
    const fire = confetti.create(canvasRef.current, { resize: true });

    const end = Date.now() + 3000;
    let raf = 0;

    if (isGood) {
      // ACHA RESULT: rang birangi confetti
      const colors = ["#4ade80", "#facc15", "#f472b6", "#60a5fa", "#fb923c"];
      // Star, gol or square teeno shapes ki confetti
      const shapes: confetti.Shape[] = ["star", "circle", "square"];

      fire({
        particleCount: 160,
        spread: 110,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.6 },
        colors,
        shapes,
        scalar: 1,
      });

      const frame = () => {
        fire({
          particleCount: 4,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.75 },
          colors,
          shapes,
          scalar: 1,
        });

        fire({
          particleCount: 4,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.75 },
          colors,
          shapes,
          scalar: 1,
        });

        if (Date.now() < end) raf = requestAnimationFrame(frame);
      };

      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      fire.reset();
    };
  }, [checking, isValid, isGood]);

  // Permission check complete hone tak result show nahi hoga.
  if (checking) return null;

  if (!isValid) {
    return (
      <div className="mx-auto max-w-md px-6 py-6">
        <h1 className="text-2xl font-bold text-red-500">
          Invaild Input! Please enter valid values.
        </h1>
      </div>
    );
  }

  const result = getResult(bmi);

  // Marker ki position: BMI ko 10-40 ki range ma percent bana kar 0-100 ke darmiyan rakha.
  const markerPercent = Math.min(
    100,
    Math.max(0, ((bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100),
  );

  return (
    <div className="relative min-h-[calc(100vh-70px)] overflow-hidden">
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(25deg); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.7); }
          70% { transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.6; }
        }
        .bmi-pop { animation: popIn 0.6s ease-out both; }
        .bmi-marker { transition: left 1.4s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (prefers-reduced-motion: reduce) {
          .bmi-pop, .glow, .sparkle { animation: none !important; }
        }
      `}</style>

      {/* Glow har result par, rang result ke hisab sa */}
      <div
        className="glow pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          backgroundColor: isGood
            ? "#22c55e"
            : isUnder
              ? "#fb923c"
              : bmi < 30
                ? "#facc15"
                : "#b91c1c",
          animation: "glow 3s ease-in-out infinite",
        }}
      />

      {/* Random twinkling stars, sirf acha result par */}
      {isGood &&
        stars.map((st, i) => (
          <span
            key={i}
            className="sparkle pointer-events-none absolute z-0"
            style={{
              left: st.left,
              top: st.top,
              fontSize: st.size,
              animation: `sparkle ${st.dur}s ease-in-out ${st.delay}s infinite`,
            }}
          >
            ✨
          </span>
        ))}

      {/* Confetti canvas: content ke peeche, click bhi block nahi karta */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-xl px-6 py-12">
        <div className="bmi-pop flex items-center justify-center gap-3">
          <h1 className="text-6xl font-bold">{bmi.toFixed(3)}</h1>
          <h2 className="text-xl font-bold">Your BMI</h2>
        </div>

        <h2
          className={`bmi-pop mt-4 text-center text-3xl font-bold ${result.color}`}
          style={{ animationDelay: "0.2s" }}
        >
          {result.title}
        </h2>

        {/* BMI scale: user ko dikhata ha ke wo kahan khara ha */}
        <div className="mt-16">
          <div className="relative">
            <div className="flex h-4 w-full overflow-hidden rounded-full">
              {segments.map((s) => (
                <div
                  key={s.label}
                  style={{
                    width: `${((s.to - s.from) / (SCALE_MAX - SCALE_MIN)) * 100}%`,
                    backgroundColor: s.color,
                  }}
                />
              ))}
            </div>

            {/* Marker: left 0 sa shuru hota ha or slide ho kar apni jagah par pohanchta ha */}
            <div
              className="bmi-marker absolute -top-2 h-8 w-1 -translate-x-1/2 rounded bg-white shadow-[0_0_10px_white]"
              style={{ left: `${markerPercent}%` }}
            />
          </div>

          <div className="mt-3 flex w-full text-xs text-gray-400">
            {segments.map((s) => (
              <div
                key={s.label}
                className="text-center"
                style={{
                  width: `${((s.to - s.from) / (SCALE_MAX - SCALE_MIN)) * 100}%`,
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Input ki summary, taake page khali na lage */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Age", value: `${age} yrs` },
            { label: "Height", value: `${height} m` },
            { label: "Weight", value: `${weight} kg` },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gray-700 px-3 py-4"
            >
              <div className="text-sm text-gray-400">{item.label}</div>
              <div className="mt-1 text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Result = () => (
  <Suspense>
    <ResultContent />
  </Suspense>
);

export default Result;
