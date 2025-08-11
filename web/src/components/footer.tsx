export function Footer() {
  return (
    <footer className="bg-red-900 w-full h-56">
      <div className="max-w-[1120px] px-4 lg:px-0 mx-auto h-56 flex flex-col justify-center">
        <p className="text-lg font-medium text-white">Site</p>
        <ul className="flex flex-col gap-4 my-4">
          <li>
            <a href="" className="text-neutral-100 font-medium hover:underline">
              Início
            </a>
          </li>
          <li>
            <a href="" className="text-neutral-100 font-medium hover:underline">
              Catálogo
            </a>
          </li>
        </ul>
        <div className="w-full h-[1px] bg-white"></div>
        <a
          href=""
          className="text-neutral-100 font-medium my-4 hover:underline"
        >
          Política de privacidade
        </a>
      </div>
    </footer>
  );
}
