import './home.css';
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import FormContactUs from '../../components/formContactUs/formContactUs'
import ImagenPortada from '../../assets/ImagenPortada.png';
import Negocio from '../../assets/Negocio.jpg';
import imgS1 from '../../assets/imgS1.jpg';
import imgS2 from '../../assets/imgS2.png';
import imgS3 from '../../assets/imgS3.jpg';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';

export default function Home() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    services: false,
    contact: false
  });

  // Animación de entrada inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Animación al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Animación para sección Nosotros
      const aboutSection = document.getElementById('nosotros');
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        if (scrollPosition + windowHeight * 0.8 > aboutTop) {
          setIsVisible(prev => ({ ...prev, about: true }));
        }
      }

      // Animación para sección Servicios
      const servicesSection = document.getElementById('servicios');
      if (servicesSection) {
        const servicesTop = servicesSection.offsetTop;
        if (scrollPosition + windowHeight * 0.8 > servicesTop) {
          setIsVisible(prev => ({ ...prev, services: true }));
        }
      }

      // Animación para sección Contacto
      const contactSection = document.getElementById('contactanos');
      if (contactSection) {
        const contactTop = contactSection.offsetTop;
        if (scrollPosition + windowHeight * 0.8 > contactTop) {
          setIsVisible(prev => ({ ...prev, contact: true }));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll suave para enlaces internos
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      {/* Sección inicial */}
      <div className="container-home" id="inicio">
        <div className={`section-home ${isVisible.hero ? 'animate-hero' : ''}`}>
          <div className={`container-info ${isVisible.hero ? 'animate-slide-in-left' : ''}`}>
            <div className="content-text">
              <h1 className={`home-head-tittle ${isVisible.hero ? 'animate-fade-in-up' : ''}`}>
                Agropecuaria Tehuitzingo
              </h1>
              <p className={`text-home ${isVisible.hero ? 'animate-fade-in-up-delay' : ''}`}>
                Venta y distribución de las mejores marcas de alimento balanceado, materias primas y accesorios para todas las especies.<br></br>
                Ganarnos tu confianza es nuestro mayor objetivo.
              </p>
            </div>
            <div className={`btns-home ${isVisible.hero ? 'animate-fade-in-up-delay-2' : ''}`}>
              {!user ? (
                <>
                  <a href="/registro" className="btn-animate">
                    <ButtonSmall text="Regístrate" />
                  </a>
                  <a href="/ingreso" className="btn-animate">
                    <ButtonSmall text="Iniciar sesión" />
                  </a>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Link to="/productos" className="btn-animate">
                    <ButtonSmall text="Ver catálogo ->" />
                  </Link>
                  <p className="text-home">¡Conoce nuestro catálogo de productos!</p>
                </div>
              )}
            </div>
          </div>
          <div className={`image-home ${isVisible.hero ? 'animate-slide-in-right' : ''}`}>
            <img 
              className={`img-portada ${isVisible.hero ? 'animate-float' : ''}`} 
              alt='Imagen representativa' 
              src={ImagenPortada} 
            />
          </div>
        </div>
      </div>

      {/* Sección Nosotros */}
      <div className="container-about" id="nosotros">
        <div className={`section-about ${isVisible.about ? 'animate-fade-in' : ''}`}>
          <h1 className={`tittles-h1 ${isVisible.about ? 'animate-fade-in-up' : ''}`}>Nosotros</h1>
          <hr className={`tittle-hr-service ${isVisible.about ? 'animate-expand' : ''}`}></hr>
          <p className={`tittles ${isVisible.about ? 'animate-fade-in-up-delay' : ''}`}>Historia</p>
          <p className={`text-about ${isVisible.about ? 'animate-fade-in-up-delay-2' : ''}`}>
            En Agropecuaria Tehuitzingo, trabajamos con pasión y compromiso por el bienestar animal. 
            Nos respaldan 20 años de experiencia en el mercado, somos un negocio dedicado a la atención 
            médico-veterinaria, la venta de alimentos balanceados y medicamentos, tanto para mascotas 
            como para animales de producción.
          </p>
          <div className={`box-about ${isVisible.about ? 'animate-fade-in-up-delay-3' : ''}`}>
            <div className={`divs-about ${isVisible.about ? 'animate-slide-in-left' : ''}`}>
              <p className="tittles">Misión</p>
              <p className="text-about">
                Brindar servicios veterinarios de calidad, ofreciendo atención médica integral, 
                productos confiables y asesoramiento personalizado para el cuidado de mascotas y 
                animales de producción, comprometidos con el bienestar animal y la satisfacción de nuestros clientes.
              </p>
            </div>
            <div className={`divs-about ${isVisible.about ? 'animate-zoom-in' : ''}`}>
              <div className="image-about">
                <img className="img-portada" alt='Negocio' src={Negocio} />
              </div>
            </div>
            <div className={`divs-about ${isVisible.about ? 'animate-slide-in-right' : ''}`}>
              <p className="tittles">Visión</p>
              <p className="text-about">
                Ser una veterinaria-agropecuaria reconocida en la región por su excelencia profesional, 
                confianza y compromiso con la salud animal, ampliando constantemente nuestros servicios 
                y manteniéndonos a la vanguardia en atención, confianza y formación.
              </p>
            </div>
          </div>
          <p className={`tittles-services ${isVisible.about ? 'animate-fade-in-up-delay-4' : ''}`}>
            Nuestros distribuidores
          </p>
          <div className={`distributors ${isVisible.about ? 'animate-fade-in-up-delay-5' : ''}`}>
            <div className="box-distributors animate-pulse"></div>
            <div className="box-distributors animate-pulse-delay-1"></div>
            <div className="box-distributors animate-pulse-delay-2"></div>
            <div className="box-distributors animate-pulse-delay-3"></div>
          </div>
        </div>
      </div>

      {/* Sección Servicios */}
      <div className="container-service" id='servicios'>
        <div className={`section-service ${isVisible.services ? 'animate-fade-in' : ''}`}>
          <h1 className={`tittles-h1 ${isVisible.services ? 'animate-fade-in-up' : ''}`}>Servicios</h1>
          <hr className={`tittle-hr-service ${isVisible.services ? 'animate-expand' : ''}`}></hr>
          <p className={`text-service ${isVisible.services ? 'animate-fade-in-up-delay' : ''}`}>
            En Agropecuaria Tehuitzingo trabajamos para ofrecerte soluciones de calidad adaptadas a tus necesidades. 
            Combinamos experiencia, compromiso y atención personalizada para garantizar resultados confiables y duraderos.
          </p>
          
          <div className={`box-services ${isVisible.services ? 'animate-fade-in-up-delay-2' : ''}`}>
            <div className="box-container-services">
              <p className="tittles-services">Venta de alimentos balanceados</p>
              <p className="text-service">
                Contamos con una amplia variedad de alimentos balanceados para mascotas y animales de granja, 
                seleccionados para garantizar nutrición, salud y bienestar. Ofrecemos asesoramiento personalizado 
                para elegir el alimento ideal según cada especie y etapa.
              </p>
            </div>
            <div className="box-container-services">
              <div className="images-service">
                <img className="img-portada animate-hover-scale" alt='Servicio 1' src={imgS1} />
              </div>
            </div>
          </div>
          
          <div className={`box-services ${isVisible.services ? 'animate-fade-in-up-delay-3' : ''}`}>
            <div className="box-container-services">
              <div className="images-service">
                <img className="img-portada animate-hover-scale" alt='Servicio 2' src={imgS2} />
              </div>
            </div>
            <div className="box-container-services">
              <p className="tittles-services">Venta y distribución de alimentos balanceados</p>
              <p className="text-service">
                Contamos con una amplia variedad de alimentos balanceados para mascotas y animales de granja, 
                seleccionados para garantizar nutrición, salud y bienestar. Ofrecemos asesoramiento personalizado 
                para elegir el alimento ideal según cada especie y etapa.
              </p>
            </div>
          </div>
          
          <div className={`box-services ${isVisible.services ? 'animate-fade-in-up-delay-4' : ''}`}>
            <div className="box-container-services">
              <p className="tittles-services">Consultas médico veterinarias</p>
              <p className="text-service">
                Ofrecemos atención veterinaria profesional para perros, gatos y animales de granja. 
                Realizamos controles generales, diagnóstico de enfermedades, tratamientos y seguimiento clínico. 
                Tu mascota estará en manos de expertos comprometidos con su salud y bienestar.
              </p>
            </div>
            <div className="box-container-services">
              <div className="images-service">
                <img className="img-portada animate-hover-scale" alt='Servicio 3' src={imgS3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Contáctanos */}
      <div className="container-contact" id='contactanos'>
        <div className={`section-contact ${isVisible.contact ? 'animate-fade-in' : ''}`}>
          <div className={`box-contact ${isVisible.contact ? 'animate-slide-in-left' : ''}`}>
            <h1 className={`tittles-h1 ${isVisible.contact ? 'animate-fade-in-up' : ''}`}>Contáctanos</h1>
            <div className={`container-info-contact ${isVisible.contact ? 'animate-fade-in-up-delay' : ''}`}>
              <div className="box-contact-info animate-hover-bounce">
                <MapPin size={45}/>
                <p className="text-contact">Carretera Internacional S/N, sección 1ra, Tehuitzingo, Puebla</p>
              </div>
              <div className="box-contact-info animate-hover-bounce">
                <Mail />
                <p className="text-contact">agropecuariatehuitzingo@gmail.com</p>
              </div>
              <div className="box-contact-info animate-hover-bounce">
                <Smartphone />
                <p className="text-contact">274-741-13-74</p>
              </div>
            </div>
            <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
          </div>
          <div className={`box-contact2 ${isVisible.contact ? 'animate-slide-in-up' : ''}`}>
            <FormContactUs />
          </div>
          <div className={`box-contact ${isVisible.contact ? 'animate-slide-in-right' : ''}`}>
            <ul className={`links-footer ${isVisible.contact ? 'animate-fade-in-up-delay-2' : ''}`}>
              <li><a href="#inicio" className="animate-hover-glow">Inicio</a></li>
              <li><a href="#nosotros" className="animate-hover-glow">Nosotros</a></li>
              <li><a href="#servicios" className="animate-hover-glow">Servicios</a></li>
              <li><a href="#contactanos" className="animate-hover-glow">Contáctanos</a></li>
              <li><a href="/productos" className="animate-hover-glow">Productos</a></li>
              <li><Link to="/ofertas" className="animate-hover-glow">Ofertas</Link></li>
            </ul>
            <div className={`box-icons ${isVisible.contact ? 'animate-fade-in-up-delay-3' : ''}`}>
              <a href="https://wa.me/" className="animate-hover-pulse">
                <IoLogoWhatsapp size={27}/>
              </a>
              <a href="https://facebook.com" className="animate-hover-pulse">
                <FaFacebook size={25}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
