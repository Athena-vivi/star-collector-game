import { NextRequest, NextResponse } from 'next/server'

interface AIResponse {
  answer: string
  links: string[]
  images?: string[]
  confidence: number
  sources: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { question, userId, subscription } = await request.json()

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Question cannot be empty' },
        { status: 400 }
      )
    }

    // 检查用户权限（免费用户限制100个问题/月）
    if (subscription === 'free') {
      // 这里应该检查用户的使用量
      // 简化处理，实际项目中需要查询数据库
    }

    // 调用真正的AI服务
    const response = await generateAIResponse(question)

    return NextResponse.json({
      success: true,
      data: response
    })
  } catch (error) {
    console.error('Ask-Universe API Error:', error)
    return NextResponse.json(
      { success: false, error: 'AI service temporarily unavailable' },
      { status: 500 }
    )
  }
}

async function generateAIResponse(question: string): Promise<AIResponse> {
  try {
    // 使用OpenRouter API
    console.log('当前GPT4O Key:', process.env.GPT4O_API_KEY)
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GPT4O_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        'X-Title': 'Star Collector - AI Astronomy Assistant'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert astronomy and space science assistant. You provide clear, accurate, and engaging explanations about astronomy, space, planets, stars, galaxies, and the universe. Always explain complex concepts in simple, understandable language. Be enthusiastic about space exploration and inspire curiosity. Provide detailed but accessible answers.`
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const aiAnswer = data.choices[0]?.message?.content || 'I apologize, but I am unable to provide an answer at the moment. Please try again later.'

    // 生成相关链接
    const links = generateRelevantLinks(question)

    return {
      answer: aiAnswer,
      links: links,
      confidence: 0.9,
      sources: ['NASA', 'ESA', 'Scientific Research']
    }
  } catch (error) {
    console.error('AI API call failed:', error)
    
    // Fallback to preset answers for common questions
    const presetAnswers = getPresetAnswers()
    const presetAnswer = presetAnswers[question.toLowerCase()]
    
    if (presetAnswer) {
      return presetAnswer
    }

    // Generic fallback response
    return {
      answer: `I apologize, but I'm currently unable to access my AI capabilities to answer your question about "${question}". This might be due to a temporary service issue. Please try again in a few moments, or feel free to ask a different astronomy question.`,
      links: [
        'https://en.wikipedia.org/wiki/Astronomy',
        'https://www.nasa.gov/'
      ],
      confidence: 0.5,
      sources: ['NASA', 'Wikipedia']
    }
  }
}

