import './home.css';
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import FormContactUs from '../../components/formContactUs/formContactUs'
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function() {
  return (
    <>
      {/* Sección inicial */}
      <div className="container-home" id="index">
        <div className="section-home">
          <div className="container-info">
            <div className="content-text">
              <h1>Agrupecuaria Tehuitzingo</h1>
              <p className="text-home">Nos dedicamos a la venta y distribución de alimentos 
              balanceados para tus animales, así como de accesorios 
              y consultas a tus animales.<br></br>Ganarnos tu confianza es nuestro mayor  objetivo.</p>
            </div>
            <div className="btns-home">
              <ButtonSmall text="Regístrate" />
              <ButtonSmall text="Iniciar sesión" />
            </div>
          </div>
          <div className="image-home"></div>
        </div>
      </div>
      {/* Sección Nosotros */}
      <div className="container-about" id="about">
        <div className="section-about">
          <h1>Nosotros</h1>
          <hr className="tittle-hr"></hr>
          <p className="tittles">Historia</p>
          <p className="text-about">En Agropecuaria Tehuitzingo, trabajamos con pasión y compromiso por el bienestar animal. Somos un negocio dedicado a la atención médico-veterinaria, la venta de alimentos balanceados y medicamentos, tanto para mascotas como para animales de producción.</p>
          <div className="box-about">
            <div className="divs-about">
              <p className="tittles">Misión</p>
              <p className="text-about">Brindar servicios veterinarios de calidad, ofreciendo atención médica integral, productos confiables y asesoramiento personalizado para el cuidado de mascotas y animales de producción, comprometidos con el bienestar animal y la satisfacción de nuestros clientes.</p>
            </div>
            <div className="divs-about">
              <div className="image-about"></div>
            </div>
            <div className="divs-about">
              <p className="tittles-services">Visión</p>
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
      <div className="container-service" id='service'>
        <div className="section-service">
          <h1>Servicios</h1>
          <hr className="tittle-hr"></hr>
          <p className="text-service">En Agropecuaria Tehuitzingo trabajamos para ofrecerte soluciones de calidad adaptadas a tus necesidades. Combinamos experiencia, compromiso y atención personalizada para garantizar resultados confiables y duraderos.</p>
          <div className="box-services">
            <div className="box-container-services">
              <p className="tittles-services">Venta de alimentos balanceados</p>
              <p className="text-service">Contamos con una amplia variedad de alimentos balanceados para mascotas y animales de granja, seleccionados para garantizar nutrición, salud y bienestar. Ofrecemos asesoramiento personalizado para elegir el alimento ideal según cada especie y etapa.</p>
            </div>
            <div className="box-container-services">
              <div className="images-service"></div>
            </div>
          </div>
          <div className="box-services">
            <div className="box-container-services">
              <div className="images-service"></div>
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
              <div className="images-service"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Sección Contáctanos */}
      <div className="container-contact" id='contact'>
        <div className="section-contact">
          <div className="box-contact">
            <h1>Contáctanos</h1>
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
              <li><a href="#index">Inicio</a></li>
              <li><a href="#about">Nosotros</a></li>
              <li><a href="#service">Servicios</a></li>
              <li><a href="#contact">Contáctanos</a></li>
              <li><a href="/">Productos</a></li>
              <li><a href="/">Ofertas</a></li>
            </ul>
            <div className="box-icons">
              <a><IoLogoWhatsapp size={27}/></a>
              <a><FaFacebook size={25}/></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}