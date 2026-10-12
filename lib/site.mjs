export const SITE_URL = 'https://www.dhara.website';
export const PERSON_ID = `${SITE_URL}/#dhara-rajpura`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const personSchema = {
  '@type': 'Person', '@id': PERSON_ID, name: 'Dhara Rajpura',
  url: `${SITE_URL}/about`, image: `${SITE_URL}/media/dhara-rajpura-profile.jpg`,
  jobTitle: 'Freelance PCB Design and Embedded Hardware Engineer',
  description: 'PCB design, schematic capture, multilayer layout, low-power wireless hardware and manufacturing documentation for product teams worldwide.',
  email: 'mailto:dharaxrajpura@gmail.com',
  sameAs: ['https://www.linkedin.com/in/dhara-rajpura-4b24b122b/'],
  knowsAbout: ['PCB Design', 'Embedded Hardware', 'Altium Designer', 'KiCad', 'Schematic Capture', 'Multilayer PCB Layout', 'Design for Manufacturing', 'ESP32', 'STM32', 'nRF52', 'Low-Power Wireless Hardware'],
};
export const websiteSchema = {
  '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE_URL}/`,
  name: 'Dhara Rajpura — PCB & Embedded Hardware', alternateName: 'Dhara Rajpura',
  publisher: { '@id': PERSON_ID }, inLanguage: 'en',
};
export function breadcrumbSchema(items) {
  return { '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({
    '@type': 'ListItem', position: i + 1, name: item.name, item: `${SITE_URL}${item.path}`,
  })) };
}
export function serviceSchema(service) {
  return { '@type': 'Service', '@id': `${SITE_URL}/services/${service.slug}#service`,
    name: service.title, description: service.summary, serviceType: service.title,
    url: `${SITE_URL}/services/${service.slug}`, provider: { '@id': PERSON_ID },
    areaServed: 'Worldwide', availableChannel: { '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/contact`, servicePhone: { '@type': 'ContactPoint', telephone: '+919725417323', contactType: 'Project inquiries' } },
  };
}
export function projectSchema(project) {
  return { '@type': 'CreativeWork', '@id': `${SITE_URL}/projects/${project.slug}#case-study`,
    name: project.title, description: `${project.overview} Dhara's scope: ${project.scope}`,
    url: `${SITE_URL}/projects/${project.slug}`, author: { '@id': PERSON_ID },
    image: project.images.map(image => `${SITE_URL}${image}`),
    about: project.tools.map(name => ({ '@type': 'Thing', name })), inLanguage: 'en',
  };
}
