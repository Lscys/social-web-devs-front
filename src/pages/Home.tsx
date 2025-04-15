
import { Link } from "react-router-dom";
import "./home.css"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      {/* Hero */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Conecta con Proyectos. Colabora. Crece.</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Encuentra oportunidades freelance, colabora con otros devs o construye tu propia idea. Todo en una sola red.
        </p>
        <div className="flex justify-center gap-4">
          <Link to={"/social"}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Explorar proyectos
          </Link>
          <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition">
            Publicar un proyecto
          </button>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">¿Por qué usar nuestra plataforma?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Crecimiento Profesional</h3>
            <p>Únete a proyectos reales para mejorar tu experiencia y tu perfil como desarrollador.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Trabajo Colaborativo</h3>
            <p>Conecta con otros devs, trabaja en equipo y crea soluciones increíbles.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Flexibilidad Freelance</h3>
            <p>Encuentra proyectos que se adapten a tu tiempo, habilidades y objetivos.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="mb-6 text-gray-600">Crea tu perfil y empieza a colaborar con otros desarrolladores ahora mismo.</p>
        <Link 
        className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition" 
        to="/login">
          Crear cuenta
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
        © 2025 DevConnect. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Home;