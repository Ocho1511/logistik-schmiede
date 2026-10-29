// Baut die Seite in allen Sprachen: node build.js
// Ausgabe: index.html (DE), en/index.html, es/index.html, it/index.html
const fs = require('fs'), path = require('path');
const SITE = 'https://logistik-schmiede.de';
const LANGS = ['de', 'en', 'es', 'it'];
const LABEL = { de: 'DE', en: 'EN', es: 'ES', it: 'IT' };

const T = {
de: {
  htmlLang: 'de', locale: 'de_DE',
  title: 'Logistik Schmiede – ERP, WMS, Logistik 4.0 & Zoll',
  desc: 'Thomas Knecht Consulting: Beratung zu ERP & WMS, Logistik 4.0, Zoll- und Außenhandel (AEO), Inventur sowie Interimsmanagement. Mehr als 20 Jahre Erfahrung.',
  menu: 'Menü', skip: 'Zum Inhalt springen',
  nav: ['Leistungen', 'Zoll', 'Inventur', 'Interim', 'Über uns', 'Kontakt'],
  eyebrow: 'Innovativ · Kompetent · Visionär',
  h1: ['Logistik digital denken.', 'Ehrlich beraten.'],
  lead: 'Wir beraten Sie kompetent und ehrlich aus einer Hand und tragen maßgeschneidert zur erfolgreichen Umsetzung Ihrer Projekte bei – von ERP & WMS über Logistik 4.0 bis Zoll und Interimsmanagement.',
  cta: ['Termin vereinbaren', 'Leistungen ansehen'],
  statsLabel: 'Kennzahlen',
  stats: [['20+ Jahre', 'Erfahrung in Logistik-Projekten'], ['Bis zu 95 %', 'weniger Inventuraufwand möglich'], ['15 Länder', 'Projekte von Europa bis Japan & USA']],
  tagline: 'Digitalisierung · Vernetzung · Expertenwissen · Wettbewerbsfähigkeit · Kostensenkung · Zukunft',
  svc: { eyebrow: 'Beratungsleistungen', h2: 'Was wir für Sie tun', more: 'Mehr erfahren →',
    erp: ['ERP & WMS', ['Analyse bestehender IT-Systeme und Abgleich mit den Anforderungen', 'Unterstützung bei Lasten- und Pflichtenheften', 'Anbieterauswahl (Long List) und Koordination von Demos', 'Implementierung Cloud & On-Premise, Schulung, agiles Projektmanagement']],
    l40: ['Logistik 4.0', 'Vernetzung und Integration logistischer Prozesse bis zur dezentralen Echtzeitsteuerung: mehr Supply-Chain-Visibility, Automatisierung und Optimierung bei Material- und Ressourceneinsatz – inklusive mobiler Endgeräte und Apps.'],
    customs: ['Zoll & Außenhandel', 'Begleitung zum Status AEO, Zugelassener Ausführer, Ermächtigter Ausführer und Bekannter Versender – sowie Unterstützung bei Zollprüfungen.'],
    inv: ['Inventurvereinfachung', 'Weg vom Stichtag zur unterjährigen, IT-gestützten Inventur – mit bis zu 95 % weniger Aufwand und höherer Bestandssicherheit.'],
    interim: ['Interimsmanagement & Projektleitung', 'Leitungsfunktion auf Zeit oder professionelle Projektleitung bei ERP-/WMS-Auswahl und -Einführung.'],
    misc: ['Hardware, Personal & Smart Home', 'Hilfe bei der Hardwareauswahl, der Suche nach Fach- und Führungspersonal sowie Smart-Home-Lösungen für Haus und Garten.'] },
  customs: { eyebrow: 'Zoll & Außenhandel', h2: 'Zugelassener Wirtschaftsbeteiligter (AEO)',
    p: ['Zoll wird in vielen Unternehmen stiefmütterlich behandelt – dabei steckt hier großes Optimierungspotenzial. Als AEO profitieren Sie von Vereinfachungen im internationalen Handel, die direkte Kosteneinsparungen bedeuten.', 'Wir unterstützen bei Zollprüfungen in den Bereichen Import, Außenhandel, Dual-Use-Waren sowie Präferenzen und Ursprungszeugnissen.'],
    li: ['Senkung der Abwicklungskosten', 'Steigerung des Images bei Kunden und Lieferanten', 'Kürzere Durchlaufzeiten', 'Sicherung der Lieferkette', 'Weniger mögliche Zollkontrollen'] },
  inv: { eyebrow: 'Inventur', h2: 'Inventuraufwand um bis zu 95 % senken',
    p: ['Die Zählung zu einem Stichtag, oft um die Weihnachtszeit, war Ihnen schon immer ein Dorn im Auge? Es gibt vielfältige andere Möglichkeiten – auch unterjährig und mit Hilfe sinnvoller IT-Tools.'],
    li: ['Kostensenkung um bis zu 95 %', 'Eigenständige Auswahl der Inventurzeitpunkte', 'Höhere Bestandssicherheit zur Vermeidung von Lieferengpässen'] },
  interim: { eyebrow: 'Interimsmanagement & Projektleitung', h2: 'Die richtige Person zur richtigen Zeit',
    lead: 'Sie brauchen eine Leitungsfunktion auf Zeit, finden aber keinen passenden Bewerber für einen befristeten Vertrag? Oder ein Logistikprojekt soll professionell geleitet werden?',
    cards: [['Erfahrung', 'Betreuung und Projektmanagement bei der Auswahl von ERP-, WMS- und ähnlichen Anbietern – mit Erfahrung auf Kunden- wie Dienstleisterseite.'], ['Schnelligkeit', 'Dank engem Kontakt zu Interim-Managern liegen erste passende Profile in kürzester Zeit vor.'], ['Treffsicherheit', 'Wir sagen offen, ob Interimsmanagement in Ihrem Fall die richtige Lösung ist, und schärfen das Profil.'], ['Kompetenz', 'Auch die Suche nach Kandidaten für eine Festanstellung – punktgenau und mit Logistikerfahrung.']] },
  about: { eyebrow: 'Über uns', h2: 'Erfahrung aus vielen Projekten',
    lead: 'Mit mehr als 20 Jahren Erfahrung bieten wir im Zusammenhang mit der Digitalisierung einen echten Mehrwert – von der Systemauswahl bis zur Migration, Cloud oder On-Premise.',
    sub: 'Ausgewählte Projekte',
    projects: [['Wohnen', 'Luxusbetten, Schweden', 'Cloud ERP'], ['Energie', 'Heizungssysteme, Deutschland', 'Cloud ERP'], ['Automotive', 'Luxusfahrzeuge, Deutschland', 'Cloud ERP'], ['Maschinenbau', 'Deutschland', 'ERP-Umstellung'], ['Maschinenbau', 'Deutschland', 'WMS-Umstellung'], ['Handel (Elektro)', 'Niederlande', 'WMS'], ['Maschinenbau', 'Japan', 'ERP'], ['Handel (Outdoor)', 'Deutschland', 'WMS'], ['Maschinenbau', 'Australien', 'ERP'], ['Handel (Medical)', 'Belgien', 'Cloud WMS'], ['Maschinenbau', 'USA', 'ERP'], ['Handel (Bath & Heating)', 'Belgien', 'WMS'], ['Handel (Outdoor)', 'Norwegen', 'WMS'], ['Automotive (Landmaschinen)', 'Finnland', 'Cloud ERP'], ['Handel', 'Deutschland, Polen, Tschechische Republik, Portugal', 'Cloud ERP'], ['Maschinenbau', 'Niederlande', 'Cloud ERP'], ['Pharma', 'Deutschland', 'Cloud ERP'], ['Pharma', 'Dänemark', 'Cloud ERP'], ['Maschinenbau', 'USA, Deutschland, Australien, Neuseeland', 'Cloud ERP'], ['Pharma', 'Großbritannien', 'Cloud ERP'], ['Service', 'Großbritannien', 'Cloud ERP']] },
  contact: { eyebrow: 'Kontakt', h2: 'Sprechen Sie uns an',
    p: 'Per Anfrageformular rund um die Uhr oder telefonisch Montag bis Freitag, 09:00–18:00 Uhr. Wir freuen uns auf Ihre Nachricht!',
    country: 'Deutschland', mobile: 'Mobil', mail: 'E-Mail',
    form: { name: 'Name', email: 'E-Mail', msg: 'Ihr Anliegen', send: 'Anfrage senden', consent: 'Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden (siehe Datenschutz).', invalid: 'Bitte alle Felder korrekt ausfüllen.', opening: 'Ihr Mailprogramm wird geöffnet …', subject: 'Anfrage über die Webseite' } },
  footer: 'Impressum & Datenschutz', legalPath: '/legal-notice/', legalLang: ''
},
en: {
  htmlLang: 'en', locale: 'en_US',
  title: 'Logistik Schmiede – ERP, WMS, Logistics 4.0 & Customs',
  desc: 'Thomas Knecht Consulting: advisory on ERP & WMS, Logistics 4.0, customs and foreign trade (AEO), inventory optimization and interim management. 20+ years of experience.',
  menu: 'Menu', skip: 'Skip to content',
  nav: ['Services', 'Customs', 'Inventory', 'Interim', 'About us', 'Contact'],
  eyebrow: 'Innovative · Competent · Visionary',
  h1: ['Think logistics digitally.', 'Honest advice.'],
  lead: 'We give you competent and honest advice from a single source and contribute tailor-made to the successful delivery of your projects – from ERP & WMS and Logistics 4.0 to customs and interim management.',
  cta: ['Book a call', 'View services'],
  statsLabel: 'Key figures',
  stats: [['20+ years', 'experience in logistics projects'], ['Up to 95 %', 'less inventory effort possible'], ['15 countries', 'projects from Europe to Japan & USA']],
  tagline: 'Digitalization · Connectivity · Expertise · Competitiveness · Cost reduction · Future',
  svc: { eyebrow: 'Consulting services', h2: 'What we do for you', more: 'Learn more →',
    erp: ['ERP & WMS', ['Analysis of existing IT systems and comparison with requirements', 'Support with requirement and functional specifications', 'Vendor selection (long list) and coordination of demos', 'Cloud & on-premise implementation, training, agile project management']],
    l40: ['Logistics 4.0', 'Connecting and integrating logistics processes up to decentralized real-time control: more supply chain visibility, automation and optimization of material and resource use – including mobile devices and apps.'],
    customs: ['Customs & foreign trade', 'Guidance towards AEO status, Approved Exporter, Authorised Consignor and Known Consignor – plus support during customs audits.'],
    inv: ['Inventory simplification', 'From year-end stocktake to ongoing, IT-supported inventory – with up to 95 % less effort and higher stock accuracy.'],
    interim: ['Interim management & project lead', 'Temporary leadership or professional project management for ERP/WMS selection and rollout.'],
    misc: ['Hardware, staffing & smart home', 'Help with hardware selection, finding specialists and executives, and smart-home solutions for house and garden.'] },
  customs: { eyebrow: 'Customs & foreign trade', h2: 'Authorized Economic Operator (AEO)',
    p: ['Customs is neglected in many companies – yet it holds great potential for optimization. As an AEO you benefit from simplifications in international trade that mean direct cost savings.', 'We support you with customs audits covering imports, foreign trade, dual-use goods, preferences and certificates of origin.'],
    li: ['Lower processing costs', 'Better image with customers and suppliers', 'Shorter lead times', 'Secure supply chain', 'Fewer customs inspections'] },
  inv: { eyebrow: 'Inventory', h2: 'Cut inventory effort by up to 95 %',
    p: ['Is counting on a single key date, often around Christmas, a thorn in your side? There are many other options – including ongoing counts with sensible IT tools.'],
    li: ['Cost reduction of up to 95 %', 'Choose your own count dates', 'Higher stock accuracy to avoid supply bottlenecks'] },
  interim: { eyebrow: 'Interim management & project lead', h2: 'The right person at the right time',
    lead: 'Do you need a leadership role for a limited time but cannot find a suitable candidate for a fixed-term contract? Or should a logistics project be led professionally?',
    cards: [['Experience', 'Support and project management when selecting ERP, WMS and similar vendors – with experience on both the customer and provider side.'], ['Speed', 'Thanks to close contact with interim managers, first suitable profiles are available in no time.'], ['Accuracy', 'We tell you openly whether interim management is the right solution in your case and sharpen the profile.'], ['Competence', 'We also search for candidates for permanent positions – precisely and with logistics experience.']] },
  about: { eyebrow: 'About us', h2: 'Experience from many projects',
    lead: 'With more than 20 years of experience we add real value in digitalization – from system selection to migration, cloud or on-premise.',
    sub: 'Selected projects',
    projects: [['Living', 'Luxury beds, Sweden', 'Cloud ERP'], ['Energy', 'Heating systems, Germany', 'Cloud ERP'], ['Automotive', 'Luxury vehicles, Germany', 'Cloud ERP'], ['Machinery', 'Germany', 'ERP migration'], ['Machinery', 'Germany', 'WMS migration'], ['Trade (electrical)', 'Netherlands', 'WMS'], ['Machinery', 'Japan', 'ERP'], ['Trade (outdoor)', 'Germany', 'WMS'], ['Machinery', 'Australia', 'ERP'], ['Trade (medical)', 'Belgium', 'Cloud WMS'], ['Machinery', 'USA', 'ERP'], ['Trade (bath & heating)', 'Belgium', 'WMS'], ['Trade (outdoor)', 'Norway', 'WMS'], ['Automotive (Agricultural machinery)', 'Finland', 'Cloud ERP'], ['Trade', 'Germany, Poland, Czech Republic, Portugal', 'Cloud ERP'], ['Machinery', 'Netherlands', 'Cloud ERP'], ['Pharma', 'Germany', 'Cloud ERP'], ['Pharma', 'Denmark', 'Cloud ERP'], ['Machinery', 'USA, Germany, Australia, New Zealand', 'Cloud ERP'], ['Pharma', 'UK', 'Cloud ERP'], ['Service', 'UK', 'Cloud ERP']] },
  contact: { eyebrow: 'Contact', h2: 'Get in touch',
    p: 'Use the enquiry form around the clock or call us Monday to Friday, 9 am–6 pm (CET). We look forward to your message!',
    country: 'Germany', mobile: 'Mobile', mail: 'Email',
    form: { name: 'Name', email: 'Email', msg: 'Your request', send: 'Send request', consent: 'I agree that my details may be used to process my request (see privacy).', invalid: 'Please fill in all fields correctly.', opening: 'Opening your email app …', subject: 'Website enquiry' } },
  footer: 'Legal notice & privacy', legalPath: '/en-us/legal-notice/'
},
es: {
  htmlLang: 'es', locale: 'es_ES',
  title: 'Logistik Schmiede – ERP, WMS, Logística 4.0 y Aduanas',
  desc: 'Thomas Knecht Consulting: consultoría en ERP y WMS, Logística 4.0, aduanas y comercio exterior (AEO), optimización de inventarios y gestión interina. Más de 20 años de experiencia.',
  menu: 'Menú', skip: 'Saltar al contenido',
  nav: ['Servicios', 'Aduanas', 'Inventario', 'Interim', 'Nosotros', 'Contacto'],
  eyebrow: 'Innovador · Competente · Visionario',
  h1: ['Pensar la logística en digital.', 'Asesoramiento honesto.'],
  lead: 'Le asesoramos de forma competente y honesta desde una única fuente y contribuimos a medida al éxito de sus proyectos: desde ERP y WMS y Logística 4.0 hasta aduanas y gestión interina.',
  cta: ['Concertar una cita', 'Ver servicios'],
  statsLabel: 'Cifras clave',
  stats: [['20+ años', 'de experiencia en proyectos logísticos'], ['Hasta un 95 %', 'menos esfuerzo de inventario posible'], ['15 países', 'proyectos desde Europa hasta Japón y EE. UU.']],
  tagline: 'Digitalización · Conectividad · Experiencia · Competitividad · Reducción de costes · Futuro',
  svc: { eyebrow: 'Servicios de consultoría', h2: 'Lo que hacemos por usted', more: 'Más información →',
    erp: ['ERP y WMS', ['Análisis de los sistemas informáticos existentes y comparación con los requisitos', 'Apoyo en pliegos de requisitos y especificaciones funcionales', 'Selección de proveedores (long list) y coordinación de demostraciones', 'Implantación en la nube y on-premise, formación y gestión ágil de proyectos']],
    l40: ['Logística 4.0', 'Conexión e integración de procesos logísticos hasta el control descentralizado en tiempo real: más visibilidad de la cadena de suministro, automatización y optimización de materiales y recursos, incluidos dispositivos móviles y apps.'],
    customs: ['Aduanas y comercio exterior', 'Acompañamiento hacia el estatus AEO, exportador autorizado, remitente autorizado y expedidor conocido, así como apoyo en inspecciones aduaneras.'],
    inv: ['Simplificación del inventario', 'Del recuento en una fecha fija al inventario continuo con apoyo informático: hasta un 95 % menos de esfuerzo y mayor fiabilidad de existencias.'],
    interim: ['Gestión interina y dirección de proyectos', 'Dirección temporal o gestión profesional de proyectos en la selección e implantación de ERP/WMS.'],
    misc: ['Hardware, personal y smart home', 'Ayuda en la elección de hardware, la búsqueda de especialistas y directivos y soluciones smart home para casa y jardín.'] },
  customs: { eyebrow: 'Aduanas y comercio exterior', h2: 'Operador Económico Autorizado (AEO)',
    p: ['Las aduanas se descuidan en muchas empresas, aunque ofrecen un gran potencial de optimización. Como AEO se beneficia de simplificaciones en el comercio internacional que suponen ahorros directos.', 'Le apoyamos en inspecciones aduaneras de importación, comercio exterior, bienes de doble uso, preferencias y certificados de origen.'],
    li: ['Menores costes de tramitación', 'Mejor imagen ante clientes y proveedores', 'Plazos de entrega más cortos', 'Cadena de suministro asegurada', 'Menos controles aduaneros'] },
  inv: { eyebrow: 'Inventario', h2: 'Reduzca el esfuerzo de inventario hasta un 95 %',
    p: ['¿Le molesta el recuento en una fecha fija, a menudo en Navidad? Existen muchas otras opciones, también durante el año y con herramientas informáticas adecuadas.'],
    li: ['Reducción de costes de hasta un 95 %', 'Elección propia de las fechas de inventario', 'Mayor fiabilidad de existencias para evitar desabastecimientos'] },
  interim: { eyebrow: 'Gestión interina y dirección de proyectos', h2: 'La persona adecuada en el momento justo',
    lead: '¿Necesita un puesto directivo temporal pero no encuentra candidato para un contrato de duración determinada? ¿O quiere que un proyecto logístico se dirija de forma profesional?',
    cards: [['Experiencia', 'Acompañamiento y gestión de proyectos en la selección de proveedores de ERP, WMS y similares, con experiencia tanto del lado cliente como del proveedor.'], ['Rapidez', 'Gracias al contacto estrecho con directivos interinos, presentamos los primeros perfiles adecuados en muy poco tiempo.'], ['Precisión', 'Le decimos con franqueza si la gestión interina es la solución adecuada en su caso y afinamos el perfil.'], ['Competencia', 'También buscamos candidatos para empleo fijo, con precisión y experiencia logística.']] },
  about: { eyebrow: 'Sobre nosotros', h2: 'Experiencia de muchos proyectos',
    lead: 'Con más de 20 años de experiencia aportamos un valor real en la digitalización, desde la selección del sistema hasta la migración, en la nube u on-premise.',
    sub: 'Proyectos seleccionados',
    projects: [['Hogar', 'Camas de lujo, Suecia', 'ERP en la nube'], ['Energía', 'Sistemas de calefacción, Alemania', 'ERP en la nube'], ['Automoción', 'Vehículos de lujo, Alemania', 'ERP en la nube'], ['Maquinaria', 'Alemania', 'Migración de ERP'], ['Maquinaria', 'Alemania', 'Migración de WMS'], ['Comercio (electricidad)', 'Países Bajos', 'WMS'], ['Maquinaria', 'Japón', 'ERP'], ['Comercio (outdoor)', 'Alemania', 'WMS'], ['Maquinaria', 'Australia', 'ERP'], ['Comercio (médico)', 'Bélgica', 'WMS en la nube'], ['Maquinaria', 'EE. UU.', 'ERP'], ['Comercio (baño y calefacción)', 'Bélgica', 'WMS'], ['Comercio (outdoor)', 'Noruega', 'WMS'], ['Automoción (Maquinaria agrícola)', 'Finlandia', 'ERP en la nube'], ['Comercio', 'Alemania, Polonia, República Checa, Portugal', 'ERP en la nube'], ['Maquinaria', 'Países Bajos', 'ERP en la nube'], ['Farma', 'Alemania', 'ERP en la nube'], ['Farma', 'Dinamarca', 'ERP en la nube'], ['Maquinaria', 'EE. UU., Alemania, Australia, Nueva Zelanda', 'ERP en la nube'], ['Farma', 'Reino Unido', 'ERP en la nube'], ['Servicios', 'Reino Unido', 'ERP en la nube']] },
  contact: { eyebrow: 'Contacto', h2: 'Hable con nosotros',
    p: 'Use el formulario de consulta a cualquier hora o llámenos de lunes a viernes de 9:00 a 18:00 (CET). ¡Esperamos su mensaje!',
    country: 'Alemania', mobile: 'Móvil', mail: 'Correo',
    form: { name: 'Nombre', email: 'Correo electrónico', msg: 'Su consulta', send: 'Enviar consulta', consent: 'Acepto que mis datos se utilicen para tramitar mi consulta (véase privacidad).', invalid: 'Por favor, rellene todos los campos correctamente.', opening: 'Abriendo su programa de correo …', subject: 'Consulta desde la web' } },
  footer: 'Aviso legal y privacidad', legalPath: '/es-es/legal-notice/'
},
it: {
  htmlLang: 'it', locale: 'it_IT',
  title: 'Logistik Schmiede – ERP, WMS, Logistica 4.0 e Dogane',
  desc: 'Thomas Knecht Consulting: consulenza su ERP e WMS, Logistica 4.0, dogane e commercio estero (AEO), ottimizzazione dell’inventario e interim management. Oltre 20 anni di esperienza.',
  menu: 'Menu', skip: 'Vai al contenuto',
  nav: ['Servizi', 'Dogane', 'Inventario', 'Interim', 'Chi siamo', 'Contatti'],
  eyebrow: 'Innovativo · Competente · Visionario',
  h1: ['Pensare la logistica in digitale.', 'Consulenza onesta.'],
  lead: 'La consigliamo in modo competente e onesto da un unico interlocutore e contribuiamo su misura al successo dei suoi progetti: da ERP e WMS e Logistica 4.0 fino a dogane e interim management.',
  cta: ['Fissa un appuntamento', 'Scopri i servizi'],
  statsLabel: 'Cifre chiave',
  stats: [['20+ anni', 'di esperienza in progetti logistici'], ['Fino al 95 %', 'di impegno in meno per l’inventario'], ['15 paesi', 'progetti dall’Europa al Giappone e agli USA']],
  tagline: 'Digitalizzazione · Connettività · Competenza · Competitività · Riduzione dei costi · Futuro',
  svc: { eyebrow: 'Servizi di consulenza', h2: 'Cosa facciamo per lei', more: 'Scopri di più →',
    erp: ['ERP e WMS', ['Analisi dei sistemi IT esistenti e confronto con i requisiti', 'Supporto nella stesura di capitolati e specifiche funzionali', 'Selezione dei fornitori (long list) e coordinamento delle demo', 'Implementazione cloud e on-premise, formazione e project management agile']],
    l40: ['Logistica 4.0', 'Collegamento e integrazione dei processi logistici fino al controllo decentralizzato in tempo reale: più visibilità della supply chain, automazione e ottimizzazione di materiali e risorse, inclusi dispositivi mobili e app.'],
    customs: ['Dogane e commercio estero', 'Percorso verso lo status AEO, esportatore autorizzato, speditore autorizzato e speditore conosciuto, oltre al supporto nei controlli doganali.'],
    inv: ['Semplificazione dell’inventario', 'Dal conteggio a data fissa all’inventario continuo con supporto IT: fino al 95 % di impegno in meno e maggiore affidabilità delle giacenze.'],
    interim: ['Interim management e direzione progetti', 'Direzione a tempo o project management professionale nella selezione e introduzione di ERP/WMS.'],
    misc: ['Hardware, personale e smart home', 'Aiuto nella scelta dell’hardware, nella ricerca di specialisti e dirigenti e soluzioni smart home per casa e giardino.'] },
  customs: { eyebrow: 'Dogane e commercio estero', h2: 'Operatore Economico Autorizzato (AEO)',
    p: ['In molte aziende le dogane vengono trascurate, pur offrendo un grande potenziale di ottimizzazione. Come AEO beneficia di semplificazioni nel commercio internazionale che significano risparmi diretti.', 'La supportiamo nei controlli doganali relativi a importazioni, commercio estero, beni a duplice uso, preferenze e certificati d’origine.'],
    li: ['Costi di gestione ridotti', 'Migliore immagine presso clienti e fornitori', 'Tempi di consegna più brevi', 'Catena di fornitura più sicura', 'Meno controlli doganali'] },
  inv: { eyebrow: 'Inventario', h2: 'Ridurre l’impegno per l’inventario fino al 95 %',
    p: ['Il conteggio a una data fissa, spesso a ridosso del Natale, le è sempre pesato? Esistono molte altre possibilità, anche durante l’anno e con strumenti IT adeguati.'],
    li: ['Riduzione dei costi fino al 95 %', 'Scelta autonoma delle date di inventario', 'Maggiore affidabilità delle giacenze per evitare carenze'] },
  interim: { eyebrow: 'Interim management e direzione progetti', h2: 'La persona giusta al momento giusto',
    lead: 'Le serve un ruolo direttivo a tempo ma non trova un candidato per un contratto a termine? Oppure un progetto logistico deve essere guidato in modo professionale?',
    cards: [['Esperienza', 'Supporto e project management nella selezione di fornitori ERP, WMS e simili, con esperienza sia lato cliente sia lato fornitore.'], ['Rapidità', 'Grazie ai contatti stretti con interim manager, i primi profili adatti sono disponibili in tempi brevissimi.'], ['Precisione', 'Le diciamo apertamente se l’interim management è la soluzione giusta nel suo caso e affiniamo il profilo.'], ['Competenza', 'Cerchiamo anche candidati per un’assunzione stabile, con precisione e esperienza logistica.']] },
  about: { eyebrow: 'Chi siamo', h2: 'Esperienza da molti progetti',
    lead: 'Con oltre 20 anni di esperienza offriamo un reale valore nella digitalizzazione, dalla scelta del sistema alla migrazione, in cloud o on-premise.',
    sub: 'Progetti selezionati',
    projects: [['Arredamento', 'Letti di lusso, Svezia', 'ERP cloud'], ['Energia', 'Sistemi di riscaldamento, Germania', 'ERP cloud'], ['Automotive', 'Veicoli di lusso, Germania', 'ERP cloud'], ['Meccanica', 'Germania', 'Migrazione ERP'], ['Meccanica', 'Germania', 'Migrazione WMS'], ['Commercio (elettrico)', 'Paesi Bassi', 'WMS'], ['Meccanica', 'Giappone', 'ERP'], ['Commercio (outdoor)', 'Germania', 'WMS'], ['Meccanica', 'Australia', 'ERP'], ['Commercio (medicale)', 'Belgio', 'WMS cloud'], ['Meccanica', 'USA', 'ERP'], ['Commercio (bagno e riscaldamento)', 'Belgio', 'WMS'], ['Commercio (outdoor)', 'Norvegia', 'WMS'], ['Automotive (Macchine agricole)', 'Finlandia', 'ERP cloud'], ['Commercio', 'Germania, Polonia, Repubblica Ceca, Portogallo', 'ERP cloud'], ['Meccanica', 'Paesi Bassi', 'ERP cloud'], ['Farmaceutico', 'Germania', 'ERP cloud'], ['Farmaceutico', 'Danimarca', 'ERP cloud'], ['Meccanica', 'USA, Germania, Australia, Nuova Zelanda', 'ERP cloud'], ['Farmaceutico', 'Regno Unito', 'ERP cloud'], ['Servizi', 'Regno Unito', 'ERP cloud']] },
  contact: { eyebrow: 'Contatti', h2: 'Parliamone',
    p: 'Usi il modulo di richiesta a qualsiasi ora o ci chiami dal lunedì al venerdì, dalle 9:00 alle 18:00 (CET). Attendiamo il suo messaggio!',
    country: 'Germania', mobile: 'Cellulare', mail: 'E-mail',
    form: { name: 'Nome', email: 'E-mail', msg: 'La sua richiesta', send: 'Invia richiesta', consent: 'Acconsento all’uso dei miei dati per elaborare la richiesta (vedi privacy).', invalid: 'Compili correttamente tutti i campi.', opening: 'Apertura del programma di posta …', subject: 'Richiesta dal sito web' } },
  footer: 'Note legali e privacy', legalPath: '/it-it/legal-notice/'
}
};