function getPresetAnswers(): Record<string, AIResponse> {
  return {
    'what is a black hole': {
      answer: `Black holes are among the most mysterious and fascinating objects in the universe. Simply put, a black hole is a region of spacetime where gravity is so incredibly strong that nothing, not even light, can escape from it.

Black holes typically form in two main ways:
1. **Stellar black holes**: When massive stars (about 20+ times the mass of our Sun) run out of fuel and collapse under their own gravity
2. **Supermassive black holes**: These are found at the centers of most galaxies, including our Milky Way

Key components of a black hole:
- **Event Horizon**: The "point of no return" - once anything crosses this boundary, it cannot escape
- **Singularity**: The center of the black hole where matter is crushed to infinite density
- **Accretion Disk**: A disk of gas and dust orbiting around the black hole, often glowing brightly

Despite their intimidating nature, black holes play crucial roles in the universe:
- They help galaxies form and maintain their structure
- They can create some of the brightest objects in the universe (quasars)
- They're essential for our understanding of gravity and spacetime

In 2019, scientists made history by capturing the first-ever image of a black hole's event horizon using the Event Horizon Telescope, confirming many predictions of Einstein's theory of general relativity.`,
      links: [
        'https://en.wikipedia.org/wiki/Black_hole',
        'https://eventhorizontelescope.org/',
        'https://www.nasa.gov/black-holes'
      ],
      confidence: 0.95,
      sources: ['Event Horizon Telescope', 'NASA', 'Wikipedia']
    },
    'why does the moon have craters': {
      answer: `The Moon's craters are primarily formed by meteorite impacts. When asteroids, comets, or other space debris collide with the lunar surface, they create tremendous impact forces that eject material from the surface, forming circular depressions known as craters.

The size of craters depends on several factors:
- **Mass and velocity** of the impacting object
- **Angle of impact**
- **Surface material** at the impact site

Larger impacts can create craters hundreds of kilometers in diameter, while smaller impacts form smaller craters. Some of the largest lunar craters include:
- **South Pole-Aitken Basin**: About 2,500 km in diameter
- **Imbrium Basin**: About 1,100 km in diameter
- **Orientale Basin**: About 930 km in diameter

Interestingly, Earth also has craters, but due to our atmosphere (which burns up most incoming objects) and geological activity (erosion, plate tectonics), most have been eroded or buried over time. The Moon has no atmosphere and very little geological activity, so craters can be preserved for billions of years.

Scientists study lunar craters to:
- Understand the history of impacts in our solar system
- Learn about the composition of the Moon's surface
- Gain insights into Earth's own impact history
- Plan future lunar missions and potential lunar bases`,
      links: [
        'https://en.wikipedia.org/wiki/Lunar_crater',
        'https://www.nasa.gov/mission_pages/LRO/news/lro-craters.html',
        'https://moon.nasa.gov/exploration/moon-missions/'
      ],
      confidence: 0.92,
      sources: ['NASA Lunar Reconnaissance Orbiter', 'Wikipedia']
    },
    'how many planets are in the solar system': {
      answer: `The solar system currently has **8 planets**, ordered from closest to farthest from the Sun:

**Terrestrial Planets (Rocky):**
1. **Mercury** - The smallest planet with extreme temperature variations (up to 800°F/427°C)
2. **Venus** - The hottest planet with a thick carbon dioxide atmosphere
3. **Earth** - Our home, the only known planet with life
4. **Mars** - The red planet, scientists believe it may have once had liquid water

**Gas Giants:**
5. **Jupiter** - The largest planet, famous for its Great Red Spot storm
6. **Saturn** - Known for its beautiful ring system
7. **Uranus** - An ice giant with a highly tilted rotation axis
8. **Neptune** - The farthest planet with intense storms

**Important Note:** In 2006, the International Astronomical Union (IAU) reclassified Pluto as a "dwarf planet," reducing the count from 9 to 8 planets.

**Other Solar System Objects:**
- **Dwarf Planets**: Pluto, Eris, Haumea, Makemake, Ceres
- **Asteroids**: Millions of rocky objects, mostly in the asteroid belt
- **Comets**: Icy objects that orbit the Sun
- **Moons**: Over 200 known moons orbiting various planets

The solar system also includes the Kuiper Belt (beyond Neptune) and the Oort Cloud (at the very edge), which contain many smaller icy objects.`,
      links: [
        'https://solarsystem.nasa.gov/planets/overview/',
        'https://en.wikipedia.org/wiki/Solar_System',
        'https://www.iau.org/public/themes/pluto/'
      ],
      confidence: 0.98,
      sources: ['NASA Solar System Exploration', 'IAU', 'Wikipedia']
    },
    'what is dark matter': {
      answer: `Dark matter is one of the most mysterious substances in the universe. We cannot directly see it, but we can infer its existence through its gravitational effects on other objects.

**What we know about dark matter:**
- **Does not emit, reflect, or absorb light** (hence "dark")
- **Only interacts with other matter through gravity**
- **Comprises about 27% of the universe's total matter-energy**
- **Helps galaxies maintain their shape and rotation speeds**
- **Is distributed throughout the universe in a "cosmic web"**

**Evidence for dark matter:**
1. **Galaxy rotation curves**: Galaxies rotate faster than expected based on visible matter
2. **Gravitational lensing**: Light bends around invisible mass
3. **Galaxy cluster dynamics**: Clusters stay together despite insufficient visible mass
4. **Cosmic microwave background**: Patterns in the early universe's radiation

**What dark matter might be:**
Scientists believe dark matter may be composed of particles we haven't discovered yet, such as:
- **WIMPs** (Weakly Interacting Massive Particles)
- **Axions**
- **Sterile neutrinos**

**Current research:**
Scientists are searching for dark matter through:
- Underground detectors (like LUX, XENON)
- Particle accelerators (like the Large Hadron Collider)
- Space telescopes (like the James Webb Space Telescope)
- Computer simulations of galaxy formation

Understanding dark matter is crucial because it appears to be the dominant form of matter in the universe and plays a key role in how galaxies and the universe itself evolved.`,
      links: [
        'https://en.wikipedia.org/wiki/Dark_matter',
        'https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy',
        'https://home.cern/science/physics/dark-matter'
      ],
      confidence: 0.89,
      sources: ['NASA Astrophysics', 'CERN', 'Wikipedia']
    }
  }
}

function generateRelevantLinks(question: string): string[] {
  const questionLower = question.toLowerCase()
  
  if (questionLower.includes('black hole')) {
    return [
      'https://en.wikipedia.org/wiki/Black_hole',
      'https://eventhorizontelescope.org/',
      'https://www.nasa.gov/black-holes'
    ]
  } else if (questionLower.includes('moon') || questionLower.includes('crater')) {
    return [
      'https://en.wikipedia.org/wiki/Lunar_crater',
      'https://www.nasa.gov/mission_pages/LRO/news/lro-craters.html',
      'https://moon.nasa.gov/'
    ]
  } else if (questionLower.includes('planet') || questionLower.includes('solar system')) {
    return [
      'https://solarsystem.nasa.gov/planets/overview/',
      'https://en.wikipedia.org/wiki/Solar_System',
      'https://www.iau.org/public/themes/pluto/'
    ]
  } else if (questionLower.includes('dark matter')) {
    return [
      'https://en.wikipedia.org/wiki/Dark_matter',
      'https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy',
      'https://home.cern/science/physics/dark-matter'
    ]
  } else {
    return [
      'https://en.wikipedia.org/wiki/Astronomy',
      'https://www.nasa.gov/',
      'https://www.esa.int/'
    ]
  }
} 