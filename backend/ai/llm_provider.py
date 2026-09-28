import os
from abc import ABC, abstractmethod
from typing import Dict, Any

class LLMProvider(ABC):
    """
    Abstract interface for LLM operations.
    Allows MediFlow AI to switch seamlessly between offline rule-based NLP,
    OpenAI GPT models, or Google Gemini models via environment configuration.
    """
    @abstractmethod
    def generate_response(self, prompt: str, context: Dict[str, Any]) -> str:
        pass


class RuleBasedProvider(LLMProvider):
    """
    Default offline provider requiring zero API keys.
    Uses template synthesis and exact rule matching for fast, deterministic responses.
    """
    def generate_response(self, prompt: str, context: Dict[str, Any]) -> str:
        intent = context.get("intent", "General Hospital Assistance")
        entities = context.get("entities", {})
        dept = entities.get("department")
        time_pref = entities.get("time_preference")

        if intent == "Doctor Search":
            if dept:
                return f"Here are our top-rated specialists in {dept} available for consultation ({time_pref}). You can pick a slot below to book directly:"
            return "Here are our available hospital doctors across departments:"
        elif intent == "Appointment Booking":
            return "I can help you book an appointment right away. Please choose a specialist and slot from the cards below:"
        elif intent == "Appointment Status":
            return "Here is your upcoming scheduled hospital appointment details:"
        elif intent == "Hospital Information":
            return context.get("kb_answer", "Here is the official hospital information retrieved from our knowledge base:")
        elif intent == "Patient Record Summary":
            return "Here is your AI-summarized patient record:"

        return "I am MediFlow AI, your intelligent hospital assistant. How can I assist you with your health records, doctor appointments, or hospital navigation today?"


class OpenAIProvider(LLMProvider):
    """
    Stub implementation for OpenAI GPT-4o / GPT-3.5 integration.
    
    To activate:
    1. Set LLM_PROVIDER=openai in backend/.env
    2. Add OPENAI_API_KEY=your_key_here to backend/.env
    3. Install openai package: `pip install openai`
    """
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")

    def generate_response(self, prompt: str, context: Dict[str, Any]) -> str:
        if not self.api_key:
            return "[OpenAI Provider Notice]: OPENAI_API_KEY missing in .env. Falling back to rule-based synthesis."
        
        # Example real API call (commented out for offline execution):
        # import openai
        # response = openai.ChatCompletion.create(
        #     model="gpt-4o-mini",
        #     messages=[
        #         {"role": "system", "content": "You are MediFlow AI, a helpful hospital administrative assistant. Do NOT diagnose diseases."},
        #         {"role": "user", "content": prompt}
        #     ]
        # )
        # return response.choices[0].message.content
        return f"[OpenAI Stub]: Processed prompt '{prompt[:30]}...' via OpenAI API interface."


class GeminiProvider(LLMProvider):
    """
    Stub implementation for Google Gemini 1.5/2.0 API integration.
    
    To activate:
    1. Set LLM_PROVIDER=gemini in backend/.env
    2. Add GEMINI_API_KEY=your_key_here to backend/.env
    3. Install google-generativeai package: `pip install google-generativeai`
    """
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")

    def generate_response(self, prompt: str, context: Dict[str, Any]) -> str:
        if not self.api_key:
            return "[Gemini Provider Notice]: GEMINI_API_KEY missing in .env. Falling back to rule-based synthesis."
        return f"[Gemini Stub]: Processed prompt '{prompt[:30]}...' via Gemini API interface."


def get_llm_provider() -> LLMProvider:
    provider_name = os.getenv("LLM_PROVIDER", "rule_based").lower()
    if provider_name == "openai":
        return OpenAIProvider()
    elif provider_name == "gemini":
        return GeminiProvider()
    return RuleBasedProvider()