T.de.legalLink = 'Impressum'; T.en.legalLink = 'Legal notice'; T.es.legalLink = 'Aviso legal'; T.it.legalLink = 'Note legali';

// Datenschutzerklärung – VORLAGE, vor Veröffentlichung rechtlich prüfen lassen.
// Platzhalter [HOSTING-ANBIETER] durch den tatsächlichen Anbieter ersetzen.
const RESP = 'Thomas Knecht Consulting, Thomas Knecht, Scheidemannstr. 29, 42781 Haan';
const P = {
de: { nav: 'Datenschutz', title: 'Datenschutzerklärung – Logistik Schmiede', h1: 'Datenschutzerklärung', back: '← Zur Startseite', updated: 'Stand: Oktober 2026',
  sec: [
    ['1. Verantwortlicher', [`${RESP}, Deutschland. Telefon: +49 172 26 44 305, E-Mail: t.knecht@web.de.`]],
    ['2. Hosting und Server-Logfiles', ['Diese Website wird bei GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) gehostet. Dabei kann eine Verarbeitung in den USA stattfinden; Informationen dazu finden Sie in der Datenschutzerklärung von GitHub (docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Beim Aufruf werden technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp) in Server-Logfiles verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Sicherheit und Betrieb der Website). Die Logfiles werden nach kurzer Zeit gelöscht.']],
    ['3. Cookies, Tracking und Schriftarten', ['Wir setzen keine Cookies, keine Analyse- oder Tracking-Dienste und keine externen Schriftarten oder Skripte ein. Es werden ausschließlich Systemschriften verwendet.']],
    ['4. Kontaktaufnahme', ['Wenn Sie uns per E-Mail, Telefon oder über das Kontaktformular kontaktieren, verarbeiten wir Ihre Angaben (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage. Das Formular öffnet Ihr Mailprogramm; die Nachricht wird erst durch Ihr Absenden per E-Mail an uns übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO sowie Ihre Einwilligung (lit. a). Wir speichern die Daten, solange es für die Bearbeitung erforderlich ist, und beachten gesetzliche Aufbewahrungsfristen.']],
    ['5. Externe Links', ['Diese Seite verlinkt auf externe Angebote (z. B. XING). Beim Anklicken gelten die Datenschutzbestimmungen des jeweiligen Anbieters.']],
    ['6. Ihre Rechte', ['Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Wenden Sie sich dazu an die oben genannte Adresse.']],
    ['7. Beschwerderecht', ['Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, z. B. der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Düsseldorf.']]
  ] },
en: { nav: 'Privacy', title: 'Privacy policy – Logistik Schmiede', h1: 'Privacy policy', back: '← Back to home', updated: 'Last updated: October 2026',
  sec: [
    ['1. Controller', [`${RESP}, Germany. Phone: +49 172 26 44 305, email: t.knecht@web.de.`]],
    ['2. Hosting and server log files', ['This website is hosted by GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Processing in the USA may occur; see the GitHub privacy statement (docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). When you visit it, technically necessary data (IP address, date and time, requested page, browser type) is processed in server log files. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in the security and operation of the website). Log files are deleted after a short period.']],
    ['3. Cookies, tracking and fonts', ['We do not use cookies, analytics or tracking services, or external fonts or scripts. Only system fonts are used.']],
    ['4. Contact', ['If you contact us by email, phone or via the contact form, we process your details (name, email address, message) to handle your request. The form opens your email app; the message is only transmitted to us when you send the email. The legal basis is Art. 6(1)(b) or (f) GDPR and your consent (point (a)). We store the data as long as necessary to handle your request and observe statutory retention periods.']],
    ['5. External links', ['This site links to external services (e.g. XING). When you click them, the privacy policy of the respective provider applies.']],
    ['6. Your rights', ['You have the right of access, rectification, erasure, restriction of processing, data portability and objection (Art. 15–21 GDPR), and the right to withdraw consent at any time with effect for the future. Please contact us at the address above.']],
    ['7. Right to lodge a complaint', ['You may lodge a complaint with a data protection authority, e.g. the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia, Düsseldorf.']]
  ] },
es: { nav: 'Privacidad', title: 'Política de privacidad – Logistik Schmiede', h1: 'Política de privacidad', back: '← Volver al inicio', updated: 'Actualizado: octubre de 2026',
  sec: [
    ['1. Responsable', [`${RESP}, Alemania. Teléfono: +49 172 26 44 305, correo: t.knecht@web.de.`]],
    ['2. Alojamiento y archivos de registro', ['Este sitio web está alojado en GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Puede producirse un tratamiento en EE. UU.; consulte la declaración de privacidad de GitHub (docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Al acceder se tratan datos técnicamente necesarios (dirección IP, fecha y hora, página solicitada, tipo de navegador) en archivos de registro del servidor. La base jurídica es el art. 6.1.f RGPD (interés legítimo en la seguridad y el funcionamiento del sitio). Los registros se eliminan tras un breve plazo.']],
    ['3. Cookies, seguimiento y fuentes', ['No utilizamos cookies, servicios de análisis o seguimiento, ni fuentes o scripts externos. Solo se emplean fuentes del sistema.']],
    ['4. Contacto', ['Si nos contacta por correo, teléfono o mediante el formulario, tratamos sus datos (nombre, correo electrónico, mensaje) para atender su consulta. El formulario abre su programa de correo; el mensaje solo se transmite cuando usted lo envía. La base jurídica es el art. 6.1.b o f RGPD y su consentimiento (letra a). Conservamos los datos mientras sea necesario y respetamos los plazos legales de conservación.']],
    ['5. Enlaces externos', ['Este sitio enlaza a servicios externos (p. ej. XING). Al hacer clic se aplica la política de privacidad del proveedor correspondiente.']],
    ['6. Sus derechos', ['Tiene derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición (arts. 15–21 RGPD), así como a retirar su consentimiento en cualquier momento con efectos futuros. Contacte con nosotros en la dirección indicada.']],
    ['7. Derecho a reclamar', ['Puede presentar una reclamación ante una autoridad de protección de datos, p. ej. la Comisionada Estatal de Protección de Datos y Libertad de Información de Renania del Norte-Westfalia, Düsseldorf.']]
  ] },
it: { nav: 'Privacy', title: 'Informativa sulla privacy – Logistik Schmiede', h1: 'Informativa sulla privacy', back: '← Torna alla home', updated: 'Aggiornato: ottobre 2026',
  sec: [
    ['1. Titolare del trattamento', [`${RESP}, Germania. Telefono: +49 172 26 44 305, e-mail: t.knecht@web.de.`]],
    ['2. Hosting e file di log', ['Questo sito è ospitato presso GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Può avvenire un trattamento negli USA; vedere l’informativa sulla privacy di GitHub (docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Alla visita vengono trattati dati tecnicamente necessari (indirizzo IP, data e ora, pagina richiesta, tipo di browser) nei file di log del server. La base giuridica è l’art. 6, par. 1, lett. f GDPR (legittimo interesse alla sicurezza e al funzionamento del sito). I log vengono cancellati dopo breve tempo.']],
    ['3. Cookie, tracciamento e font', ['Non utilizziamo cookie, servizi di analisi o tracciamento né font o script esterni. Vengono usati solo i font di sistema.']],
    ['4. Contatto', ['Se ci contatta via e-mail, telefono o tramite il modulo, trattiamo i suoi dati (nome, e-mail, messaggio) per gestire la richiesta. Il modulo apre il suo programma di posta; il messaggio ci viene trasmesso solo quando lo invia. La base giuridica è l’art. 6, par. 1, lett. b o f GDPR e il suo consenso (lett. a). Conserviamo i dati per il tempo necessario e rispettiamo i termini di legge.']],
    ['5. Link esterni', ['Questo sito rimanda a servizi esterni (ad es. XING). Cliccando si applica l’informativa del rispettivo fornitore.']],
    ['6. I suoi diritti', ['Ha diritto di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione (artt. 15–21 GDPR) e può revocare il consenso in qualsiasi momento con effetto per il futuro. Ci contatti all’indirizzo sopra indicato.']],
    ['7. Reclamo', ['Può presentare reclamo a un’autorità di controllo, ad es. la Garante per la protezione dei dati e la libertà di informazione del Nordreno-Vestfalia, Düsseldorf.']]
  ] }
};

