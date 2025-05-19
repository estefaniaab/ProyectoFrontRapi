// src/components/GeminiChat.tsx
import React, { useState } from "react";
import { geminiService } from "../../services/geminiService";


const GeminiChat: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Lista de preguntas frecuentes
  const faqs = [
    { question: "¿Cómo creo un nuevo turno?", prompt: "¿Cómo creo un nuevo turno en el sistema?" },
    { question: "¿Cómo agrego una avería?", prompt: "¿Cómo agrego una avería de una moto?" },
    { question: "¿Cómo puedo serguir la entrega de mi pedido en tiempo real?", prompt: "¿Cómo puedo serguir la entrega de mi pedido en tiempo real?" },
    { question: "¿Puedo editar un turno existente?", prompt: "¿Puedo editar un turno existente en el sistema? ¿Cómo lo hago?" },
    { question: "¿Cómo realizo una orden?", prompt: "¿Como creo una orden?" },
  ];

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      setError("Por favor, ingresa un prompt.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const generatedText = await geminiService.generateContent(prompt);
      setResponse(generatedText);
    } catch (err) {
      setError(
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Ocurrió un error al generar el contenido."
      );
    } finally {
      setLoading(false);
    }
  };
  // Manejar el clic en una pregunta frecuente
  const handleFaqClick = (faqPrompt: string) => {
    setPrompt(faqPrompt); // Opcional: Mostrar el prompt en el textarea
    // Esperar a que el estado se actualice antes de generar el contenido
    setTimeout(() => handleGenerateContent(), 0);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Consulta con Gemini AI</h2>
      {/* Sección de Preguntas Frecuentes */}
      <div className="bg-gray-50 p-3 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Preguntas Frecuentes</h3>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => handleFaqClick(faq.prompt)}
              className="text-left text-blue-600 hover:underline text-sm w-full"
              disabled={loading}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-lg font-medium text-gray-700">
          Ingresa tu pregunta
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border rounded-md p-2 mt-1"
          rows={4}
          placeholder="Ejemplo: Explica cómo funciona la IA en pocas palabras"
          disabled={loading}
        />
      </div>
      <button
        onClick={handleGenerateContent}
        className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar Respuesta"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Respuesta:</h3>
          <p className="text-gray-600">{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;