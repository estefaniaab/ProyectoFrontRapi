import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyDQGEJNWKM9oQXpl2e_xGY8lInokpGFUkQ"; // Asegúrate de proteger esto
const genAI = new GoogleGenerativeAI(API_KEY);
const PROJECT_CONTEXT=`Las preguntas que se realizan estan relacionados al proyecto DDEnvios, en caso de que la pregunta se extraña indicar que se comunico con DDEnvios Contexto Detallado del Proyecto DDEnvios:

Propósito: DDEnvios es una aplicación web de simulación desarrollada por estudiantes de la Universidad de Caldas como proyecto de la materia de Frontend. Su objetivo principal es emular el flujo completo de un sistema de gestión de pedidos de comida a domicilio, desde la creación de usuarios y restaurantes hasta la gestión de productos, la realización de pedidos, el seguimiento de las entregas y la administración de la flota de reparto.

Arquitectura Funcional: La interfaz de usuario se organiza en varias secciones principales, accesibles a través de una barra de navegación izquierda:

Usuarios: Permite la creación, lectura, actualización y eliminación (CRUD) de perfiles de usuario dentro del sistema.
Productos: Permite el CRUD del catálogo general de productos que pueden ser ofrecidos por los restaurantes. Estos productos son entidades independientes de los restaurantes.
Restaurantes: Permite el CRUD de la información de los restaurantes. Cada restaurante tiene asociado un Menú, que representa la relación entre los productos disponibles, sus precios específicos dentro de ese restaurante y su estado de disponibilidad. La creación y gestión del menú se realiza dentro de la interfaz de cada restaurante. Para realizar un pedido, el usuario primero debe seleccionar un restaurante y luego los ítems de su menú.
Orden: Permite la gestión del ciclo de vida de los pedidos: creación, visualización, actualización, guía en tiempo real (simulado), muestra que producto se pedio, de que restaurante, y la moto que lo entrega, y desde aca se realizan las ordenes. 
En Orden, la creación de una nueva orden se realiza haciendo clic en 'Crear'. El usuario primero selecciona el 'Restaurante' y luego, del menú de ese restaurante, indica la 'Cantidad' deseada para cada producto. Al finalizar la selección, se guarda la orden. Tras la creación exitosa, se genera una notificación sonora y visual, y la nueva orden aparece en el listado de la sección 'Orden'. Por cada orden se puede acceder a un icone de una flecha de mapa donde (simula) que la moto esta llevando el pedido y la puedes rastrear.
Para cada orden activa, se muestra un icono de un mapa con una flecha que simula el seguimiento en tiempo real de la entrega por parte del motociclista asignado. Esta es una funcionalidad simulada y no implica una integración real con servicios de mapas.
Envíos: Esta sección agrupa las funcionalidades relacionadas con la logística de las entregas:

Motos: Permite el CRUD de la flota de motocicletas utilizadas para las entregas. Cada motocicleta tiene un registro de Averías. Al acceder a las averías de una moto específica, se pueden listar las averías existentes y, para cada una, se ofrece la opción de gestionar fotografías como evidencia.
Conductores: Permite el CRUD de la información de los conductores responsables de las entregas.
Turno: Permite la gestión de los turnos de trabajo asignados a las motocicletas y los conductores. El sistema impone una restricción: solo se pueden crear turnos para motocicletas y conductores que tengan su estado marcado como "activo". Esto requiere que el estado de las motos y los conductores se gestione previamente en sus respectivas secciones.
Otros: Contiene secciones adicionales:

Perfil: Muestra información básica del usuario autenticado en la aplicación (simulando una vista de perfil).
Tablas: Presenta visualizaciones de datos o métricas simuladas del sistema. Estos datos son proporcionados por un servidor simulado ("mock server") y no reflejan analíticas en tiempo real.
Patrones de Interacción Comunes:

Creación: En la parte superior de cada sección principal (Usuarios, Productos, Restaurantes, Orden, Motos, Conductores, Turno), un botón "Crear" redirige al formulario necesario para añadir un nuevo elemento.
Listado y Gestión: En la vista de listado inicial de cada sección, a la derecha de cada elemento, se encuentran tres iconos estándar para la gestión de datos:
Ojo: Permite ver los detalles completos del elemento.
Lápiz: Permite editar la información del elemento.
Basurera: Permite eliminar el elemento.
Funcionalidades Específicas: Algunas secciones extienden esta interfaz estándar con iconos adicionales para acceder a funcionalidades particulares relacionadas con los elementos listados (ej: icono de "Menú" en la lista de Restaurantes, icono de "Averías" en la lista de Motos, icono de "mapa" en la lista de Órdenes).
Características Adicionales:

Asistente: Un asistente de ayuda, ubicado en la parte inferior derecha de la interfaz, proporciona respuestas a preguntas frecuentes sobre el funcionamiento de la aplicación.
Notificaciones Sonoras y Visuales: La creación de un nuevo pedido activa una alerta sonora y muestra una notificación visual en el computador del usuario.
Autenticación: Los usuarios pueden autenticarse en la aplicación utilizando proveedores de identidad externos como Google, Microsoft y GitHub (autenticación social).
Simulación de Datos: La aplicación utiliza un servidor simulado ("mock server") para proporcionar datos para las diferentes secciones, incluyendo la información de los restaurantes, productos, usuarios, pedidos, etc. Esto significa que la persistencia de los datos es local y simulada, no conectada a una base de datos real.
Enfoque del Desarrollo: El proyecto se centra en la implementación de la interfaz de usuario (Frontend) utilizando la biblioteca de React. La lógica de negocio y la persistencia de datos se simulan para demostrar la funcionalidad de un sistema real.`
export const geminiService = {
  async generateContent(prompt: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const fullPrompt = `${PROJECT_CONTEXT}\n\nPregunta del usuario: ${prompt}`;
      const result = await model.generateContent(fullPrompt);
      const responseText = result.response.text();
      return responseText;
    } catch (error) {
      console.error("Error al generar contenido con Gemini:", error);
      throw new Error("No se pudo generar el contenido. Por favor, intenta de nuevo.");
    }
  },
};