T.de.about.unit = ['Projekt', 'Projekte']; T.en.about.unit = ['project', 'projects'];
T.es.about.unit = ['proyecto', 'proyectos']; T.it.about.unit = ['progetto', 'progetti'];

// Projekte nach Branche gruppieren: "Handel (Elektro)" -> Gruppe "Handel", Zusatz "Elektro".
// Gruppen mit den meisten Projekten zuerst, sonst Reihenfolge der Liste.
function groups(t) {
  const map = new Map();
  t.about.projects.forEach(([label, place, type]) => {
    const m = label.match(/^(.*?)(?: \((.*)\))?$/);
    if (!map.has(m[1])) map.set(m[1], { name: m[1], items: [] });
    map.get(m[1]).items.push({ sub: m[2] || '', place, type });
  });
  return [...map.values()].sort((a, b) => b.items.length - a.items.length);
}

// Impressum (nur Deutsch), Texte von der alten Seite übernommen (Stand 2026-10).
function imprint() {
  const sec = [
    ['1. Haftung für Inhalte', 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'],
    ['2. Haftung für Links', 'Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte kein Einfluss genommen werden kann. Deshalb kann für diese fremden Inhalte auch keine Gewähr übernommen werden. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.'],
    ['3. Urheberrecht', 'Die durch die Diensteanbieter, deren Mitarbeiter und beauftragte Dritte erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden derartige Inhalte umgehend entfernt.'],
    ['4. Werbe-Kontaktaufnahme', 'Die Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich untersagt. Ausgenommen hiervon sind bestehende Geschäftsbeziehungen bzw. es liegt Ihnen eine entsprechende Einwilligung von uns vor. Die Anbieter und alle auf dieser Website genannten Dritten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen vor.']
  ];
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Impressum – Logistik Schmiede</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${SITE}/impressum/">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="site-header"><div class="wrap nav"><a class="brand" href="../"><span>LOGISTIK&nbsp;SCHMIEDE</span></a><a class="btn btn-small btn-ghost" href="../">← Zur Startseite</a></div></header>
  <main class="section"><div class="wrap prose">
    <h1>Impressum</h1>
    <h2>Angaben gemäß § 5 TMG</h2>
    <p><b>Logistik-Schmiede.de</b><br>Thomas Knecht Consulting<br>Thomas Knecht, Dipl.-Betriebswirt (FH)<br>Scheidemannstr. 29<br>42781 Haan<br>Deutschland</p>
    <p>Telefon: <a href="tel:+491722644305">+49 172 26 44 305</a><br>E-Mail: <a href="mailto:info@logistik-4-0.de">info@logistik-4-0.de</a></p>
    <p>Umsatzsteuer-Identifikationsnummer: DE335261237</p>
    <h2>Haftungsausschluss</h2>
${sec.map(s => `    <h3>${esc(s[0])}</h3>\n    <p>${esc(s[1])}</p>`).join('\n')}
  </div></main>
  <footer class="site-footer"><div class="wrap foot"><span>© <span id="year"></span> Logistik-Schmiede.de · Thomas Knecht Consulting</span><span><a href="../privacy/">Datenschutz</a></span></div></footer>
  <script>document.getElementById('year').textContent=new Date().getFullYear()</script>
</body>
</html>
`;
}

function privacy(l) {
  const p = P[l], t = T[l], r = '../' + (l === 'de' ? '' : '../');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)}</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${url(l)}privacy/">
  <link rel="stylesheet" href="${r}styles.css">
</head>
<body>
  <header class="site-header"><div class="wrap nav"><a class="brand" href="../"><span>LOGISTIK&nbsp;SCHMIEDE</span></a><a class="btn btn-small btn-ghost" href="../">${esc(p.back)}</a></div></header>
  <main class="section"><div class="wrap prose">
    <h1>${esc(p.h1)}</h1>
    <p class="muted">${esc(p.updated)}</p>
${p.sec.map(s => `    <h2>${esc(s[0])}</h2>\n${s[1].map(x => `    <p>${esc(x)}</p>`).join('\n')}`).join('\n')}
  </div></main>
  <footer class="site-footer"><div class="wrap foot"><span>© <span id="year"></span> Logistik-Schmiede.de · Thomas Knecht Consulting</span></div></footer>
  <script>document.getElementById('year').textContent=new Date().getFullYear()</script>
</body>
</html>
`;
}

const esc = s =>String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => esc(s).replace(/"/g, '&quot;');
const url = l => SITE + (l === 'de' ? '/' : '/' + l + '/');

function page(l) {
  const t = T[l], r = l === 'de' ? '' : '../';
  const card = (icon, h, body, more) => `
          <article class="card reveal">
            <div class="icon" aria-hidden="true">${icon}</div>
            <h3>${esc(h)}</h3>
            ${body}${more ? `\n            <a class="more" href="${more}">${esc(t.svc.more)}</a>` : ''}
          </article>`;
  const s = t.svc;
  const langs = LANGS.map(x => x === l
    ? `<span class="lang current" aria-current="true">${LABEL[x]}</span>`
    : `<a class="lang" href="${l === 'de' ? (x === 'de' ? './' : x + '/') : (x === 'de' ? '../' : '../' + x + '/')}" hreflang="${x}" lang="${x}">${LABEL[x]}</a>`).join('');
  const alt = LANGS.map(x => `<link rel="alternate" hreflang="${x}" href="${url(x)}">`).join('\n  ') +
    `\n  <link rel="alternate" hreflang="x-default" href="${url('de')}">`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Logistik Schmiede – Thomas Knecht Consulting',
    url: SITE + '/', sameAs: ['https://www.linkedin.com/in/thomas-knecht-b54a528a/', 'https://www.xing.com/Logistik40'], inLanguage: t.htmlLang, description: t.desc, telephone: '+49 172 2644305', email: 't.knecht@web.de',
    address: { '@type': 'PostalAddress', streetAddress: 'Scheidemannstr. 29', postalCode: '42781', addressLocality: 'Haan', addressCountry: 'DE' }
  };
  const f = t.contact.form;
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.title)}</title>
  <meta name="description" content="${attr(t.desc)}">
  <link rel="canonical" href="${url(l)}">
  ${alt}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Logistik Schmiede">
  <meta property="og:title" content="${attr(t.title)}">
  <meta property="og:description" content="${attr(t.desc)}">
  <meta property="og:url" content="${url(l)}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:image" content="${SITE}/img/logo.png">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%232a9fe0'/%3E%3Cpath d='M22 9H12a4 4 0 0 0 0 8h8a4 4 0 0 1 0 8H10' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="${r}styles.css">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
  <a class="skip" href="#top">${esc(t.skip)}</a>
  <header class="site-header">
    <div class="wrap nav">
      <a class="brand" href="#top" aria-label="Logistik Schmiede Digital">
        <svg width="34" height="34" viewBox="0 0 32 32" role="img" aria-label="Logo"><rect width="32" height="32" rx="7" fill="#2a9fe0"/><path d="M22 9H12a4 4 0 0 0 0 8h8a4 4 0 0 1 0 8H10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="23" cy="9" r="2" fill="#fff"/><circle cx="9" cy="25" r="2" fill="#fff"/></svg>
        <span>LOGISTIK&nbsp;SCHMIEDE</span>
      </a>
      <button class="menu-btn" aria-label="${attr(t.menu)}" aria-expanded="false" aria-controls="menu">☰</button>
      <nav id="menu">
        <a href="#leistungen">${esc(t.nav[0])}</a>
        <a href="#zoll">${esc(t.nav[1])}</a>
        <a href="#inventur">${esc(t.nav[2])}</a>
        <a href="#interim">${esc(t.nav[3])}</a>
        <a href="#ueber-uns">${esc(t.nav[4])}</a>
        <a class="btn btn-small" href="#kontakt">${esc(t.nav[5])}</a>
        <span class="langs">${langs}</span>
      </nav>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <p class="eyebrow">${esc(t.eyebrow)}</p>
          <h1>${esc(t.h1[0])} <span class="accent">${esc(t.h1[1])}</span></h1>
          <p class="lead">${esc(t.lead)}</p>
          <div class="cta">
            <a class="btn" href="#kontakt">${esc(t.cta[0])}</a>
            <a class="btn btn-ghost" href="#leistungen">${esc(t.cta[1])}</a>
          </div>
        </div>
        <ul class="stats" aria-label="${attr(t.statsLabel)}">
