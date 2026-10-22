export const PROFILE = {
  name: 'Aniket Shukla',
  title: 'Web & AI Developer',
  tagline: 'Turning ideas into digital reality.',
  email: 'aniketshukul@gmail.com',
  whatsapp: '9279123422',
  instagram: 'https://www.instagram.com/urs.aniket.143/',
  // Replace this URL with your own approved profile photo when ready.
  photo: '',
};

export const SERVICES = [
  { id: 'app-development', title: 'App Development', short: 'Mobile-first product experiences, thoughtful flows and clear interfaces.', icon: 'smartphone', items: ['Productivity app concept', 'Learning app experience', 'Task manager interface', 'Community app concept', 'Utility app UI'] },
  { id: 'website-development', title: 'Website Development', short: 'Responsive websites that feel clear, fast and easy to use.', icon: 'panels-top-left', items: ['Personal portfolio', 'Local business website', 'Education website', 'Event website', 'Product landing page'] },
  { id: 'ai-machine-learning', title: 'AI & Machine Learning', short: 'Useful AI experiences, presented with practical and accessible UX.', icon: 'brain-circuit', items: ['AI assistant interface', 'Document summarizer concept', 'Smart search experience', 'Text processing UI', 'ML analytics dashboard'] },
  { id: 'content-creation', title: 'Content Creation', short: 'Content systems, short-form edits and channel presentation.', icon: 'clapperboard', items: ['Podcast clips', 'Short-video showcase', 'Thumbnail portfolio', 'Content calendar', 'Channel showcase'] },
  { id: 'seo', title: 'SEO', short: 'Search-friendly structure, useful content and clear reporting.', icon: 'search-check', items: ['SEO audit report', 'Keyword research plan', 'On-page checklist', 'Content strategy', 'Performance report layout'] },
  { id: 'google-maps-seo', title: 'Google Maps SEO', short: 'Local profile improvements and transparent visibility reporting.', icon: 'map-pinned', items: ['Business profile audit', 'Local keyword plan', 'Listing optimisation checklist', 'Competitor analysis report', 'Local visibility dashboard'] },
];

const descriptions = {
  'App Development': 'A concept for a focused mobile experience, with a clear user journey and accessible screen hierarchy.',
  'Website Development': 'A responsive web experience designed around a clear message, easy navigation and purposeful calls to action.',
  'AI & Machine Learning': 'A concept interface for making AI-assisted workflows understandable and easier to review.',
  'Content Creation': 'A presentation of content formats, storytelling structure and production workflow.',
  'SEO': 'A structured report concept that turns search observations into prioritised next steps.',
  'Google Maps SEO': 'A local-search audit concept for improving profile completeness and business information consistency.'
};
const problems = {
  'App Development': 'People need a clear, low-friction way to understand and navigate the product.',
  'Website Development': 'Visitors should understand the offer quickly and find the next step without confusion.',
  'AI & Machine Learning': 'AI workflows can feel opaque when inputs, outputs and limitations are not clearly presented.',
  'Content Creation': 'Content can feel inconsistent when formats and publishing plans are not organised.',
  'SEO': 'Search improvements are harder to act on when findings are scattered across reports.',
  'Google Maps SEO': 'Local business information can be incomplete or inconsistent across public profiles.'
};
export const PROJECTS = SERVICES.flatMap((service, si) => service.items.map((title, i) => ({
  id: `${service.id}-${i+1}`, title, category: service.title,
  summary: descriptions[service.title], problem: problems[service.title],
  solution: `Create a clear ${title.toLowerCase()} showcase with a consistent layout, accessible information hierarchy and a practical next-step CTA.`,
  features: ['Responsive layout', 'Clear information hierarchy', 'Accessible visual contrast', 'Purposeful navigation'],
  image_url: '', status: 'concept', published: true,
  palette: [['#e5f5ed','#d1e9df'],['#e9efff','#d9e2fa'],['#f2eafa','#e6daf3'],['#fff0e5','#f8dfcc'],['#e9f5f7','#d5e9eb'],['#f5f0dc','#e9e1bc']][si],
  index: i+1
})));

export const SAMPLE_REVIEWS = Array.from({ length: 24 }, (_, i) => ({
  id: `sample-${i + 1}`,
  display_name: `Sample placeholder ${String(i + 1).padStart(2, '0')}`,
  role_label: 'Sample placeholder — replace with real feedback',
  review_text: 'This is placeholder text for layout review only. Replace it with authentic client feedback and permission to publish before presenting it as a testimonial.',
  published: false,
}));
