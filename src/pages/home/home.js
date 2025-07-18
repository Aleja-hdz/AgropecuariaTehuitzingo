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
import { useEffect } from 'react';

export default function Home() {
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
        <div className="section-home">
          <div className="container-info">
            <div className="content-text">
              <h1 className="home-head-tittle">Agropecuaria Tehuitzingo</h1>
              <p className="text-home">Venta y distribución de las mejores marcas de alimento balanceado, materias primas y accesorios para todas las especies.<br></br>Ganarnos tu confianza es nuestro mayor  objetivo.</p>
            </div>
            <div className="btns-home">
              <a href="/registro"><ButtonSmall text="Regístrate" /></a>
              <a href="/ingreso"><ButtonSmall text="Iniciar sesión" /></a>
            </div>
          </div>
          <div className="image-home">
            <img className="img-portada" alt='Imagen representativa' src={ImagenPortada} />
          </div>
        </div>
      </div>
      {/* Sección Nosotros */}
      <div className="container-about" id="nosotros">
        <div className="section-about">
          <h1 className="tittles-h1">Nosotros</h1>
          <hr className="tittle-hr-service"></hr>
          <p className="tittles">Historia</p>
          <p className="text-about">En Agropecuaria Tehuitzingo, trabajamos con pasión y compromiso por el bienestar animal. Somos un negocio dedicado a la atención médico-veterinaria, la venta de alimentos balanceados y medicamentos, tanto para mascotas como para animales de producción.</p>
          <div className="box-about">
            <div className="divs-about">
              <p className="tittles">Misión</p>
              <p className="text-about">Brindar servicios veterinarios de calidad, ofreciendo atención médica integral, productos confiables y asesoramiento personalizado para el cuidado de mascotas y animales de producción, comprometidos con el bienestar animal y la satisfacción de nuestros clientes.</p>
            </div>
            <div className="divs-about">
              <div className="image-about">
                <img className="img-portada" alt='Negocio' src={Negocio} />
              </div>
            </div>
            <div className="divs-about">
              <p className="tittles">Visión</p>
              <p className="text-about">Ser una veterinaria-agropecuaria reconocida en la región por su excelencia profesional, confianza y compromiso con la salud animal, ampliando constantemente nuestros servicios y manteniéndonos a la vanguardia en atención, confianza y formación.</p>
            </div>
          </div>
          <p className="tittles-services">Nuestros distribuidores</p>
          <div className="distributors">
            <div className="box-distributors"></div>
            <div className="box-distributors"></div>
            <div className="box-distributors"></div>
            <div className="box-distributors"></div>
          </div>
        </div>
      </div>
      {/* Sección Servicios */}
      <div className="container-service" id='servicios'>
        <div className="section-service">
          <h1 className="tittles-h1">Servicios</h1>
          <hr className="tittle-hr-service"></hr>
          <p className="text-service">En Agropecuaria Tehuitzingo trabajamos para ofrecerte soluciones de calidad adaptadas a tus necesidades. Combinamos experiencia, compromiso y atención personalizada para garantizar resultados confiables y duraderos.</p>
          <div className="box-services">
            <div className="box-container-services">
              <p className="tittles-services">Venta de alimentos balanceados</p>
              <p className="text-service">Contamos con una amplia variedad de alimentos balanceados para mascotas y animales de granja, seleccionados para garantizar nutrición, salud y bienestar. Ofrecemos asesoramiento personalizado para elegir el alimento ideal según cada especie y etapa.</p>
            </div>
            <div className="box-container-services">
              <div className="images-service">
                <img className="img-portada" alt='Servicio 1' src={imgS1} />
              </div>
            </div>
          </div>
          <div className="box-services">
            <div className="box-container-services">
              <div className="images-service">
                <img className="img-portada" alt='Servicio 2' src={imgS2} />
              </div>
            </div>
            <div className="box-container-services">
              <p className="tittles-services">Venta y distribución de alimentos balanceados</p>
              <p className="text-service">Contamos con una amplia variedad de alimentos balanceados para mascotas y animales de granja, seleccionados para garantizar nutrición, salud y bienestar. Ofrecemos asesoramiento personalizado para elegir el alimento ideal según cada especie y etapa.</p>
            </div>
          </div>
          <div className="box-services">
            <div className="box-container-services">
              <p className="tittles-services">Consultas médico veterinarias</p>
              <p className="text-service">Ofrecemos atención veterinaria profesional para perros, gatos y animales de granja. Realizamos controles generales, diagnóstico de enfermedades, tratamientos y seguimiento clínico. Tu mascota estará en manos de expertos comprometidos con su salud y bienestar.</p>
            </div>
            <div className="box-container-services">
              <div className="images-service">
                <img className="img-portada" alt='Servicio 3' src={imgS3} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sección Contáctanos */}
      <div className="container-contact" id='contactanos'>
        <div className="section-contact">
          <div className="box-contact">
            <h1 className="tittles-h1">Contáctanos</h1>
            <div className="container-info-contact">
              <div className="box-contact-info">
                <MapPin size={45}/>
                <p className="text-contact">Carretera Internacional S/N, sección 1ra, Tehuitzingo, Puebla</p>
              </div>
              <div className="box-contact-info">
                <Mail />
                <p className="text-contact">agropecuariatehuitzingo@gmail.com</p>
              </div>
              <div className="box-contact-info">
                <Smartphone />
                <p className="text-contact">274-741-13-74</p>
              </div>
            </div>
            <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
          </div>
          <div className="box-contact2">
              <FormContactUs />
          </div>
          <div className="box-contact">
            <ul className="links-footer">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#contactanos">Contáctanos</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/ofertas">Ofertas</a></li>
            </ul>
            <div className="box-icons">
              <a href="https://wa.me/"><IoLogoWhatsapp size={27}/></a>
              <a href="https://facebook.com"><FaFacebook size={25}/></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
