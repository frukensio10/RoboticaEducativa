const React = window.React;
const ReactDOM = window.ReactDOM;

export default function App() {
  const [formState, setFormState] = React.useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const contactRef = React.useRef(null);
  const [activeSection, setActiveSection] = React.useState('inicio');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'actividades', 'recursos', 'contacto'];
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formState.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Email inválido';
    if (!formState.message.trim()) newErrors.message = 'El mensaje es requerido';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Scroll automático al formulario en caso de éxito
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Resetear estado después de 5 segundos
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl text-blue-600">Robótica Edu AR</span>
          </div>
          
          <ul className="hidden md:flex space-x-8">
            {['inicio', 'actividades', 'recursos', 'contacto'].map((section) => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  className={`transition-all duration-300 ${
                    activeSection === section 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {section === 'inicio' ? 'Inicio' : 
                   section === 'actividades' ? 'Actividades' :
                   section === 'recursos' ? 'Recursos' : 'Contacto'}
                </a>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Contacto
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Plataforma de Recursos para Robótica Educativa
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Herramientas y actividades para docentes argentinos que enseñan robótica a estudiantes de 12 a 18 años
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#actividades" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Ver Actividades
              </a>
              <a 
                href="#recursos" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Explorar Recursos
              </a>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { title: 'Proyectos Prácticos', icon: '🧩' },
              { title: 'Guías Didácticas', icon: '📚' },
              { title: 'Tutoriales Interactivos', icon: '🎥' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">Recursos educativos listos para implementar en el aula</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="actividades" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Actividades por Nivel</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recursos adaptados a diferentes etapas de aprendizaje en robótica educativa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Básico",
                description: "Introducción a la programación con bloques visuales y kits como Makeblock mBot. Ideal para estudiantes que se inician en robótica.",
                icon: "👶",
                color: "bg-blue-100",
                buttonColor: "bg-blue-600 hover:bg-blue-700"
              },
              {
                title: "Intermedio",
                description: "Proyectos con sensores y motores usando Arduino y Lego Spike. Enfocado en desarrollo de habilidades técnicas.",
                icon: "⚙️",
                color: "bg-green-100",
                buttonColor: "bg-green-600 hover:bg-green-700"
              },
              {
                title: "Avanzado",
                description: "Desarrollo de robots autónomos con código C++ y placas programables. Para estudiantes con experiencia previa.",
                icon: "🧠",
                color: "bg-purple-100",
                buttonColor: "bg-purple-600 hover:bg-purple-700"
              }
            ].map((level, index) => (
              <div 
                key={index}
                className={`${level.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="text-4xl mb-4">{level.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{level.title}</h3>
                <p className="text-gray-700 mb-6">{level.description}</p>
                <button className={`w-full py-2 px-4 rounded-lg text-white font-medium ${level.buttonColor}`}>
                  Ver Recursos
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="recursos" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kits Recomendados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Equipamiento y herramientas para diferentes niveles de aprendizaje
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Lego Mindstorms",
                image: "https://placehold.co/400x300/007BFF/FFFFFF?text=Lego+Mindstorms",
                description: "Ideal para iniciarse en robótica con piezas modulares y programación intuitiva."
              },
              {
                name: "Arduino",
                image: "https://placehold.co/400x300/28A745/FFFFFF?text=Arduino+Kit",
                description: "Componentes: Placas Arduino Uno, motores, sensores de luz/temperatura, y software Arduino IDE."
              },
              {
                name: "Makeblock mBot",
                image: "https://placehold.co/400x300/DC3545/FFFFFF?text=Makeblock+mBot",
                description: "Robot educativo para principiantes con programación visual y componentes modulares."
              },
              {
                name: "Lego Spike",
                image: "https://placehold.co/400x300/FD7E14/FFFFFF?text=Lego+Spike",
                description: "Combinación de hardware y software para proyectos STEM con enfoque en programación avanzada."
              }
            ].map((kit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img src={kit.image} alt={kit.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{kit.name}</h3>
                  <p className="text-gray-600 mb-4">{kit.description}</p>
                  <a 
                    href="#"  
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Más información
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">¿Necesitas ayuda para elegir un kit?</h3>
                <p className="text-blue-100">Te ayudamos a seleccionar el equipo adecuado según tu nivel y necesidades educativas</p>
              </div>
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Consultar con un experto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" ref={contactRef} className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Tienes dudas o necesitas más información? Escríbenos y te responderemos a la brevedad
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Escribe tu consulta aquí..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      ¡Mensaje enviado!
                    </span>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </button>
              </div>
            </form>

            {isSubmitted && (
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                <p className="font-medium">Gracias por tu consulta</p>
                <p>Pronto nos pondremos en contacto contigo.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-bold text-xl">Robótica Edu AR</span>
              </div>
              <p className="text-gray-400 mb-4">
                Plataforma de recursos educativos para docentes argentinos que enseñan robótica a estudiantes de 12 a 18 años.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guías Didácticas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutoriales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentación Técnica</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Comunidad Educativa</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guía de Instalación</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centro de Ayuda</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Boletín Informativo</h3>
              <p className="text-gray-400 mb-4">Suscríbete para recibir novedades y recursos educativos</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Robótica Educativa AR. Todos los derechos reservados.</p>
            <p className="mt-2">Desarrollado por tu_nombre | Buenos Aires, Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Renderizar el componente
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);