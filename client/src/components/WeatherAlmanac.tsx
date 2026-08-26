/* Coastal Almanac weather panel: client-side public data with explicit loading, refresh, and offline states. */
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, CloudRain, CloudSun, Droplets, RefreshCw, Sun, Wind } from "lucide-react";

type WeatherSnapshot = {
  temperature: number;
  apparent: number;
  rain: number;
  wind: number;
  code: number;
  time: string;
};

const ENDPOINT = "https://api.open-meteo.com/v1/forecast?latitude=12.9141&longitude=74.8560&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,is_day&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Asia%2FKolkata";

function getCondition(code: number, rain: number) {
  if (code >= 95) return { label: "Storm watch", icon: CloudRain };
  if (code >= 51 || rain > 0.1) return { label: "Monsoon rain", icon: CloudRain };
  if (code >= 45) return { label: "Sea mist", icon: Cloud };
  if (code <= 1) return { label: "Bright coast", icon: Sun };
  return { label: "Coastal clouds", icon: CloudSun };
}

export default function WeatherAlmanac() {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadWeather = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(ENDPOINT, { signal, cache: "no-store" });
      if (!response.ok) throw new Error("Weather request failed");
      const body = await response.json();
      const current = body.current;
      setWeather({ temperature: Math.round(current.temperature_2m), apparent: Math.round(current.apparent_temperature), rain: Number(current.precipitation ?? current.rain ?? 0), wind: Math.round(current.wind_speed_10m), code: current.weather_code, time: current.time });
    } catch (reason) {
      if ((reason as Error).name !== "AbortError") setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadWeather(controller.signal);
    const timer = window.setInterval(() => loadWeather(), 10 * 60 * 1000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, [loadWeather]);

  const condition = weather ? getCondition(weather.code, weather.rain) : { label: "Checking the coast", icon: CloudSun };
  const ConditionIcon = condition.icon;
  const updated = weather?.time ? weather.time.slice(11, 16) : "—";

  return <motion.aside className="almanac-hero-aside weather-almanac" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.45 }} aria-live="polite">
    <div className="weather-almanac-top"><span>Live Mangaluru</span><button onClick={() => loadWeather()} aria-label="Refresh Mangaluru weather" disabled={loading}><RefreshCw size={12} className={loading ? "spin" : ""} /></button></div>
    {error ? <div className="weather-almanac-error"><strong>Conditions are taking a moment.</strong><p>The almanac will try again while you explore.</p></div> : <>
      <div className="weather-almanac-main"><ConditionIcon size={22} /><strong>{loading ? "—" : `${weather?.temperature ?? "—"}°`}</strong><div><b>{condition.label}</b><small>{loading ? "Reading the coast" : `Feels like ${weather?.apparent ?? "—"}°`}</small></div></div>
      <div className="weather-almanac-stats"><span><Droplets size={12} /> {loading ? "—" : `${weather?.rain ?? 0} mm`}</span><span><Wind size={12} /> {loading ? "—" : `${weather?.wind ?? "—"} km/h`}</span></div>
      <div className="weather-almanac-foot"><i /> Updated {updated} IST</div>
    </>}
  </motion.aside>;
}
