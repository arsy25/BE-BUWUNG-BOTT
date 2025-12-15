require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai'); // ESM style import


const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));


// ✅ PAKAI API KEY ANDA (pindah ke .env nanti)
const openai = new OpenAI({
  apiKey: "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"
});


// Test
app.get('/', (req, res) => res.json({ message: 'Backend OK' }));


// ✅ CHAT ENDPOINT - PAKAI FORMAT CHAT COMPLETIONS
app.post('/chat', async (req, res) => {
  const { message } = req.body;
 
  if (!message) return res.status(400).json({ error: 'Message required' });
 
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // ✅ Model BENAR & MURAH
      messages: [
        {
          role: 'system',
          content: `Kamu ahli rekomendasi burung peliharaan Indonesia. Rekomendasi berdasarkan budget, ruang, perawatan. Jawab santai bahasa Indonesia. Contoh: Lovebird (Rp200-500rb), Kenari (Rp150-400rb), Parkit (Rp100-300rb). berikan jawabannya dalam bahasa yang natural seperti bahasa pedagang pedagang atau ahli burung gitu`
        },
        { role: 'user', content: message }
      ],
      max_tokens: 400,
      temperature: 0.7
    });
   
    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () => console.log('🚀 http://localhost:3000'));
