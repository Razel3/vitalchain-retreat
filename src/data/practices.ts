export interface Practice {
  slug: string;
  title: string;
  desc: string;
  whatIs: { title: string; text: string };
  howWorks: { title: string; text: string };
  benefits: string[];
  session: { title: string; text: string };
  closing: string;
}

export const practices: Practice[] = [
  {
    slug: "transformational-coaching",
    title: "Transformational Coaching",
    desc: "One-on-one sessions to unlock your potential and design a life aligned with your deepest values.",
    whatIs: {
      title: "What is Transformational Coaching?",
      text: "Transformational Coaching is a deep, one-on-one process designed to help you uncover your true desires, break through limitations, and create lasting change in your life. It goes beyond surface-level goals to address the core beliefs and patterns that shape your reality.",
    },
    howWorks: {
      title: "How does it work?",
      text: "Through powerful questions, reflective exercises, and guided exploration, your coach helps you gain clarity on what truly matters to you. Together, you identify limiting beliefs, set meaningful goals, and create an actionable plan aligned with your authentic self.",
    },
    benefits: [
      "Clarity on your life purpose and direction",
      "Release of limiting beliefs and self-doubt",
      "Greater confidence and self-awareness",
      "Actionable plans for lasting personal change",
      "Deeper alignment between values and daily life",
      "Stronger emotional resilience",
    ],
    session: {
      title: "What happens in a coaching session?",
      text: "In a session, you'll have a safe, confidential space to explore your thoughts, feelings, and aspirations. Your coach will guide the conversation with empathy and intention, helping you see new perspectives and unlock solutions that already exist within you.",
    },
    closing: "Transformational Coaching sessions at VitalChain Retreat are designed to help you gain clarity, overcome inner obstacles, and step into the most empowered version of yourself.",
  },
  {
    slug: "hypnotherapy",
    title: "Hypnotherapy Sessions",
    desc: "Access your subconscious mind to release limiting beliefs and patterns holding you back.",
    whatIs: {
      title: "What is Hypnotherapy?",
      text: "Hypnotherapy is a therapeutic technique that uses guided relaxation and focused attention to access the subconscious mind. It helps uncover and reprogram deep-seated beliefs, habits, and emotional patterns that influence your behavior and well-being.",
    },
    howWorks: {
      title: "How does it work?",
      text: "During hypnotherapy, you enter a deeply relaxed state where your subconscious mind becomes more receptive to positive suggestions and new perspectives. This allows you to address root causes of challenges like anxiety, fears, and self-sabotaging patterns at their source.",
    },
    benefits: [
      "Release of deep-rooted limiting beliefs",
      "Reduction in anxiety and stress",
      "Breaking free from negative patterns and habits",
      "Enhanced self-confidence and motivation",
      "Emotional healing at the subconscious level",
      "Greater sense of inner freedom",
    ],
    session: {
      title: "What happens in a hypnotherapy session?",
      text: "You'll be guided into a state of deep relaxation while remaining fully aware and in control. The therapist will use gentle suggestions and visualization techniques to help you access and transform subconscious patterns. Most people describe the experience as profoundly calming and insightful.",
    },
    closing: "Hypnotherapy sessions at VitalChain Retreat are designed to help you access deeper layers of your mind, release what no longer serves you, and create space for lasting transformation.",
  },
  {
    slug: "reiki-energy-healing",
    title: "Reiki Energy Healing",
    desc: "Restore your energetic balance through gentle, hands-on healing practices.",
    whatIs: {
      title: "What is Reiki?",
      text: "Reiki is a gentle energy healing practice that supports the body's natural ability to restore balance. Through light touch or hands placed near the body, energy is guided to help release tension, reduce stress, and promote emotional and spiritual well-being.",
    },
    howWorks: {
      title: "How does Reiki work?",
      text: "Reiki works by helping to balance the body's energy flow. When energy is blocked due to stress, emotions, or life challenges, it can affect our physical and emotional state. Reiki helps restore harmony and relaxation, allowing the body and mind to heal naturally.",
    },
    benefits: [
      "Deep relaxation and stress reduction",
      "Emotional balance and inner calm",
      "Improved clarity and mental focus",
      "Support for personal healing processes",
      "Increased sense of peace and well-being",
      "Energy alignment and balance",
    ],
    session: {
      title: "What happens in a Reiki session?",
      text: "During a session, you will lie down or sit comfortably while the practitioner gently places their hands on or near different areas of the body. The experience is deeply relaxing, and many people feel warmth, calmness, or a sense of energetic flow.",
    },
    closing: "Reiki sessions at VitalChain Retreat are designed to help you reconnect with your inner balance, release emotional tension, and support your personal transformation journey.",
  },
  {
    slug: "family-constellations",
    title: "Family Constellations",
    desc: "Explore hidden family dynamics and heal generational patterns for lasting freedom.",
    whatIs: {
      title: "What are Family Constellations?",
      text: "Family Constellations is a therapeutic approach that reveals hidden dynamics within family systems. It helps uncover unconscious patterns, loyalties, and entanglements passed down through generations that may be affecting your present life.",
    },
    howWorks: {
      title: "How does it work?",
      text: "Through a guided process, representatives are placed to represent family members or life elements, revealing the hidden dynamics at play. This allows deep insights to emerge and healing movements to take place, restoring balance and flow within the family system.",
    },
    benefits: [
      "Understanding of inherited family patterns",
      "Release from generational emotional burdens",
      "Improved family relationships and dynamics",
      "Greater clarity about recurring life challenges",
      "Emotional freedom and a sense of belonging",
      "Deeper connection to your roots and identity",
    ],
    session: {
      title: "What happens in a Family Constellations session?",
      text: "In a group or individual session, you'll share a brief overview of the challenge you're facing. The facilitator will guide the constellation process, where hidden dynamics become visible and healing resolutions unfold naturally. The experience is often deeply moving and transformative.",
    },
    closing: "Family Constellations at VitalChain Retreat are designed to help you understand and heal the invisible threads that connect you to your family system, freeing you to live more fully in the present.",
  },
  {
    slug: "addiction-recovery",
    title: "Addiction Recovery Guidance",
    desc: "Compassionate talks and tools for those on the path to recovery and conscious living.",
    whatIs: {
      title: "What is Addiction Recovery Guidance?",
      text: "Addiction Recovery Guidance offers compassionate support, tools, and conversations for those navigating the journey of recovery. It combines therapeutic approaches with personal development to help you build a life of conscious, healthy choices.",
    },
    howWorks: {
      title: "How does it work?",
      text: "Through guided talks, reflective exercises, and supportive group dynamics, you'll explore the emotional roots of addictive patterns, develop coping strategies, and build a foundation of self-awareness and resilience for long-term recovery.",
    },
    benefits: [
      "Understanding the emotional roots of addiction",
      "Development of healthy coping strategies",
      "Stronger self-awareness and emotional resilience",
      "Connection with a supportive community",
      "Tools for maintaining conscious, healthy choices",
      "A sense of hope and renewed purpose",
    ],
    session: {
      title: "What happens in a recovery guidance session?",
      text: "Sessions are held in a safe, non-judgmental space where you can share openly. The facilitator guides the conversation with empathy and expertise, offering practical tools and emotional support. Group dynamics create a powerful sense of belonging and shared understanding.",
    },
    closing: "Addiction Recovery Guidance at VitalChain Retreat is designed to support your journey toward freedom, self-compassion, and a life of conscious choices.",
  },
  {
    slug: "personal-development",
    title: "Personal Development Workshops",
    desc: "Interactive group sessions focused on building emotional intelligence and resilience.",
    whatIs: {
      title: "What are Personal Development Workshops?",
      text: "Personal Development Workshops are interactive group sessions designed to help you develop emotional intelligence, self-awareness, and practical life skills. They combine learning, reflection, and group dynamics to accelerate your personal growth.",
    },
    howWorks: {
      title: "How do they work?",
      text: "Through facilitated exercises, discussions, and experiential activities, you'll explore key areas of personal growth such as communication, emotional regulation, self-confidence, and purpose. The group setting creates a supportive environment for learning and transformation.",
    },
    benefits: [
      "Enhanced emotional intelligence and self-awareness",
      "Improved communication and relationship skills",
      "Greater confidence and inner strength",
      "Practical tools for everyday challenges",
      "Deeper understanding of personal patterns",
      "Connection with a growth-oriented community",
    ],
    session: {
      title: "What happens in a workshop?",
      text: "Each workshop is structured around a specific theme and includes a mix of teaching, self-reflection, and group interaction. You'll leave with practical insights and tools you can apply immediately in your daily life. The atmosphere is warm, supportive, and encouraging.",
    },
    closing: "Personal Development Workshops at VitalChain Retreat are designed to equip you with the skills, awareness, and confidence to navigate life's challenges with greater ease and purpose.",
  },
  {
    slug: "art-therapy",
    title: "Art Therapy & Creative Expression",
    desc: "Use creativity as a gateway to self-discovery and emotional release.",
    whatIs: {
      title: "What is Art Therapy?",
      text: "Art Therapy is a form of expressive therapy that uses creative processes like painting, drawing, and sculpting to explore emotions, reduce stress, and foster self-discovery. No artistic skill is required — the focus is on the process, not the product.",
    },
    howWorks: {
      title: "How does it work?",
      text: "Through guided creative activities, you access emotions and insights that may be difficult to express with words. The act of creating becomes a pathway to understanding yourself more deeply, releasing stored emotions, and discovering new perspectives.",
    },
    benefits: [
      "Emotional release and stress reduction",
      "Greater self-awareness and insight",
      "A safe way to process difficult emotions",
      "Enhanced creativity and self-expression",
      "Improved mental clarity and focus",
      "A sense of joy and playful discovery",
    ],
    session: {
      title: "What happens in an art therapy session?",
      text: "You'll be guided through a creative exercise using various materials and techniques. The facilitator creates a safe, supportive space for exploration. After creating, there's time for reflection and sharing. The experience is deeply personal and often surprisingly revealing.",
    },
    closing: "Art Therapy sessions at VitalChain Retreat are designed to help you tap into your creative spirit, process emotions in a gentle way, and discover new dimensions of yourself.",
  },
  {
    slug: "meditation",
    title: "Meditation & Conscious Awareness",
    desc: "Guided practices to cultivate presence, inner peace and mindful awareness.",
    whatIs: {
      title: "What is Meditation & Conscious Awareness?",
      text: "Meditation is the practice of training your attention and awareness to achieve mental clarity, emotional calm, and a deeper connection with the present moment. Conscious awareness extends this practice into everyday life, helping you live with greater intention and presence.",
    },
    howWorks: {
      title: "How does it work?",
      text: "Through guided breathing exercises, visualization, body scans, and silent reflection, you learn to quiet the mind, observe your thoughts without judgment, and cultivate a deep sense of inner peace. Over time, these practices rewire your relationship with stress and reactivity.",
    },
    benefits: [
      "Deep relaxation and stress reduction",
      "Greater mental clarity and focus",
      "Emotional regulation and inner calm",
      "Enhanced self-awareness and presence",
      "Improved sleep and overall well-being",
      "A lasting sense of peace and groundedness",
    ],
    session: {
      title: "What happens in a meditation session?",
      text: "Sessions are held in a serene, comfortable setting. The facilitator guides you through different meditation techniques tailored to your experience level. Whether you're a beginner or experienced practitioner, each session offers a space for deep inner exploration and renewal.",
    },
    closing: "Meditation & Conscious Awareness practices at VitalChain Retreat are designed to help you cultivate lasting inner peace, sharpen your awareness, and carry mindfulness into every aspect of your life.",
  },
  {
    slug: "free-time",
    title: "Free Time",
    desc: "Unstructured moments to rest, reflect, explore nature, or simply be present with yourself.",
    whatIs: {
      title: "What is Free Time at the Retreat?",
      text: "Free Time is an intentional part of the retreat experience. It provides unstructured space for you to rest, journal, walk in nature, read, or simply sit in stillness. These moments are essential for integrating the insights and experiences from your sessions.",
    },
    howWorks: {
      title: "Why is Free Time important?",
      text: "Transformation doesn't only happen in structured sessions. Some of the deepest insights emerge in quiet moments of solitude and reflection. Free Time allows your mind and body to process, integrate, and absorb the healing work you've done.",
    },
    benefits: [
      "Space for personal reflection and journaling",
      "Time to rest and recharge",
      "Opportunity to connect with nature",
      "Integration of workshop and session insights",
      "Freedom to follow your own rhythm",
      "Deeper connection with yourself",
    ],
    session: {
      title: "How can you spend your Free Time?",
      text: "You're free to spend this time however feels right for you — take a walk through the retreat grounds, journal by the garden, meditate in your room, read a book, or simply rest. There are no expectations, only space for you to be exactly where you are.",
    },
    closing: "Free Time at VitalChain Retreat is designed to honor your need for rest, reflection, and personal space as an essential part of your transformation journey.",
  },
  {
    slug: "nourishment-dining",
    title: "Nourishment & Dining",
    desc: "Wholesome, mindfully prepared meals designed to nourish your body, mind and spirit.",
    whatIs: {
      title: "What is Nourishment & Dining?",
      text: "At VitalChain Retreat, meals are more than just food — they are a mindful experience. Our nourishment program features wholesome, plant-forward cuisine prepared with fresh, locally sourced ingredients designed to support your healing and energize your body.",
    },
    howWorks: {
      title: "How does it work?",
      text: "Every meal is thoughtfully crafted to balance nutrition, flavor, and healing properties. We accommodate dietary needs and preferences, and meals are served in a communal setting that encourages connection, gratitude, and mindful eating.",
    },
    benefits: [
      "Nourishing, balanced meals for optimal energy",
      "Support for your body's natural healing processes",
      "Mindful eating as a daily practice",
      "Community connection through shared meals",
      "Fresh, locally sourced ingredients",
      "Accommodation of dietary needs and preferences",
    ],
    session: {
      title: "What is the dining experience like?",
      text: "Meals are served in a beautiful communal space where participants gather to share food and conversation. Each meal begins with a moment of gratitude. The atmosphere is relaxed and warm, creating a sense of family and belonging among retreat participants.",
    },
    closing: "Nourishment & Dining at VitalChain Retreat is designed to feed not just your body, but your soul — supporting your overall well-being and deepening your retreat experience.",
  },
];