${t.stats.map(x => `          <li><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></li>`).join('\n')}
        </ul>
      </div>
      <p class="wrap tagline">${esc(t.tagline)}</p>
    </section>

    <section id="leistungen" class="section">
      <div class="wrap">
        <p class="eyebrow">${esc(s.eyebrow)}</p>
        <h2>${esc(s.h2)}</h2>
        <div class="grid cards">${card('🗄️', s.erp[0], `<ul class="ticks">\n${s.erp[1].map(x => `              <li>${esc(x)}</li>`).join('\n')}\n            </ul>`)}${card('🌐', s.l40[0], `<p>${esc(s.l40[1])}</p>`)}${card('📑', s.customs[0], `<p>${esc(s.customs[1])}</p>`, '#zoll')}${card('📦', s.inv[0], `<p>${esc(s.inv[1])}</p>`, '#inventur')}${card('🧭', s.interim[0], `<p>${esc(s.interim[1])}</p>`, '#interim')}${card('🏠', s.misc[0], `<p>${esc(s.misc[1])}</p>`)}
        </div>
      </div>
    </section>

    <section id="zoll" class="section alt">
      <div class="wrap split">
        <div>
          <p class="eyebrow">${esc(t.customs.eyebrow)}</p>
          <h2>${esc(t.customs.h2)}</h2>
