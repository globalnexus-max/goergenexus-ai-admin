const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL || 'gpt-4';
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async askTutor(question, context = '') {
    try {
      const systemPrompt = `You are an expert educational AI tutor for high school students (grades 9-12) at Goergenexus School.
      Answer questions clearly, provide examples, and encourage learning.
      Response language: Azerbaijani`;

      const response = await axios.post(this.apiUrl, {
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: context ? `Context: ${context}\n\nQuestion: ${question}` : question }
        ],
        temperature: 0.7,
        max_tokens: 500
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });

      return response.data.choices[0].message.content;
    } catch (err) {
      console.error('AI Service error:', err);
      throw new Error('Failed to get AI response');
    }
  }

  async generateQuiz(topic, difficulty = 'medium', questionCount = 5) {
    try {
      const prompt = `Generate a ${difficulty} ${topic} quiz with ${questionCount} questions for high school students.
      Format as JSON with array of questions. Each question should have:
      - question (text)
      - options (array of 4 options)
      - correct (index of correct option)
      - explanation (why this is correct)
      Language: Azerbaijani`;

      const response = await axios.post(this.apiUrl, {
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 2000
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/\[.*\]/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Invalid response format' };
    } catch (err) {
      console.error('Quiz generation error:', err);
      throw new Error('Failed to generate quiz');
    }
  }

  async generateLessonPlan(topic, grade, duration = 45) {
    try {
      const prompt = `Create a ${duration}-minute lesson plan for ${grade} grade about ${topic}.
      Include: objectives, materials, activities, assessment, and closure.
      Format as JSON.
      Language: Azerbaijani`;

      const response = await axios.post(this.apiUrl, {
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Invalid response format' };
    } catch (err) {
      console.error('Lesson plan generation error:', err);
      throw new Error('Failed to generate lesson plan');
    }
  }
}

module.exports = new AIService();
