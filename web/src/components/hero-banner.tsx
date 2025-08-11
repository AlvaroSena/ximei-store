import { useEffect, useState } from "react";

export function HeroBanner() {
  const [animate, setAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`${
        animate ? "animate-pulse" : ""
      } relative h-screen bg-cover bg-center flex items-center justify-center text-white`}
      style={{
        backgroundImage: isMobile
          ? "url(https://gsc-theme2-demo.myshopify.com/cdn/shop/files/287715753_5547757101953248_4410407835871329006_n.jpg)"
          : "url(https://gsc-theme2-demo.myshopify.com/cdn/shop/files/23412343253215.png?v=1678811106)",
      }}
    >
      <div className="bg-black/50 absolute inset-0"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold">Bem-vindo!</h1>
        <p className="mt-4 text-lg font-medium">
          Este é o seu hero banner com TailwindCSS
        </p>
        <button className="px-6 py-3 border text-lg border-white font-medium transition hover:bg-white hover:text-red-950">
          COMPRAR AGORA
        </button>
      </div>
    </section>
  );
}
