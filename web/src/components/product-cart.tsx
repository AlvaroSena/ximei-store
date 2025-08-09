export function ProductCart() {
  return (
    <div className="max-w-72 text-red-950 font-semibold text-lg">
      <img
        src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
        alt=""
        className="max-w-72"
      />

      <div className="flex flex-col items-center">
        <p>Product title</p>
        <span className="block">R$ 0,00</span>
      </div>
    </div>
  );
}
