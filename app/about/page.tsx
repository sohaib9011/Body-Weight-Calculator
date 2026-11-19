"use client";

import { useState, useEffect } from "react";

const About = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [checking, setChecking] = useState(true);

  // Agar user direct URL paste kare aur permission na ho to Home page par bhej do.
  useEffect(() => {
    if (sessionStorage.getItem("bmi-access") !== "true") {
      window.location.replace("/");
    } else {
      setChecking(false);
    }
  }, []);
  //iss ka mutlab ya ha ka ya code direct url paste karke about page open karna sa rokta ha our user ko home page per bhej deta ha.

  const isValid =
    Number(age) >= 1 &&
    Number(age) <= 50 &&
    Number(height) >= 0 &&
    Number(height) <= 2.1336 &&
    Number(weight) >= 0 &&
    Number(weight) <= 100;

  const handleCalculate = () => {
    if (!isValid || Number(height) === 0 || Number(weight) === 0) return;

    const params = new URLSearchParams({ age, height, weight }); // ya teeno URL ka data bana da ta ha age=21 height=6

    window.location.href = `/result?${params.toString()}`; // ab ya same tab pa result open kera ga.
  };

  // Permission check complete hone tak page show nahi hoga.
  if (checking) return null;

  return (
    <div className="mx-auto max-w-md px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Body Weight Calculator</h1>

      <div className="space-y-4 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between gap-4">
          <h1>Age</h1>
          <input
            id="age"
            type="text"
            placeholder="years"
            value={age}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
                setAge(value);
              }
            }}
            //agar input empty ho ya 0 - 50 ka darmiyan ho to user ki enter ki hui value ko age state ma save ker do.
            className="w-40 rounded border border-gray-600 bg-transparent px-3 py-2"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1>Height</h1>
          <input
            id="height"
            type="text"
            placeholder="m"
            value={height}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) <= 2.1336) {
                setHeight(value);
              }
            }}
            //agar height empty ho ya 2.1336 se kam ho to value state ma save ho jaye gi.
            className="w-40 rounded border border-gray-600 bg-transparent px-3 py-2"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1>Weight</h1>
          <input
            id="weight"
            type="text"
            placeholder="kg"
            value={weight}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) <= 100) {
                setWeight(value);
              }
            }}
            //agar weight empty ho ya 100 se kam ho to value state ma save ho jaye gi.
            className="w-40 rounded border border-gray-600 bg-transparent px-3 py-2"
          />
        </div>

        <button
          onClick={handleCalculate}
          disabled={!isValid || Number(height) === 0 || Number(weight) === 0}
          className="w-full rounded bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default About;