${t.customs.p.map(x => `          <p>${esc(x)}</p>`).join('\n')}
          <p><a class="btn btn-small" href="mailto:zoll@logistik-4-0.de">zoll@logistik-4-0.de</a></p>
        </div>
        <ul class="benefits">
${t.customs.li.map(x => `          <li>${esc(x)}</li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section id="inventur" class="section">
      <div class="wrap split">
        <div>
          <p class="eyebrow">${esc(t.inv.eyebrow)}</p>
          <h2>${esc(t.inv.h2)}</h2>
${t.inv.p.map(x => `          <p>${esc(x)}</p>`).join('\n')}
          <p><a class="btn btn-small" href="mailto:inventur@logistik-4-0.de">inventur@logistik-4-0.de</a></p>
        </div>
        <ul class="benefits">
${t.inv.li.map(x => `          <li>${esc(x)}</li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section id="interim" class="section alt">
      <div class="wrap">
        <p class="eyebrow">${esc(t.interim.eyebrow)}</p>
        <h2>${esc(t.interim.h2)}</h2>
        <p class="lead narrow">${esc(t.interim.lead)}</p>
        <div class="grid four">
${t.interim.cards.map(c => `          <article class="card reveal"><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p></article>`).join('\n')}
        </div>
      </div>
    </section>

    <section id="ueber-uns" class="section">
      <div class="wrap">
        <p class="eyebrow">${esc(t.about.eyebrow)}</p>
        <h2>${esc(t.about.h2)}</h2>
        <p class="lead narrow">${esc(t.about.lead)}</p>
        <h3 class="sub">${esc(t.about.sub)}</h3>
        <div class="industries">
${groups(t).map((g, i) => `          <details class="industry"${i === 0 ? ' open' : ''}>
            <summary><span class="ind-name">${esc(g.name)}</span><span class="ind-count">${g.items.length} ${esc(g.items.length === 1 ? t.about.unit[0] : t.about.unit[1])}</span></summary>
            <ul>
${g.items.map(p => `              <li><span>${p.sub ? `<b>${esc(p.sub)}</b> · ` : ''}${esc(p.place)}</span><em>${esc(p.type)}</em></li>`).join('\n')}
            </ul>
          </details>`).join('\n')}
        </div>
      </div>
    </section>

    <section id="kontakt" class="section alt">
      <div class="wrap split">
        <div>
          <p class="eyebrow">${esc(t.contact.eyebrow)}</p>
          <h2>${esc(t.contact.h2)}</h2>
          <p>${esc(t.contact.p)}</p>
          <address>
            <b>Thomas Knecht Consulting</b><br>
            Scheidemannstr. 29<br>42781 Haan, ${esc(t.contact.country)}<br><br>
            ${esc(t.contact.mobile)}: <a href="tel:+491722644305">+49 (0) 172 26 44 305</a><br>
            ${esc(t.contact.mail)}: <a href="mailto:t.knecht@web.de">t.knecht@web.de</a><br>
            <a href="https://www.linkedin.com/in/thomas-knecht-b54a528a/" rel="noopener">LinkedIn</a> · <a href="https://www.xing.com/Logistik40" rel="noopener">XING</a>
          </address>
        </div>
        <form id="contact-form" novalidate data-invalid="${attr(f.invalid)}" data-opening="${attr(f.opening)}" data-subject="${attr(f.subject)}">
          <label>${esc(f.name)}<input name="name" required autocomplete="name"></label>
          <label>${esc(f.email)}<input name="email" type="email" required autocomplete="email"></label>
          <label>${esc(f.msg)}<textarea name="msg" rows="5" required></textarea></label>
          <label class="check"><input name="consent" type="checkbox" required> <span>${esc(f.consent)}</span></label>
          <button class="btn" type="submit">${esc(f.send)}</button>
          <p class="form-note" id="form-note" role="status"></p>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap foot">
      <span>© <span id="year"></span> Logistik-Schmiede.de · Thomas Knecht Consulting</span>
      <span><a href="${l === 'de' ? '' : '../'}impressum/" hreflang="de" lang="de">${esc(t.legalLink)}</a> · <a href="privacy/">${esc(P[l].nav)}</a></span>
    </div>
  </footer>

  <script src="${r}script.js"></script>
</body>
</html>
`;
}

for (const l of LANGS) {
  const out = l === 'de' ? 'index.html' : path.join(l, 'index.html');
  fs.mkdirSync(path.dirname(path.join(__dirname, out)), { recursive: true });
  fs.writeFileSync(path.join(__dirname, out), page(l));
  console.log('wrote', out);
  const pOut = path.join(path.dirname(out), 'privacy', 'index.html');
  fs.mkdirSync(path.dirname(path.join(__dirname, pOut)), { recursive: true });
  fs.writeFileSync(path.join(__dirname, pOut), privacy(l));
  console.log('wrote', pOut);
}
fs.mkdirSync(path.join(__dirname, 'impressum'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'impressum', 'index.html'), imprint());
console.log('wrote impressum/index.html');
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  LANGS.map(l => `  <url>\n    <loc>${url(l)}</loc>\n    <lastmod>${today}</lastmod>\n` + LANGS.map(x => `    <xhtml:link rel="alternate" hreflang="${x}" href="${url(x)}"/>`).join('\n') + `\n  </url>`).join('\n') + `\n</urlset>\n`);
fs.writeFileSync(path.join(__dirname, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('wrote sitemap.xml, robots.txt');















