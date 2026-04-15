import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-screen min-[700px]:flex-row min-[700px]:gap-3 bg-black">
        <div className="px-5 cursor-default max-w-2xl">
          <div className="flex gap-3 justify-center laptop:justify-start">
            <img
              className="w-[4rem]"
              src="/img/logo2.png"
              alt="logo"
              width={400}
              height={400}
            />
            <h2 className="text-7xl text-[#fff]">Uups!</h2>
          </div>
          <h4 className="text-3xl my-6 text-center text-[#fff] laptop:text-left ">
            Al parecer no podemos encontrar la página que estás buscando.
          </h4>
          <p className="text-2xl  text-center laptop:text-left text-[#fff]">
            Codigo de error:
            <span className="text-[#fff] laptop:text-left">404</span>
          </p>
          <p className="my-3 text-lg font-bold  text-center laptop:text-left text-[#fff]">
            Aquí hay algunos enlaces útiles en su lugar:
          </p>
          <ul className="text-lg flex flex-col  ">
            <Link to="/">
              <div className="hover:text-[#fff] hover:cursor-pointer text-[#fff]  text-center laptop:text-left ">
                Inicio
              </div>
            </Link>
          </ul>
        </div>
        <div className="w-80">
          <img src="/img/logo2.png" alt="error" width={300} height={300} />
        </div>
      </div>
    </div>
  )
}
