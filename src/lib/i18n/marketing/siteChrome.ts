import type { Localized } from '../useCopy'
const en = {
 navLabel:'Main navigation',open:'Open menu',close:'Close menu',demo:'Request a demo',
 links:[{label:'Product',href:'/platform'},{label:'Guest experience',href:'/solutions'},{label:'Revenue',href:'/revenue'},{label:'Hotel groups',href:'/enterprise'},{label:'Setup & pilot',href:'/implementation'},{label:'Resources',href:'/resources'}],
 signature:'The stay remembers.',footerSummary:'Smarter recommendations. More personal hospitality.',builtOn:'Built by',accessibility:'Accessibility',copyright:'© 2026 Hotel Companion. All rights reserved.',
 footer:[
 {title:'Explore',links:[{label:'Product',href:'/platform'},{label:'Guest experience',href:'/solutions'},{label:'Revenue',href:'/revenue'},{label:'Hotel groups',href:'/enterprise'},{label:'Setup & pilot',href:'/implementation'}]},
 {title:'Company',links:[{label:'About us',href:'/company'},{label:'Resources',href:'/resources'},{label:'Contact',href:'/contact'},{label:'Request a demo',href:'/demo'}]},
 {title:'Trust',links:[{label:'Trust center',href:'/trust'},{label:'Security',href:'/security'},{label:'Responsible AI',href:'/responsible-ai'},{label:'Privacy',href:'/privacy'},{label:'Terms',href:'/terms'},{label:'Cookies',href:'/cookies'}]},
 ]
}
const es:typeof en={
 navLabel:'Navegación principal',open:'Abrir menú',close:'Cerrar menú',demo:'Solicita una demo',
 links:[{label:'Producto',href:'/platform'},{label:'Experiencia',href:'/solutions'},{label:'Ingresos',href:'/revenue'},{label:'Grupos hoteleros',href:'/enterprise'},{label:'Piloto',href:'/implementation'},{label:'Recursos',href:'/resources'}],
 signature:'La estancia recuerda.',footerSummary:'Mejores recomendaciones. Hospitalidad más personal.',builtOn:'Creado por',accessibility:'Accesibilidad',copyright:'© 2026 Hotel Companion. Todos los derechos reservados.',
 footer:[
 {title:'Explora',links:[{label:'Producto',href:'/platform'},{label:'Experiencia',href:'/solutions'},{label:'Ingresos',href:'/revenue'},{label:'Grupos hoteleros',href:'/enterprise'},{label:'Implementación y piloto',href:'/implementation'}]},
 {title:'Empresa',links:[{label:'Nosotros',href:'/company'},{label:'Recursos',href:'/resources'},{label:'Contacto',href:'/contact'},{label:'Solicita una demo',href:'/demo'}]},
 {title:'Confianza',links:[{label:'Centro de confianza',href:'/trust'},{label:'Seguridad',href:'/security'},{label:'IA responsable',href:'/responsible-ai'},{label:'Privacidad',href:'/privacy'},{label:'Términos',href:'/terms'},{label:'Cookies',href:'/cookies'}]},
 ]
}
export const siteChromeCopy:Localized<typeof en>={en,es}
